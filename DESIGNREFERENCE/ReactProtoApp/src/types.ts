/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Amenity {
  icon: string;
  label: string;
}

export interface Hotel {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  originalPriceText: string;
  priceEUR: number;
  originalCurrency: string;
  description: string;
  image: string;
  locationName: string;
  locationDetail: string;
  amenities: Amenity[];
  mapImage: string;
  locationCoordinates: { lat: number; lng: number };
  rating: number;
  reviewsCount: number;
  featured: boolean;
}

export interface SpecialEvent {
  id: string;
  category: string;
  title: string;
  description: string;
  originalPriceText: string;
  image: string;
  location: string;
  priceAmount?: number;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPriceEUR: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface User {
  name: string;
  email: string;
  memberSince: string;
  isCircleMember: boolean;
  loyaltyPoints: number;
  tier: 'Silver' | 'Gold' | 'Lumina Circle';
}
