import { prisma } from "@/lib/db";
import Layout from "@/components/Layout";
import StatsCard from "@/components/StatsCard";
import type { Class, Student, SchoolYear, Subject } from "@prisma/client";

export default async function Dashboard({params}:{params:{tenant:string}}) {
  const tenant = await prisma.tenant.findUnique({ where: { slug: params.tenant } });
  if(!tenant) return <div className="p-6">Tenant introuvable.</div>;

  // Récupérer les statistiques
  const [classes, students, schoolYears, subjects] = await Promise.all([
    prisma.class.findMany({ where: { tenantId: tenant.id } }),
    prisma.student.findMany({ where: { tenantId: tenant.id } }),
    prisma.schoolYear.findMany({ where: { tenantId: tenant.id } }),
    prisma.subject.findMany({ where: { tenantId: tenant.id } })
  ]);

  return (
    <Layout tenantName={tenant.name} tenantSlug={tenant.slug}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-2 text-gray-600">Vue d'ensemble de {tenant.name}</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard 
            title="Classes actives" 
            value={classes.length} 
            icon="🏫" 
            color="blue" 
          />
          <StatsCard 
            title="Étudiants inscrits" 
            value={students.length} 
            icon="👥" 
            color="green" 
          />
          <StatsCard 
            title="Années scolaires" 
            value={schoolYears.length} 
            icon="📅" 
            color="yellow" 
          />
          <StatsCard 
            title="Matières" 
            value={subjects.length} 
            icon="📚" 
            color="red" 
          />
        </div>

        {/* Classes récentes */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Classes ({classes.length})
            </h3>
            {classes.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {classes.map((classe) => (
                  <div key={classe.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <h4 className="font-medium text-gray-900">{classe.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Année: {schoolYears.find(y => y.id === classe.schoolYearId)?.name || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucune classe créée pour le moment.</p>
            )}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Actions rapides
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <a href={`/s/${tenant.slug}/students`} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                <span className="text-2xl mr-3">👥</span>
                <span className="font-medium">Gérer les étudiants</span>
              </a>
              <a href={`/s/${tenant.slug}/classes`} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                <span className="text-2xl mr-3">🏫</span>
                <span className="font-medium">Gérer les classes</span>
              </a>
              <a href={`/s/${tenant.slug}/attendance`} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                <span className="text-2xl mr-3">✅</span>
                <span className="font-medium">Prendre les présences</span>
              </a>
              <a href={`/s/${tenant.slug}/quran`} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                <span className="text-2xl mr-3">📖</span>
                <span className="font-medium">Suivi Coran</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
