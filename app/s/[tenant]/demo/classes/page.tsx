import Layout from "@/components/Layout";
import Link from "next/link";

export default function DemoClassesPage({params}:{params:{tenant:string}}) {
  // Vérifier si c'est le mode démo
  if (params.tenant !== 'demo') {
    return <div className="p-6">Tenant introuvable.</div>;
  }
  // Données de démo réalistes pour les classes
  const demoClasses = [
    {
      id: "1",
      name: "Groupe Coran Débutants",
      level: "Niveau 1",
      teacher: "Sheikh Ahmed Al-Mansouri",
      students: 18,
      room: "Salle A - Rez-de-chaussée",
      schedule: "Lun, Mer, Ven 14h-16h",
      subject: "Mémorisation Coran",
      progress: 75,
      lastActivity: "Il y a 2h",
      status: "Actif"
    },
    {
      id: "2",
      name: "Groupe Coran Intermédiaires", 
      level: "Niveau 2",
      teacher: "Sheikh Youssef Al-Hassani",
      students: 15,
      room: "Salle B - 1er étage",
      schedule: "Mar, Jeu, Sam 15h-17h",
      subject: "Récitation & Tajwid",
      progress: 82,
      lastActivity: "Il y a 1h",
      status: "Actif"
    },
    {
      id: "3",
      name: "Groupe Coran Avancés",
      level: "Niveau 3", 
      teacher: "Sheikh Mohamed Al-Qurashi",
      students: 12,
      room: "Salle C - 1er étage",
      schedule: "Lun, Mer, Ven 16h-18h",
      subject: "Mémorisation & Révision",
      progress: 91,
      lastActivity: "Il y a 30min",
      status: "Actif"
    },
    {
      id: "4",
      name: "Groupe Arabe",
      level: "Tous niveaux",
      teacher: "Ustaz Fatima Al-Zahra",
      students: 22,
      room: "Salle D - Rez-de-chaussée", 
      schedule: "Mar, Jeu 14h-16h",
      subject: "Langue Arabe",
      progress: 68,
      lastActivity: "Il y a 3h",
      status: "Actif"
    },
    {
      id: "5",
      name: "Groupe Tafsir",
      level: "Avancé",
      teacher: "Sheikh Ibrahim Al-Mahdi",
      students: 8,
      room: "Bibliothèque - 2ème étage",
      schedule: "Sam 10h-12h",
      subject: "Exégèse Coranique",
      progress: 95,
      lastActivity: "Il y a 1j",
      status: "Actif"
    }
  ];

  const subjects = [
    { name: "Mémorisation Coran", classes: 3, students: 45, color: "blue" },
    { name: "Récitation & Tajwid", classes: 2, students: 27, color: "green" },
    { name: "Langue Arabe", classes: 1, students: 22, color: "yellow" },
    { name: "Exégèse Coranique", classes: 1, students: 8, color: "purple" }
  ];

  const stats = {
    totalClasses: demoClasses.length,
    totalStudents: demoClasses.reduce((acc, c) => acc + c.students, 0),
    averageProgress: Math.round(demoClasses.reduce((acc, c) => acc + c.progress, 0) / demoClasses.length),
    activeTeachers: new Set(demoClasses.map(c => c.teacher)).size
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
            <h1 className="text-3xl font-bold text-gray-900">Gestion des classes - Démo</h1>
            <p className="mt-2 text-gray-600">Organisez et gérez vos classes avec des données réalistes</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              + Créer une classe
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Planifier
            </button>
          </div>
        </div>

        {/* Bannière démo */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🎯</div>
            <div>
              <p className="text-sm font-medium text-green-800">
                <strong>Mode Démo :</strong> Interface complète de gestion des classes
              </p>
              <p className="text-xs text-green-600 mt-1">
                Explorez la planification, les emplois du temps et le suivi des classes
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
                    <span className="text-white text-xl">🏫</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Classes actives</dt>
                    <dd className="text-2xl font-bold text-gray-900">{stats.totalClasses}</dd>
                    <dd className="text-xs text-green-600">+1 ce mois</dd>
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
                    <span className="text-white text-xl">👥</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Étudiants</dt>
                    <dd className="text-2xl font-bold text-gray-900">{stats.totalStudents}</dd>
                    <dd className="text-xs text-green-600">+5 cette semaine</dd>
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
                    <span className="text-white text-xl">👨‍🏫</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Enseignants</dt>
                    <dd className="text-2xl font-bold text-gray-900">{stats.activeTeachers}</dd>
                    <dd className="text-xs text-green-600">Tous actifs</dd>
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
                    <span className="text-white text-xl">📊</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Progression moy.</dt>
                    <dd className="text-2xl font-bold text-gray-900">{stats.averageProgress}%</dd>
                    <dd className="text-xs text-green-600">+4% ce mois</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Classes */}
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Classes actives ({demoClasses.length})
              </h3>
              <div className="flex space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Tous les niveaux</option>
                  <option>Niveau 1</option>
                  <option>Niveau 2</option>
                  <option>Niveau 3</option>
                  <option>Avancé</option>
                </select>
                <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                  Filtrer
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {demoClasses.map((classe) => (
                <div key={classe.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 bg-gradient-to-br from-white to-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-1">{classe.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{classe.level}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>👨‍🏫 {classe.teacher}</span>
                        <span>👥 {classe.students} étudiants</span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      classe.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {classe.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium mr-2">📚</span>
                      <span>{classe.subject}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium mr-2">🏠</span>
                      <span>{classe.room}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium mr-2">⏰</span>
                      <span>{classe.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium mr-2">🕐</span>
                      <span>{classe.lastActivity}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Progression de la classe</span>
                      <span className="font-medium">{classe.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${classe.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors">
                      Voir détails
                    </button>
                    <button className="flex-1 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm hover:bg-green-100 transition-colors">
                      Présences
                    </button>
                    <button className="flex-1 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                      Modifier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Matières */}
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Matières enseignées ({subjects.length})
            </h3>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {subjects.map((subject, index) => (
                <div key={index} className={`p-4 rounded-xl border-2 ${
                  subject.color === 'blue' ? 'border-blue-200 bg-blue-50' :
                  subject.color === 'green' ? 'border-green-200 bg-green-50' :
                  subject.color === 'yellow' ? 'border-yellow-200 bg-yellow-50' :
                  'border-purple-200 bg-purple-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                    <span className={`text-2xl ${
                      subject.color === 'blue' ? 'text-blue-500' :
                      subject.color === 'green' ? 'text-green-500' :
                      subject.color === 'yellow' ? 'text-yellow-500' :
                      'text-purple-500'
                    }`}>
                      {subject.color === 'blue' ? '📖' :
                       subject.color === 'green' ? '🎵' :
                       subject.color === 'yellow' ? '📝' : '📚'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>{subject.classes} classe{subject.classes > 1 ? 's' : ''}</div>
                    <div>{subject.students} étudiant{subject.students > 1 ? 's' : ''}</div>
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
              <div className="text-3xl mr-4">📅</div>
              <div>
                <h3 className="font-semibold text-gray-900">Emploi du temps</h3>
                <p className="text-sm text-gray-600">Planifiez les cours</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
              Voir planning
            </button>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📊</div>
              <div>
                <h3 className="font-semibold text-gray-900">Rapports</h3>
                <p className="text-sm text-gray-600">Analysez les performances</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors">
              Générer rapport
            </button>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">🏠</div>
              <div>
                <h3 className="font-semibold text-gray-900">Salles</h3>
                <p className="text-sm text-gray-600">Gérez les espaces</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-purple-50 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors">
              Gérer salles
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
