import React, { useState, useEffect, useMemo } from 'react';
import { Page, ReservationFormData, ReservationConfirmation } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import {
  LUNCH_SLOTS,
  DINNER_SLOTS,
  isSlotAvailable,
  saveReservation,
  generateIcsCalendarFile,
  RESERVATION_CAPACITY_CONFIG,
} from '../utils/reservationStorage';
import {
  Check,
  Calendar,
  Clock,
  Users,
  Sparkles,
  AlertCircle,
  Download,
  Info,
} from 'lucide-react';

interface ReservationsPageProps {
  onNavigate: (page: Page) => void;
}

export const ReservationsPage: React.FC<ReservationsPageProps> = ({ onNavigate }) => {
  // Today's date in YYYY-MM-DD
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Version counter to trigger re-renders when reservations change
  const [registryVersion, setRegistryVersion] = useState(0);

  const [formData, setFormData] = useState<ReservationFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    date: todayStr,
    time: '7:00 PM',
    guests: 2,
    seatingPreference: 'main',
    occasion: 'dinner',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<ReservationConfirmation | null>(null);

  // Recalculate available status for the currently selected date
  const isCurrentTimeAvailable = useMemo(() => {
    return isSlotAvailable(formData.date, formData.time, formData.guests);
  }, [formData.date, formData.time, formData.guests, registryVersion]);

  // If selected time is unavailable on the chosen date, pick first available slot
  useEffect(() => {
    if (!isSlotAvailable(formData.date, formData.time, formData.guests)) {
      const allSlots = [...LUNCH_SLOTS, ...DINNER_SLOTS];
      const nextAvailable = allSlots.find((slot) => isSlotAvailable(formData.date, slot, formData.guests));
      if (nextAvailable) {
        setFormData((prev) => ({ ...prev, time: nextAvailable }));
      }
    }
  }, [formData.date, formData.guests, registryVersion]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ReservationFormData, string>> = {};

    // 1. Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter at least 3 characters';
    }

    // 2. Email Address
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    // 3. Phone Number
    const numericPhone = formData.phoneNumber.replace(/[^0-9]/g, '');
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (numericPhone.length < 7) {
      newErrors.phoneNumber = 'Please enter a valid phone number (at least 7 digits)';
    }

    // 4. Reservation Date
    if (!formData.date) {
      newErrors.date = 'Please select a reservation date';
    } else if (formData.date < todayStr) {
      newErrors.date = 'Reservation date cannot be in the past';
    }

    // 5. Preferred Time & Availability
    if (!formData.time) {
      newErrors.time = 'Please select a preferred time slot';
    } else if (!isSlotAvailable(formData.date, formData.time, formData.guests)) {
      newErrors.time = 'The selected time slot is fully booked for this date. Please choose another time.';
    }

    // 6. Number of Guests
    if (!formData.guests || formData.guests < 1 || formData.guests > 12) {
      newErrors.guests = 'Please specify between 1 and 12 guests';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Prevent double submission
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Final availability check to prevent race condition or double booking
    if (!isSlotAvailable(formData.date, formData.time, formData.guests)) {
      setErrors({
        time: 'This time slot was just booked and is no longer available. Please select another time.',
      });
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      const randomCode = 'ES-' + Math.floor(10000 + Math.random() * 90000);
      const conf: ReservationConfirmation = {
        ...formData,
        confirmationCode: randomCode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'confirmed',
      };

      // Persist to storage
      saveReservation(conf);

      // Update registry version to trigger availability re-calculation
      setRegistryVersion((v) => v + 1);

      setConfirmation(conf);
      setIsSubmitting(false);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 500);
  };

  const handleDownloadCalendar = () => {
    if (!confirmation) return;
    const icsContent = generateIcsCalendarFile(confirmation);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Ember-Saffron-Reservation-${confirmation.confirmationCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMakeAnotherBooking = () => {
    setConfirmation(null);
    // Find next available slot for current date
    const allSlots = [...LUNCH_SLOTS, ...DINNER_SLOTS];
    const nextAvailable = allSlots.find((slot) => isSlotAvailable(formData.date, slot, formData.guests)) || '7:00 PM';
    setFormData((prev) => ({
      ...prev,
      time: nextAvailable,
      specialRequests: '',
    }));
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#58151E] mb-3">
            <span>Table Reservations</span>
            <span aria-hidden="true">·</span>
            <span>Adliya Block 338</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#1E1B18] mb-4">
            Reserve Your Table
          </h1>
          <p className="text-sm sm:text-base text-[#5C5349] font-light leading-relaxed">
            Please provide your details below. For parties larger than 12 guests or private dining in the Royal Majlis, please contact our concierge directly.
          </p>
        </div>

        {/* Confirmation State */}
        {confirmation ? (
          <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 sm:p-12 shadow-md animate-fadeIn">
            
            <div className="text-center max-w-xl mx-auto mb-10">
              <div className="w-14 h-14 bg-[#58151E] text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Check className="w-7 h-7" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                Reservation Confirmed
              </span>
              <h2 className="font-serif text-3xl font-medium text-[#1E1B18] mt-1 mb-2">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-xs text-[#7A7065]">
                Your table has been confirmed and registered for <span className="font-semibold text-[#1E1B18]">{confirmation.fullName}</span>. Please save your reference code below.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-[#FAF7F2] border border-[#E2D8C9] p-6 sm:p-8 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-4 mb-6">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#7A7065]">Booking Reference</span>
                  <p className="font-mono text-xl font-bold text-[#58151E] tracking-wider">
                    {confirmation.confirmationCode}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-[#7A7065]">Status</span>
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                    Confirmed
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#4A423B]">
                <div>
                  <span className="text-[#8E8377] block">Guest Name</span>
                  <span className="font-medium text-[#1E1B18] text-sm">{confirmation.fullName}</span>
                </div>
                <div>
                  <span className="text-[#8E8377] block">Contact Number</span>
                  <span className="font-medium text-[#1E1B18] text-sm">{confirmation.phoneNumber}</span>
                </div>
                <div>
                  <span className="text-[#8E8377] block">Date &amp; Time</span>
                  <span className="font-medium text-[#1E1B18] text-sm">
                    {confirmation.date} at {confirmation.time}
                  </span>
                </div>
                <div>
                  <span className="text-[#8E8377] block">Party Size</span>
                  <span className="font-medium text-[#1E1B18] text-sm">
                    {confirmation.guests} {confirmation.guests === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
                <div>
                  <span className="text-[#8E8377] block">Seating Area</span>
                  <span className="font-medium text-[#1E1B18] text-sm capitalize">
                    {confirmation.seatingPreference === 'main' && 'Main Dining Room'}
                    {confirmation.seatingPreference === 'hearth' && 'Ember Hearth Counter'}
                    {confirmation.seatingPreference === 'courtyard' && 'Jasmine Courtyard Terrace'}
                    {confirmation.seatingPreference === 'majlis' && 'Private Royal Majlis'}
                  </span>
                </div>
                <div>
                  <span className="text-[#8E8377] block">Location</span>
                  <span className="font-medium text-[#1E1B18] text-sm">Block 338, Adliya, Manama</span>
                </div>
              </div>

              {confirmation.specialRequests && (
                <div className="mt-4 pt-4 border-t border-[#E8DFD1] text-xs">
                  <span className="text-[#8E8377] block mb-1">Special Requests / Notes:</span>
                  <p className="text-[#3E3833] italic">"{confirmation.specialRequests}"</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <button
                onClick={handleDownloadCalendar}
                className="w-full sm:w-auto px-6 py-3 bg-[#58151E] hover:bg-[#741E2B] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Download className="w-4 h-4" /> Add to Calendar (.ics)
              </button>
              <button
                onClick={handleMakeAnotherBooking}
                className="w-full sm:w-auto px-6 py-3 border border-[#D5CCC0] text-[#3E3833] hover:bg-[#EFE9DD] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Make Another Booking
              </button>
            </div>

            {/* Policy Notes */}
            <div className="mt-8 pt-6 border-t border-[#EFE9DD] text-center text-xs text-[#8E8377] space-y-1">
              <p>Tables are held for 15 minutes past the reserved booking time.</p>
              <p>Dress Code: Smart Casual · Valet parking is available at our entrance.</p>
            </div>

          </div>
        ) : (
          /* Reservation Form */
          <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              
              {/* Step 1: Party Size, Date & Time */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#58151E] border-b border-[#EFE9DD] pb-2">
                  <Users className="w-4 h-4 text-[#C5A059]" />
                  <span>1. Party &amp; Schedule</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Number of Guests */}
                  <div>
                    <label htmlFor="res-guests" className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-2">
                      Number of Guests *
                    </label>
                    <select
                      id="res-guests"
                      value={formData.guests}
                      onChange={(e) => {
                        const guests = parseInt(e.target.value, 10);
                        setFormData({ ...formData, guests });
                        if (errors.guests) setErrors({ ...errors, guests: undefined });
                      }}
                      className="w-full bg-[#FAF7F2] border border-[#D5CCC0] px-4 py-2.5 text-sm text-[#1E1B18] focus:outline-none focus:border-[#58151E]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                    {errors.guests && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.guests}
                      </p>
                    )}
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="res-date" className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-2">
                      Reservation Date *
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      min={todayStr}
                      value={formData.date}
                      onChange={(e) => {
                        const newDate = e.target.value;
                        setFormData({ ...formData, date: newDate });
                        if (errors.date) setErrors({ ...errors, date: undefined });
                      }}
                      className={`w-full bg-[#FAF7F2] border ${errors.date ? 'border-red-500' : 'border-[#D5CCC0]'} px-4 py-2 text-sm text-[#1E1B18] focus:outline-none focus:border-[#58151E]`}
                      required
                    />
                    {errors.date && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.date}
                      </p>
                    )}
                  </div>

                  {/* Occasion */}
                  <div>
                    <label htmlFor="res-occasion" className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-2">
                      Occasion (Optional)
                    </label>
                    <select
                      id="res-occasion"
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#D5CCC0] px-4 py-2.5 text-sm text-[#1E1B18] focus:outline-none focus:border-[#58151E]"
                    >
                      <option value="dinner">Casual / Everyday Dinner</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="birthday">Birthday Celebration</option>
                      <option value="business">Business Meeting / Dinner</option>
                      <option value="date">Romantic Date</option>
                      <option value="other">Other Special Event</option>
                    </select>
                  </div>

                </div>

                {/* Preferred Time Slot Picker */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18]">
                      Preferred Time Slot *
                    </label>
                    <span className="text-[11px] text-[#7A7065]">
                      Select an available slot for {formData.date}
                    </span>
                  </div>

                  {errors.time && (
                    <div className="mb-3 p-2.5 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{errors.time}</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Lunch Service (12:30 PM to 3:30 PM) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] uppercase tracking-wider text-[#8E8377] font-semibold">
                          Lunch Service (12:30 PM – 3:30 PM)
                        </span>
                        <span className="text-[10px] text-[#A89E93]">
                          Service closes 3:30 PM
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {LUNCH_SLOTS.map((slot) => {
                          const available = isSlotAvailable(formData.date, slot, formData.guests);
                          const isSelected = formData.time === slot;

                          return (
                            <button
                              type="button"
                              key={slot}
                              disabled={!available}
                              onClick={() => {
                                if (available) {
                                  setFormData({ ...formData, time: slot });
                                  if (errors.time) setErrors({ ...errors, time: undefined });
                                }
                              }}
                              aria-disabled={!available}
                              title={
                                available
                                  ? `Book ${slot}`
                                  : `${slot} is fully booked on ${formData.date}`
                              }
                              className={`px-3.5 py-1.5 text-xs font-medium tabular-nums transition-colors relative ${
                                isSelected && available
                                  ? 'bg-[#58151E] text-white shadow-xs'
                                  : available
                                  ? 'bg-[#FAF7F2] border border-[#D5CCC0] text-[#3E3833] hover:border-[#58151E]'
                                  : 'bg-[#EAE4D8] border border-[#D5CDBD] text-[#9E9387] line-through cursor-not-allowed opacity-60'
                              }`}
                            >
                              <span>{slot}</span>
                              {!available && (
                                <span className="ml-1 text-[10px] no-underline font-normal">
                                  (Full)
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dinner Service (6:30 PM to 11:30 PM) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] uppercase tracking-wider text-[#8E8377] font-semibold">
                          Dinner Service (6:30 PM – 11:30 PM)
                        </span>
                        <span className="text-[10px] text-[#A89E93]">
                          Service closes 11:30 PM
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {DINNER_SLOTS.map((slot) => {
                          const available = isSlotAvailable(formData.date, slot, formData.guests);
                          const isSelected = formData.time === slot;

                          return (
                            <button
                              type="button"
                              key={slot}
                              disabled={!available}
                              onClick={() => {
                                if (available) {
                                  setFormData({ ...formData, time: slot });
                                  if (errors.time) setErrors({ ...errors, time: undefined });
                                }
                              }}
                              aria-disabled={!available}
                              title={
                                available
                                  ? `Book ${slot}`
                                  : `${slot} is fully booked on ${formData.date}`
                              }
                              className={`px-3.5 py-1.5 text-xs font-medium tabular-nums transition-colors relative ${
                                isSelected && available
                                  ? 'bg-[#58151E] text-white shadow-xs'
                                  : available
                                  ? 'bg-[#FAF7F2] border border-[#D5CCC0] text-[#3E3833] hover:border-[#58151E]'
                                  : 'bg-[#EAE4D8] border border-[#D5CDBD] text-[#9E9387] line-through cursor-not-allowed opacity-60'
                              }`}
                            >
                              <span>{slot}</span>
                              {!available && (
                                <span className="ml-1 text-[10px] no-underline font-normal">
                                  (Full)
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Step 2: Seating Preference */}
              <div className="space-y-4 pt-6 border-t border-[#EFE9DD]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#58151E] border-b border-[#EFE9DD] pb-2">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>2. Seating Ambience</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {RESTAURANT_INFO.seatingOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`p-4 border cursor-pointer transition-all flex flex-col justify-between ${
                        formData.seatingPreference === opt.id
                          ? 'border-[#58151E] bg-[#FAF7F2] ring-1 ring-[#58151E]'
                          : 'border-[#E0D7C9] bg-white hover:border-[#C5A059]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <input
                            type="radio"
                            name="seatingPreference"
                            value={opt.id}
                            checked={formData.seatingPreference === opt.id}
                            onChange={() => setFormData({ ...formData, seatingPreference: opt.id as any })}
                            className="accent-[#58151E]"
                          />
                          <span className="text-[10px] uppercase font-semibold text-[#8E8377]">
                            {opt.id}
                          </span>
                        </div>
                        <p className="font-serif text-base font-medium text-[#1E1B18] mb-1">
                          {opt.name}
                        </p>
                        <p className="text-[11px] text-[#5C5349] leading-snug font-light">
                          {opt.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 3: Contact Details */}
              <div className="space-y-6 pt-6 border-t border-[#EFE9DD]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#58151E] border-b border-[#EFE9DD] pb-2">
                  <span>3. Guest Contact Information</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  
                  {/* Full Name */}
                  <div>
                    <label htmlFor="res-name" className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-2">
                      Full Name *
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      placeholder="e.g. Tariq Al-Sayed"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      className={`w-full bg-[#FAF7F2] border ${errors.fullName ? 'border-red-500' : 'border-[#D5CCC0]'} px-4 py-2.5 text-sm text-[#1E1B18] focus:outline-none focus:border-[#58151E]`}
                      required
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="res-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      placeholder="+973 3900 1234"
                      value={formData.phoneNumber}
                      onChange={(e) => {
                        setFormData({ ...formData, phoneNumber: e.target.value });
                        if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined });
                      }}
                      className={`w-full bg-[#FAF7F2] border ${errors.phoneNumber ? 'border-red-500' : 'border-[#D5CCC0]'} px-4 py-2.5 text-sm text-[#1E1B18] focus:outline-none focus:border-[#58151E]`}
                      required
                    />
                    {errors.phoneNumber && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="res-email" className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-2">
                      Email Address *
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      placeholder="tariq@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full bg-[#FAF7F2] border ${errors.email ? 'border-red-500' : 'border-[#D5CCC0]'} px-4 py-2.5 text-sm text-[#1E1B18] focus:outline-none focus:border-[#58151E]`}
                      required
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>

                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="res-requests" className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-2">
                    Special Requests or Dietary Requirements (Optional)
                  </label>
                  <textarea
                    id="res-requests"
                    rows={3}
                    placeholder="Allergies, high chair request, quiet table preference, anniversary notes..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#D5CCC0] px-4 py-2.5 text-sm text-[#1E1B18] focus:outline-none focus:border-[#58151E]"
                  />
                </div>

              </div>

              {/* Submit CTA */}
              <div className="pt-6 border-t border-[#EFE9DD] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#7A7065]">
                  <span>* Required fields. By submitting, your table is verified and recorded instantly.</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !isCurrentTimeAvailable}
                  className="w-full sm:w-auto px-10 py-3.5 bg-[#58151E] hover:bg-[#741E2B] disabled:bg-[#A8989A] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying &amp; Recording Table...</span>
                    </>
                  ) : (
                    <span>Submit Reservation Request</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Demo Capacity Model & Storage Explanatory Callout */}
        <div className="mt-8 p-4 bg-[#F5F0E6] border border-[#E5DDD0] text-xs text-[#6B6156] flex items-start gap-3">
          <Info className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-[#1E1B18]">Demo Reservation Capacity &amp; Storage Architecture</p>
            <p className="font-light leading-relaxed">
              Capacity rule: Configured for {RESERVATION_CAPACITY_CONFIG.maxReservationsPerSlot} booking per time slot per date.
              Reservations are stored locally in browser storage (localStorage) for this client-side demonstration, persisting across page reloads on this device.
            </p>
          </div>
        </div>

        {/* Large Groups & Direct Contact Box */}
        <div className="mt-8 bg-[#F5F0E6] border border-[#E5DDD0] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-xl font-medium text-[#1E1B18]">
              Planning a Private Event or Group Dining?
            </h3>
            <p className="text-xs text-[#5C5349] font-light max-w-xl">
              For parties of 12 or more guests, our Royal Majlis and bespoke culinary menus are available with advance booking.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappPhone}?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20event%20at%20Ember%20%26%20Saffron`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-[#58151E] text-[#58151E] hover:bg-[#58151E] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Contact Event Concierge
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
