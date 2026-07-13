"use client";

import { useState } from "react";
import Link from "next/link";
import { Shirt, Camera, Users, MessageCircle, Play, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#080808] border-t border-[#1a1a1a]">
      <div className="bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-[#D4AF37]/10 border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-xl font-semibold mb-1">Get Exclusive Deals & Updates</h3>
              <p className="text-gray-400 text-sm">Join 10,000+ customers who receive our latest offers and design inspiration.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex items-center gap-3 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 bg-[#111] border border-[#333] rounded-xl text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] text-sm transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#D4AF37] text-black rounded-xl font-semibold text-sm hover:bg-[#C49B2A] transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
                {!subscribed && <ArrowRight size={16} />}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-[#D4AF37] to-[#B8960C] rounded-lg flex items-center justify-center">
                <Shirt size={20} className="text-black" />
              </div>
              <span className="text-white font-bold text-xl">
                Zumrah <span className="text-[#D4AF37]">Apparel</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Pakistan&apos;s premier custom apparel platform. We bring your creative vision to life with premium DTF and sublimation printing technology.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={15} className="text-[#D4AF37]" />
                <span>support@zumrahapparel.pk</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={15} className="text-[#D4AF37]" />
                <span>+92-300-ZUMRAH (986724)</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin size={15} className="text-[#D4AF37]" />
                <span>Karachi, Pakistan (Nationwide Shipping)</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {[Camera, Users, MessageCircle, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-[#1a1a1a] hover:bg-[#D4AF37] border border-[#333] hover:border-[#D4AF37] rounded-lg flex items-center justify-center text-gray-400 hover:text-black transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Products</h4>
            <ul className="space-y-2.5">
              {["DTF Printing", "Sublimation Printing", "Custom T-Shirts", "Sports Jerseys", "Polo Shirts", "Hoodies", "Corporate Uniforms", "Bulk Orders"].map((item) => (
                <li key={item}>
                  <Link href="/shop" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {["Design Studio", "3D Customizer", "Design Templates", "File Upload", "Bulk Ordering", "Brand Merchandise", "University Gear", "Sports Kits"].map((item) => (
                <li key={item}>
                  <Link href="/designer" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5">
              {["FAQ", "Size Guide", "Shipping Info", "Return Policy", "Track Order", "Contact Us", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link href="/" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-sm">© 2026 Zumrah Apparel. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {["VISA", "MC", "EP", "JC", "COD"].map((method) => (
                <span key={method} className="px-2 py-1 bg-[#1a1a1a] border border-[#333] rounded text-xs text-gray-400 font-medium">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
