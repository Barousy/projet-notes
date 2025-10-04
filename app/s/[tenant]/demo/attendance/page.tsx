import Layout from "@/components/Layout";
import Link from "next/link";

export default function DemoAttendancePage({params}:{params:{tenant:string}}) {
  // Données de démo réalistes pour les présences
  const todayAttendance = [
    {
      id: "1",
      student: "Amina Al-Hassan",
      class: "Groupe Coran Avancés",
      time: "16:00-18:00",
      status: "Présent",
      arrivalTime: "15:58",
      notes: "Arrivée à l'heure"
    },
    {
      id: "2",
      student: "Omar Ben Ali", 
      class: "Groupe Coran Intermédiaires",
      time: "15:00-17:00",
      status: "Présent",
      arrivalTime: "15:02",
      notes: "En retard de 2 min"
    },
    {
      id: "3",
      student: "Fatima Zahra",
      class: "Groupe Arabe",
      time: "14:00-16:00", 
      status: "Absent",
      arrivalTime: null,
      notes: "Absence justifiée - Maladie"
    },
    {
      id: "4",
      student: "Hassan Al-Mahdi",
      class: "Groupe Tafsir",
      time: "10:00-12:00",
      status: "Présent",
      arrivalTime: "09:58",
      notes: "Arrivée à l'heure"
    },
    {
      id: "5",
      student: "Khadija Al-Rashid",
      class: "Groupe Coran Débutants",
      time: "14:00-16:00",
      status: "Excusé",
      arrivalTime: null,
      notes: "Rendez-vous médical"
    },
    {
      id: "6",
      student: "Youssef Al-Kindi",
      class: "Groupe Coran Intermédiaires", 
      time: "15:00-17:00",
      status: "Présent",
      arrivalTime: "15:05",
      notes: "En retard de 5 min"
    }
  ];

  const weeklyStats = {
    totalSessions: 24,
    present: 18,
    absent: 4,
    excused: 2,
    attendanceRate: 75.0
  };

  const recentAbsences = [
    {
      student: "Fatima Zahra",
      class: "Groupe Arabe",
      date: "2024-01-15",
      reason: "Maladie",
      status: "Justifiée"
    },
    {
      student: "Khadija Al-Rashid", 
      class: "Groupe Coran Débutants",
      date: "2024-01-15",
      reason: "Rendez-vous médical",
      status: "Justifiée"
    },
    {
      student: "Ahmad Al-Farouq",
      class: "Groupe Coran Intermédiaires",
      date: "2024-01-14",
      reason: "Non justifiée",
      status: "En attente"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Présent': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Excusé': return 'bg-yellow-100 text-yellow-800';
      case 'En retard': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Présent': return '✅';
      case 'Absent': return '❌';
      case 'Excusé': return '⚠️';
      case 'En retard': return '⏰';
      default: return '❓';
    }
  };

  return (
    <Layout tenantName="École Coranique Al-Huda" tenantSlug={params.tenant}>
      <div className="space-y-8">
        {/* Header avec navigation */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <Link 
                href={`/s/${params.tenant}/demo`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                ← Retour au tableau de bord
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des présences - Démo</h1>
            <p className="mt-2 text-gray-600">Suivez et gérez les présences des étudiants en temps réel</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              + Prendre les présences
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Exporter
            </button>
          </div>
        </div>

        {/* Bannière démo */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🎯</div>
            <div>
              <p className="text-sm font-medium text-green-800">
                <strong>Mode Démo :</strong> Système de présences interactif
              </p>
              <p className="text-xs text-green-600 mt-1">
                Explorez la prise de présence, les rapports et les notifications automatiques
              </p>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">✅</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Présents</dt>
                    <dd className="text-2xl font-bold text-gray-900">{weeklyStats.present}</dd>
                    <dd className="text-xs text-green-600">Aujourd'hui</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">❌</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Absents</dt>
                    <dd className="text-2xl font-bold text-gray-900">{weeklyStats.absent}</dd>
                    <dd className="text-xs text-red-600">Cette semaine</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">⚠️</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Excusés</dt>
                    <dd className="text-2xl font-bold text-gray-900">{weeklyStats.excused}</dd>
                    <dd className="text-xs text-yellow-600">Cette semaine</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📊</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Taux présence</dt>
                    <dd className="text-2xl font-bold text-gray-900">{weeklyStats.attendanceRate}%</dd>
                    <dd className="text-xs text-green-600">+2% vs semaine dernière</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Présences d'aujourd'hui */}
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Présences d'aujourd'hui ({todayAttendance.length})
              </h3>
              <div className="flex space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Toutes les classes</option>
                  <option>Groupe Coran Débutants</option>
                  <option>Groupe Coran Intermédiaires</option>
                  <option>Groupe Coran Avancés</option>
                  <option>Groupe Arabe</option>
                  <option>Groupe Tafsir</option>
                </select>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                  Marquer tous présents
                </button>
              </div>
            </div>
            
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Étudiant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Classe
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Horaire
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Heure d'arrivée
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {todayAttendance.map((attendance) => (
                    <tr key={attendance.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                              <span className="text-blue-600 font-bold text-sm">
                                {attendance.student.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">
                              {attendance.student}
                            </div>
                            <div className="text-xs text-gray-500">
                              {attendance.notes}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {attendance.class}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {attendance.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(attendance.status)}`}>
                          <span className="mr-1">{getStatusIcon(attendance.status)}</span>
                          {attendance.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {attendance.arrivalTime || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50">
                            Modifier
                          </button>
                          <button className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50">
                            Justifier
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Absences récentes */}
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Absences récentes ({recentAbsences.length})
            </h3>
            
            <div className="space-y-4">
              {recentAbsences.map((absence, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">
                          {absence.student.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{absence.student}</div>
                      <div className="text-xs text-gray-500">{absence.class}</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-900">{absence.date}</div>
                    <div className="text-xs text-gray-500">{absence.reason}</div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      absence.status === 'Justifiée' ? 'bg-green-100 text-green-800' :
                      absence.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {absence.status}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded text-sm hover:bg-blue-50">
                      Voir
                    </button>
                    <button className="text-green-600 hover:text-green-900 px-2 py-1 rounded text-sm hover:bg-green-50">
                      Justifier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📊</div>
              <div>
                <h3 className="font-semibold text-gray-900">Rapports</h3>
                <p className="text-sm text-gray-600">Générez des rapports détaillés</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
              Générer rapport
            </button>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📧</div>
              <div>
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-600">Alertez les parents</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors">
              Envoyer alertes
            </button>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">⚙️</div>
              <div>
                <h3 className="font-semibold text-gray-900">Configuration</h3>
                <p className="text-sm text-gray-600">Paramétrez le système</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-purple-50 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors">
              Configurer
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
