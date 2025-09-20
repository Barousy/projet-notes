import { prisma } from "@/lib/db";
import Layout from "@/components/Layout";

export default async function AttendancePage({params}:{params:{tenant:string}}) {
  const tenant = await prisma.tenant.findUnique({ where: { slug: params.tenant } });
  if(!tenant) return <div className="p-6">Tenant introuvable.</div>;

  return (
    <Layout tenantName={tenant.name} tenantSlug={tenant.slug}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">✅ Gestion des présences</h1>
            <p className="mt-2 text-gray-600">Prenez et gérez les présences des étudiants</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            + Prendre les présences
          </button>
        </div>

        {/* Placeholder content */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Système de présences</h3>
              <p className="text-gray-500 mb-4">
                Cette fonctionnalité sera bientôt disponible pour gérer les présences des étudiants.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                <h4 className="font-medium text-blue-900 mb-2">Fonctionnalités prévues:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Prise de présence par classe et séance</li>
                  <li>• Statuts: Présent, Absent, Excusé, En retard</li>
                  <li>• Justificatifs d'absence</li>
                  <li>• Rapports de présence</li>
                  <li>• Notifications aux parents</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
