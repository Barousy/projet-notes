import Layout from "@/components/Layout";
import Link from "next/link";

export default function DemoGradesPage({params}:{params:{tenant:string}}) {
  // Mode démo pour masjid-noor
  if (params.tenant !== 'masjid-noor') {
    return <div className="p-6">Tenant introuvable.</div>;
  }
  // Données de démo réalistes pour les notes
  const recentGrades = [
    {
      id: "1",
      student: "Amina Al-Hassan",
      class: "Groupe Coran Avancés",
      subject: "Mémorisation Coran",
      grade: 18.5,
      maxGrade: 20,
      type: "Évaluation continue",
      date: "2024-01-15",
      teacher: "Sheikh Mohamed Al-Qurashi",
      comment: "Excellente récitation, très bonne mémorisation"
    },
    {
      id: "2",
      student: "Omar Ben Ali",
      class: "Groupe Coran Intermédiaires", 
      subject: "Récitation & Tajwid",
      grade: 16.0,
      maxGrade: 20,
      type: "Contrôle",
      date: "2024-01-14",
      teacher: "Sheikh Youssef Al-Hassani",
      comment: "Bon niveau, quelques erreurs de prononciation"
    },
    {
      id: "3",
      student: "Fatima Zahra",
      class: "Groupe Arabe",
      subject: "Langue Arabe",
      grade: 19.0,
      maxGrade: 20,
      type: "Examen",
      date: "2024-01-13",
      teacher: "Ustaz Fatima Al-Zahra",
      comment: "Parfait ! Très bonne compréhension"
    },
    {
      id: "4",
      student: "Hassan Al-Mahdi",
      class: "Groupe Tafsir",
      subject: "Exégèse Coranique",
      grade: 17.5,
      maxGrade: 20,
      type: "Exposé",
      date: "2024-01-12",
      teacher: "Sheikh Ibrahim Al-Mahdi",
      comment: "Très bon travail, analyse approfondie"
    },
    {
      id: "5",
      student: "Khadija Al-Rashid",
      class: "Groupe Coran Débutants",
      subject: "Mémorisation Coran",
      grade: 14.0,
      maxGrade: 20,
      type: "Évaluation continue",
      date: "2024-01-11",
      teacher: "Sheikh Ahmed Al-Mansouri",
      comment: "Progrès notables, continuez ainsi"
    },
    {
      id: "6",
      student: "Youssef Al-Kindi",
      class: "Groupe Coran Intermédiaires",
      subject: "Récitation & Tajwid",
      grade: 15.5,
      maxGrade: 20,
      type: "Contrôle",
      date: "2024-01-10",
      teacher: "Sheikh Youssef Al-Hassani",
      comment: "Bien, quelques améliorations possibles"
    }
  ];

  const classStats = [
    {
      class: "Groupe Coran Avancés",
      average: 17.8,
      students: 12,
      highest: 19.5,
      lowest: 15.0,
      improvement: "+2.3"
    },
    {
      class: "Groupe Coran Intermédiaires",
      average: 15.7,
      students: 15,
      highest: 18.0,
      lowest: 12.5,
      improvement: "+1.8"
    },
    {
      class: "Groupe Arabe",
      average: 16.9,
      students: 22,
      highest: 19.0,
      lowest: 13.0,
      improvement: "+3.1"
    },
    {
      class: "Groupe Tafsir",
      average: 18.2,
      students: 8,
      highest: 19.5,
      lowest: 16.0,
      improvement: "+1.5"
    }
  ];

  const getGradeColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 80) return 'text-blue-600 bg-blue-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    if (percentage >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getGradeIcon = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 90) return '🌟';
    if (percentage >= 80) return '👍';
    if (percentage >= 70) return '👌';
    if (percentage >= 60) return '⚠️';
    return '📚';
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
            <h1 className="text-3xl font-bold text-gray-900">Gestion des notes - Démo</h1>
            <p className="mt-2 text-gray-600">Saisissez et suivez les notes des étudiants avec des outils avancés</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              + Saisir des notes
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
                <strong>Mode Démo :</strong> Système de notation complet et interactif
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Explorez la saisie de notes, les bulletins et les analyses de performance
              </p>
            </div>
          </div>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Moyenne générale</dt>
                    <dd className="text-2xl font-bold text-gray-900">16.8</dd>
                    <dd className="text-xs text-green-600">+1.2 ce mois</dd>
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Évaluations</dt>
                    <dd className="text-2xl font-bold text-gray-900">24</dd>
                    <dd className="text-xs text-green-600">Cette semaine</dd>
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
                    <span className="text-white text-xl">🌟</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Excellents</dt>
                    <dd className="text-2xl font-bold text-gray-900">8</dd>
                    <dd className="text-xs text-green-600">≥ 18/20</dd>
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
                    <span className="text-white text-xl">📈</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Progression</dt>
                    <dd className="text-2xl font-bold text-gray-900">+8.5%</dd>
                    <dd className="text-xs text-green-600">Ce trimestre</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes récentes */}
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Notes récentes ({recentGrades.length})
              </h3>
              <div className="flex space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Toutes les matières</option>
                  <option>Mémorisation Coran</option>
                  <option>Récitation & Tajwid</option>
                  <option>Langue Arabe</option>
                  <option>Exégèse Coranique</option>
                </select>
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
                      Matière
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Note
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentGrades.map((grade) => (
                    <tr key={grade.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                              <span className="text-blue-600 font-bold text-sm">
                                {grade.student.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">
                              {grade.student}
                            </div>
                            <div className="text-xs text-gray-500">
                              {grade.class}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{grade.subject}</div>
                        <div className="text-xs text-gray-500">{grade.teacher}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {grade.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(grade.grade, grade.maxGrade)}`}>
                            <span className="mr-1">{getGradeIcon(grade.grade, grade.maxGrade)}</span>
                            {grade.grade}/{grade.maxGrade}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(grade.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50">
                            Voir
                          </button>
                          <button className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50">
                            Modifier
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

        {/* Statistiques par classe */}
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Statistiques par classe
            </h3>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {classStats.map((stat, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">{stat.class}</h4>
                    <span className="text-sm text-green-600 font-medium">{stat.improvement}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Moyenne de classe</span>
                      <span className="text-lg font-bold text-gray-900">{stat.average}/20</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Étudiants</span>
                      <span className="text-sm font-medium text-gray-900">{stat.students}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Meilleure note</span>
                      <span className="text-sm font-medium text-green-600">{stat.highest}/20</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Note la plus basse</span>
                      <span className="text-sm font-medium text-red-600">{stat.lowest}/20</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(stat.average / 20) * 100}%` }}
                      ></div>
                    </div>
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
              <div className="text-3xl mr-4">📋</div>
              <div>
                <h3 className="font-semibold text-gray-900">Bulletins</h3>
                <p className="text-sm text-gray-600">Générez les bulletins</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
              Générer bulletins
            </button>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📊</div>
              <div>
                <h3 className="font-semibold text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">Analysez les performances</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors">
              Voir analytics
            </button>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">⚙️</div>
              <div>
                <h3 className="font-semibold text-gray-900">Configuration</h3>
                <p className="text-sm text-gray-600">Paramétrez les évaluations</p>
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
