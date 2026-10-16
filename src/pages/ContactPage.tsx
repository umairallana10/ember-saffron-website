import React, { useState } from 'react';
import { Page, ContactFormData } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Check, AlertCircle, Compass, Car, Navigation } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: Page) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 500);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#58151E]">
            <span>Adliya, Kingdom of Bahrain</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#1E1B18]">
            Contact &amp; Location
          </h1>
          <p className="text-sm sm:text-base text-[#5C5349] font-light leading-relaxed">
            We are honored to answer inquiries regarding table reservations, private events, catering, or culinary collaborations.
          </p>
        </div>

        {/* 3 Contact Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Visit */}
          <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 space-y-4 shadow-2xs">
            <div className="w-10 h-10 bg-[#FAF7F2] border border-[#E0D7C9] flex items-center justify-center text-[#58151E]">
              <MapPin className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1E1B18]">
              The Restaurant Address
            </h3>
            <p className="text-xs text-[#5C5349] leading-relaxed">
              {RESTAURANT_INFO.address}
            </p>
            <div className="pt-2 text-[11px] text-[#8E8377] border-t border-[#F0EBE0] space-y-1">
              <p>District: Adliya Dining Quarter (Block 338)</p>
              <p>Valet service available in front of restaurant entrance</p>
            </div>
          </div>

          {/* Card 2: Hours */}
          <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 space-y-4 shadow-2xs">
            <div className="w-10 h-10 bg-[#FAF7F2] border border-[#E0D7C9] flex items-center justify-center text-[#58151E]">
              <Clock className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1E1B18]">
              Operating Hours
            </h3>
            <div className="text-xs text-[#5C5349] space-y-2">
              <div>
                <p className="font-medium text-[#1E1B18]">Lunch Service</p>
                <p>{RESTAURANT_INFO.hours.lunch}</p>
              </div>
              <div>
                <p className="font-medium text-[#1E1B18]">Dinner (Sat – Wed)</p>
                <p>{RESTAURANT_INFO.hours.dinnerWeekdays}</p>
              </div>
              <div>
                <p className="font-medium text-[#1E1B18]">Weekend Lounge (Thu – Fri)</p>
                <p>{RESTAURANT_INFO.hours.dinnerWeekends}</p>
              </div>
            </div>
          </div>

          {/* Card 3: Direct Concierge & WhatsApp */}
          <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 space-y-4 shadow-2xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-[#FAF7F2] border border-[#E0D7C9] flex items-center justify-center text-[#58151E]">
                <Phone className="w-5 h-5 text-[#C5A059]" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1E1B18]">
                Direct Lines
              </h3>
              <div className="text-xs text-[#5C5349] space-y-1.5">
                <p>
                  Reservations: <span className="font-medium text-[#1E1B18]">{RESTAURANT_INFO.phone}</span>
                </p>
                <p>
                  Email: <span className="font-medium text-[#1E1B18]">{RESTAURANT_INFO.email}</span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F0EBE0]">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappPhone}?text=Hello%20Ember%20%26%20Saffron%2C%20I%20would%20like%20to%20get%20in%20touch`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366] text-[#1E1B18] hover:text-white transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] group-hover:text-white" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* 2-Column Split: Interactive Map Frame & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Styled Interactive Google Maps Experience */}
          <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#E8DFD1] p-6 flex flex-col justify-between">
            
            <div>
              {/* Map Controls */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EFE9DD] mb-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#58151E]" />
                  <span className="font-serif text-lg font-medium text-[#1E1B18]">
                    Adliya Block 338 Locator
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 border border-[#E0D7C9]">
                  <button
                    onClick={() => setMapType('roadmap')}
                    className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      mapType === 'roadmap'
                        ? 'bg-[#58151E] text-white'
                        : 'text-[#6B6156] hover:text-[#1E1B18]'
                    }`}
                  >
                    Roadmap
                  </button>
                  <button
                    onClick={() => setMapType('satellite')}
                    className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      mapType === 'satellite'
                        ? 'bg-[#58151E] text-white'
                        : 'text-[#6B6156] hover:text-[#1E1B18]'
                    }`}
                  >
                    Satellite
                  </button>
                </div>
              </div>

              {/* Styled Interactive Map Canvas */}
              <div className="relative aspect-4/3 w-full bg-[#E5DFD5] border border-[#DCD3C5] overflow-hidden">
                {/* SVG Map Layout representing Adliya Block 338 */}
                <div className={`w-full h-full relative transition-colors duration-500 ${
                  mapType === 'satellite' ? 'bg-[#2B302A]' : 'bg-[#F2EDE4]'
                }`}>
                  
                  {/* Streets Grid */}
                  <svg className="w-full h-full opacity-60 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    {/* Roads */}
                    <line x1="0" y1="90" x2="100%" y2="90" stroke={mapType === 'satellite' ? '#4A5046' : '#FFFFFF'} strokeWidth="16" />
                    <line x1="0" y1="210" x2="100%" y2="210" stroke={mapType === 'satellite' ? '#4A5046' : '#FFFFFF'} strokeWidth="22" />
                    <line x1="120" y1="0" x2="120" y2="100%" stroke={mapType === 'satellite' ? '#4A5046' : '#FFFFFF'} strokeWidth="18" />
                    <line x1="280" y1="0" x2="280" y2="100%" stroke={mapType === 'satellite' ? '#4A5046' : '#FFFFFF'} strokeWidth="20" />
                    <line x1="440" y1="0" x2="440" y2="100%" stroke={mapType === 'satellite' ? '#4A5046' : '#FFFFFF'} strokeWidth="14" />
                    
                    {/* Al-Hilal / Osama Bin Zaid Road Diagonal */}
                    <line x1="0" y1="30" x2="100%" y2="280" stroke={mapType === 'satellite' ? '#5E6659' : '#EDE4D6'} strokeWidth="12" />
                  </svg>

                  {/* Area Labels */}
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 ${
                      mapType === 'satellite' ? 'bg-black/60 text-white' : 'bg-white/80 text-[#6B6156]'
                    }`}>
                      Road 3821 · Block 338
                    </span>
                  </div>

                  {/* Nearby Landmark Tag */}
                  <div className="absolute bottom-6 left-6 pointer-events-none">
                    <span className={`text-[10px] font-medium px-2 py-1 ${
                      mapType === 'satellite' ? 'bg-black/60 text-[#D8D0C5]' : 'bg-white/90 text-[#7A7065]'
                    }`}>
                      Gulf Hotel Bahrain (300m)
                    </span>
                  </div>

                  {/* Ember & Saffron Golden Pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group">
                    <div className="relative">
                      {/* Pulse ring */}
                      <span className="absolute -inset-1 rounded-full bg-[#58151E] opacity-30 animate-ping" />
                      
                      {/* Custom Marker */}
                      <div className="w-10 h-10 rounded-full bg-[#58151E] border-2 border-[#C5A059] flex items-center justify-center text-white shadow-xl">
                        <MapPin className="w-5 h-5 text-[#C5A059]" />
                      </div>
                    </div>

                    {/* Marker Badge Card */}
                    <div className="mt-2 bg-[#1C1815] text-white px-3 py-1.5 shadow-xl border border-[#C5A059]/40 text-center whitespace-nowrap">
                      <p className="font-serif text-xs font-semibold text-[#FCFAF6]">Ember &amp; Saffron</p>
                      <p className="text-[10px] text-[#C5A059]">Modern Middle Eastern</p>
                    </div>
                  </div>

                </div>

                {/* Google Maps External Link Overlay */}
                <div className="absolute bottom-3 right-3 z-10">
                  <a
                    href="https://maps.google.com/?q=Adliya+Block+338+Manama+Bahrain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-white/95 hover:bg-white text-[#1E1B18] text-[11px] font-semibold border border-gray-300 shadow-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#58151E]" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>

              </div>
            </div>

            {/* Travel & Directions Guide */}
            <div className="mt-6 pt-4 border-t border-[#EFE9DD] space-y-2 text-xs text-[#5C5349]">
              <div className="flex items-center gap-2 font-medium text-[#1E1B18]">
                <Car className="w-4 h-4 text-[#C5A059]" />
                <span>Arrival &amp; Parking Guide</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Take the Osama Bin Zaid Avenue exit into Block 338. Complimentary valet parking attendants are stationed at our private portico directly outside Building 412.
              </p>
              <div className="flex flex-wrap gap-4 text-[11px] text-[#7A7065] pt-1">
                <span>· 15 mins from Bahrain Int’l Airport (BAH)</span>
                <span>· 8 mins from Bahrain Bay &amp; Manama Souq</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#E8DFD1] p-8 sm:p-10 shadow-2xs flex flex-col justify-between">
            
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#58151E] mb-2">
                <Send className="w-4 h-4 text-[#C5A059]" />
                <span>Send a Message</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1E1B18] mb-6">
                Guest Inquiry Form
              </h2>

              {isSubmitted ? (
                <div className="bg-[#FAF7F2] border border-[#E0D7C9] p-8 text-center space-y-4 animate-fadeIn my-6">
                  <div className="w-12 h-12 bg-[#58151E] text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-[#1E1B18]">
                    Message Sent Successfully
                  </h3>
                  <p className="text-xs text-[#5C5349] max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out to Ember &amp; Saffron. Our concierge team will review your inquiry and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 bg-[#58151E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#741E2B] transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Layla Al-Khalifa"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={`w-full bg-[#FAF7F2] border ${errors.name ? 'border-red-500' : 'border-[#D5CCC0]'} px-4 py-2.5 text-sm text-[#1E1B18] focus:outline-none focus:border-[#58151E]`}
                      required
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="layla@example.com"
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

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-1.5">
                        Phone (Optional)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="+973 3912 3456"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#D5CCC0] px-4 py-2.5 text-sm text-[#1E1B18] focus:outline-none focus:border-[#58151E]"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-1.5">
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#D5CCC0] px-4 py-2.5 text-sm text-[#1E1B18] focus:outline-none focus:border-[#58151E]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Private Event & Dining">Private Event &amp; Dining (Royal Majlis)</option>
                      <option value="Press & Media">Press, Photography &amp; Media</option>
                      <option value="Feedback">Dining Experience Feedback</option>
                      <option value="Career Opportunities">Career &amp; Culinary Team</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="How may our concierge assist you?"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      className={`w-full bg-[#FAF7F2] border ${errors.message ? 'border-red-500' : 'border-[#D5CCC0]'} px-4 py-2.5 text-sm text-[#1E1B18] focus:outline-none focus:border-[#58151E]`}
                      required
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-[#58151E] hover:bg-[#741E2B] disabled:bg-[#A8989A] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </button>
                  </div>

                </form>
              )}
            </div>

            <div className="pt-6 border-t border-[#EFE9DD] mt-6 text-center text-xs text-[#8E8377]">
              <span>For immediate same-day reservations, please telephone +973 1728 9400.</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
