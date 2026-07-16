/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hotel, Booking, User } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  hotel: Hotel;
  user: User;
  onClose: () => void;
  onAddBooking: (booking: Booking) => void;
}

export default function BookingModal({
  isOpen,
  hotel,
  user,
  onClose,
  onAddBooking,
}: BookingModalProps) {
  // Setup date defaults
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 3);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(tomorrowStr);
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState<'classic' | 'deluxe' | 'signature'>('classic');
  const [guestName, setGuestName] = useState(user.name);
  const [guestEmail, setGuestEmail] = useState(user.email);
  const [step, setStep] = useState<1 | 2>(1); // 1: Config, 2: Ticket / Success

  const [nightsCount, setNightsCount] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newBookingId, setNewBookingId] = useState('');

  // Calculate nights
  useEffect(() => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const timeDiff = d2.getTime() - d1.getTime();
    const nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
    setNightsCount(nights);
  }, [checkIn, checkOut]);

  // Pricing constants
  const basePrice = hotel.priceEUR;
  const upgradeCost = roomType === 'deluxe' ? 150 : roomType === 'signature' ? 350 : 0;
  const pricePerNight = basePrice + upgradeCost;
  const subtotal = pricePerNight * nightsCount;
  const discount = user.isCircleMember ? Math.round(subtotal * 0.1) : 0; // 10% Member discount
  const serviceCharge = Math.round(subtotal * 0.05); // 5% service charge
  const totalPrice = subtotal - discount + serviceCharge;

  const handleBookingSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `LMN-${Math.floor(100000 + Math.random() * 900000)}`;
      const booking: Booking = {
        id: generatedId,
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelImage: hotel.image,
        checkIn,
        checkOut,
        guests,
        totalPriceEUR: totalPrice,
        status: 'confirmed',
        createdAt: new Date().toLocaleDateString('ru-RU')
      };
      onAddBooking(booking);
      setNewBookingId(generatedId);
      setIsSubmitting(false);
      setStep(2);
    }, 1200); // simulate booking pipeline
  };

  const getRoomTypeName = () => {
    switch (roomType) {
      case 'deluxe': return 'Deluxe Panorama Suite';
      case 'signature': return 'Signature Penthouse';
      default: return 'Classic Luxury Suite';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={step === 1 ? onClose : undefined} // disable backdrop close on confirmation ticket
            className="fixed inset-0 bg-black"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative bg-brand-surface w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[85dvh]"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-brand-outline-variant/20 flex justify-between items-center bg-brand-surface-low shrink-0">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-outline">Бронирование</span>
                <h3 className="font-display text-lg font-bold text-brand-primary">{hotel.name}</h3>
              </div>
              {step === 1 && (
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 text-brand-primary active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              )}
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto no-scrollbar space-y-6">
              {step === 1 ? (
                <>
                  {/* Step 1: Booking Preferences */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-brand-outline block">Check-in</label>
                      <input
                        type="date"
                        min={todayStr}
                        value={checkIn}
                        onChange={(e) => {
                          setCheckIn(e.target.value);
                          if (new Date(e.target.value) >= new Date(checkOut)) {
                            const nextDay = new Date(e.target.value);
                            nextDay.setDate(nextDay.getDate() + 1);
                            setCheckOut(nextDay.toISOString().split('T')[0]);
                          }
                        }}
                        className="w-full bg-brand-surface-container border border-brand-outline-variant/30 px-3 py-2.5 rounded-xl font-medium text-sm focus:border-brand-secondary outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-brand-outline block">Check-out</label>
                      <input
                        type="date"
                        min={checkIn}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-brand-surface-container border border-brand-outline-variant/30 px-3 py-2.5 rounded-xl font-medium text-sm focus:border-brand-secondary outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Guests selection with Counter */}
                  <div className="flex justify-between items-center bg-brand-surface-low border border-brand-outline-variant/20 p-4 rounded-2xl">
                    <div>
                      <h4 className="font-semibold text-sm">Количество гостей</h4>
                      <p className="text-xs text-brand-on-surface-variant">Максимум 4 гостей в номере</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                        className="w-8 h-8 rounded-full bg-brand-surface border border-brand-outline-variant/40 flex items-center justify-center active:scale-90 transition-transform disabled:opacity-40 disabled:scale-100"
                      >
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                      </button>
                      <span className="font-semibold font-sans text-sm w-4 text-center">{guests}</span>
                      <button
                        onClick={() => setGuests(Math.min(4, guests + 1))}
                        disabled={guests >= 4}
                        className="w-8 h-8 rounded-full bg-brand-surface border border-brand-outline-variant/40 flex items-center justify-center active:scale-90 transition-transform disabled:opacity-40 disabled:scale-100"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                  </div>

                  {/* Room upgrade list */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-outline block">Категория номера</label>
                    <div className="space-y-2">
                      {[
                        { id: 'classic', label: 'Classic Luxury Suite', desc: 'Просторный кикладский люкс с террасой', extra: 0 },
                        { id: 'deluxe', label: 'Deluxe Panorama Suite', desc: 'Вид на кальдеру и собственный подогреваемый спа', extra: 150 },
                        { id: 'signature', label: 'Signature Penthouse', desc: 'Премиум люкс с приватным инфинити-бассейном', extra: 350 },
                      ].map((room) => (
                        <button
                          key={room.id}
                          onClick={() => setRoomType(room.id as any)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all flex justify-between items-start ${
                            roomType === room.id
                              ? 'border-brand-primary bg-brand-surface-container shadow-sm'
                              : 'border-brand-outline-variant/20 hover:border-brand-outline-variant/60'
                          }`}
                        >
                          <div className="flex-1 pr-4">
                            <h5 className="font-semibold text-sm flex items-center gap-2">
                              {room.label}
                              {roomType === room.id && (
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                              )}
                            </h5>
                            <p className="text-xs text-brand-on-surface-variant mt-0.5 leading-relaxed">{room.desc}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {room.extra === 0 ? (
                              <span className="text-xs font-semibold text-brand-secondary">Включено</span>
                            ) : (
                              <span className="text-xs font-semibold font-sans text-brand-primary">+€{room.extra}/н</span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Guest details form */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-outline block">Данные гостя</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] text-brand-outline font-semibold">Имя</span>
                        <input
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          className="w-full bg-brand-surface-container border border-brand-outline-variant/20 px-3 py-2 rounded-xl text-xs font-semibold outline-none focus:border-brand-secondary"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-brand-outline font-semibold">Email</span>
                        <input
                          type="email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="w-full bg-brand-surface-container border border-brand-outline-variant/20 px-3 py-2 rounded-xl text-xs font-semibold outline-none focus:border-brand-secondary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="bg-brand-surface-low border border-brand-outline-variant/20 p-5 rounded-2xl space-y-3 font-sans">
                    <h4 className="font-display font-bold text-sm text-brand-primary border-b border-brand-outline-variant/20 pb-2">Детализация стоимости</h4>
                    <div className="flex justify-between text-xs text-brand-on-surface-variant">
                      <span>{nightsCount} {nightsCount === 1 ? 'ночь' : nightsCount < 5 ? 'ночи' : 'ночей'} x €{pricePerNight}</span>
                      <span>€{subtotal}</span>
                    </div>

                    {user.isCircleMember && (
                      <div className="flex justify-between text-xs text-brand-secondary font-medium">
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px] filled">auto_awesome</span>
                          Скидка Lumina Circle (10%)
                        </span>
                        <span>-€{discount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-xs text-brand-on-surface-variant">
                      <span>Сервисный сбор (5%)</span>
                      <span>€{serviceCharge}</span>
                    </div>

                    <div className="border-t border-brand-outline-variant/20 pt-2 flex justify-between items-baseline font-bold">
                      <span className="text-sm">Итого к оплате</span>
                      <span className="text-lg text-brand-primary">€{totalPrice}</span>
                    </div>
                  </div>
                </>
              ) : (
                /* Step 2: Confirmation / Digital Ticket Pass */
                <div className="flex flex-col items-center justify-center py-6">
                  {/* Success Anim checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-16 h-16 bg-brand-secondary-container rounded-full flex items-center justify-center mb-6"
                  >
                    <span className="material-symbols-outlined text-brand-on-secondary-container font-bold text-[36px]">check</span>
                  </motion.div>

                  <h3 className="font-display text-2xl font-bold text-brand-primary mb-1 text-center">Отель забронирован!</h3>
                  <p className="text-xs text-brand-on-surface-variant text-center max-w-sm mb-6 leading-relaxed">
                    Поздравляем! Ваше бронирование подтверждено. Мы отправили ваучер на <strong>{guestEmail}</strong>.
                  </p>

                  {/* Immersive Apple Wallet style boarding pass ticket */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full bg-brand-primary-container text-white rounded-3xl overflow-hidden shadow-xl border border-white/10 flex flex-col font-sans"
                  >
                    {/* Ticket Header */}
                    <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/20">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-brand-secondary-container filled text-[20px]">auto_awesome</span>
                        <span className="font-display text-xs tracking-wider font-semibold uppercase">LUMINA PASS</span>
                      </div>
                      <span className="text-[10px] text-brand-on-primary-container font-semibold tracking-wider font-mono">{newBookingId}</span>
                    </div>

                    {/* Ticket details body */}
                    <div className="p-6 space-y-4">
                      {/* Property */}
                      <div>
                        <span className="text-[10px] uppercase text-brand-on-primary-container tracking-wider font-bold block">Отель</span>
                        <h4 className="font-display text-base font-bold text-white leading-tight mt-0.5">{hotel.name}</h4>
                        <p className="text-xs text-brand-on-primary-container mt-0.5">{hotel.locationDetail}</p>
                      </div>

                      {/* Guest and room info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] uppercase text-brand-on-primary-container tracking-wider font-bold block">Гость</span>
                          <span className="text-xs font-semibold text-white mt-0.5 block truncate">{guestName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-brand-on-primary-container tracking-wider font-bold block">Категория</span>
                          <span className="text-xs font-semibold text-white mt-0.5 block truncate">{getRoomTypeName()}</span>
                        </div>
                      </div>

                      {/* Check-in, check-out, guests details */}
                      <div className="grid grid-cols-3 gap-2 bg-black/15 p-3 rounded-2xl text-center border border-white/5">
                        <div>
                          <span className="text-[9px] uppercase text-brand-on-primary-container block font-bold">Check-in</span>
                          <span className="text-xs font-bold text-white mt-0.5 block">
                            {new Date(checkIn).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-brand-on-primary-container block font-bold">Check-out</span>
                          <span className="text-xs font-bold text-white mt-0.5 block">
                            {new Date(checkOut).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-brand-on-primary-container block font-bold">Гости</span>
                          <span className="text-xs font-bold text-white mt-0.5 block">{guests} {guests === 1 ? 'чел' : 'чел'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Ticket barcode scanner section */}
                    <div className="bg-white text-black p-5 flex flex-col items-center justify-center gap-3 border-t-2 border-dashed border-brand-primary-container/40 relative">
                      {/* Dashboard notch holes */}
                      <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-brand-surface" />
                      <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-brand-surface" />

                      {/* Pseudo Barcode */}
                      <div className="flex gap-0.5 h-10 w-full max-w-[240px] items-stretch justify-center opacity-85">
                        {Array.from({ length: 42 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-black"
                            style={{
                              width: i % 5 === 0 ? '4px' : i % 3 === 0 ? '1px' : '2px',
                              opacity: i % 7 === 0 ? 0.3 : 1
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] font-mono tracking-[0.25em] text-brand-outline uppercase">
                        {checkIn.replace(/-/g, '')} - {newBookingId}
                      </span>
                    </div>
                  </motion.div>

                  {/* Add to Apple Wallet Mock Button */}
                  <button className="mt-5 w-full bg-black text-white hover:bg-black/90 active:scale-95 transition-transform py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 font-medium text-xs">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.72 13c.28 0 .53.18.61.45.36 1.18.17 2.45-.54 3.48-.7 1.02-1.85 1.67-3.1 1.76l-.16.01h-7.1c-1.33 0-2.54-.7-3.21-1.84-.66-1.13-.64-2.52.06-3.64l.08-.12c.54-.78 1.4-1.25 2.34-1.25H18.72zm-11 2H6.96c-.4 0-.75.22-.92.56-.24.47-.23 1.03.04 1.49.25.43.71.69 1.21.69h7.1c.49 0 .93-.24 1.17-.63.26-.43.27-.96.03-1.4-.17-.31-.51-.51-.88-.56L14.6 15H7.72z" />
                    </svg>
                    Добавить в Apple Wallet
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Footer Actions */}
            <div className="p-5 border-t border-brand-outline-variant/20 bg-brand-surface flex justify-between items-center shrink-0">
              {step === 1 ? (
                <>
                  <div className="flex-1 pr-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-brand-outline block">Итоговая стоимость</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-xl font-bold text-brand-primary">€{totalPrice}</span>
                      <span className="text-xs text-brand-outline">/ за {nightsCount} н.</span>
                    </div>
                  </div>
                  <button
                    id="confirm-booking-btn"
                    onClick={handleBookingSubmit}
                    disabled={isSubmitting}
                    className="bg-brand-primary-container text-white hover:opacity-90 active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all duration-300 px-8 py-3.5 rounded-xl font-semibold text-sm shadow-md"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Оформление...
                      </div>
                    ) : (
                      'Подтвердить'
                    )}
                  </button>
                </>
              ) : (
                <button
                  id="ticket-close-btn"
                  onClick={() => {
                    setStep(1);
                    onClose();
                  }}
                  className="w-full bg-brand-primary text-white hover:opacity-90 active:scale-95 transition-transform py-3.5 rounded-xl font-semibold text-sm"
                >
                  Готово
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
