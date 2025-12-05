import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * Genera una contraseña segura aleatoria
 * Incluye: mayúsculas, minúsculas, números y símbolos
 * Longitud: 16 caracteres
 */
function generateSecurePassword(): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const allChars = uppercase + lowercase + numbers + symbols;
  
  // Asegurar que tenga al menos un carácter de cada tipo
  let password = '';
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Completar con caracteres aleatorios
  for (let i = password.length; i < 16; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Mezclar los caracteres para mayor seguridad
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

async function main() {
  console.log('🌱 Creando usuario administrador...\n');

  try {
    // Generar contraseña segura
    const securePassword = generateSecurePassword();
    
    // Verificar si ya existe un admin con este email
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@estrellasur.org' }
    });

    if (existingAdmin) {
      console.log('⚠️  Ya existe un usuario con el email admin@estrellasur.org');
      console.log('   Si deseas actualizar la contraseña, elimina el usuario primero.\n');
      return;
    }

    // Crear contraseña hasheada
    const hashedPassword = await bcrypt.hash(securePassword, 12);

    // Crear usuario administrador
    const admin = await prisma.user.create({
      data: {
        email: 'admin@estrellasur.org',
        name: 'Super Admin',
        password: hashedPassword,
        role: 'ADMINISTRATOR',
        isActive: true,
        mustChangePassword: false,
        emailVerified: new Date(),
      },
    });

    console.log('✅ Usuario administrador creado exitosamente!\n');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📧 Email: admin@estrellasur.org');
    console.log('🔑 Contraseña: ' + securePassword);
    console.log('🆔 ID: ' + admin.id);
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('⚠️  IMPORTANTE: Guarda esta contraseña de forma segura.');
    console.log('   No se mostrará nuevamente.\n');

  } catch (error) {
    console.error('❌ Error al crear usuario administrador:', error);
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

