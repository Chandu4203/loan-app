const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('Password123!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const applicantPassword = await bcrypt.hash('Password123!', 10);
  const applicant = await prisma.user.upsert({
    where: { email: 'applicant@example.com' },
    update: {},
    create: {
      name: 'Demo Applicant',
      email: 'applicant@example.com',
      password: applicantPassword,
      role: 'APPLICANT',
    },
  });

  await prisma.loan.createMany({
    data: [
      { userId: applicant.id, amount: 5000, purpose: 'Tuition fees', termMonths: 12, status: 'PENDING' },
      { userId: applicant.id, amount: 2500, purpose: 'Books and supplies', termMonths: 6, status: 'APPROVED' },
    ],
    skipDuplicates: true,
  });

  console.log('Seed complete. Demo accounts:');
  console.log('  admin@example.com    / Password123!  (ADMIN)');
  console.log('  applicant@example.com / Password123! (APPLICANT)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
