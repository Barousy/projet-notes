import Link from "next/link";

interface HeaderProps {
  tenantName?: string;
  tenantSlug?: string;
}

export default function Header({ tenantName, tenantSlug }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href={tenantSlug ? `/s/${tenantSlug}/dashboard` : "/"} className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">📚</div>
              <span className="ml-2 text-xl font-semibold text-gray-900">
                {tenantName ? tenantName : "projet-notes"}
              </span>
            </Link>
            {tenantSlug && (
              <Link 
                href="/" 
                className="text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-1 hover:bg-gray-100 rounded transition-colors"
              >
                ← Accueil
              </Link>
            )}
          </div>
          
                 <nav className="hidden md:flex space-x-8">
                   {tenantSlug && (
                     <>
                       <Link href={`/s/${tenantSlug}/dashboard`} className="text-gray-600 hover:text-gray-900">
                         Dashboard
                       </Link>
                       <Link href={`/s/${tenantSlug}/students`} className="text-gray-600 hover:text-gray-900">
                         Étudiants
                       </Link>
                       <Link href={`/s/${tenantSlug}/classes`} className="text-gray-600 hover:text-gray-900">
                         Classes
                       </Link>
                       <Link href={`/s/${tenantSlug}/teachers`} className="text-gray-600 hover:text-gray-900">
                         Professeurs
                       </Link>
                       <Link href={`/s/${tenantSlug}/schedule`} className="text-gray-600 hover:text-gray-900">
                         Emploi du temps
                       </Link>
                       <Link href={`/s/${tenantSlug}/grades`} className="text-gray-600 hover:text-gray-900">
                         Notes
                       </Link>
                       <Link href={`/s/${tenantSlug}/quran`} className="text-gray-600 hover:text-gray-900">
                         Coran
                       </Link>
                       <Link href={`/s/${tenantSlug}/admin`} className="text-purple-600 hover:text-purple-700 font-medium">
                         Admin
                       </Link>
                     </>
                   )}
                 </nav>
          
          <div className="flex items-center space-x-4">
            {tenantSlug ? (
              <>
                <Link href="/admin/tenants" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Toutes les entités
                </Link>
                <Link href="/admin/new-tenant" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  + Nouvelle entité
                </Link>
                <span className="text-sm text-gray-500">
                  Connecté en tant qu'Admin
                </span>
              </>
            ) : (
              <>
                <Link href="/admin/tenants" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Entités
                </Link>
                <Link href="/admin/new-tenant" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Créer une entité
                </Link>
                <Link href="/login" className="text-blue-600 hover:text-blue-700">
                  Connexion
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
