/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentScreen: 'home' | 'details' | 'offers' | 'profile';
  onBack?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onNavigate: (screen: 'home' | 'offers' | 'profile') => void;
  userName?: string;
  onOpenDrawer?: () => void;
}

export default function Header({
  currentScreen,
  onBack,
  isFavorite,
  onToggleFavorite,
  onNavigate,
  userName = 'Алекс',
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Регистрация подтверждена', desc: 'Ваше бронирование в The Azure Retreat готово.', time: '10 мин назад', unread: true },
    { id: 2, title: 'Приветственный бонус', desc: 'Вам начислено 1,000 баллов Lumina Circle.', time: '1 день назад', unread: false },
    { id: 3, title: 'Особое событие', desc: 'Шеф Марко Пьер приглашает на Ночь Мишлен.', time: '2 дня назад', unread: false }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <>
      <header className="sticky top-0 w-full z-40 bg-brand-surface/80 backdrop-blur-xl border-b border-brand-outline-variant/30 h-16 flex justify-between items-center px-5 transition-shadow duration-300">
        {/* Left Action Button */}
        {currentScreen === 'details' ? (
          <button
            id="header-back-btn"
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full active:scale-90 hover:bg-black/5 transition-transform duration-200 text-brand-primary"
          >
            <span className="material-symbols-outlined font-light text-[22px]">arrow_back_ios</span>
          </button>
        ) : (
          <button
            id="header-menu-btn"
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full active:scale-90 hover:bg-black/5 transition-transform duration-200 text-brand-primary"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
        )}

        {/* Brand Title */}
        <button
          onClick={() => onNavigate('home')}
          className="font-display text-[22px] font-semibold tracking-[0.2em] text-brand-primary uppercase translate-x-1 active:scale-98 transition-transform"
        >
          LUMINA
        </button>

        {/* Right Action Button */}
        {currentScreen === 'details' ? (
          <button
            id="header-fav-btn"
            onClick={onToggleFavorite}
            className="flex items-center justify-center w-10 h-10 -mr-2 rounded-full active:scale-90 transition-transform duration-200"
          >
            <span
              className={`material-symbols-outlined text-[24px] transition-colors duration-300 ${
                isFavorite ? 'filled text-brand-error' : 'text-brand-primary'
              }`}
            >
              favorite
            </span>
          </button>
        ) : (
          <div className="relative">
            <button
              id="header-notif-btn"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="flex items-center justify-center w-10 h-10 -mr-2 rounded-full active:scale-90 hover:bg-black/5 transition-transform duration-200 text-brand-primary"
            >
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-2 right-0 w-2.5 h-2.5 bg-brand-error rounded-full border-2 border-brand-surface" />
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {isNotifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-brand-outline-variant/30 z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-brand-surface-container flex justify-between items-center bg-brand-surface-low">
                      <h4 className="font-semibold text-sm">Уведомления</h4>
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-xs text-brand-secondary font-medium">
                          Прочитать все
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto no-scrollbar">
                      {notifications.map(notif => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-brand-surface-container/50 last:border-b-0 flex gap-3 transition-colors ${
                            notif.unread ? 'bg-brand-surface-low/60' : 'hover:bg-brand-surface-low/30'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.unread ? 'bg-brand-secondary' : 'bg-transparent'}`} />
                          <div className="flex-1">
                            <div className="flex justify-between items-baseline gap-2">
                              <h5 className="font-semibold text-xs text-brand-on-surface">{notif.title}</h5>
                              <span className="text-[10px] text-brand-outline flex-shrink-0">{notif.time}</span>
                            </div>
                            <p className="text-xs text-brand-on-surface-variant mt-0.5 leading-relaxed">{notif.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}
      </header>

      {/* Hamburger Side Drawer Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-brand-surface z-50 shadow-2xl flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-10">
                  <span className="font-display text-xl font-bold tracking-[0.2em] text-brand-primary">LUMINA</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 active:scale-90"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                {/* Profile Card Summary */}
                <div className="p-4 rounded-2xl bg-brand-surface-container mb-8">
                  <p className="text-[10px] text-brand-outline font-bold tracking-widest uppercase mb-1">
                    Клубная карта Lumina Circle
                  </p>
                  <h4 className="font-display text-lg font-bold text-brand-primary">Добро пожаловать, {userName}</h4>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-brand-outline-variant/20">
                    <span className="text-xs text-brand-on-surface-variant">Премиум статус</span>
                    <span className="text-xs bg-brand-secondary-container text-brand-on-secondary-container font-semibold px-2 py-0.5 rounded-full">
                      Lumina Circle
                    </span>
                  </div>
                </div>

                {/* Navigation links */}
                <nav className="space-y-1">
                  {[
                    { id: 'home', label: 'Главная', icon: 'home_max' },
                    { id: 'offers', label: 'Особые события', icon: 'auto_awesome' },
                    { id: 'profile', label: 'Профиль & Брони', icon: 'person_pin' },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setIsMenuOpen(false);
                        onNavigate(item.id as any);
                      }}
                      className={`w-full flex items-center gap-4 py-3.5 px-3 rounded-xl font-medium text-sm transition-colors ${
                        currentScreen === item.id
                          ? 'bg-brand-primary text-white'
                          : 'text-brand-on-surface hover:bg-black/5'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Drawer footer info */}
              <div className="p-6 border-t border-brand-surface-container text-center bg-brand-surface-low">
                <p className="text-[10px] text-brand-outline tracking-wider">
                  © 2026 Lumina Hotels Group
                </p>
                <p className="text-[9px] text-brand-outline-variant mt-1 font-mono">
                  Expo SDK 57 iOS Design System
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
