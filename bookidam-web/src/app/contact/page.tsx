"use client";

import { MapPin, Calendar, Heart, Shield, Users, Mail, Phone, Clock } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Header Section */}
      <section className="relative w-full py-20 px-6 md:px-12 bg-green-900 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-800 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-800 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-green-100 text-sm font-medium mb-6">
            <Mail size={16} />
            <span>We're here to help</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Contact <span className="text-green-300">BOOKIDAM</span>
          </h1>
          <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto font-light leading-relaxed">
            Have a question about an upcoming event? Need a custom quote? Or just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Get in Touch</h2>
              <p className="text-gray-500 font-light leading-relaxed">
                Our support team is available during standard business hours to assist you with any inquiries related to event booking and management.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Email */}
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Email</h3>
                <p className="text-gray-500 font-light text-sm">For general inquiries and support.</p>
                <a href="mailto:hello@bookidam.com" className="text-green-600 font-medium hover:text-green-700 transition">hello@bookidam.com</a>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Phone</h3>
                <p className="text-gray-500 font-light text-sm">Mon-Fri from 9am to 6pm IST.</p>
                <a href="tel:+919876543210" className="text-green-600 font-medium hover:text-green-700 transition">+91 98765 43210</a>
              </div>

              {/* Office */}
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Office</h3>
                <p className="text-gray-500 font-light text-sm">Headquarters</p>
                <address className="text-gray-900 font-medium not-italic">
                  123 Event Street<br />
                  Cyberpark, Calicut<br />
                  Kerala, India 673016
                </address>
              </div>

              {/* Hours */}
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Business Hours</h3>
                <p className="text-gray-500 font-light text-sm">When we're available.</p>
                <div className="text-gray-900 font-medium space-y-1">
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat - Sun: Weekend Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 premium-shadow border border-gray-100 h-full flex flex-col justify-center relative overflow-hidden">
             {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Send us a message</h3>
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! (Mock Action)'); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 ml-1">First Name</label>
                    <input type="text" required placeholder="John" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-light" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 ml-1">Last Name</label>
                    <input type="text" required placeholder="Doe" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-light" />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                  <input type="email" required placeholder="john@example.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-light" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 ml-1">Subject</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-light text-gray-900">
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 ml-1">Message</label>
                  <textarea rows={4} required placeholder="How can we help you?" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-light resize-none" />
                </div>

                <button type="submit" className="w-full py-3.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-xl mt-4">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section or CTA */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto bg-green-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-800 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-700 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to plan?</h2>
            <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
               Don't wait. Our expert team is ready to turn your vision into reality. Reach out today and let's create something unforgettable.
            </p>
            <Link href="/book" className="px-8 py-4 bg-white text-green-900 font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Start Planning Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
