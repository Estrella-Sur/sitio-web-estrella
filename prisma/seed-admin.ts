import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Creando usuario superadmin...\n');

  try {
    // ==========================================
    // LIMPIAR BASE DE DATOS
    // ==========================================
    console.log('🧹 Limpiando base de datos...');
    
    // Eliminar en orden para respetar foreign keys
    await prisma.donation.deleteMany();
    await prisma.donationProject.deleteMany();
    await prisma.annualGoal.deleteMany();
    await prisma.galleryImage.deleteMany();
    await prisma.album.deleteMany();
    await prisma.imageLibrary.deleteMany();
    await prisma.convocatoriaApplication.deleteMany();
    await prisma.convocatoria.deleteMany();
    await prisma.volunteerApplication.deleteMany();
    await prisma.complaint.deleteMany();
    await prisma.contactMessage.deleteMany();
    await prisma.news.deleteMany();
    await prisma.event.deleteMany();
    await prisma.videoTestimonial.deleteMany();
    await prisma.resource.deleteMany();
    await prisma.transparencyDocument.deleteMany();
    await prisma.project.deleteMany();
    await prisma.methodology.deleteMany();
    await prisma.story.deleteMany();
    await prisma.ally.deleteMany();
    await prisma.program.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    console.log('✅ Base de datos limpiada\n');

    // ==========================================
    // CREAR USUARIO SUPERADMIN
    // ==========================================
    console.log('👤 Creando usuario superadmin...');

    // Crear contraseña hasheada
    const password = await bcrypt.hash('Admin123!', 12);

    // Crear usuario superadmin
    const admin = await prisma.user.create({
      data: {
        email: 'admin@estrellasur.org',
        name: 'Super Admin',
        password: password,
        role: 'ADMINISTRATOR',
        isActive: true,
        mustChangePassword: false,
        emailVerified: new Date(),
      },
    });

    console.log('✅ Usuario superadmin creado exitosamente!\n');
    console.log('📧 Email: admin@estrellasur.org');
    console.log('🔑 Contraseña: Admin123!');
    console.log(`🆔 ID: ${admin.id}\n`);

  } catch (error) {
    console.error('❌ Error al crear usuario superadmin:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

