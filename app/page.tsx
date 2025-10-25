import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Page() {
  // Récupérer toutes les entités
  const tenants = await prisma.tenant.findMany({
    include: {
      _count: {
        select: {
          students: true,
          classes: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 6 // Limiter à 6 entités récentes
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
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Connexion
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Plateforme de gestion
            <span className="text-blue-600 block">multi-tenant</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Une solution complète pour gérer vos établissements éducatifs, mosquées et centres d'apprentissage. 
            Gérez étudiants, classes, présences, notes et progression Coranique.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="/s/masjid-noor/dashboard" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
            >
              🎯 Voir la démo interactive
            </a>
            <a 
              href="#features" 
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium text-center"
            >
              Découvrir les fonctionnalités
            </a>
            <a 
              href="#entities" 
              className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium text-center"
            >
              🏢 Accéder aux entités
            </a>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Gestion des étudiants</h3>
            <p className="text-gray-600">Inscrivez et gérez vos étudiants avec leurs informations personnelles et leurs tuteurs.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🏫</div>
            <h3 className="text-xl font-semibold mb-2">Organisation des classes</h3>
            <p className="text-gray-600">Créez et organisez vos classes par année scolaire avec les matières correspondantes.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">Suivi des présences</h3>
            <p className="text-gray-600">Prenez les présences facilement et gérez les absences avec justificatifs.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Système de notation</h3>
            <p className="text-gray-600">Saisissez les notes et générez automatiquement les bulletins de vos étudiants.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📖</div>
            <h3 className="text-xl font-semibold mb-2">Progression Coranique</h3>
            <p className="text-gray-600">Suivez l'apprentissage du Coran avec les sourates et versets étudiés.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold mb-2">Multi-tenant</h3>
            <p className="text-gray-600">Une seule plateforme pour gérer plusieurs établissements de manière isolée.</p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🎯 Démo disponible</h2>
            <p className="text-gray-600 mb-6">
              Testez immédiatement la plateforme avec des données réalistes et une interface complète
            </p>
            <a 
              href="/s/masjid-noor/dashboard" 
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              🚀 Accéder à la démo interactive
            </a>
          </div>
        </div>

        {/* Entités créées */}
        {tenants.length > 0 && (
          <div id="entities" className="mt-16 bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">🏢 Entités actives</h2>
                <p className="text-gray-600">
                  Accédez directement aux entités créées sur la plateforme
                </p>
              </div>
              <Link
                href="/admin/tenants"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Voir toutes →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tenants.map((tenant) => (
                <Link
                  key={tenant.id}
                  href={`/s/${tenant.slug}/dashboard`}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-purple-300 transition-all duration-200 bg-gradient-to-br from-white to-gray-50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {tenant.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {tenant.slug}
                      </p>
                    </div>
                    <div className="text-2xl">🏢</div>
                  </div>

                  {/* Statistiques */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center bg-blue-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-600">
                        {tenant._count.students}
                      </div>
                      <div className="text-xs text-gray-600">Étudiants</div>
                    </div>
                    <div className="text-center bg-green-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-600">
                        {tenant._count.classes}
                      </div>
                      <div className="text-xs text-gray-600">Classes</div>
                    </div>
                  </div>

                  {/* Badge démo */}
                  {tenant.slug === 'masjid-noor' && (
                    <div className="mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        🎯 Mode Démo
                      </span>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-purple-100 transition-colors">
                    Accéder →
                  </div>
                </Link>
              ))}
            </div>

            {tenants.length >= 6 && (
              <div className="mt-6 text-center">
                <Link
                  href="/admin/tenants"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Voir toutes les entités ({tenants.length}+) →
                </Link>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 projet-notes - Plateforme de gestion éducative multi-tenant</p>
            <p className="mt-2 text-sm">Développé avec Next.js 14, Prisma, PostgreSQL et TailwindCSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
