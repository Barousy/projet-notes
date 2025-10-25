"use client";

import { useState } from "react";
import AddClassForm from "./AddClassForm";
import type { Class, SchoolYear, Subject, Room } from "@prisma/client";

interface ClassWithEnrollments extends Class {
  enrollments?: Array<{
    id: string;
    student: {
      id: string;
      user: {
        name: string | null;
      } | null;
      matricule: string;
    };
  }>;
  schoolYear?: {
    name: string;
  };
  room?: {
    name: string;
  } | null;
}

interface SubjectWithSchoolYear extends Subject {
  schoolYear?: {
    name: string;
  };
}

interface ClassesPageClientProps {
  initialClasses: ClassWithEnrollments[];
  schoolYears: SchoolYear[];
  subjects: SubjectWithSchoolYear[];
  rooms: Room[];
  tenantSlug: string;
}

export default function ClassesPageClient({
  initialClasses,
  schoolYears,
  subjects,
  rooms,
  tenantSlug
}: ClassesPageClientProps) {
  const [classes, setClasses] = useState(initialClasses);
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
            <h1 className="text-3xl font-bold text-gray-900">Gestion des classes</h1>
            <p className="mt-2 text-gray-600">Organisez les classes et matières</p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Créer une classe
          </button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-lg">🏫</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Classes</dt>
                    <dd className="text-lg font-medium text-gray-900">{classes.length}</dd>
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
                    <span className="text-white text-lg">📚</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Matières</dt>
                    <dd className="text-lg font-medium text-gray-900">{subjects.length}</dd>
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
                    <span className="text-white text-lg">🏠</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Salles</dt>
                    <dd className="text-lg font-medium text-gray-900">{rooms.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des classes */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Classes ({classes.length})
            </h3>
            
            {classes.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {classes.map((classe) => (
                  <div key={classe.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-900">{classe.name}</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {classe.enrollments?.length || 0} étudiants
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Année:</span>
                        {classe.schoolYear?.name || "Non définie"}
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Salle:</span>
                        {classe.room?.name || "Non assignée"}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Étudiants inscrits:</h5>
                      {classe.enrollments && classe.enrollments.length > 0 ? (
                        <div className="space-y-1">
                          {classe.enrollments.slice(0, 3).map((enrollment) => (
                            <div key={enrollment.id} className="text-xs text-gray-600">
                              • {enrollment.student.user?.name || enrollment.student.matricule}
                            </div>
                          ))}
                          {classe.enrollments.length > 3 && (
                            <div className="text-xs text-gray-500">
                              ... et {classe.enrollments.length - 3} autres
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400">Aucun étudiant inscrit</div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-md text-sm hover:bg-blue-100">
                        Voir détails
                      </button>
                      <button className="flex-1 bg-gray-50 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-100">
                        Modifier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏫</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune classe</h3>
                <p className="text-gray-500 mb-4">Créez votre première classe pour commencer.</p>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Créer la première classe
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Matières disponibles */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Matières disponibles ({subjects.length})
            </h3>
            
            {subjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {subjects.map((subject) => (
                  <div key={subject.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{subject.name}</div>
                      <div className="text-sm text-gray-500">
                        {subject.category && (
                          <span className="capitalize">{subject.category}</span>
                        )}
                        {subject.category && subject.coefficient > 1 && " • "}
                        {subject.coefficient > 1 && `Coeff. ${subject.coefficient}`}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {subject.schoolYear?.name || "Non définie"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucune matière définie.</p>
            )}
          </div>
        </div>
      </div>

      {showAddForm && (
        <AddClassForm
          tenantSlug={tenantSlug}
          schoolYears={schoolYears}
          rooms={rooms}
          onSuccess={handleAddSuccess}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );
}
