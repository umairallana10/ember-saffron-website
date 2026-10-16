export type Page = 'home' | 'menu' | 'about' | 'gallery' | 'reservations' | 'contact';

export type MenuCategory = 'all' | 'starters' | 'mains' | 'desserts' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  arabicName?: string;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  description: string;
  priceBHD: number;
  image: string;
  dietary?: ('Vegetarian' | 'Gluten-Free' | "Chef's Signature" | 'Dairy-Free')[];
  featured?: boolean;
  ingredients?: string[];
  pairingNote?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'dishes' | 'hearth' | 'interior' | 'drinks';
  image: string;
  description: string;
  aspect?: 'square' | 'wide' | 'tall';
}

export interface ReservationFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'main' | 'hearth' | 'courtyard' | 'majlis';
  occasion?: string;
  specialRequests?: string;
}

export interface ReservationConfirmation extends ReservationFormData {
  confirmationCode: string;
  timestamp: string;
  status: 'confirmed';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
