import Layout from "@/components/Layout";
import Link from "next/link";

export default function DemoStudentsPage({params}:{params:{tenant:string}}) {
  // Vérifier si c'est le mode démo
  if (params.tenant !== 'demo') {
    return <div className="p-6">Tenant introuvable.</div>;
  }
  // Données de démo réalistes pour les étudiants
  const demoStudents = [
    {
      id: "1",
      name: "Amina Al-Hassan",
      email: "amina.alhassan@email.com",
      matricule: "STU001",
      class: "Groupe Coran Avancés",
      guardian: "Fatima Al-Hassan (Mère)",
      phone: "+33 6 12 34 56 78",
      birthDate: "2010-03-15",
      gender: "Féminin",
      status: "Actif",
      lastActivity: "Il y a 2h",
      progress: 85
    },
    {
      id: "2", 
      name: "Omar Ben Ali",
      email: "omar.benali@email.com",
      matricule: "STU002",
      class: "Groupe Coran Intermédiaires",
      guardian: "Ahmed Ben Ali (Père)",
      phone: "+33 6 23 45 67 89",
      birthDate: "2011-07-22",
      gender: "Masculin",
      status: "Actif",
      lastActivity: "Il y a 1h",
      progress: 72
    },
    {
      id: "3",
      name: "Fatima Zahra",
      email: "fatima.zahra@email.com", 
      matricule: "STU003",
      class: "Groupe Arabe",
      guardian: "Youssef Al-Mahdi (Père)",
      phone: "+33 6 34 56 78 90",
      birthDate: "2009-11-08",
      gender: "Féminin",
      status: "Actif",
      lastActivity: "Il y a 3h",
      progress: 91
    },
    {
      id: "4",
      name: "Hassan Al-Mahdi",
      email: "hassan.almahdi@email.com",
      matricule: "STU004", 
      class: "Groupe Tafsir",
      guardian: "Aicha Al-Mahdi (Mère)",
      phone: "+33 6 45 67 89 01",
      birthDate: "2008-05-12",
      gender: "Masculin",
      status: "Actif",
      lastActivity: "Il y a 30min",
      progress: 78
    },
    {
      id: "5",
      name: "Khadija Al-Rashid",
      email: "khadija.alrashid@email.com",
      matricule: "STU005",
      class: "Groupe Coran Débutants", 
      guardian: "Mohamed Al-Rashid (Père)",
      phone: "+33 6 56 78 90 12",
      birthDate: "2012-09-30",
      gender: "Féminin",
      status: "Actif",
      lastActivity: "Il y a 4h",
      progress: 65
    },
    {
      id: "6",
      name: "Youssef Al-Kindi",
      email: "youssef.alkindi@email.com",
      matricule: "STU006",
      class: "Groupe Coran Intermédiaires",
      guardian: "Zainab Al-Kindi (Mère)",
      phone: "+33 6 67 89 01 23",
      birthDate: "2010-12-03",
      gender: "Masculin", 
      status: "Actif",
      lastActivity: "Il y a 2h",
      progress: 88
    }
  ];

  const stats = {
    total: demoStudents.length,
    active: demoStudents.filter(s => s.status === "Actif").length,
    averageProgress: Math.round(demoStudents.reduce((acc, s) => acc + s.progress, 0) / demoStudents.length),
    newThisWeek: 2
  };

  return (
    <Layout tenantName="Masjid An-Noor" tenantSlug={params.tenant}>
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
            <h1 className="text-3xl font-bold text-gray-900">Gestion des étudiants - Démo</h1>
            <p className="mt-2 text-gray-600">Explorez la gestion complète des étudiants avec des données réalistes</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              + Ajouter un étudiant
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Exporter
            </button>
          </div>
        </div>

        {/* Bannière démo */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🎯</div>
            <div>
              <p className="text-sm font-medium text-blue-800">
                <strong>Mode Démo :</strong> Données interactives pour démonstration
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Tous les boutons et actions sont fonctionnels pour la présentation
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
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">👥</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total étudiants</dt>
                    <dd className="text-2xl font-bold text-gray-900">{stats.total}</dd>
                    <dd className="text-xs text-green-600">+{stats.newThisWeek} cette semaine</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Actifs</dt>
                    <dd className="text-2xl font-bold text-gray-900">{stats.active}</dd>
                    <dd className="text-xs text-green-600">100% actifs</dd>
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
                    <span className="text-white text-xl">📊</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Progression moyenne</dt>
                    <dd className="text-2xl font-bold text-gray-900">{stats.averageProgress}%</dd>
                    <dd className="text-xs text-green-600">+3% ce mois</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🏫</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Classes</dt>
                    <dd className="text-2xl font-bold text-gray-900">5</dd>
                    <dd className="text-xs text-green-600">Toutes actives</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des étudiants */}
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Étudiants inscrits ({demoStudents.length})
              </h3>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Rechercher un étudiant..."
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Toutes les classes</option>
                  <option>Groupe Coran Débutants</option>
                  <option>Groupe Coran Intermédiaires</option>
                  <option>Groupe Coran Avancés</option>
                  <option>Groupe Arabe</option>
                  <option>Groupe Tafsir</option>
                </select>
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
                      Matricule
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Classe
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tuteur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progression
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {demoStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                              <span className="text-blue-600 font-bold text-lg">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">
                              {student.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {student.email}
                            </div>
                            <div className="text-xs text-gray-400">
                              {student.lastActivity}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {student.matricule}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {student.class}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div className="font-medium">{student.guardian.split(' (')[0]}</div>
                          <div className="text-xs text-gray-500">{student.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors">
                            Voir
                          </button>
                          <button className="text-green-600 hover:text-green-900 px-3 py-1 rounded-md hover:bg-green-50 transition-colors">
                            Modifier
                          </button>
                          <button className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md hover:bg-red-50 transition-colors">
                            Supprimer
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
                <h3 className="font-semibold text-gray-900">Communication</h3>
                <p className="text-sm text-gray-600">Contactez les tuteurs</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors">
              Envoyer message
            </button>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📈</div>
              <div>
                <h3 className="font-semibold text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">Suivez les performances</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-purple-50 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors">
              Voir analytics
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
