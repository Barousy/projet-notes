import Layout from "@/components/Layout";
import Link from "next/link";

export default function ResourcesPage({params}:{params:{tenant:string}}) {
  // Mode démo pour masjid-noor
  if (params.tenant !== 'masjid-noor') {
    return <div className="p-6">Tenant introuvable.</div>;
  }

  // Données de démo pour l'emploi du temps
  const schedule = [
    {
      day: "Lundi",
      sessions: [
        { time: "10:00-12:00", class: "Groupe Coran Débutants", subject: "Coran", teacher: "Sheikh Ahmed Al-Mansouri", room: "Salle 101" },
        { time: "14:00-16:00", class: "Groupe Arabe", subject: "Arabe", teacher: "Ustaz Fatima Al-Zahra", room: "Bibliothèque" },
      ]
    },
    {
      day: "Mardi",
      sessions: [
        { time: "10:00-12:00", class: "Groupe Coran Intermédiaires", subject: "Coran", teacher: "Sheikh Youssef Al-Hassani", room: "Salle 102" },
        { time: "14:00-16:00", class: "Groupe Coran Avancés", subject: "Tafsir", teacher: "Sheikh Mohamed Al-Qurashi", room: "Salle 103" },
      ]
    },
    {
      day: "Mercredi",
      sessions: [
        { time: "10:00-12:00", class: "Groupe Coran Débutants", subject: "Tajwid", teacher: "Sheikh Ahmed Al-Mansouri", room: "Salle 101" },
        { time: "14:00-16:00", class: "Groupe Arabe", subject: "Arabe", teacher: "Ustaz Fatima Al-Zahra", room: "Bibliothèque" },
      ]
    },
    {
      day: "Jeudi",
      sessions: [
        { time: "10:00-12:00", class: "Groupe Coran Intermédiaires", subject: "Tajwid", teacher: "Sheikh Youssef Al-Hassani", room: "Salle 102" },
        { time: "14:00-16:00", class: "Groupe Tafsir", subject: "Tafsir", teacher: "Sheikh Ibrahim Al-Mahdi", room: "Salle 101" },
      ]
    },
    {
      day: "Vendredi",
      sessions: [
        { time: "10:00-12:00", class: "Groupe Coran Avancés", subject: "Coran", teacher: "Sheikh Mohamed Al-Qurashi", room: "Salle 103" },
        { time: "14:00-16:00", class: "Groupe Arabe", subject: "Arabe", teacher: "Ustaz Fatima Al-Zahra", room: "Bibliothèque" },
      ]
    },
  ];

  const todayDay = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });
  const todayDayIndex = schedule.findIndex(s => s.day.toLowerCase() === todayDay.toLowerCase());

  return (
    <Layout tenantName="Masjid An-Noor" tenantSlug={params.tenant}>
      <div className="space-y-8">
        {/* Header avec navigation */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-4xl font-extrabold text-gray-900">📅 Emploi du temps</h1>
            </div>
            <p className="text-lg text-gray-600">Planning hebdomadaire des cours et activités</p>
          </div>
          <Link href={`/s/${params.tenant}/demo/classes`} className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
            ← Retour aux classes
          </Link>
        </div>

        {/* Emploi du temps */}
        <div className="bg-white shadow-lg rounded-xl">
          <div className="px-6 py-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Planning hebdomadaire
            </h3>
            
            <div className="space-y-4">
              {schedule.map((day, index) => (
                <div 
                  key={day.day} 
                  className={`border-2 rounded-xl p-6 transition-all duration-200 ${
                    index === todayDayIndex 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`text-lg font-semibold ${
                      index === todayDayIndex ? 'text-blue-700' : 'text-gray-900'
                    }`}>
                      {day.day}
                      {index === todayDayIndex && (
                        <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Aujourd'hui
                        </span>
                      )}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {day.sessions.length} session{day.sessions.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {day.sessions.map((session, i) => (
                      <div 
                        key={i} 
                        className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-sm font-mono font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">
                            {session.time}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{session.class}</div>
                            <div className="text-sm text-gray-600">
                              {session.subject} • {session.teacher}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{session.room}</div>
                          <div className="text-xs text-gray-500">Salle</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Informations complémentaires */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📋 Informations pratiques
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="mr-2">⏰</span>
                Horaires : 10h-12h et 14h-16h
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                Toutes les salles au rez-de-chaussée
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                Contact : +33 1 23 45 67 89
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                Email : contact@masjid-noor.com
              </li>
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🎯 Prochaines sessions
            </h3>
            <div className="space-y-3">
              {schedule[todayDayIndex >= 0 ? todayDayIndex : 0].sessions.map((session, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-xl">📚</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{session.class}</div>
                    <div className="text-xs text-gray-600">Aujourd'hui • {session.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
