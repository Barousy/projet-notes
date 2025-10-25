import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function TenantsPage() {
  // Récupérer toutes les entités
  const tenants = await prisma.tenant.findMany({
    include: {
      _count: {
        select: {
          students: true,
          classes: true,
          subjects: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">📚</div>
              <span className="ml-2 text-xl font-semibold text-gray-900">projet-notes</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin/new-tenant" className="text-purple-600 hover:text-purple-700 font-medium">
                + Créer une entité
              </Link>
              <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                Accueil
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                🏢 Entités créées
              </h1>
              <p className="text-lg text-gray-600">
                Liste de toutes les entités actives sur la plateforme
              </p>
            </div>
            <Link
              href="/admin/new-tenant"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              + Nouvelle entité
            </Link>
          </div>

          {/* Liste des entités */}
          {tenants.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tenants.map((tenant) => (
                <div 
                  key={tenant.id} 
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-purple-300 transition-all duration-200 bg-gradient-to-br from-white to-gray-50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {tenant.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Slug: <code className="bg-gray-100 px-2 py-1 rounded">{tenant.slug}</code>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl">🏢</div>
                    </div>
                  </div>

                  {/* Statistiques */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {tenant._count.students}
                      </div>
                      <div className="text-xs text-gray-500">Étudiants</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {tenant._count.classes}
                      </div>
                      <div className="text-xs text-gray-500">Classes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {tenant._count.subjects}
                      </div>
                      <div className="text-xs text-gray-500">Matières</div>
                    </div>
                  </div>

                  {/* Badge démo */}
                  {tenant.slug === 'masjid-noor' && (
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        🎯 Mode Démo
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Link
                      href={`/s/${tenant.slug}/dashboard`}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
                    >
                      Accéder
                    </Link>
                    <Link
                      href={`/s/${tenant.slug}/admin`}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm font-medium"
                    >
                      Admin
                    </Link>
                  </div>

                  {/* Date de création */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Créé le {new Date(tenant.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Aucune entité créée
              </h3>
              <p className="text-gray-500 mb-6">
                Commencez par créer votre première entité
              </p>
              <Link
                href="/admin/new-tenant"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium inline-block"
              >
                Créer la première entité
              </Link>
            </div>
          )}

          {/* Résumé */}
          {tenants.length > 0 && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    📊 Résumé
                  </h3>
                  <p className="text-sm text-gray-600">
                    {tenants.length} entité{tenants.length > 1 ? 's' : ''} active{tenants.length > 1 ? 's' : ''} sur la plateforme
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">
                    {tenants.reduce((acc, t) => acc + t._count.students, 0)}
                  </div>
                  <div className="text-xs text-gray-500">Total étudiants</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
