import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const tenant = await prisma.tenant.upsert({ where: { slug: "masjid-noor" }, update: {}, create: { slug: "masjid-noor", name: "Masjid An-Noor" } });
  const admin = await prisma.user.upsert({ where: { email: "admin@demo.local" }, update: {}, create: { email: "admin@demo.local", name: "Admin Demo" } });
  await prisma.userOnTenant.upsert({ where: { userId_tenantId: { userId: admin.id, tenantId: tenant.id } }, update: { role: Role.SUPER_ADMIN }, create: { userId: admin.id, tenantId: tenant.id, role: Role.SUPER_ADMIN } });
  const year = await prisma.schoolYear.create({ data: { tenantId: tenant.id, name: "2025-2026", startDate: new Date("2025-09-01"), endDate: new Date("2026-07-01") } });
  await prisma.class.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Groupe Qur'an A" } });
  await prisma.subject.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Qur'an", category: "quran", coefficient: 2 } });
  console.log("Seed OK for tenant masjid-noor");
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(async()=>prisma.$disconnect());
