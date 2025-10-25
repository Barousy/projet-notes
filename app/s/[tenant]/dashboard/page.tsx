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

  // Utiliser les vraies données ou afficher un état vide
  const activeStudents = students.length;
  const totalClasses = classes.length;
  
  // Utiliser les données réelles s'il y en a, sinon données vides
  const hasData = classes.length > 0 || students.length > 0;

  return (
    <Layout tenantName={tenant.name} tenantSlug={tenant.slug}>
      <div className="space-y-6">
        {/* Header avec bannière démo */}
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Tableau de bord - Mode Démo</h1>
                <p className="mt-2 text-blue-100">Centre d'enseignement islamique moderne</p>
                <p className="text-sm text-blue-200 mt-1">Données de démonstration interactives</p>
              </div>
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">{activeStudents}</div>
                  <div className="text-sm text-blue-100">Étudiants actifs</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bannière d'information démo */}
          <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🎯</div>
              <div>
                <p className="text-sm font-medium text-amber-800">
                  <strong>Mode Démo Interactif :</strong> Explorez toutes les fonctionnalités avec des données réalistes
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Cliquez sur les boutons et liens pour découvrir les capacités complètes du système
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques enrichies */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🏫</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Classes actives</dt>
                    <dd className="text-2xl font-bold text-gray-900">{totalClasses}</dd>
                    <dd className="text-xs text-gray-500">Total</dd>
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
                    <span className="text-white text-xl">👥</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Étudiants inscrits</dt>
                    <dd className="text-2xl font-bold text-gray-900">{activeStudents}</dd>
                    <dd className="text-xs text-gray-500">Total</dd>
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
                    <span className="text-white text-xl">✅</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Taux de présence</dt>
                    <dd className="text-2xl font-bold text-gray-900">-</dd>
                    <dd className="text-xs text-gray-500">À venir</dd>
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
                    <span className="text-white text-xl">📖</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Progression Coran</dt>
                    <dd className="text-2xl font-bold text-gray-900">-</dd>
                    <dd className="text-xs text-gray-500">À venir</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Classes réelles */}
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Classes actives ({totalClasses})
            </h3>
            {classes.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {classes.map((classe) => (
                  <div key={classe.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 bg-gradient-to-br from-white to-gray-50">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{classe.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {schoolYears.find(y => y.id === classe.schoolYearId)?.name || "Année"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex space-x-2">
                        <a 
                          href={`/s/${tenant.slug}/demo/classes`}
                          className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors text-center"
                        >
                          Voir détails
                        </a>
                        <a 
                          href={`/s/${tenant.slug}/demo/attendance`}
                          className="flex-1 bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors text-center"
                        >
                          Présences
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏫</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune classe</h3>
                <p className="text-gray-500 mb-4">Commencez par créer vos premières classes.</p>
                <a 
                  href={`/s/${tenant.slug}/demo/classes`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block"
                >
                  Créer une classe
                </a>
              </div>
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
              <a href={`/s/${tenant.slug}/demo/students`} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                <span className="text-2xl mr-3">👥</span>
                <span className="font-medium">Gérer les étudiants</span>
              </a>
              <a href={`/s/${tenant.slug}/demo/classes`} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                <span className="text-2xl mr-3">🏫</span>
                <span className="font-medium">Gérer les classes</span>
              </a>
              <a href={`/s/${tenant.slug}/demo/classes/resources`} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                <span className="text-2xl mr-3">📅</span>
                <span className="font-medium">Emploi du temps</span>
              </a>
              <a href={`/s/${tenant.slug}/demo/quran`} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
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
