"use client";

import { useState } from "react";
import AddSessionForm from "./AddSessionForm";

interface Session {
  id: string;
  weekday: number;
  startsAt: string;
  endsAt: string;
  notes: string | null;
  class: {
    id: string;
    name: string;
  };
  subject: {
    id: string;
    name: string;
  };
  room: {
    id: string;
    name: string;
  } | null;
}

interface SchedulePageClientProps {
  initialSessions: Session[];
  classes: Array<{ id: string; name: string }>;
  subjects: Array<{ id: string; name: string }>;
  rooms: Array<{ id: string; name: string }>;
  tenantSlug: string;
}

export default function SchedulePageClient({
  initialSessions,
  classes,
  subjects,
  rooms,
  tenantSlug
}: SchedulePageClientProps) {
  const [sessions, setSessions] = useState(initialSessions);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSuccess = () => {
    setShowAddForm(false);
    // Recharger la page pour avoir les données à jour
    window.location.reload();
  };

  const weekdays = [
    "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"
  ];

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
  ];

  // Organiser les sessions par jour de la semaine
  const sessionsByDay = sessions.reduce((acc, session) => {
    if (!acc[session.weekday]) {
      acc[session.weekday] = [];
    }
    acc[session.weekday].push(session);
    return acc;
  }, {} as Record<number, Session[]>);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Emploi du temps</h1>
            <p className="mt-2 text-gray-600">Gérez les horaires et les sessions</p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Ajouter une session
          </button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-lg">📅</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Sessions totales</dt>
                    <dd className="text-lg font-medium text-gray-900">{sessions.length}</dd>
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
                    <span className="text-white text-lg">🏫</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Classes actives</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {new Set(sessions.map(s => s.class.id)).size}
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
                    <span className="text-white text-lg">📚</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Matières enseignées</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {new Set(sessions.map(s => s.subject.id)).size}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emploi du temps */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Planning hebdomadaire
            </h3>
            
            {sessions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                        Heure
                      </th>
                      {weekdays.map((day, index) => (
                        <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {timeSlots.map((time) => (
                      <tr key={time}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {time}
                        </td>
                        {weekdays.map((_, dayIndex) => {
                          const daySessions = sessionsByDay[dayIndex] || [];
                          const sessionAtTime = daySessions.find(s => s.startsAt === time);
                          
                          return (
                            <td key={dayIndex} className="px-6 py-4 whitespace-nowrap">
                              {sessionAtTime ? (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                  <div className="text-sm font-medium text-blue-900">
                                    {sessionAtTime.class.name}
                                  </div>
                                  <div className="text-xs text-blue-700">
                                    {sessionAtTime.subject.name}
                                  </div>
                                  {sessionAtTime.room && (
                                    <div className="text-xs text-blue-600">
                                      Salle: {sessionAtTime.room.name}
                                    </div>
                                  )}
                                  <div className="text-xs text-blue-600">
                                    {sessionAtTime.startsAt} - {sessionAtTime.endsAt}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-gray-300 text-sm">-</div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune session programmée</h3>
                <p className="text-gray-500 mb-4">Créez votre premier emploi du temps.</p>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Créer la première session
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Liste des sessions */}
        {sessions.length > 0 && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Toutes les sessions ({sessions.length})
              </h3>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sessions.map((session) => (
                  <div key={session.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">
                        {session.class.name}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {weekdays[session.weekday]}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">📚</span>
                        <span>{session.subject.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">🕐</span>
                        <span>{session.startsAt} - {session.endsAt}</span>
                      </div>
                      {session.room && (
                        <div className="flex items-center">
                          <span className="font-medium mr-2">🏠</span>
                          <span>{session.room.name}</span>
                        </div>
                      )}
                    </div>
                    
                    {session.notes && (
                      <div className="mt-2 text-xs text-gray-500">
                        Note: {session.notes}
                      </div>
                    )}
                    
                    <div className="mt-3 flex space-x-2">
                      <button className="flex-1 bg-blue-50 text-blue-700 px-3 py-1 rounded text-xs hover:bg-blue-100">
                        Modifier
                      </button>
                      <button className="flex-1 bg-red-50 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-100">
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showAddForm && (
        <AddSessionForm
          tenantSlug={tenantSlug}
          classes={classes}
          subjects={subjects}
          rooms={rooms}
          onSuccess={handleAddSuccess}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );
}
