import Layout from "@/components/Layout";

export default function DemoPage({params}:{params:{tenant:string}}) {
  // Données de démo statiques (pas de base de données)
  const demoData = {
    tenantName: "Masjid An-Noor",
    classes: [
      { id: "1", name: "Groupe Qur'an A", students: 12 },
      { id: "2", name: "Groupe Qur'an B", students: 8 },
      { id: "3", name: "Groupe Arabe", students: 15 }
    ],
    students: 35,
    subjects: 3,
    schoolYears: 1
  };

  return (
    <Layout tenantName={demoData.tenantName} tenantSlug={params.tenant}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord - Démo</h1>
          <p className="mt-2 text-gray-600">Vue d'ensemble de {demoData.tenantName} (données de démo)</p>
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              📋 <strong>Mode démo :</strong> Ces données sont statiques pour la démonstration.
            </p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Classes actives</dt>
                    <dd className="text-lg font-medium text-gray-900">{demoData.classes.length}</dd>
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
                    <span className="text-white text-lg">👥</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Étudiants inscrits</dt>
                    <dd className="text-lg font-medium text-gray-900">{demoData.students}</dd>
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
                    <span className="text-white text-lg">📅</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Années scolaires</dt>
                    <dd className="text-lg font-medium text-gray-900">{demoData.schoolYears}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-lg">📚</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Matières</dt>
                    <dd className="text-lg font-medium text-gray-900">{demoData.subjects}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Classes */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Classes ({demoData.classes.length})
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {demoData.classes.map((classe) => (
                <div key={classe.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <h4 className="font-medium text-gray-900">{classe.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {classe.students} étudiants inscrits
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Fonctionnalités disponibles
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center p-4 border rounded-lg bg-gray-50">
                <span className="text-2xl mr-3">👥</span>
                <span className="font-medium text-gray-600">Gestion des étudiants</span>
              </div>
              <div className="flex items-center p-4 border rounded-lg bg-gray-50">
                <span className="text-2xl mr-3">🏫</span>
                <span className="font-medium text-gray-600">Gestion des classes</span>
              </div>
              <div className="flex items-center p-4 border rounded-lg bg-gray-50">
                <span className="text-2xl mr-3">✅</span>
                <span className="font-medium text-gray-600">Présences</span>
              </div>
              <div className="flex items-center p-4 border rounded-lg bg-gray-50">
                <span className="text-2xl mr-3">📖</span>
                <span className="font-medium text-gray-600">Suivi Coran</span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                ✅ <strong>Interface fonctionnelle :</strong> Toutes les pages sont opérationnelles avec des données de démo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
