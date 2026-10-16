import { ReservationConfirmation } from '../types';

/**
 * Clearly configurable demo capacity configuration.
 * Configured demo rule: 1 reservation per time slot per date.
 * Easily adjusted for production or table-level capacity.
 */
export const RESERVATION_CAPACITY_CONFIG = {
  // Max reservations allowed per individual time slot on any given date
  maxReservationsPerSlot: 1,
  // Max total guest covers allowed per time slot
  maxGuestsPerSlot: 12,
  // Standard duration in minutes, capped at service window closing time
  standardDurationMinutes: 120,
};

/**
 * Complete, valid 12-hour time slots for Lunch and Dinner.
 * - Lunch: 12:30 PM to 3:30 PM (30-min intervals through service window).
 * - Dinner: 6:30 PM to 11:30 PM (30-min intervals through service window).
 */
export const LUNCH_SLOTS: string[] = [
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
];

export const DINNER_SLOTS: string[] = [
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
  '10:30 PM',
  '11:00 PM',
];

const STORAGE_KEY = 'ember_saffron_reservations_v1';

// In-memory fallback if localStorage is disabled or restricted
let memoryReservations: ReservationConfirmation[] = [];

/**
 * Retrieve all persisted reservations from browser localStorage.
 */
export function getStoredReservations(): ReservationConfirmation[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as ReservationConfirmation[];
      }
    }
  } catch (err) {
    console.warn('Unable to access localStorage, using in-memory store:', err);
  }
  return memoryReservations;
}

/**
 * Persist a newly confirmed reservation into browser localStorage.
 */
export function saveReservation(reservation: ReservationConfirmation): void {
  try {
    const current = getStoredReservations();
    const updated = [...current, reservation];
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    memoryReservations = updated;
  } catch (err) {
    console.warn('Failed to save reservation to localStorage:', err);
    memoryReservations.push(reservation);
  }
}

/**
 * Get reservations for a specific date string (YYYY-MM-DD).
 */
export function getReservationsForDate(date: string): ReservationConfirmation[] {
  const all = getStoredReservations();
  return all.filter((r) => r.date === date);
}

/**
 * Calculate whether a specific time slot is available on the specified date.
 * - Availability is calculated strictly for the given date and time.
 * - A booking on Date A does not block Date B.
 * - A booking for lunch does not block dinner.
 */
export function isSlotAvailable(date: string, time: string, requestedGuests: number = 1): boolean {
  if (!date || !time) return false;
  const dayReservations = getReservationsForDate(date);
  const slotBookings = dayReservations.filter((r) => r.time === time);

  // Check slot count capacity
  if (slotBookings.length >= RESERVATION_CAPACITY_CONFIG.maxReservationsPerSlot) {
    return false;
  }

  // Check guest covers capacity
  const currentGuests = slotBookings.reduce((sum, r) => sum + (r.guests || 0), 0);
  if (currentGuests + requestedGuests > RESERVATION_CAPACITY_CONFIG.maxGuestsPerSlot) {
    return false;
  }

  return true;
}

/**
 * Parse a 12-hour time string ("12:30 PM", "7:00 PM") into { hours24, minutes }.
 */
export function parse12HourTime(timeStr: string): { hours: number; minutes: number } {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) {
    return { hours: 19, minutes: 30 }; // default fallback
  }
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();

  if (meridiem === 'PM' && hours < 12) {
    hours += 12;
  } else if (meridiem === 'AM' && hours === 12) {
    hours = 0;
  }
  return { hours, minutes };
}

/**
 * Generate accurate start and end timestamps respecting restaurant closing times.
 * - Lunch closes at 15:30 (3:30 PM).
 * - Dinner closes at 23:30 (11:30 PM).
 * Standard booking is up to 2 hours, but strictly capped at service closing time so no booking extends past closing.
 */
export function calculateCalendarTimes(dateStr: string, timeStr: string): { start: Date; end: Date } {
  const [year, month, day] = dateStr.split('-').map(Number);
  const { hours, minutes } = parse12HourTime(timeStr);

  const start = new Date(year, month - 1, day, hours, minutes, 0);
  const end = new Date(start.getTime());

  // Check if lunch (before 16:00) or dinner
  const isLunch = hours < 16;
  const closingDate = new Date(year, month - 1, day, isLunch ? 15 : 23, 30, 0);

  // Standard duration is 120 minutes (2 hours)
  const proposedEnd = new Date(start.getTime() + RESERVATION_CAPACITY_CONFIG.standardDurationMinutes * 60 * 1000);

  // Never extend past the service closing time
  if (proposedEnd.getTime() > closingDate.getTime()) {
    end.setTime(closingDate.getTime());
  } else {
    end.setTime(proposedEnd.getTime());
  }

  return { start, end };
}

/**
 * Format a Date object into iCalendar standard format: YYYYMMDDTHHMMSS
 */
function formatIcsDateTime(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `${y}${m}${d}T${hh}${mm}${ss}`;
}

/**
 * Generate RFC 5545 compliant .ics calendar content with UID and DTSTAMP.
 */
export function generateIcsCalendarFile(confirmation: ReservationConfirmation): string {
  const { start, end } = calculateCalendarTimes(confirmation.date, confirmation.time);
  const now = new Date();
  const dtStamp = formatIcsDateTime(now);
  const dtStart = formatIcsDateTime(start);
  const dtEnd = formatIcsDateTime(end);

  const seatingName = {
    main: 'Main Dining Room',
    hearth: 'Ember Hearth Counter',
    courtyard: 'Jasmine Courtyard Terrace',
    majlis: 'Private Royal Majlis',
  }[confirmation.seatingPreference] || confirmation.seatingPreference;

  const isLunch = parse12HourTime(confirmation.time).hours < 16;
  const mealTitle = isLunch ? 'Lunch' : 'Dinner';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ember and Saffron//Table Reservation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${confirmation.confirmationCode}-${start.getTime()}@emberandsaffron.bh`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${mealTitle} at Ember & Saffron (${confirmation.confirmationCode})`,
    `DESCRIPTION:Table reserved for ${confirmation.guests} guest(s) at Ember & Saffron, Adliya Block 338, Manama.\\nSeating Area: ${seatingName}\\nBooking Reference: ${confirmation.confirmationCode}`,
    `LOCATION:Building 412, Road 3821, Block 338, Adliya, Manama, Kingdom of Bahrain`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
