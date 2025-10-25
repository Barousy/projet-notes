import { prisma } from "@/lib/db";
import Layout from "@/components/Layout";
import StudentsPageClient from "@/components/StudentsPageClient";
import type { Student, Class } from "@prisma/client";

export default async function StudentsPage({params}:{params:{tenant:string}}) {
  const tenant = await prisma.tenant.findUnique({ where: { slug: params.tenant } });
  if(!tenant) return <div className="p-6">Tenant introuvable.</div>;

  const students = await prisma.student.findMany({
    where: { tenantId: tenant.id },
    include: {
      user: true,
      guardians: {
        include: {
          guardian: {
            include: {
              user: true
            }
          }
        }
      },
      enrollments: {
        include: {
          class: true
        }
      }
    }
  });

  return (
    <Layout tenantName={tenant.name} tenantSlug={tenant.slug}>
      <StudentsPageClient
        initialStudents={students}
        tenantSlug={tenant.slug}
      />
    </Layout>
  );
}
