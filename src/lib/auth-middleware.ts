import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { verifyAccessToken } from './security'
import { getUserById } from './auth-service'
import { UserRole, hasEqualOrHigherPrivilege, canPerformAction } from './roles'

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string
    email: string
    name?: string
    role: UserRole
  }
}

/**
 * Middleware para verificar autenticación JWT
 */
interface AuthUser {
  id: string
  email: string
  name?: string
  role: UserRole
}

export async function verifyAuth(request: NextRequest): Promise<{
  isAuthenticated: boolean
  user?: AuthUser
  error?: string
}> {
  try {
    // Primero intentar con NextAuth session (cookies)
    const session = await getServerSession(authOptions)
    
    if (session?.user) {
      // Obtener información actualizada del usuario desde la base de datos
      const user = await getUserById(session.user.id)
      
      if (user && user.isActive) {
        return {
          isAuthenticated: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name || undefined,
            role: user.role as UserRole
          }
        }
      }
    }
    
    // Si no hay sesión de NextAuth, intentar con token Bearer
    const authHeader = request.headers.get('authorization')
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7) // Remover 'Bearer '

      try {
        // Verificar token
        const decoded = verifyAccessToken(token)

        // Obtener información actualizada del usuario
        interface DecodedToken {
          id: string
        }
        const user = await getUserById((decoded as DecodedToken).id)
        
        if (user && user.isActive) {
          return {
            isAuthenticated: true,
            user: {
              id: user.id,
              email: user.email,
              name: user.name || undefined,
              role: user.role as UserRole
            }
          }
        }
      } catch (tokenError) {
        console.error('Error verificando token Bearer:', tokenError)
      }
    }
    
    // Si no hay ninguna forma de autenticación válida
    return {
      isAuthenticated: false,
      error: 'No autorizado. Por favor, inicia sesión.'
    }

  } catch (error) {
    console.error('Error verificando autenticación:', error)
    return {
      isAuthenticated: false,
      error: 'Error al verificar autenticación'
    }
  }
}

/**
 * Middleware para rutas protegidas
 */
export function withAuth(handler: (request: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const authResult = await verifyAuth(request)

    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { 
          message: 'No autorizado',
          error: authResult.error 
        },
        { status: 401 }
      )
    }

    // Agregar usuario a la request
    const authenticatedRequest = request as AuthenticatedRequest
    authenticatedRequest.user = authResult.user

    return handler(authenticatedRequest)
  }
}

/**
 * Middleware para verificar roles específicos
 */
export function withRole(requiredRole: UserRole) {
  return function(handler: (request: AuthenticatedRequest) => Promise<NextResponse>) {
    return withAuth(async (request: AuthenticatedRequest) => {
      if (!request.user) {
        return NextResponse.json(
          { message: 'Usuario no autenticado' },
          { status: 401 }
        )
      }

      if (!hasEqualOrHigherPrivilege(request.user.role, requiredRole)) {
        return NextResponse.json(
          { 
            message: 'Permisos insuficientes',
            error: `Se requiere rol ${requiredRole} o superior`
          },
          { status: 403 }
        )
      }

      return handler(request)
    })
  }
}

/**
 * Middleware para verificar permisos específicos
 */
export function withPermission(resource: string, action: string) {
  return function(handler: (request: AuthenticatedRequest) => Promise<NextResponse>) {
    return withAuth(async (request: AuthenticatedRequest) => {
      if (!request.user) {
        return NextResponse.json(
          { message: 'Usuario no autenticado' },
          { status: 401 }
        )
      }

      if (!canPerformAction(request.user.role, resource, action)) {
        return NextResponse.json(
          { 
            message: 'Permisos insuficientes',
            error: `No tiene permisos para ${action} en ${resource}`
          },
          { status: 403 }
        )
      }

      return handler(request)
    })
  }
}

/**
 * Middleware para verificar múltiples roles (OR)
 */
export function withAnyRole(roles: UserRole[]) {
  return function(handler: (request: AuthenticatedRequest) => Promise<NextResponse>) {
    return withAuth(async (request: AuthenticatedRequest) => {
      if (!request.user) {
        return NextResponse.json(
          { message: 'Usuario no autenticado' },
          { status: 401 }
        )
      }

      if (!roles.includes(request.user.role)) {
        return NextResponse.json(
          { 
            message: 'Permisos insuficientes',
            error: `Se requiere uno de los siguientes roles: ${roles.join(', ')}`
          },
          { status: 403 }
        )
      }

      return handler(request)
    })
  }
}

/**
 * Headers de seguridad
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  }
}

/**
 * Aplicar headers de seguridad a la respuesta
 */
export function applySecurityHeaders(response: NextResponse): NextResponse {
  const securityHeaders = getSecurityHeaders()
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}