'use client';

import { useState } from 'react';

interface Notification {
  id: string;
  type: 'event' | 'reminder' | 'announcement';
  title: string;
  message: string;
  date: string;
  icon: string;
}

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(true);
  
  // Données de démo pour les notifications
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'event',
      title: 'Examen Coranique',
      message: 'Examen de récitation pour les groupes Débutants et Intermédiaires',
      date: '2025-09-28',
      icon: '📚'
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Réunion parents-professeurs',
      message: 'Réunion trimestrielle prévue le 2 octobre à 16h',
      date: '2025-10-02',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      id: '3',
      type: 'announcement',
      title: 'Inscriptions ouvertes',
      message: 'Nouvelles inscriptions pour le second trimestre - Date limite: 15 octobre',
      date: '2025-10-15',
      icon: '📝'
    },
    {
      id: '4',
      type: 'event',
      title: 'Activité extra-scolaire',
      message: 'Sortie éducative au Centre Culturel - Samedi 12 octobre',
      date: '2025-10-12',
      icon: '🎯'
    }
  ];

  // Calculer les jours restants
  const getDaysUntil = (dateString: string): number => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filtrer les événements à venir (dans les 30 prochains jours)
  const upcomingNotifications = notifications.filter(notif => {
    const daysUntil = getDaysUntil(notif.date);
    return daysUntil >= 0 && daysUntil <= 30;
  }).sort((a, b) => getDaysUntil(a.date) - getDaysUntil(b.date));

  if (!isOpen || upcomingNotifications.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl">🔔</div>
            <div>
              <h3 className="font-semibold text-lg">Événements à venir</h3>
              <p className="text-sm text-blue-100">
                {upcomingNotifications.length} événement{upcomingNotifications.length > 1 ? 's' : ''} prochain{upcomingNotifications.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Liste des notifications */}
            <div className="hidden md:flex items-center space-x-6">
              {upcomingNotifications.slice(0, 3).map((notif) => {
                const daysUntil = getDaysUntil(notif.date);
                return (
                  <div 
                    key={notif.id} 
                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <span className="text-xl">{notif.icon}</span>
                    <div>
                      <div className="text-sm font-medium">{notif.title}</div>
                      <div className="text-xs text-blue-100">
                        {daysUntil === 0 ? "Aujourd'hui" : daysUntil === 1 ? "Demain" : `Dans ${daysUntil} jours`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Bouton pour masquer */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Masquer les notifications"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
