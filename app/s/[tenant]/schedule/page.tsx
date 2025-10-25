import { prisma } from "@/lib/db";
import Layout from "@/components/Layout";
import SchedulePageClient from "@/components/SchedulePageClient";

export default async function SchedulePage({params}:{params:{tenant:string}}) {
  const tenant = await prisma.tenant.findUnique({ where: { slug: params.tenant } });
  if(!tenant) return <div className="p-6">Tenant introuvable.</div>;

  const [sessions, classes, subjects, rooms] = await Promise.all([
    prisma.session.findMany({
      where: { tenantId: tenant.id },
      include: {
        class: true,
        subject: true,
        room: true
      },
      orderBy: [
        { weekday: 'asc' },
        { startsAt: 'asc' }
      ]
    }),
    prisma.class.findMany({
      where: { tenantId: tenant.id },
      select: { id: true, name: true }
    }),
    prisma.subject.findMany({
      where: { tenantId: tenant.id },
      select: { id: true, name: true }
    }),
    prisma.room.findMany({
      where: { tenantId: tenant.id },
      select: { id: true, name: true }
    })
  ]);

  return (
    <Layout tenantName={tenant.name} tenantSlug={tenant.slug}>
      <SchedulePageClient
        initialSessions={sessions}
        classes={classes}
        subjects={subjects}
        rooms={rooms}
        tenantSlug={tenant.slug}
      />
    </Layout>
  );
}
