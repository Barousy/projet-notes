export default function EnvTestPage() {
  const hasDbUrl = !!process.env.DATABASE_URL;
  const hasAuthSecret = !!process.env.AUTH_SECRET;
  const hasNextAuthUrl = !!process.env.NEXTAUTH_URL;
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">🔧 Test des Variables d'Environnement</h1>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${hasDbUrl ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center">
              <span className="text-2xl mr-3">{hasDbUrl ? '✅' : '❌'}</span>
              <div>
                <h3 className="font-medium text-gray-900">DATABASE_URL</h3>
                <p className="text-sm text-gray-600">
                  {hasDbUrl ? 'Présente' : 'Manquante'}
                </p>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${hasAuthSecret ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center">
              <span className="text-2xl mr-3">{hasAuthSecret ? '✅' : '❌'}</span>
              <div>
                <h3 className="font-medium text-gray-900">AUTH_SECRET</h3>
                <p className="text-sm text-gray-600">
                  {hasAuthSecret ? 'Présente' : 'Manquante'}
                </p>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${hasNextAuthUrl ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center">
              <span className="text-2xl mr-3">{hasNextAuthUrl ? '✅' : '❌'}</span>
              <div>
                <h3 className="font-medium text-gray-900">NEXTAUTH_URL</h3>
                <p className="text-sm text-gray-600">
                  {hasNextAuthUrl ? 'Présente' : 'Manquante'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Instructions :</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Si DATABASE_URL est ❌, vérifiez votre configuration Netlify</li>
            <li>• Si toutes sont ✅, le problème vient d'ailleurs</li>
            <li>• Redéployez après avoir modifié les variables</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
