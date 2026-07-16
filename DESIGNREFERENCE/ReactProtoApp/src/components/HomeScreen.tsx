/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Hotel, SpecialEvent, User } from '../types';

interface HomeScreenProps {
  hotels: Hotel[];
  events: SpecialEvent[];
  user: User;
  onSelectHotel: (hotelId: string) => void;
  onJoinCircle: () => void;
  onSelectEvent: (eventId: string) => void;
}

export default function HomeScreen({
  hotels,
  events,
  user,
  onSelectHotel,
  onJoinCircle,
  onSelectEvent,
}: HomeScreenProps) {
  // Isolate hotels
  const peakResidence = hotels.find(h => h.id === 'lumina-peak');
  const azureCove = hotels.find(h => h.id === 'azure-retreat');
  const verdantSanctuary = hotels.find(h => h.id === 'verdant-sanctuary');

  return (
    <div className="pt-4 pb-28 px-5 max-w-md mx-auto space-y-10 animate-fade-in">
      {/* Greeting Section */}
      <section className="mt-4">
        <p className="font-sans text-[11px] font-bold tracking-[0.15em] text-brand-outline uppercase mb-1">
          Рады видеть вас снова
        </p>
        <h2 className="font-display text-3xl font-bold text-brand-primary tracking-tight">
          Добро пожаловать, {user.name}
        </h2>
      </section>

      {/* Featured Hotels */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-display text-xl font-bold tracking-tight text-brand-primary">Наши бутик-отели</h3>
          <button
            onClick={() => onSelectHotel('azure-retreat')}
            className="text-[11px] font-bold tracking-wider text-brand-primary border-b border-brand-primary/20 pb-0.5 uppercase hover:border-brand-primary transition-colors"
          >
            Смотреть все
          </button>
        </div>

        <div className="space-y-6">
          {/* Hotel 1 (Large Hero Card) */}
          {peakResidence && (
            <div className="relative group overflow-hidden rounded-[2rem] h-[440px] shadow-[0_25px_50px_-15px_rgba(13,28,50,0.12)] border border-brand-outline-variant/10">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${peakResidence.image})` }}
              />
              {/* Gradient cover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Bottom glassmorphic overlay details card */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="glass-card p-5 rounded-2xl border border-white/25 shadow-lg">
                  <h4 className="font-display text-[22px] font-bold text-brand-primary leading-tight mb-1.5">
                    {peakResidence.name}
                  </h4>
                  <p className="font-sans text-xs text-brand-on-surface-variant leading-relaxed mb-4">
                    {peakResidence.description.slice(0, 84)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold text-[13px] tracking-wide text-brand-primary">
                      {peakResidence.originalPriceText}
                    </span>
                    <button
                      onClick={() => onSelectHotel(peakResidence.id)}
                      className="bg-brand-primary hover:bg-black/90 text-white px-5 py-2.5 rounded-full font-sans text-[11px] font-bold tracking-widest active:scale-90 transition-transform shadow-md uppercase"
                    >
                      БРОНЬ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hotel 2 & 3 Side Bento-Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Azure Cove Villa */}
            {azureCove && (
              <div
                onClick={() => onSelectHotel(azureCove.id)}
                className="relative group overflow-hidden rounded-[2rem] h-[320px] shadow-[0_15px_30px_rgba(13,28,50,0.08)] border border-brand-outline-variant/15 cursor-pointer active:scale-98 transition-transform"
              >
                {/* Fallback backgreeen image for Azure Cove is the beachfront Santorini villa */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCo71hmjw2bf30lbHKmJlygsxlTuSNK0oiaeniDDpgwtN8Jc6gy5z7ZplGU5ZJDJoNt92db9vafnxCaWgvvkglvYPuGhk52DsTTWQU9egtVH-teBF3h97c0xL-kfX3kzSqdZZMpvuMn7DSzduWA1lULmp3lquk1mIR0zktwQVku0jprPdTVqqTyBEshTbGmdckT2Q_qlB2gyHLfGkhh5u68XZv1LHP_ft_2bkCbnige4fRi0BdNWacuC8CNiE0L9da5PfSuB4YhxLI')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h4 className="font-display text-lg font-bold leading-tight mb-0.5">{azureCove.title}</h4>
                  <p className="font-sans text-[10px] font-semibold text-white/80 tracking-widest uppercase">
                    {azureCove.subtitle}
                  </p>
                </div>
              </div>
            )}

            {/* Verdant Sanctuary */}
            {verdantSanctuary && (
              <div
                onClick={() => onSelectHotel(verdantSanctuary.id)}
                className="relative group overflow-hidden rounded-[2rem] h-[320px] shadow-[0_15px_30px_rgba(13,28,50,0.08)] border border-brand-outline-variant/15 cursor-pointer active:scale-98 transition-transform"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${verdantSanctuary.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h4 className="font-display text-lg font-bold leading-tight mb-0.5">{verdantSanctuary.title}</h4>
                  <p className="font-sans text-[10px] font-semibold text-white/80 tracking-widest uppercase">
                    {verdantSanctuary.subtitle}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Special Events Snap Carousel */}
      <section className="space-y-4">
        <h3 className="font-display text-xl font-bold tracking-tight text-brand-primary">Особые события</h3>
        <div className="flex overflow-x-auto gap-5 -mx-5 px-5 pb-6 snap-x no-scrollbar">
          {events.map(event => (
            <div
              key={event.id}
              onClick={() => onSelectEvent(event.id)}
              className="flex-shrink-0 w-[82%] snap-center rounded-3xl bg-brand-surface-low p-1 border border-brand-outline-variant/15 shadow-[0_15px_30px_rgba(0,0,0,0.04)] cursor-pointer hover:border-brand-outline-variant/40 active:scale-99 transition-all"
            >
              <div
                className="h-40 w-full rounded-2xl bg-cover bg-center mb-4"
                style={{ backgroundImage: `url(${event.image})` }}
              />
              <div className="px-4 pb-4">
                <span className="inline-block bg-brand-secondary-container text-brand-on-secondary-container px-3 py-0.5 rounded-full font-sans text-[9px] font-bold tracking-wider uppercase mb-2">
                  {event.category}
                </span>
                <h5 className="font-sans font-bold text-sm text-brand-primary mb-1">
                  {event.title}
                </h5>
                <p className="font-sans text-[11px] text-brand-on-surface-variant leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lumina Circle Loyalty Sign-up */}
      <section className="p-7 rounded-[2.2rem] bg-brand-primary text-white relative overflow-hidden shadow-xl border border-white/5">
        <div className="relative z-10">
          <h3 className="font-display text-xl font-bold mb-2">Lumina Circle</h3>
          <p className="font-sans text-xs text-brand-outline-variant leading-relaxed mb-6">
            Получите доступ к закрытым бронированиям, приветственным бонусам и эксклюзивным привилегиям нашего закрытого клуба.
          </p>
          <button
            onClick={onJoinCircle}
            className="w-full bg-white hover:bg-brand-surface text-brand-primary py-3.5 rounded-xl font-sans font-semibold text-xs active:scale-95 transition-all shadow-md uppercase tracking-wider"
          >
            {user.isCircleMember ? 'Вступить в клуб (Уже участник)' : 'Вступить в клуб'}
          </button>
        </div>
        {/* Decorative ambient glass circle */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#fed65b]/10 rounded-full blur-3xl pointer-events-none" />
      </section>
    </div>
  );
}
