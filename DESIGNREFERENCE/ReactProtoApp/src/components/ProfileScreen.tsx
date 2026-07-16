/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Booking } from '../types';

interface ProfileScreenProps {
  user: User;
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onNavigateHome: () => void;
  isSimulatorMode: boolean;
  onToggleSimulator: () => void;
}

export default function ProfileScreen({
  user,
  bookings,
  onCancelBooking,
  onNavigateHome,
  isSimulatorMode,
  onToggleSimulator,
}: ProfileScreenProps) {
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const confirmCancel = () => {
    if (cancelTargetId) {
      onCancelBooking(cancelTargetId);
      setCancelTargetId(null);
      triggerToast('Бронирование успешно отменено');
    }
  };

  return (
    <div className="pt-4 pb-28 px-5 max-w-md mx-auto space-y-8 animate-fade-in">
      {/* Header Profile Info */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-brand-primary-container border-2 border-brand-outline-variant/30 overflow-hidden shadow-sm">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMUdlHQnE1xygLLQ-YWHtG7hTV6mCoFSmnGUeBsdDOxHoNTZpXP4LBYcCd0XLjYHQa_Rwz0mfAyjjQymXDtW3YFmY30BT0O-np3NE9zR9xJHMpEQg5_R0IE9MsjTyyQ3P0sotwPUN2-qJInuNaivNvTeMDYzyVYzYJ6NaJt668LdM1sg3kXMTmzWU51n48l-AakonhVCMQwJB4RMNwPkDpDr7-8sXMzARqdgiQI0A7rN8czcPGSyQ4lY6NjPUxg7owbkPlp-8Y1C8"
            alt="Alex Avatar"
          />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-brand-primary leading-tight">{user.name}</h2>
          <p className="text-xs text-brand-outline">В клубе с {user.memberSince}</p>
        </div>
      </div>

      {/* Member Loyalty Card */}
      <section className="bg-gradient-to-br from-brand-primary-container via-[#1a2b44] to-[#0a1424] text-white p-6 rounded-3xl border border-white/10 shadow-lg relative overflow-hidden font-sans">
        <div className="relative z-10 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase text-brand-on-primary-container tracking-wider font-bold">LUMINA CLUB</span>
              <h3 className="font-display text-lg font-bold text-white tracking-wide mt-0.5">{user.tier}</h3>
            </div>
            <span className="material-symbols-outlined text-brand-secondary-container filled text-[24px]">auto_awesome</span>
          </div>

          <div className="flex justify-between items-end pt-6">
            <div>
              <span className="text-[9px] uppercase text-brand-on-primary-container font-bold block">Клубные баллы</span>
              <span className="text-xl font-bold font-mono tracking-wide">{user.loyaltyPoints.toLocaleString()} PTS</span>
            </div>
            <button
              onClick={() => triggerToast('Баллы привязаны к следующему бронированию')}
              className="bg-brand-secondary-container text-brand-on-secondary-container hover:bg-[#ffe189] px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest active:scale-95 transition-all uppercase"
            >
              Использовать
            </button>
          </div>
        </div>
        {/* Background visual detail */}
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full border border-white/5 pointer-events-none" />
      </section>

      {/* Active Reservations list */}
      <section className="space-y-4">
        <h3 className="font-display text-lg font-bold text-brand-primary">Активные бронирования</h3>

        <AnimatePresence mode="popLayout">
          {bookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center py-10 px-5 rounded-2xl border border-dashed border-brand-outline-variant/30 space-y-3 bg-brand-surface-low"
            >
              <span className="material-symbols-outlined text-brand-outline text-[32px] font-light">hotel</span>
              <p className="text-xs text-brand-on-surface-variant font-medium">У вас пока нет активных бронирований.</p>
              <button
                onClick={onNavigateHome}
                className="inline-block bg-brand-primary text-white px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase active:scale-95 transition-transform shadow-sm"
              >
                Найти отель
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {bookings.map(booking => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={booking.id}
                  className="bg-brand-surface-low rounded-2xl p-4 border border-brand-outline-variant/15 shadow-[0_5px_15px_rgba(0,0,0,0.01)] space-y-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={booking.hotelImage}
                      alt={booking.hotelName}
                      className="w-16 h-16 rounded-xl object-cover border border-brand-outline-variant/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-display font-bold text-sm text-brand-primary truncate">{booking.hotelName}</h4>
                        <span className="text-[10px] font-mono text-brand-outline bg-brand-surface-container px-2 py-0.5 rounded-md font-semibold">
                          {booking.id}
                        </span>
                      </div>
                      <div className="flex gap-1 items-center text-xs text-brand-outline mt-1 font-sans">
                        <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                        <span>
                          {new Date(booking.checkIn).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })}
                          {' - '}
                          {new Date(booking.checkOut).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex gap-4 items-center text-[11px] text-brand-on-surface-variant mt-1.5 font-sans font-semibold">
                        <span>Гости: {booking.guests}</span>
                        <span>Сумма: €{booking.totalPriceEUR}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking actions */}
                  <div className="pt-3 border-t border-brand-outline-variant/10 flex justify-between gap-3 shrink-0">
                    <button
                      onClick={() => triggerToast(`Цифровой ключ ворот привязан к ваучеру ${booking.id}`)}
                      className="flex-1 bg-white hover:bg-brand-surface border border-brand-outline-variant/30 text-brand-primary py-2.5 rounded-xl text-[10px] font-bold tracking-widest uppercase active:scale-95 transition-transform"
                    >
                      Ключ в номер
                    </button>
                    <button
                      onClick={() => setCancelTargetId(booking.id)}
                      className="flex-1 bg-transparent hover:bg-brand-error/5 border border-brand-error/20 text-brand-error py-2.5 rounded-xl text-[10px] font-bold tracking-widest uppercase active:scale-95 transition-transform"
                    >
                      Отменить
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* Simulator / Display Preferences */}
      <section className="bg-brand-surface-low border border-brand-outline-variant/15 p-5 rounded-2xl space-y-4">
        <h4 className="font-display font-bold text-sm text-brand-primary">Настройки отображения</h4>
        
        <div className="flex justify-between items-center">
          <div>
            <h5 className="font-semibold text-xs">Симулятор iPhone 16 Pro</h5>
            <p className="text-[10px] text-brand-outline mt-0.5">Включить рамку смартфона на ПК</p>
          </div>
          <button
            onClick={onToggleSimulator}
            className={`w-12 h-6 rounded-full p-1 transition-all duration-300 outline-none ${
              isSimulatorMode ? 'bg-brand-primary' : 'bg-brand-outline-variant'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-all shadow-sm ${
                isSimulatorMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </section>

      {/* Cancel Warning alert modal */}
      <AnimatePresence>
        {cancelTargetId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCancelTargetId(null)}
              className="fixed inset-0 bg-black"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full z-10 shadow-2xl border border-brand-outline-variant/20 relative"
            >
              <h4 className="font-display font-bold text-base text-brand-primary mb-2">Отменить бронирование?</h4>
              <p className="text-xs text-brand-on-surface-variant leading-relaxed mb-6 font-sans">
                Вы собираетесь отменить бронирование <strong>{cancelTargetId}</strong>. Пожалуйста, подтвердите действие.
              </p>
              <div className="flex gap-3 justify-end font-sans">
                <button
                  onClick={() => setCancelTargetId(null)}
                  className="px-4 py-2.5 rounded-xl border border-brand-outline-variant/30 text-xs font-semibold hover:bg-brand-surface-low"
                >
                  Назад
                </button>
                <button
                  onClick={confirmCancel}
                  className="px-5 py-2.5 rounded-xl bg-brand-error text-white text-xs font-semibold hover:opacity-90"
                >
                  Да, отменить
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Toast feedback alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 bg-brand-primary text-white text-xs px-5 py-3 rounded-full font-medium tracking-wide shadow-lg border border-white/10"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
