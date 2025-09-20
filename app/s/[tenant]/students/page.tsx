import { prisma } from "@/lib/db";
import Layout from "@/components/Layout";
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des étudiants</h1>
            <p className="mt-2 text-gray-600">Gérez les étudiants et leurs inscriptions</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Ajouter un étudiant
          </button>
        </div>

        {/* Liste des étudiants */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Étudiants ({students.length})
            </h3>
            
            {students.length > 0 ? (
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Étudiant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Matricule
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Classe
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tuteurs
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 font-medium text-sm">
                                  {student.user?.name?.charAt(0) || student.matricule.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {student.user?.name || "Nom non défini"}
                              </div>
                              <div className="text-sm text-gray-500">
                                {student.user?.email || "Email non défini"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.matricule}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.enrollments.length > 0 ? (
                            <div className="space-y-1">
                              {student.enrollments.map((enrollment) => (
                                <span key={enrollment.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {enrollment.class.name}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">Non inscrit</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.guardians.length > 0 ? (
                            <div className="space-y-1">
                              {student.guardians.map((guardian) => (
                                <div key={guardian.id} className="text-xs">
                                  {guardian.guardian.user?.name || "Tuteur"}
                                  {guardian.relation && (
                                    <span className="text-gray-500 ml-1">({guardian.relation})</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">Aucun tuteur</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            Modifier
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun étudiant</h3>
                <p className="text-gray-500 mb-4">Commencez par ajouter des étudiants à votre établissement.</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Ajouter le premier étudiant
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
