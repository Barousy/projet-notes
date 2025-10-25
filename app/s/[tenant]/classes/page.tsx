import { prisma } from "@/lib/db";
import Layout from "@/components/Layout";
import ClassesPageClient from "@/components/ClassesPageClient";
import type { Class, SchoolYear, Subject, Room } from "@prisma/client";

export default async function ClassesPage({params}:{params:{tenant:string}}) {
  const tenant = await prisma.tenant.findUnique({ where: { slug: params.tenant } });
  if(!tenant) return <div className="p-6">Tenant introuvable.</div>;

  const [classes, schoolYears, subjects, rooms] = await Promise.all([
    prisma.class.findMany({
      where: { tenantId: tenant.id },
      include: {
        schoolYear: true,
        room: true,
        enrollments: {
          include: {
            student: {
              include: {
                user: true
              }
            }
          }
        }
      }
    }),
    prisma.schoolYear.findMany({ where: { tenantId: tenant.id } }),
    prisma.subject.findMany({ 
      where: { tenantId: tenant.id },
      include: { schoolYear: true }
    }),
    prisma.room.findMany({ where: { tenantId: tenant.id } })
  ]);

  return (
    <Layout tenantName={tenant.name} tenantSlug={tenant.slug}>
      <ClassesPageClient
        initialClasses={classes}
        schoolYears={schoolYears}
        subjects={subjects}
        rooms={rooms}
        tenantSlug={tenant.slug}
      />
    </Layout>
  );
}
