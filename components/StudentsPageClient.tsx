"use client";

import { useState } from "react";
import AddStudentForm from "./AddStudentForm";
import type { Student } from "@prisma/client";

interface StudentsPageClientProps {
  initialStudents: Student[];
  tenantSlug: string;
}

export default function StudentsPageClient({
  initialStudents,
  tenantSlug
}: StudentsPageClientProps) {
  const [students, setStudents] = useState(initialStudents);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSuccess = () => {
    setShowAddForm(false);
    // Recharger la page pour avoir les données à jour
    window.location.reload();
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des étudiants</h1>
            <p className="mt-2 text-gray-600">Inscrivez et gérez vos étudiants</p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Inscrire un étudiant
          </button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-lg">👥</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total étudiants</dt>
                    <dd className="text-lg font-medium text-gray-900">{students.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-lg">✅</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Avec tuteurs</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {students.filter(s => s.guardians && s.guardians.length > 0).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-lg">🏫</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Inscrits en classe</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {students.filter(s => s.enrollments && s.enrollments.length > 0).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des étudiants */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Étudiants inscrits ({students.length})
            </h3>
            
            {students.length > 0 ? (
              <div className="overflow-x-auto">
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
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tuteur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Classes
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
                                <span className="text-sm font-medium text-blue-600">
                                  {student.user?.name?.charAt(0) || student.matricule.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {student.user?.name || "Nom non défini"}
                              </div>
                              <div className="text-sm text-gray-500">
                                {student.gender === 'M' ? 'Masculin' : student.gender === 'F' ? 'Féminin' : 'Non défini'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.matricule}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.user?.email || "N/A"}</div>
                          <div className="text-sm text-gray-500">{student.user?.phone || "N/A"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.guardians && student.guardians.length > 0 ? (
                            <div>
                              <div className="text-sm text-gray-900">
                                {student.guardians[0].guardian.user?.name || "N/A"}
                              </div>
                              <div className="text-sm text-gray-500">
                                {student.guardians[0].relation || "Tuteur"}
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">Aucun tuteur</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.enrollments && student.enrollments.length > 0 ? (
                            <div className="text-sm text-gray-900">
                              {student.enrollments.map(enrollment => enrollment.class.name).join(", ")}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">Non inscrit</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              Voir
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900">
                              Modifier
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun étudiant inscrit</h3>
                <p className="text-gray-500 mb-4">Inscrivez votre premier étudiant pour commencer.</p>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Inscrire le premier étudiant
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddForm && (
        <AddStudentForm
          tenantSlug={tenantSlug}
          onSuccess={handleAddSuccess}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );
}
