/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SpecialEvent, User, Booking } from '../types';

interface OffersScreenProps {
  events: SpecialEvent[];
  user: User;
  onAddBooking: (booking: Booking) => void;
}

export default function OffersScreen({ events, user, onAddBooking }: OffersScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Gastronomy' | 'Wellness' | 'Music'>('all');
  const [bookingEvent, setBookingEvent] = useState<SpecialEvent | null>(null);
  const [quantity, setQuantity] = useState(2);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'all', label: 'Все' },
    { id: 'Gastronomy', label: 'Гастрономия' },
    { id: 'Wellness', label: 'Wellness' },
    { id: 'Music', label: 'Музыка' },
  ] as const;

  const filteredEvents = events.filter(e => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'Gastronomy') return e.category === 'Гастрономия';
    if (selectedCategory === 'Wellness') return e.category === 'Wellness';
    if (selectedCategory === 'Music') return e.category === 'Музыка';
    return true;
  });

  const handleBookEvent = (event: SpecialEvent) => {
    setBookingEvent(event);
    setSuccessId(null);
    setQuantity(2);
  };

  const submitEventBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      if (!bookingEvent) return;
      const refId = `EVT-${Math.floor(100000 + Math.random() * 900000)}`;
      const price = (bookingEvent.priceAmount || 0) * quantity;
      
      const newBooking: Booking = {
        id: refId,
        hotelId: bookingEvent.id,
        hotelName: `${bookingEvent.title} (Опыт)`,
        hotelImage: bookingEvent.image,
        checkIn: new Date().toISOString().split('T')[0],
        checkOut: new Date().toISOString().split('T')[0],
        guests: quantity,
        totalPriceEUR: price,
        status: 'confirmed',
        createdAt: new Date().toLocaleDateString('ru-RU'),
      };

      onAddBooking(newBooking);
      setSuccessId(refId);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="pt-4 pb-28 px-5 max-w-md mx-auto space-y-6 animate-fade-in">
      <div>
        <p className="font-sans text-[11px] font-bold tracking-[0.15em] text-brand-outline uppercase mb-1">Эксклюзивные предложения</p>
        <h2 className="font-display text-3xl font-bold text-brand-primary">Особые события</h2>
      </div>

      {/* Categories chips container */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold font-sans transition-all shrink-0 active:scale-95 ${
              selectedCategory === cat.id
                ? 'bg-brand-primary text-white shadow-sm'
                : 'bg-brand-surface-low text-brand-on-surface-variant hover:bg-brand-surface-container'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Events Listing */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map(event => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={event.id}
              className="bg-brand-surface-low rounded-[2rem] overflow-hidden border border-brand-outline-variant/15 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col group"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <span className="absolute top-4 left-4 bg-white/95 text-brand-primary px-4 py-1.5 rounded-full font-sans text-[10px] font-bold tracking-wider uppercase shadow-sm">
                  {event.category}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-brand-primary leading-snug">{event.title}</h3>
                  <div className="flex items-center gap-1.5 text-brand-outline mt-1">
                    <span className="material-symbols-outlined text-[15px]">location_on</span>
                    <span className="text-[11px] font-semibold">{event.location}</span>
                  </div>
                </div>

                <p className="text-xs text-brand-on-surface-variant leading-relaxed font-sans">{event.description}</p>

                <div className="pt-4 border-t border-brand-outline-variant/10 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-brand-outline">Стоимость</span>
                    <span className="font-sans font-bold text-sm text-brand-secondary">{event.originalPriceText}</span>
                  </div>
                  <button
                    onClick={() => handleBookEvent(event)}
                    className="bg-brand-primary-container text-white px-6 py-3 rounded-xl font-sans font-bold text-xs active:scale-90 transition-transform shadow-sm"
                  >
                    Заказать
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Fast event booker dialog */}
      <AnimatePresence>
        {bookingEvent && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingEvent(null)}
              className="fixed inset-0 bg-black"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative bg-brand-surface w-full max-w-sm rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col p-6 z-10"
            >
              {!successId ? (
                <div className="space-y-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-bold tracking-widest text-brand-outline uppercase block">Быстрое бронирование</span>
                      <h4 className="font-display font-bold text-base text-brand-primary leading-tight">{bookingEvent.title}</h4>
                    </div>
                    <button
                      onClick={() => setBookingEvent(null)}
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 active:scale-90"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>

                  <p className="text-xs text-brand-on-surface-variant font-sans">{bookingEvent.description}</p>

                  {/* Quantity selector */}
                  <div className="flex justify-between items-center bg-brand-surface-low p-4 rounded-xl border border-brand-outline-variant/10">
                    <span className="text-xs font-semibold">Количество билетов</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-7 h-7 bg-white rounded-full flex items-center justify-center border border-brand-outline-variant/20 active:scale-90"
                      >
                        -
                      </button>
                      <span className="font-bold text-xs w-4 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-7 h-7 bg-white rounded-full flex items-center justify-center border border-brand-outline-variant/20 active:scale-90"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total price or member details */}
                  <div className="bg-brand-secondary-container/10 p-4 rounded-xl border border-brand-secondary-container/30 flex justify-between items-center">
                    <span className="text-xs font-semibold text-brand-on-secondary-container">Итоговая цена</span>
                    <span className="text-sm font-bold text-brand-primary">
                      {bookingEvent.priceAmount === 0 ? 'Бесплатно' : `${(bookingEvent.priceAmount || 150) * quantity * 100}₽`}
                    </span>
                  </div>

                  <button
                    onClick={submitEventBooking}
                    disabled={isSubmitting}
                    className="w-full bg-brand-primary text-white py-3.5 rounded-xl text-xs font-bold active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Подтверждаем...' : 'Забронировать билеты'}
                  </button>
                </div>
              ) : (
                /* Event Ticket confirmation success */
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 bg-brand-secondary-container rounded-full flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-brand-on-secondary-container text-[24px] font-bold">check</span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg">Билеты забронированы!</h4>
                    <p className="text-xs text-brand-on-surface-variant mt-1">Опыт успешно привязан к вашей карте Lumina Circle.</p>
                  </div>
                  
                  <div className="p-4 bg-brand-surface-low rounded-xl text-left border border-brand-outline-variant/10 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-brand-outline">Событие:</span>
                      <span className="font-bold">{bookingEvent.title}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-brand-outline">Код брони:</span>
                      <span className="font-bold">{successId}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-brand-outline">Билетов:</span>
                      <span className="font-bold">{quantity} шт.</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingEvent(null)}
                    className="w-full bg-brand-primary text-white py-3 rounded-xl text-xs font-bold"
                  >
                    Прекрасно
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
