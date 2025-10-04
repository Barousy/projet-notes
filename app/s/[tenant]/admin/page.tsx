import { prisma } from "@/lib/db";
import Layout from "@/components/Layout";
import Link from "next/link";

export default async function AdminPage({params}:{params:{tenant:string}}) {
  const tenant = await prisma.tenant.findUnique({ where: { slug: params.tenant } });
  if(!tenant) return <div className="p-6">Tenant introuvable.</div>;

  // Statistiques générales
  const [studentsCount, classesCount, subjectsCount, roomsCount] = await Promise.all([
    prisma.student.count({ where: { tenantId: tenant.id } }),
    prisma.class.count({ where: { tenantId: tenant.id } }),
    prisma.subject.count({ where: { tenantId: tenant.id } }),
    prisma.room.count({ where: { tenantId: tenant.id } })
  ]);

  return (
    <Layout tenantName={tenant.name} tenantSlug={tenant.slug}>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Administration</h1>
              <p className="mt-2 text-purple-100">Gérez le contenu de {tenant.name}</p>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{studentsCount + classesCount}</div>
                <div className="text-sm text-purple-100">Éléments créés</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">👥</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Étudiants</dt>
                    <dd className="text-2xl font-bold text-gray-900">{studentsCount}</dd>
                    <dd className="text-xs text-green-600">Inscrits</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🏫</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Classes</dt>
                    <dd className="text-2xl font-bold text-gray-900">{classesCount}</dd>
                    <dd className="text-xs text-green-600">Actives</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📚</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Matières</dt>
                    <dd className="text-2xl font-bold text-gray-900">{subjectsCount}</dd>
                    <dd className="text-xs text-green-600">Enseignées</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🏢</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Salles</dt>
                    <dd className="text-2xl font-bold text-gray-900">{roomsCount}</dd>
                    <dd className="text-xs text-green-600">Disponibles</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions de gestion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gestion des étudiants */}
          <div className="bg-white shadow-lg rounded-lg">
            <div className="px-6 py-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                👥 Gestion des étudiants
              </h3>
              <div className="space-y-4">
                <Link
                  href={`/s/${params.tenant}/students`}
                  className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-blue-50 to-blue-100"
                >
                  <span className="text-3xl mr-4">👥</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Voir tous les étudiants</div>
                    <div className="text-sm text-gray-600">{studentsCount} étudiants inscrits</div>
                  </div>
                  <span className="text-blue-600">→</span>
                </Link>

                <button className="w-full flex items-center p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-green-50 to-green-100">
                  <span className="text-3xl mr-4">➕</span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Ajouter un étudiant</div>
                    <div className="text-sm text-gray-600">Nouvelle inscription</div>
                  </div>
                  <span className="text-green-600">→</span>
                </button>

                <button className="w-full flex items-center p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-purple-50 to-purple-100">
                  <span className="text-3xl mr-4">👨‍👩‍👧‍👦</span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Gérer les tuteurs</div>
                    <div className="text-sm text-gray-600">Parents et responsables</div>
                  </div>
                  <span className="text-purple-600">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Gestion des classes */}
          <div className="bg-white shadow-lg rounded-lg">
            <div className="px-6 py-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                🏫 Gestion des classes
              </h3>
              <div className="space-y-4">
                <Link
                  href={`/s/${params.tenant}/classes`}
                  className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-green-50 to-green-100"
                >
                  <span className="text-3xl mr-4">🏫</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Voir toutes les classes</div>
                    <div className="text-sm text-gray-600">{classesCount} classes actives</div>
                  </div>
                  <span className="text-green-600">→</span>
                </Link>

                <button className="w-full flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-blue-50 to-blue-100">
                  <span className="text-3xl mr-4">➕</span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Créer une classe</div>
                    <div className="text-sm text-gray-600">Nouvelle classe</div>
                  </div>
                  <span className="text-blue-600">→</span>
                </button>

                <button className="w-full flex items-center p-4 border border-gray-200 rounded-xl hover:border-yellow-300 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-yellow-50 to-yellow-100">
                  <span className="text-3xl mr-4">📚</span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Gérer les matières</div>
                    <div className="text-sm text-gray-600">{subjectsCount} matières</div>
                  </div>
                  <span className="text-yellow-600">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mode démo */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-3xl mr-4">🎯</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Mode Démo</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Conservez votre mode démo pour les présentations clients
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/s/${params.tenant}/demo`}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
              >
                Voir la démo
              </Link>
              <Link
                href={`/s/${params.tenant}/dashboard`}
                className="bg-white text-amber-600 border border-amber-600 px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors"
              >
                Dashboard réel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
