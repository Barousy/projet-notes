import { prisma } from "@/lib/db";
import Layout from "@/components/Layout";
import TeachersPageClient from "@/components/TeachersPageClient";

export default async function TeachersPage({params}:{params:{tenant:string}}) {
  const tenant = await prisma.tenant.findUnique({ where: { slug: params.tenant } });
  if(!tenant) return <div className="p-6">Tenant introuvable.</div>;

  const teachers = await prisma.userOnTenant.findMany({
    where: { 
      tenantId: tenant.id,
      role: { in: ["SCHOOL_ADMIN", "STAFF"] }
    },
    include: {
      user: true
    }
  });

  return (
    <Layout tenantName={tenant.name} tenantSlug={tenant.slug}>
      <TeachersPageClient
        initialTeachers={teachers}
        tenantSlug={tenant.slug}
      />
    </Layout>
  );
}
