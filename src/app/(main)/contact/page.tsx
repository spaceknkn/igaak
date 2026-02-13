'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Content */}
      <div className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact</h1>
            <p className="text-lg text-neutral-400">
              For booking inquiries and general questions, please fill out the form below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm text-neutral-500 mb-2 uppercase tracking-wider">Name</label>
                <input
                  type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-neutral-500 mb-2 uppercase tracking-wider">Email</label>
                <input
                  type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm text-neutral-500 mb-2 uppercase tracking-wider">Subject</label>
              <select
                id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 text-white focus:border-neutral-600 focus:outline-none transition-colors"
              >
                <option value="" className="bg-black">Select a subject</option>
                <option value="booking" className="bg-black">Booking Inquiry</option>
                <option value="general" className="bg-black">General Inquiry</option>
                <option value="press" className="bg-black">Press / Media</option>
                <option value="other" className="bg-black">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-neutral-500 mb-2 uppercase tracking-wider">Message</label>
              <textarea
                id="message" name="message" value={formData.message} onChange={handleChange} required rows={6}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-medium tracking-wider uppercase text-sm hover:bg-neutral-200 transition-all duration-300"
            >
              Send Message
            </button>
          </form>

          <div className="mt-16 pt-16 border-t border-neutral-800 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-white font-medium mb-2">Email</h3>
              <p className="text-neutral-500">contact@igaak.com</p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Location</h3>
              <p className="text-neutral-500">Seoul, South Korea</p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Social</h3>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
