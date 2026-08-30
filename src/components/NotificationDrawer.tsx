import React from 'react';
import { AppNotification } from '../types/farm';
import { useFarm } from '../context/FarmContext';
import { t, translateText } from '../services/i18n';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllRead: () => void;
  onDismiss: (id: string) => void;
  onActionClick: (notification: AppNotification) => void;
}

export const NotificationDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onDismiss,
  onActionClick,
}) => {
  const { selectedLanguage } = useFarm();
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex justify-end">
      <div className="bg-surface-container border-l border-surface-variant w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Top Header */}
        <div className="p-md border-b border-surface-variant flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">notifications</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">{t('notifications', selectedLanguage)}</h3>
            {unreadCount > 0 && (
              <span className="bg-error text-on-error font-label-sm px-2 py-0.5 rounded-full">
                {unreadCount} {t('newAlerts', selectedLanguage)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="text-label-sm text-primary hover:underline"
              >
                {t('markAllRead', selectedLanguage)}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container-high"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-md space-y-md">
          {notifications.length === 0 ? (
            <div className="text-center py-xl text-on-surface-variant font-body-md">
              {t('noAlerts', selectedLanguage)}
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-md rounded-xl border transition-all flex flex-col gap-xs relative ${
                  !n.isRead
                    ? 'bg-surface-variant border-primary/40 shadow-md'
                    : 'bg-surface-container-low border-surface-variant opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center">
                      {n.category === 'irrigation' && <span className="material-symbols-outlined text-primary text-xl">water_drop</span>}
                      {n.category === 'pest' && <span className="material-symbols-outlined text-error text-xl">bug_report</span>}
                      {n.category === 'disease' && <span className="material-symbols-outlined text-error text-xl">warning</span>}
                      {n.category === 'weed' && <span className="material-symbols-outlined text-primary text-xl">grass</span>}
                      {n.category === 'drone' && <span className="material-symbols-outlined text-primary text-xl">flight_takeoff</span>}
                      {n.category === 'weather' && <span className="material-symbols-outlined text-tertiary text-xl">thermostat</span>}
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface">{translateText(n.title, selectedLanguage)}</h4>
                  </div>
                  <button
                    onClick={() => onDismiss(n.id)}
                    className="text-on-surface-variant hover:text-on-surface p-1"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>

                <p className="font-body-md text-on-surface-variant leading-normal">{translateText(n.message, selectedLanguage)}</p>
                <span className="font-label-sm text-on-surface-variant text-[11px] mt-1">{translateText(n.timestamp, selectedLanguage)}</span>

                {n.actionLabel && (
                  <div className="mt-2 pt-2 border-t border-surface-variant/50 flex justify-end">
                    <button
                      onClick={() => onActionClick(n)}
                      className="px-3 py-1.5 bg-primary text-on-primary font-label-lg text-label-lg rounded-lg hover:bg-primary-fixed transition-colors shadow-sm"
                    >
                      {translateText(n.actionLabel, selectedLanguage)}
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

