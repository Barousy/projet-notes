import Layout from "@/components/Layout";
import Link from "next/link";

export default function DemoQuranPage({params}:{params:{tenant:string}}) {
  // Données de démo réalistes pour le suivi Coranique
  const recentProgress = [
    {
      id: "1",
      student: "Amina Al-Hassan",
      class: "Groupe Coran Avancés",
      surah: "Al-Baqarah",
      surahNumber: 2,
      fromAyah: 1,
      toAyah: 50,
      kind: "Mémorisation",
      date: "2024-01-15",
      teacher: "Sheikh Mohamed Al-Qurashi",
      comment: "Excellente récitation, très bonne mémorisation",
      status: "Validé"
    },
    {
      id: "2",
      student: "Omar Ben Ali",
      class: "Groupe Coran Intermédiaires",
      surah: "Ali 'Imran",
      surahNumber: 3,
      fromAyah: 1,
      toAyah: 25,
      kind: "Récitation",
      date: "2024-01-14",
      teacher: "Sheikh Youssef Al-Hassani",
      comment: "Bon niveau, quelques erreurs de prononciation",
      status: "En cours"
    },
    {
      id: "3",
      student: "Fatima Zahra",
      class: "Groupe Arabe",
      surah: "An-Nisa",
      surahNumber: 4,
      fromAyah: 1,
      toAyah: 30,
      kind: "Mémorisation",
      date: "2024-01-13",
      teacher: "Ustaz Fatima Al-Zahra",
      comment: "Parfait ! Très bonne compréhension",
      status: "Validé"
    },
    {
      id: "4",
      student: "Hassan Al-Mahdi",
      class: "Groupe Tafsir",
      surah: "Al-Maidah",
      surahNumber: 5,
      fromAyah: 1,
      toAyah: 20,
      kind: "Tafsir",
      date: "2024-01-12",
      teacher: "Sheikh Ibrahim Al-Mahdi",
      comment: "Très bon travail, analyse approfondie",
      status: "Validé"
    },
    {
      id: "5",
      student: "Khadija Al-Rashid",
      class: "Groupe Coran Débutants",
      surah: "Al-Fatiha",
      surahNumber: 1,
      fromAyah: 1,
      toAyah: 7,
      kind: "Mémorisation",
      date: "2024-01-11",
      teacher: "Sheikh Ahmed Al-Mansouri",
      comment: "Progrès notables, continuez ainsi",
      status: "En cours"
    },
    {
      id: "6",
      student: "Youssef Al-Kindi",
      class: "Groupe Coran Intermédiaires",
      surah: "Al-An'am",
      surahNumber: 6,
      fromAyah: 1,
      toAyah: 15,
      kind: "Récitation",
      date: "2024-01-10",
      teacher: "Sheikh Youssef Al-Hassani",
      comment: "Bien, quelques améliorations possibles",
      status: "En cours"
    }
  ];

  const studentProgress = [
    {
      student: "Amina Al-Hassan",
      class: "Groupe Coran Avancés",
      totalSurahs: 15,
      memorizedSurahs: 12,
      currentSurah: "Al-Baqarah",
      currentAyah: 50,
      progress: 80,
      lastActivity: "Il y a 2h"
    },
    {
      student: "Omar Ben Ali",
      class: "Groupe Coran Intermédiaires",
      totalSurahs: 10,
      memorizedSurahs: 7,
      currentSurah: "Ali 'Imran",
      currentAyah: 25,
      progress: 70,
      lastActivity: "Il y a 1h"
    },
    {
      student: "Fatima Zahra",
      class: "Groupe Arabe",
      totalSurahs: 8,
      memorizedSurahs: 6,
      currentSurah: "An-Nisa",
      currentAyah: 30,
      progress: 75,
      lastActivity: "Il y a 3h"
    },
    {
      student: "Hassan Al-Mahdi",
      class: "Groupe Tafsir",
      totalSurahs: 20,
      memorizedSurahs: 18,
      currentSurah: "Al-Maidah",
      currentAyah: 20,
      progress: 90,
      lastActivity: "Il y a 30min"
    },
    {
      student: "Khadija Al-Rashid",
      class: "Groupe Coran Débutants",
      totalSurahs: 5,
      memorizedSurahs: 3,
      currentSurah: "Al-Fatiha",
      currentAyah: 7,
      progress: 60,
      lastActivity: "Il y a 4h"
    },
    {
      student: "Youssef Al-Kindi",
      class: "Groupe Coran Intermédiaires",
      totalSurahs: 10,
      memorizedSurahs: 8,
      currentSurah: "Al-An'am",
      currentAyah: 15,
      progress: 80,
      lastActivity: "Il y a 2h"
    }
  ];

  const surahNames = [
    "Al-Fatiha", "Al-Baqarah", "Ali 'Imran", "An-Nisa", "Al-Maidah", "Al-An'am", "Al-A'raf", "Al-Anfal",
    "At-Tawbah", "Yunus", "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf",
    "Maryam", "Taha", "Al-Anbiya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", "Ash-Shu'ara", "An-Naml",
    "Al-Qasas", "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajdah", "Al-Ahzab", "Saba", "Fatir", "Ya-Sin", "As-Saffat",
    "Sad", "Az-Zumar", "Ghafir", "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah", "Al-Ahqaf",
    "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", "Adh-Dhariyat", "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman",
    "Al-Waqi'ah", "Al-Hadid", "Al-Mujadilah", "Al-Hashr", "Al-Mumtahanah", "As-Saff", "Al-Jumu'ah", "Al-Munafiqun",
    "At-Taghabun", "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqah", "Al-Ma'arij", "Nuh", "Al-Jinn",
    "Al-Muzzammil", "Al-Muddaththir", "Al-Qiyamah", "Al-Insan", "Al-Mursalat", "An-Naba", "An-Nazi'at", "Abasa",
    "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", "At-Tariq", "Al-A'la", "Al-Ghashiyah",
    "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Layl", "Ad-Duha", "Ash-Sharh", "At-Tin", "Al-Alaq", "Al-Qadr",
    "Al-Bayyinah", "Az-Zalzalah", "Al-Adiyat", "Al-Qari'ah", "At-Takathur", "Al-Asr", "Al-Humazah", "Al-Fil",
    "Quraysh", "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr", "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Validé': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-yellow-100 text-yellow-800';
      case 'À revoir': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getKindIcon = (kind: string) => {
    switch (kind) {
      case 'Mémorisation': return '🧠';
      case 'Récitation': return '🎵';
      case 'Tafsir': return '📚';
      case 'Révision': return '🔄';
      default: return '📖';
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
            <h1 className="text-3xl font-bold text-gray-900">Suivi Coranique - Démo</h1>
            <p className="mt-2 text-gray-600">Suivez la progression de l'apprentissage du Coran avec des outils spécialisés</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              + Enregistrer progression
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Rapports
            </button>
          </div>
        </div>

        {/* Bannière démo */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🎯</div>
            <div>
              <p className="text-sm font-medium text-green-800">
                <strong>Mode Démo :</strong> Système de suivi Coranique complet
              </p>
              <p className="text-xs text-green-600 mt-1">
                Explorez la mémorisation, la récitation, le tafsir et les rapports de progression
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
                    <span className="text-white text-xl">👥</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Étudiants actifs</dt>
                    <dd className="text-2xl font-bold text-gray-900">68</dd>
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
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📝</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Enregistrements</dt>
                    <dd className="text-2xl font-bold text-gray-900">156</dd>
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
                    <span className="text-white text-xl">⭐</span>
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Sourates étudiées</dt>
                    <dd className="text-2xl font-bold text-gray-900">24</dd>
                    <dd className="text-xs text-green-600">+3 ce mois</dd>
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
                    <dd className="text-2xl font-bold text-gray-900">78%</dd>
                    <dd className="text-xs text-green-600">+5% ce mois</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progression récente */}
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Progression récente ({recentProgress.length})
              </h3>
              <div className="flex space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Tous les types</option>
                  <option>Mémorisation</option>
                  <option>Récitation</option>
                  <option>Tafsir</option>
                  <option>Révision</option>
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
            
            <div className="space-y-4">
              {recentProgress.map((progress) => (
                <div key={progress.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-white to-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-12 w-12">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                          <span className="text-green-600 font-bold text-sm">
                            {progress.student.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{progress.student}</div>
                        <div className="text-sm text-gray-500">{progress.class}</div>
                        <div className="text-xs text-gray-400">{progress.teacher}</div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(progress.status)}`}>
                      {progress.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-medium text-gray-600 mb-1">Sourate</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {progress.surah} ({progress.surahNumber})
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600 mb-1">Versets</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {progress.fromAyah}-{progress.toAyah}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600 mb-1">Type</div>
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{getKindIcon(progress.kind)}</span>
                        <span className="text-lg font-semibold text-gray-900">{progress.kind}</span>
                      </div>
                    </div>
                  </div>
                  
                  {progress.comment && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-sm text-blue-800">
                        <span className="font-medium">Commentaire :</span> {progress.comment}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{new Date(progress.date).toLocaleDateString('fr-FR')}</span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50">
                        Voir détails
                      </button>
                      <button className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50">
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progression par étudiant */}
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Progression par étudiant
            </h3>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {studentProgress.map((student, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                          <span className="text-green-600 font-bold text-sm">
                            {student.student.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{student.student}</div>
                        <div className="text-sm text-gray-500">{student.class}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{student.progress}%</div>
                      <div className="text-xs text-gray-500">Progression</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sourates mémorisées</span>
                      <span className="text-sm font-medium text-gray-900">
                        {student.memorizedSurahs}/{student.totalSurahs}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sourate actuelle</span>
                      <span className="text-sm font-medium text-gray-900">{student.currentSurah}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Verset actuel</span>
                      <span className="text-sm font-medium text-gray-900">{student.currentAyah}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Dernière activité</span>
                      <span className="text-sm text-gray-500">{student.lastActivity}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm hover:bg-green-100 transition-colors">
                      Voir progression
                    </button>
                    <button className="flex-1 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors">
                      Enregistrer
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
              <div className="text-3xl mr-4">🏆</div>
              <div>
                <h3 className="font-semibold text-gray-900">Récompenses</h3>
                <p className="text-sm text-gray-600">Système de motivation</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors">
              Voir récompenses
            </button>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">⚙️</div>
              <div>
                <h3 className="font-semibold text-gray-900">Configuration</h3>
                <p className="text-sm text-gray-600">Paramétrez le suivi</p>
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
