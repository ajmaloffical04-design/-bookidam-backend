"use client";

import { motion } from "framer-motion";
import { Plus, Twitter, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export default function FooterFAQ() {
  const faqs = [
    { q: "HOW DO I BOOK AN EVENT?", a: "You can book directly through our platform by selecting an event or contacting our team for custom coordination." },
    { q: "WHAT IS THE REFUND POLICY?", a: "Refunds are available up to 48 hours before the event start time. Service fees may apply." },
    { q: "CAN I HOST MY OWN EVENT?", a: "Yes! We offer comprehensive tools for organizers to create and list their own experiences." }
  ];

  return (
    <footer className="w-full bg-eventry-dark text-white pt-24 pb-8 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
          {/* FAQ Area */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <p className="text-[#00A372] font-bold tracking-[0.2em] text-sm uppercase mb-4">Questions?</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase mb-6">Common FAQs</h2>
            </motion.div>

            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group border-b border-white/10 pb-6 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-black tracking-wide uppercase group-hover:text-[#00A372] transition-colors">
                      {faq.q}
                    </h3>
                    <Plus size={20} className="text-[#00A372]" />
                  </div>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-lg">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Inquiry Form Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 p-12 rounded-[3rem] border border-white/10 flex flex-col"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6 leading-none">
              Book an<br/><span className="text-[#00A372]">Inquiry</span>
            </h2>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-10">
              We're here to help you coordinate your vision.
            </p>
            
            <div className="space-y-4">
              <input type="text" placeholder="YOUR NAME" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-xs font-bold tracking-widest uppercase focus:border-[#00A372] outline-none transition-colors" />
              <input type="email" placeholder="YOUR EMAIL" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-xs font-bold tracking-widest uppercase focus:border-[#00A372] outline-none transition-colors" />
              <button className="w-full bg-[#00A372] text-white py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-[#00825e] transition-colors shadow-2xl shadow-primary-500/20">
                Submit Inquiry
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <Link href="/" className="text-2xl font-black tracking-tighter">
              BOOKIDAM<span className="text-[#00A372]">®</span>
            </Link>
            <p className="text-xs font-bold text-gray-500 tracking-widest">© 2026 BOOKIDAM. ALL RIGHTS RESERVED.</p>
          </div>

          <nav className="flex items-center gap-10">
            {["INSTAGRAM", "TWITTER", "LINKEDIN"].map((s) => (
              <Link key={s} href="#" className="text-[10px] font-black tracking-[0.2em] text-gray-400 hover:text-[#00A372] transition-colors uppercase">
                {s}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4">
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00A372] transition-colors cursor-pointer group">
                <Icon size={18} className="group-hover:scale-110 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
