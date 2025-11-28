import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma, TransparencyCategory } from '@prisma/client';

// GET - Obtener documentos de transparencia públicos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const search = searchParams.get('search');
    const year = searchParams.get('year') ? parseInt(searchParams.get('year')!) : undefined;
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';

    const where: Prisma.TransparencyDocumentWhereInput = {
      isActive: true, // Solo documentos activos para usuarios públicos
    };

    if (category) {
      where.category = category as TransparencyCategory;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (year) {
      // Filtrar por año usando createdAt
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);
      where.createdAt = {
        gte: startOfYear,
        lte: endOfYear,
      };
    }

    // Agregar búsqueda por título y descripción
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } },
        { fileName: { contains: search, mode: 'insensitive' as const } },
      ];
    }

    // Configurar ordenamiento
    const orderBy: Prisma.TransparencyDocumentOrderByWithRelationInput = {};
    if (sortBy === 'title') {
      orderBy.title = sortOrder;
    } else if (sortBy === 'year') {
      // Ordenar por año usando createdAt
      orderBy.createdAt = sortOrder;
    } else if (sortBy === 'category') {
      orderBy.category = sortOrder;
    } else {
      orderBy.createdAt = sortOrder;
    }

    const documents = await prisma.transparencyDocument.findMany({
      where,
      include: {
        creator: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy,
      take: limit,
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching public transparency documents:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
