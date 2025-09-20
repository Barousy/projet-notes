import { prisma } from "@/lib/db";
import Layout from "@/components/Layout";
import type { QuranProgress, Student } from "@prisma/client";

export default async function QuranPage({params}:{params:{tenant:string}}) {
  const tenant = await prisma.tenant.findUnique({ where: { slug: params.tenant } });
  if(!tenant) return <div className="p-6">Tenant introuvable.</div>;

  const [quranProgress, students] = await Promise.all([
    prisma.quranProgress.findMany({
      where: { tenantId: tenant.id },
      include: {
        student: {
          include: {
            user: true,
            enrollments: {
              include: {
                class: true
              }
            }
          }
        }
      },
      orderBy: { date: 'desc' }
    }),
    prisma.student.findMany({
      where: { tenantId: tenant.id },
      include: {
        user: true,
        enrollments: {
          include: {
            class: true
          }
        },
        quranRecords: {
          orderBy: { date: 'desc' },
          take: 1
        }
      }
    })
  ]);

  // Noms des sourates
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

  return (
    <Layout tenantName={tenant.name} tenantSlug={tenant.slug}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📖 Suivi Coranique</h1>
            <p className="mt-2 text-gray-600">Suivez la progression de l'apprentissage du Coran</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            + Enregistrer progression
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-lg">👥</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Étudiants</dt>
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
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-lg">📝</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Enregistrements</dt>
                    <dd className="text-lg font-medium text-gray-900">{quranProgress.length}</dd>
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
                    <span className="text-white text-lg">⭐</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Sourates étudiées</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {new Set(quranProgress.map(p => p.surah)).size}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progression récente */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Progression récente
            </h3>
            
            {quranProgress.length > 0 ? (
              <div className="space-y-4">
                {quranProgress.slice(0, 10).map((progress) => (
                  <div key={progress.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 font-medium text-sm">
                              {progress.student.user?.name?.charAt(0) || progress.student.matricule.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {progress.student.user?.name || progress.student.matricule}
                          </div>
                          <div className="text-sm text-gray-500">
                            {progress.student.enrollments[0]?.class?.name || "Classe non définie"}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {surahNames[progress.surah - 1]} (Sourate {progress.surah})
                        </div>
                        <div className="text-sm text-gray-500">
                          Versets {progress.fromAyah}-{progress.toAyah} • {progress.kind}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xs text-gray-500">
                          {new Date(progress.date).toLocaleDateString('fr-FR')}
                        </div>
                        {progress.comment && (
                          <div className="text-xs text-gray-600 mt-1 max-w-xs">
                            "{progress.comment}"
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📖</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune progression enregistrée</h3>
                <p className="text-gray-500">Commencez à enregistrer la progression de vos étudiants.</p>
              </div>
            )}
          </div>
        </div>

        {/* Vue par étudiant */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Progression par étudiant
            </h3>
            
            {students.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {students.map((student) => {
                  const lastProgress = student.quranRecords[0];
                  return (
                    <div key={student.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 font-medium text-xs">
                              {student.user?.name?.charAt(0) || student.matricule.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {student.user?.name || student.matricule}
                          </div>
                          <div className="text-xs text-gray-500">
                            {student.enrollments[0]?.class?.name || "Non inscrit"}
                          </div>
                        </div>
                      </div>
                      
                      {lastProgress ? (
                        <div className="text-xs text-gray-600">
                          <div>Dernière progression:</div>
                          <div className="font-medium">
                            {surahNames[lastProgress.surah - 1]} • Versets {lastProgress.fromAyah}-{lastProgress.toAyah}
                          </div>
                          <div className="text-gray-500">
                            {new Date(lastProgress.date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400">
                          Aucune progression enregistrée
                        </div>
                      )}
                      
                      <button className="mt-3 w-full bg-green-50 text-green-700 px-3 py-2 rounded-md text-sm hover:bg-green-100">
                        Voir progression
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun étudiant</h3>
                <p className="text-gray-500">Ajoutez des étudiants pour commencer le suivi.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
