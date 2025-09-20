import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">📚</div>
              <span className="ml-2 text-xl font-semibold text-gray-900">projet-notes</span>
            </div>
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Connexion
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Plateforme de gestion
            <span className="text-blue-600 block">multi-tenant</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Une solution complète pour gérer vos établissements éducatifs, mosquées et centres d'apprentissage. 
            Gérez étudiants, classes, présences, notes et progression Coranique.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="/s/masjid-noor/dashboard" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
            >
              🏫 Voir la démo
            </a>
            <a 
              href="#features" 
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium text-center"
            >
              Découvrir les fonctionnalités
            </a>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Gestion des étudiants</h3>
            <p className="text-gray-600">Inscrivez et gérez vos étudiants avec leurs informations personnelles et leurs tuteurs.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🏫</div>
            <h3 className="text-xl font-semibold mb-2">Organisation des classes</h3>
            <p className="text-gray-600">Créez et organisez vos classes par année scolaire avec les matières correspondantes.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">Suivi des présences</h3>
            <p className="text-gray-600">Prenez les présences facilement et gérez les absences avec justificatifs.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Système de notation</h3>
            <p className="text-gray-600">Saisissez les notes et générez automatiquement les bulletins de vos étudiants.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📖</div>
            <h3 className="text-xl font-semibold mb-2">Progression Coranique</h3>
            <p className="text-gray-600">Suivez l'apprentissage du Coran avec les sourates et versets étudiés.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold mb-2">Multi-tenant</h3>
            <p className="text-gray-600">Une seule plateforme pour gérer plusieurs établissements de manière isolée.</p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🎯 Démo disponible</h2>
            <p className="text-gray-600 mb-6">
              Testez immédiatement la plateforme avec les données d'exemple du centre "Masjid An-Noor"
            </p>
            <a 
              href="/s/masjid-noor/dashboard" 
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              🚀 Accéder à la démo
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 projet-notes - Plateforme de gestion éducative multi-tenant</p>
            <p className="mt-2 text-sm">Développé avec Next.js 14, Prisma, PostgreSQL et TailwindCSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
