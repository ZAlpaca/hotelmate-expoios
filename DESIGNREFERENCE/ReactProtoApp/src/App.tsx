/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HOTELS, EVENTS, INITIAL_USER } from './data';
import { Hotel, SpecialEvent, Booking, User } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
import OffersScreen from './components/OffersScreen';
import ProfileScreen from './components/ProfileScreen';
import SimulatorWrapper from './components/SimulatorWrapper';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'details' | 'offers' | 'profile'>('home');
  const [selectedHotel, setSelectedHotel] = useState<Hotel>(HOTELS[1]); // Default to Santorini
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [simulatorEnabled, setSimulatorEnabled] = useState(true);
  const [favorites, setFavorites] = useState<string[]>(['azure-retreat']); // Azure Cove pre-favorited
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Prepopulate with a beautiful initial active booking
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'LMN-872412',
      hotelId: 'azure-retreat',
      hotelName: 'The Azure Retreat',
      hotelImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfE0LMbmZyyEkj02jLU880n5NSpvWKxTBhUtgKUiCg9Wgn-3uqr1t3E5PZB_cW0WhOJFokxTslRLeC0nV6Xv5T6pZgcqtMhzTR_Jtj0QroJG75_9fEIGygvnzeC-zCXueN0GUXrE2TSL0nWmj6S2JDbgnfzUM8wUuoOdQfH01NfKIFtipUwVuU1FQxh7UK8sfCutQtm0jeHUEpXOp3wSgF9YQTTjS90jgObp0nHEwOH69fXWV1ne1FNBfo0suN0ZUXrTE1TEGL0Xw',
      checkIn: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // checkin in 2 days
      checkOut: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], // checkin in 5 days
      guests: 2,
      totalPriceEUR: 2550,
      status: 'confirmed',
      createdAt: '15.07.2026',
    },
  ]);

  // Handle toast notifications
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Synchronize dynamic simulator check based on window viewport width
  useEffect(() => {
    const checkViewportWidth = () => {
      if (window.innerWidth < 640) {
        setSimulatorEnabled(false);
      } else {
        setSimulatorEnabled(true);
      }
    };

    checkViewportWidth();
    window.addEventListener('resize', checkViewportWidth);
    return () => window.removeEventListener('resize', checkViewportWidth);
  }, []);

  const handleSelectHotel = (hotelId: string) => {
    const hotel = HOTELS.find(h => h.id === hotelId);
    if (hotel) {
      setSelectedHotel(hotel);
      setCurrentScreen('details');
    }
  };

  const handleSelectEvent = (eventId: string) => {
    // Event selected, let's open its parent hotel's details page!
    if (eventId === 'michelin-night') {
      handleSelectHotel('lumina-peak');
    } else if (eventId === 'mindfulness-retreat') {
      handleSelectHotel('verdant-sanctuary');
    } else {
      handleSelectHotel('azure-retreat');
    }
  };

  const handleAddBooking = (newBooking: Booking) => {
    setBookings([newBooking, ...bookings]);
    
    // Add some loyalty points rewards for reserving!
    const earnedPoints = Math.round(newBooking.totalPriceEUR * 10);
    setUser(prev => ({
      ...prev,
      loyaltyPoints: prev.loyaltyPoints + earnedPoints,
    }));

    triggerToast(`Подтверждено! Начислено +${earnedPoints.toLocaleString()} баллов.`);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
  };

  const handleToggleFavorite = (hotelId: string) => {
    if (favorites.includes(hotelId)) {
      setFavorites(favorites.filter(id => id !== hotelId));
      triggerToast('Удалено из избранного');
    } else {
      setFavorites([...favorites, hotelId]);
      triggerToast('Добавлено в избранное');
    }
  };

  const handleJoinCircle = () => {
    if (user.isCircleMember) {
      triggerToast('Вы уже состоите в клубе Lumina Circle!');
    } else {
      setUser(prev => ({ ...prev, isCircleMember: true, tier: 'Lumina Circle' }));
      triggerToast('Добро пожаловать в Lumina Circle!');
    }
  };

  const isSelectedHotelFav = favorites.includes(selectedHotel.id);

  return (
    <SimulatorWrapper enabled={simulatorEnabled}>
      {/* Scrollable Viewport Inner Container */}
      <div className="w-full h-full overflow-y-auto no-scrollbar bg-brand-surface flex flex-col relative">
        
        {/* iOS Glass Header Top Bar */}
        <Header
          currentScreen={currentScreen}
          onBack={() => setCurrentScreen('home')}
          isFavorite={isSelectedHotelFav}
          onToggleFavorite={() => handleToggleFavorite(selectedHotel.id)}
          onNavigate={(screen) => setCurrentScreen(screen)}
          userName={user.name}
        />

        {/* Dynamic Viewport Screens */}
        <main className="flex-1 overflow-x-hidden">
          {currentScreen === 'home' && (
            <HomeScreen
              hotels={HOTELS}
              events={EVENTS}
              user={user}
              onSelectHotel={handleSelectHotel}
              onJoinCircle={handleJoinCircle}
              onSelectEvent={handleSelectEvent}
            />
          )}

          {currentScreen === 'details' && (
            <DetailsScreen
              hotel={selectedHotel}
              user={user}
              onAddBooking={handleAddBooking}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isSelectedHotelFav}
            />
          )}

          {currentScreen === 'offers' && (
            <OffersScreen
              events={EVENTS}
              user={user}
              onAddBooking={handleAddBooking}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              user={user}
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
              onNavigateHome={() => setCurrentScreen('home')}
              isSimulatorMode={simulatorEnabled}
              onToggleSimulator={() => setSimulatorEnabled(!simulatorEnabled)}
            />
          )}
        </main>

        {/* iOS Glass Bottom Tab Navigation */}
        {currentScreen !== 'details' && (
          <BottomNav
            activeTab={currentScreen}
            onTabChange={(tab) => setCurrentScreen(tab)}
          />
        )}

        {/* Micro-Feedback Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-brand-primary text-white text-[11px] font-sans font-semibold px-4 py-2.5 rounded-full shadow-lg border border-white/10 animate-fade-in-up">
            {toastMessage}
          </div>
        )}
      </div>
    </SimulatorWrapper>
  );
}
