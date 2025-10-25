"use client";

import { useState } from "react";
import AddTeacherForm from "./AddTeacherForm";

interface Teacher {
  id: string;
  role: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
  };
}

interface TeachersPageClientProps {
  initialTeachers: Teacher[];
  tenantSlug: string;
}

export default function TeachersPageClient({
  initialTeachers,
  tenantSlug
}: TeachersPageClientProps) {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSuccess = () => {
    setShowAddForm(false);
    // Recharger la page pour avoir les données à jour
    window.location.reload();
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "SCHOOL_ADMIN":
        return "Administrateur";
      case "STAFF":
        return "Professeur/Staff";
      default:
        return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "SCHOOL_ADMIN":
        return "bg-red-100 text-red-800";
      case "STAFF":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des professeurs</h1>
            <p className="mt-2 text-gray-600">Gérez les professeurs et le personnel</p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Ajouter un professeur
          </button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-lg">👨‍🏫</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total professeurs</dt>
                    <dd className="text-lg font-medium text-gray-900">{teachers.length}</dd>
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
                    <span className="text-white text-lg">👨‍💼</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Administrateurs</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {teachers.filter(t => t.role === "SCHOOL_ADMIN").length}
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
                    <span className="text-white text-lg">👩‍🏫</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Staff/Professeurs</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {teachers.filter(t => t.role === "STAFF").length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des professeurs */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Professeurs et personnel ({teachers.length})
            </h3>
            
            {teachers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Professeur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rôle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">
                                  {teacher.user.name?.charAt(0) || teacher.user.email.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {teacher.user.name || "Nom non défini"}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {teacher.user.id.slice(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{teacher.user.email}</div>
                          <div className="text-sm text-gray-500">{teacher.user.phone || "N/A"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(teacher.role)}`}>
                            {getRoleLabel(teacher.role)}
                          </span>
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
                <div className="text-6xl mb-4">👨‍🏫</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun professeur</h3>
                <p className="text-gray-500 mb-4">Ajoutez des professeurs et du personnel à votre établissement.</p>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Ajouter le premier professeur
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddForm && (
        <AddTeacherForm
          tenantSlug={tenantSlug}
          onSuccess={handleAddSuccess}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );
}
