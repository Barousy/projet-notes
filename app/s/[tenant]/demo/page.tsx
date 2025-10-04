import Layout from "@/components/Layout";
import Link from "next/link";

export default function DemoPage({params}:{params:{tenant:string}}) {
  // Vérifier si c'est le mode démo
  if (params.tenant !== 'demo') {
    return <div className="p-6">Tenant introuvable.</div>;
  }
  // Données de démo enrichies et réalistes
  const demoData = {
    tenantName: "Masjid An-Noor",
    description: "Centre d'enseignement islamique moderne",
    classes: [
      { id: "1", name: "Groupe Coran Débutants", students: 18, level: "Niveau 1", teacher: "Sheikh Ahmed Al-Mansouri" },
      { id: "2", name: "Groupe Coran Intermédiaires", students: 15, level: "Niveau 2", teacher: "Sheikh Youssef Al-Hassani" },
      { id: "3", name: "Groupe Coran Avancés", students: 12, level: "Niveau 3", teacher: "Sheikh Mohamed Al-Qurashi" },
      { id: "4", name: "Groupe Arabe", students: 22, level: "Tous niveaux", teacher: "Ustaz Fatima Al-Zahra" },
      { id: "5", name: "Groupe Tafsir", students: 8, level: "Avancé", teacher: "Sheikh Ibrahim Al-Mahdi" }
    ],
    students: 75,
    subjects: 5,
    schoolYears: 1,
    recentActivities: [
      { type: "quran", student: "Amina Al-Hassan", action: "a terminé la sourate Al-Baqarah", time: "Il y a 2h" },
      { type: "attendance", student: "Omar Ben Ali", action: "était présent en classe", time: "Il y a 3h" },
      { type: "grade", student: "Fatima Zahra", action: "a obtenu 18/20 en Arabe", time: "Il y a 1j" },
      { type: "enrollment", student: "Hassan Al-Mahdi", action: "s'est inscrit en Tafsir", time: "Il y a 2j" }
    ],
    stats: {
      attendanceRate: 94.5,
      averageGrade: 16.2,
      quranProgress: 67.8,
      activeStudents: 68
    }
  };

  return (
    <Layout tenantName={demoData.tenantName} tenantSlug={params.tenant}>
      <div className="space-y-8">
        {/* Header avec bannière démo */}
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Tableau de bord - Mode Démo</h1>
                <p className="mt-2 text-blue-100">{demoData.description}</p>
                <p className="text-sm text-blue-200 mt-1">Données de démonstration interactives</p>
              </div>
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">{demoData.students}</div>
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
                    <dd className="text-2xl font-bold text-gray-900">{demoData.classes.length}</dd>
                    <dd className="text-xs text-green-600">+2 ce mois</dd>
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
                    <dd className="text-2xl font-bold text-gray-900">{demoData.students}</dd>
                    <dd className="text-xs text-green-600">+12 cette semaine</dd>
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
                    <dd className="text-2xl font-bold text-gray-900">{demoData.stats.attendanceRate}%</dd>
                    <dd className="text-xs text-green-600">+2.1% vs mois dernier</dd>
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
                    <dd className="text-2xl font-bold text-gray-900">{demoData.stats.quranProgress}%</dd>
                    <dd className="text-xs text-green-600">+5.2% cette semaine</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Classes enrichies */}
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Classes actives ({demoData.classes.length})
              </h3>
              <Link 
                href={`/s/${params.tenant}/classes`}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Voir toutes les classes →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {demoData.classes.map((classe) => (
                <div key={classe.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 bg-gradient-to-br from-white to-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{classe.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{classe.level}</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {classe.students} étudiants
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">👨‍🏫</span>
                      <span>{classe.teacher}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">📊</span>
                      <span>Progression: {Math.floor(Math.random() * 40 + 60)}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors">
                        Voir détails
                      </button>
                      <button className="flex-1 bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                        Présences
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activités récentes et fonctionnalités */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activités récentes */}
          <div className="bg-white shadow-lg rounded-lg">
            <div className="px-6 py-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Activités récentes
              </h3>
              <div className="space-y-4">
                {demoData.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'quran' ? 'bg-green-100' :
                        activity.type === 'attendance' ? 'bg-blue-100' :
                        activity.type === 'grade' ? 'bg-yellow-100' :
                        'bg-purple-100'
                      }`}>
                        <span className="text-sm">
                          {activity.type === 'quran' ? '📖' :
                           activity.type === 'attendance' ? '✅' :
                           activity.type === 'grade' ? '📊' : '👤'}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.student}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fonctionnalités disponibles */}
          <div className="bg-white shadow-lg rounded-lg">
            <div className="px-6 py-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Modules disponibles
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <Link 
                  href={`/s/${params.tenant}/students`}
                  className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-blue-50 to-blue-100"
                >
                  <span className="text-3xl mr-4">👥</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Gestion des étudiants</div>
                    <div className="text-sm text-gray-600">Inscription, profils, tuteurs</div>
                  </div>
                  <span className="text-blue-600">→</span>
                </Link>
                
                <Link 
                  href={`/s/${params.tenant}/classes`}
                  className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-green-50 to-green-100"
                >
                  <span className="text-3xl mr-4">🏫</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Gestion des classes</div>
                    <div className="text-sm text-gray-600">Organisation, matières, salles</div>
                  </div>
                  <span className="text-green-600">→</span>
                </Link>
                
                <Link 
                  href={`/s/${params.tenant}/attendance`}
                  className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-yellow-300 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-yellow-50 to-yellow-100"
                >
                  <span className="text-3xl mr-4">✅</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Présences</div>
                    <div className="text-sm text-gray-600">Suivi, rapports, notifications</div>
                  </div>
                  <span className="text-yellow-600">→</span>
                </Link>
                
                <Link 
                  href={`/s/${params.tenant}/quran`}
                  className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-purple-50 to-purple-100"
                >
                  <span className="text-3xl mr-4">📖</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Suivi Coranique</div>
                    <div className="text-sm text-gray-600">Progression, mémorisation</div>
                  </div>
                  <span className="text-purple-600">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bannière de démonstration */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-3xl mr-4">🎯</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Mode Démo Interactif</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Explorez toutes les fonctionnalités avec des données réalistes. 
                  Cliquez sur les liens pour naviguer dans le système complet.
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Commencer la démo
              </button>
              <button className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Voir la documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
