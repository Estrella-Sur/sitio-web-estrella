import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { UserRole, canPerformAction } from '@/lib/roles'
import bcrypt from 'bcryptjs'
import { Prisma, UserRole as PrismaUserRole } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'name'
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc'

    // Construir filtros
    const where: Prisma.UserWhereInput = {}
    
    if (role && role !== 'ALL') {
      where.role = role as PrismaUserRole
    }
    
    if (status && status !== 'ALL') {
      where.isActive = status === 'ACTIVE'
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } }
      ]
    }

    // Construir ordenamiento
    const orderBy: Prisma.UserOrderByWithRelationInput = {}
    if (sortBy === 'lastLogin') {
      orderBy.lastLoginAt = sortOrder
    } else if (sortBy === 'status') {
      orderBy.isActive = sortOrder
    } else if (sortBy === 'name' || sortBy === 'email' || sortBy === 'role' || sortBy === 'createdAt') {
      orderBy[sortBy as 'name' | 'email' | 'role' | 'createdAt'] = sortOrder
    } else {
      orderBy.createdAt = sortOrder
    }

    const users = await prisma.user.findMany({
      where,
      orderBy,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
        createdBy: true,
        creator: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    // Transformar datos para el frontend
    const transformedUsers = users.map(user => ({
      id: user.id,
      name: user.name || 'Sin nombre',
      email: user.email,
      role: user.role,
      status: user.isActive ? 'ACTIVE' : 'INACTIVE',
      createdAt: user.createdAt.toISOString().split('T')[0],
      lastLogin: user.lastLoginAt?.toISOString().split('T')[0],
      department: 'Sistema', // Campo por defecto, se puede agregar al schema si es necesario
      phone: null, // Campo por defecto, se puede agregar al schema si es necesario
      createdBy: user.creator?.name || 'Sistema'
    }))

    return NextResponse.json(transformedUsers)
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // En Next.js 13+ App Router, necesitamos pasar el request context
    const session = await getServerSession(authOptions)
    
    console.log('Session data:', session) // Debug logging
    
    if (!session?.user) {
      return NextResponse.json(
        { 
          error: 'No autorizado', 
          message: 'No hay sesión activa. Por favor, inicia sesión nuevamente.' 
        }, 
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, email, role, password, isActive } = body

    console.log('Request body:', { name, email, role }) // Debug logging

    // Verificar que el usuario de la sesión existe en la base de datos
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    console.log('Current user:', currentUser) // Debug logging

    // Verificar que el usuario actual tenga permisos para crear usuarios
    if (!currentUser) {
      return NextResponse.json(
        { error: 'No autorizado', message: 'Usuario no encontrado en la base de datos' },
        { status: 403 }
      )
    }

    if (!currentUser.isActive) {
      return NextResponse.json(
        { error: 'No autorizado', message: 'Tu cuenta no está activa' },
        { status: 403 }
      )
    }

    // Verificar que el usuario tenga permiso para crear usuarios
    const hasPermission = canPerformAction(currentUser.role as UserRole, 'users', 'create')
    console.log('Permission check:', {
      userRole: currentUser.role,
      hasPermission,
      userId: currentUser.id,
      userEmail: currentUser.email
    })
    
    if (!hasPermission) {
      return NextResponse.json(
        { 
          error: 'No autorizado', 
          message: `No tienes permisos para crear usuarios. Tu rol actual es: ${currentUser.role}. Solo los administradores pueden crear usuarios.` 
        },
        { status: 403 }
      )
    }

    // Validar rol si se proporciona
    if (role && !Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { error: 'Rol inválido', message: 'El rol especificado no es válido' },
        { status: 400 }
      )
    }

    // Verificar que el usuario actual sea ADMINISTRATOR para crear otros ADMINISTRATORes
    if (role === UserRole.ADMINISTRATOR && currentUser.role !== UserRole.ADMINISTRATOR) {
      return NextResponse.json(
        { 
          error: 'No autorizado',
          message: 'Solo los administradores pueden crear otros administradores'
        },
        { status: 403 }
      )
    }

    // Validar que el email no esté vacío
    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'El email es requerido', message: 'El email es requerido' },
        { status: 400 }
      )
    }

    // Normalizar email (minúsculas y trim)
    const normalizedEmail = email.toLowerCase().trim()

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    })

    if (existingUser) {
      return NextResponse.json(
        { 
          error: 'El email ya está registrado',
          message: `Ya existe un usuario con el email ${normalizedEmail}. Por favor, usa un email diferente.`
        },
        { status: 409 }
      )
    }

    // TEMPORAL: Si no se encuentra el usuario de sesión, usar un usuario por defecto
    let creatorId = null
    if (currentUser) {
      creatorId = currentUser.id
    } else {
      console.log('⚠️ Usuario de sesión no encontrado, usando usuario por defecto')
      // Buscar cualquier ADMINISTRATOR como fallback
      const fallbackUser = await prisma.user.findFirst({
        where: { role: 'ADMINISTRATOR' }
      })
      if (fallbackUser) {
        creatorId = fallbackUser.id
        console.log('✅ Usando ADMINISTRATOR por defecto:', fallbackUser.email)
      }
    }

    // Validar que la contraseña esté presente
    if (!password || !password.trim()) {
      return NextResponse.json(
        { error: 'La contraseña es requerida', message: 'La contraseña es requerida' },
        { status: 400 }
      )
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Crear nuevo usuario
    const newUser = await prisma.user.create({
      data: {
        name: name || null,
        email: normalizedEmail,
        role: role || UserRole.MANAGER,
        password: hashedPassword,
        createdBy: creatorId,
        isActive: isActive !== undefined ? isActive : true,
        mustChangePassword: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        createdBy: true
      }
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error('Error al crear usuario:', error)
    
    // Manejar errores específicos de Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // Error de unique constraint (email duplicado)
        return NextResponse.json(
          { 
            error: 'Email duplicado',
            message: 'Ya existe un usuario con este email. Por favor, usa un email diferente.'
          },
          { status: 409 }
        )
      }
    }
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: 'Ocurrió un error al crear el usuario. Por favor, intenta nuevamente.'
      },
      { status: 500 }
    )
  }
}