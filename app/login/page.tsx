import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="text-4xl font-bold text-blue-600">📚</div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connexion à projet-notes
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Plateforme de gestion multi-tenant
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="text-6xl mb-4">🔐</div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Authentification</h3>
            <p className="text-gray-600 mb-6">
              Le système d'authentification sera bientôt disponible.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-900 mb-2">Pour l'instant :</h4>
              <p className="text-sm text-blue-800">
                Utilisez la démo disponible pour explorer toutes les fonctionnalités.
              </p>
            </div>
            
            <Link 
              href="/s/masjid-noor/dashboard" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              🚀 Accéder à la démo
            </Link>
            
            <div className="mt-4">
              <Link 
                href="/" 
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                ← Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
