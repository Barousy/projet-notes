import { prisma } from "@/lib/db";

export default async function TestPage({params}:{params:{tenant:string}}) {
  try {
    const tenant = await prisma.tenant.findUnique({ 
      where: { slug: params.tenant } 
    });
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-green-600 mb-4">✅ Connexion OK</h1>
          <p className="text-gray-600 mb-4">
            La base de données fonctionne correctement !
          </p>
          {tenant ? (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Tenant trouvé:</strong> {tenant.name}
              </p>
            </div>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Tenant non trouvé:</strong> {params.tenant}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Erreur de connexion</h1>
          <p className="text-gray-600 mb-4">
            Impossible de se connecter à la base de données.
          </p>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Erreur:</strong> {error instanceof Error ? error.message : 'Erreur inconnue'}
            </p>
          </div>
        </div>
      </div>
    );
  }
}