/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Hotel, User, Booking } from '../types';
import BookingModal from './BookingModal';

interface DetailsScreenProps {
  hotel: Hotel;
  user: User;
  onAddBooking: (booking: Booking) => void;
  onToggleFavorite: (hotelId: string) => void;
  isFavorite: boolean;
}

export default function DetailsScreen({
  hotel,
  user,
  onAddBooking,
  onToggleFavorite,
  isFavorite,
}: DetailsScreenProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showMapToast, setShowMapToast] = useState(false);

  // Trigger fake map interaction
  const handleOpenMap = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMapToast(true);
    setTimeout(() => setShowMapToast(false), 2000);
  };

  return (
    <div className="pb-36 relative animate-fade-in">
      {/* Hero Image Section */}
      <section className="relative h-[530px] w-full overflow-hidden">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hotel.image})` }}
        />
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-brand-surface/25" />

        {/* Absolute bottom glass details card */}
        <div className="absolute bottom-8 left-5 right-5 z-10">
          <div className="glass-card p-6 rounded-2xl border border-white/25 shadow-xl">
            <span className="font-sans text-[11px] uppercase tracking-widest font-bold text-brand-secondary mb-1.5 block">
              Бутик-Отель
            </span>
            <h2 className="font-display text-2xl font-bold text-brand-on-surface mb-2">
              {hotel.name}
            </h2>
            <div className="flex items-center gap-2 text-brand-outline">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              <p className="font-sans text-xs text-brand-on-surface-variant font-medium">
                {hotel.locationDetail}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comfort Amenities, description and maps content */}
      <section className="px-5 mt-6 space-y-8 max-w-md mx-auto">
        {/* Amenities Grid */}
        <div className="grid grid-cols-3 gap-3">
          {hotel.amenities.slice(0, 3).map((amenity, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-brand-surface-low border border-brand-outline-variant/10 hover:border-brand-secondary/30 transition-all duration-300 shadow-[0_5px_15px_rgba(0,0,0,0.01)]"
            >
              <span className="material-symbols-outlined text-brand-primary mb-1 text-[22px] font-light">
                {amenity.icon}
              </span>
              <span className="font-sans text-[11px] font-bold text-brand-outline tracking-wider uppercase">
                {amenity.label}
              </span>
            </div>
          ))}
        </div>

        {/* Editorial Description */}
        <div className="space-y-4">
          <h3 className="font-display text-xl font-bold text-brand-primary border-b border-brand-outline-variant/15 pb-3">
            О ретрите
          </h3>
          <p className="font-sans text-[13px] text-brand-on-surface-variant leading-[1.7] font-normal">
            {hotel.description}
          </p>

          {/* User bookings count social stack */}
          <div className="mt-4 flex items-center gap-3 bg-brand-surface-low p-3 rounded-2xl border border-brand-outline-variant/10">
            <div className="flex -space-x-3">
              <div className="w-9 h-9 rounded-full border-2 border-brand-surface overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvhNWbAGrv1PXF-lTKugaR8JYLXJlF472jKEL_rdz6gCP1WUE3BoFTXvjbNLashMXbogh54fHZ1cXf3JjVsZZjagRVgKm3Yv-zmDmwRiCZ-WHK9aUY-dTdpcfHuoj7rQcEECo_qFMs_q96YFTJV9Wdqs1ujg7aqLiRr_qkUssHUHjwRIy6l3szv_Rqv2NelmIGEY4rfHcWme6ndEXAe3aDkp_XI5SDz2bJTScrNr-rEqSi5oprcowZgqvecLpRN2swKrM0oTrhs68"
                  alt="Traveller"
                />
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-brand-surface overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMUdlHQnE1xygLLQ-YWHtG7hTV6mCoFSmnGUeBsdDOxHoNTZpXP4LBYcCd0XLjYHQa_Rwz0mfAyjjQymXDtW3YFmY30BT0O-np3NE9zR9xJHMpEQg5_R0IE9MsjTyyQ3P0sotwPUN2-qJInuNaivNvTeMDYzyVYzYJ6NaJt668LdM1sg3kXMTmzWU51n48l-AakonhVCMQwJB4RMNwPkDpDr7-8sXMzARqdgiQI0A7rN8czcPGSyQ4lY6NjPUxg7owbkPlp-8Y1C8"
                  alt="Traveller"
                />
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-brand-surface bg-brand-surface-container flex items-center justify-center text-[10px] font-bold">
                +48
              </div>
            </div>
            <p className="font-sans text-[11px] font-medium text-brand-outline">
              Уже забронировали этот отель на этой неделе
            </p>
          </div>
        </div>

        {/* Coast Map Location Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="font-display text-xl font-bold text-brand-primary">Расположение</h3>
            <a
              href="#map"
              onClick={handleOpenMap}
              className="font-sans text-[11px] font-bold text-brand-secondary underline underline-offset-4 uppercase tracking-wider hover:opacity-80 transition-opacity"
            >
              Открыть карту
            </a>
          </div>

          <div className="h-64 w-full rounded-[2rem] overflow-hidden relative shadow-md border border-brand-outline-variant/15 group">
            {/* Minimalist Coast Map */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.02]"
              style={{ backgroundImage: `url(${hotel.mapImage})` }}
            />
            {/* Glass dark pin icon overlay */}
            <div className="absolute inset-0 bg-brand-on-surface/5 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center shadow-xl border border-white/20 animate-bounce">
                <span className="material-symbols-outlined text-white filled text-[24px]">location_on</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map notification Toast */}
      {showMapToast && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 bg-brand-primary text-white text-xs px-5 py-3 rounded-full font-medium tracking-wide shadow-lg border border-white/10 animate-fade-in-up">
          🗺️ Интеграция с картами Apple Maps...
        </div>
      )}

      {/* Sticky Booking Bottom Footer Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-brand-surface/90 backdrop-blur-2xl border-t border-brand-outline-variant/30 h-24 flex items-center px-5 z-35 pb-safe justify-between">
        <div className="max-w-[150px]">
          <span className="font-sans text-[10px] font-bold text-brand-outline uppercase tracking-wider block">
            От
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-brand-primary">
              €{hotel.priceEUR}
            </span>
            <span className="font-sans text-[11px] text-brand-outline">/ночь</span>
          </div>
        </div>

        <button
          onClick={() => setIsBookingOpen(true)}
          className="bg-brand-primary-container text-white px-9 h-14 rounded-2xl font-sans font-semibold text-sm shadow-lg active:scale-95 transition-all hover:opacity-90 tracking-wide"
        >
          Забронировать
        </button>
      </footer>

      {/* Real Checkout pipeline modal */}
      <BookingModal
        isOpen={isBookingOpen}
        hotel={hotel}
        user={user}
        onClose={() => setIsBookingOpen(false)}
        onAddBooking={onAddBooking}
      />
    </div>
  );
}
