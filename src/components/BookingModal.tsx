'use client';

import { useState } from 'react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    artistName: string;
}

export default function BookingModal({ isOpen, onClose, artistName }: BookingModalProps) {
    const [formData, setFormData] = useState({
        // Event Details
        eventDate: '',
        budget: '',
        currency: 'USD',
        willPayTravel: false,
        willPayAccommodation: false,
        willPayTransportation: false,
        venueName: '',
        venueCapacity: '',
        venueAddress: '',
        venueCity: '',
        venueState: '',
        venueZipCode: '',
        venueCountry: '',
        performanceTime: '',
        setDuration: '',
        // Buyer Details
        message: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        newsletter: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const subject = `Booking Request: ${artistName}`;
        const body = `
BOOKING REQUEST

=== EVENT DETAILS ===
Artist: ${artistName}
Event Date: ${formData.eventDate}
Budget: ${formData.currency} ${formData.budget}

Travel Included: ${formData.willPayTravel ? 'Yes' : 'No'}
Accommodation Included: ${formData.willPayAccommodation ? 'Yes' : 'No'}
Ground Transportation Included: ${formData.willPayTransportation ? 'Yes' : 'No'}

Venue Name: ${formData.venueName}
Venue Capacity: ${formData.venueCapacity}
Venue Address: ${formData.venueAddress}
Venue City: ${formData.venueCity}
Venue State/Province: ${formData.venueState}
Venue Zip Code: ${formData.venueZipCode}
Venue Country: ${formData.venueCountry}

Performance Time: ${formData.performanceTime}
Set Duration: ${formData.setDuration} minutes

=== BUYER DETAILS ===
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Company/Organization: ${formData.company}
Country: ${formData.country}

Message:
${formData.message}
    `.trim();

        const mailtoLink = `mailto:igaak@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        onClose();
    };

    if (!isOpen) return null;

    const inputClass = "w-full px-3 py-2 border-b border-neutral-300 focus:border-black outline-none text-black placeholder-neutral-400 bg-white";
    const labelClass = "block text-xs text-neutral-500 mb-1";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
                {/* Header */}
                <div className="sticky top-0 bg-neutral-900 text-white px-6 py-4 flex items-center justify-between z-10">
                    <h2 className="text-lg font-medium tracking-wider uppercase">Booking Request</h2>
                    <button onClick={onClose} className="text-white hover:text-neutral-300 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column - Event Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-black mb-4">Event Details</h3>

                            {/* Artist (readonly) */}
                            <div>
                                <label className={labelClass}>Artist *</label>
                                <input type="text" value={artistName} readOnly className="w-full px-3 py-2 border-b border-neutral-300 bg-neutral-100 text-black" />
                            </div>

                            {/* Event Date */}
                            <div>
                                <label className={labelClass}>Event Date *</label>
                                <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required className={inputClass} />
                            </div>

                            {/* Budget */}
                            <div className="flex gap-2">
                                <select name="currency" value={formData.currency} onChange={handleChange} className="px-2 py-2 border-b border-neutral-300 focus:border-black outline-none text-black bg-white">
                                    <option value="USD">USD $</option>
                                    <option value="KRW">KRW ₩</option>
                                    <option value="EUR">EUR €</option>
                                </select>
                                <input type="text" name="budget" placeholder="Budget *" value={formData.budget} onChange={handleChange} required className={`flex-1 ${inputClass}`} />
                            </div>

                            {/* Checkboxes */}
                            <div className="space-y-2 py-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="willPayTravel" checked={formData.willPayTravel} onChange={handleChange} className="w-4 h-4 accent-orange-500" />
                                    <span className="text-sm text-neutral-700">Will also pay for travel (Flights, Train, Bus)</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="willPayAccommodation" checked={formData.willPayAccommodation} onChange={handleChange} className="w-4 h-4 accent-orange-500" />
                                    <span className="text-sm text-neutral-700">Will also pay for accommodation</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="willPayTransportation" checked={formData.willPayTransportation} onChange={handleChange} className="w-4 h-4 accent-orange-500" />
                                    <span className="text-sm text-neutral-700">Will also pay for ground transportation</span>
                                </label>
                            </div>

                            {/* Venue Details */}
                            <input type="text" name="venueName" placeholder="Venue Name *" value={formData.venueName} onChange={handleChange} required className={inputClass} />
                            <input type="text" name="venueCapacity" placeholder="Venue Capacity *" value={formData.venueCapacity} onChange={handleChange} required className={inputClass} />
                            <input type="text" name="venueAddress" placeholder="Venue Address *" value={formData.venueAddress} onChange={handleChange} required className={inputClass} />
                            <input type="text" name="venueCity" placeholder="Venue City *" value={formData.venueCity} onChange={handleChange} required className={inputClass} />
                            <input type="text" name="venueState" placeholder="Venue State / Province *" value={formData.venueState} onChange={handleChange} required className={inputClass} />
                            <input type="text" name="venueZipCode" placeholder="Venue Zip Code *" value={formData.venueZipCode} onChange={handleChange} required className={inputClass} />
                            <input type="text" name="venueCountry" placeholder="Venue Country *" value={formData.venueCountry} onChange={handleChange} required className={inputClass} />

                            {/* Performance Details */}
                            <input type="text" name="performanceTime" placeholder="Performance Time *" value={formData.performanceTime} onChange={handleChange} required className={inputClass} />
                            <input type="text" name="setDuration" placeholder="Set Duration (In Minutes) *" value={formData.setDuration} onChange={handleChange} required className={inputClass} />
                        </div>

                        {/* Right Column - Buyer Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-black mb-4">Buyer Details</h3>

                            <textarea name="message" placeholder="Message to Agent" value={formData.message} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} />
                            <input type="text" name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleChange} required className={inputClass} />
                            <input type="text" name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleChange} required className={inputClass} />
                            <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required className={inputClass} />
                            <input type="tel" name="phone" placeholder="Phone *" value={formData.phone} onChange={handleChange} required className={inputClass} />
                            <input type="text" name="company" placeholder="Company/Organization *" value={formData.company} onChange={handleChange} required className={inputClass} />
                            <input type="text" name="country" placeholder="Country *" value={formData.country} onChange={handleChange} required className={inputClass} />
                        </div>
                    </div>

                    {/* Newsletter & Submit */}
                    <div className="mt-8 pt-6 border-t border-neutral-200">
                        <label className="flex items-center gap-3 cursor-pointer mb-6">
                            <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} className="w-4 h-4 accent-orange-500" />
                            <span className="text-sm text-neutral-700">Would you like to receive emails with new announcements and upcoming tours?</span>
                        </label>

                        <div className="flex items-center gap-4">
                            <button type="submit" className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium tracking-wider uppercase transition-colors">
                                Request Booking
                            </button>
                            <button type="button" onClick={onClose} className="text-sm text-neutral-500 hover:text-black tracking-wider uppercase transition-colors">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
