"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import {
  Sparkles, Zap, Shield, Truck, Star, ChevronDown,
  ArrowRight, ShoppingBag, Check, Play,
  Award, Users, Package, TrendingUp, ChevronLeft, ChevronRight,
} from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import type { ProductCardData } from "@/lib/types";

const TESTIMONIALS = [
  { id: 1, name: "Ahmed Hassan", role: "CEO, TechStart Pakistan", avatar: "AH", rating: 5, comment: "We ordered 100 custom corporate t-shirts for our annual conference. The quality exceeded our expectations. The DTF printing is incredibly detailed and vibrant. Zumrah Apparel is our go-to for all company merchandise.", city: "Karachi" },
  { id: 2, name: "Fatima Malik", role: "University Sports Captain", avatar: "FM", rating: 5, comment: "Our university cricket team jerseys turned out absolutely perfect! Full sublimation with player names and numbers. The fabric is top quality and the colors are exactly as designed. Highly recommend!", city: "Lahore" },
  { id: 3, name: "Usman Tariq", role: "Content Creator", avatar: "UT", rating: 5, comment: "I design my own merch and Zumrah Apparel makes the production seamless. The online designer tool is like Canva but for shirts! Quality is consistently excellent.", city: "Islamabad" },
  { id: 4, name: "Sara Qureshi", role: "Brand Manager", avatar: "SQ", rating: 5, comment: "Fast delivery, premium packaging, and unmatched print quality. We switched all our branded merchandise to Zumrah Apparel and couldn't be happier with the results.", city: "Faisalabad" },
  { id: 5, name: "Bilal Ahmed", role: "Startup Founder", avatar: "BA", rating: 5, comment: "The design tool let me see exactly how my design would look before ordering. No surprises - exactly what I designed. This is the future of custom apparel!", city: "Rawalpindi" },
];

const FAQS = [
  { q: "What is the minimum order quantity?", a: "For standard products, there is no minimum order quantity. For bulk/team orders with customization, the minimum is 10 pieces. Contact us for wholesale pricing." },
  { q: "What is the difference between DTF and Sublimation printing?", a: "DTF (Direct-to-Film) printing works on any fabric color and produces vibrant prints with excellent durability. Sublimation printing is ideal for polyester fabrics and creates seamless, all-over prints with photographic quality." },
  { q: "How long does delivery take?", a: "Standard delivery takes 5-7 business days. For customized orders, please allow 7-10 business days for production plus delivery time." },
  { q: "What are the shipping charges?", a: "Shipping to Karachi costs ₨ 300. Shipping to all other cities in Pakistan costs ₨ 450." },
  { q: "Can I see a preview of my design before ordering?", a: "Yes! Our design studio lets you preview your design on the product in real-time. You can also download a preview image before placing your order." },
  { q: "What payment methods do you accept?", a: "Cash on Delivery (COD) is currently available across Pakistan. Card, EasyPaisa, and JazzCash are coming soon." },
];

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function LandingClient({ products }: { products: ProductCardData[] }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0a0a0a]">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/3 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-6"
              >
                <Sparkles size={14} className="text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-sm font-medium">Pakistan&apos;s #1 Custom Apparel Platform</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white mb-6 leading-tight font-sans"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800 }}
              >
                Design. Print.
                <span className="block text-[#D4AF37]">Wear Your Vision.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg"
              >
                Create premium custom apparel with our professional design studio. DTF & sublimation printing. Delivered anywhere in Pakistan.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <Link
                  href="/designer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                >
                  <Sparkles size={18} /> Start Designing
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  <ShoppingBag size={18} /> Shop Collection
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center gap-6">
                <div className="flex -space-x-2">
                  {["AH", "FM", "UT", "SQ"].map((initials) => (
                    <div key={initials} className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#B8960C] rounded-full flex items-center justify-center text-black text-xs font-bold border-2 border-[#0a0a0a]">
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} fill="#D4AF37" stroke="#D4AF37" />
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs">Trusted by thousands of customers across Pakistan</p>
                </div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="relative flex items-center justify-center">
              <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative">
                <div className="relative w-72 h-72 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-3xl scale-90" />
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[#D4AF37]/20 bg-[#111]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1651761179569-4ba2aa054997?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600"
                      alt="Premium Custom T-Shirt"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/60 backdrop-blur-md rounded-xl p-3 border border-[#D4AF37]/30">
                        <p className="text-[#D4AF37] text-xs font-semibold mb-1">Live Preview</p>
                        <p className="text-white text-sm font-bold">Your design, exactly as printed</p>
                      </div>
                    </div>
                  </div>
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} className="absolute -top-4 -right-4 bg-[#D4AF37] text-black px-3 py-2 rounded-xl text-xs font-bold shadow-lg">
                    DTF Printing
                  </motion.div>
                  <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }} className="absolute -bottom-4 -left-4 bg-emerald-500 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-lg">
                    Fast Delivery
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600">
            <span className="text-xs">Scroll</span>
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0d0d0d] border-y border-[#1a1a1a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Package, label: "Orders Delivered", value: 50000, suffix: "+" },
              { icon: Users, label: "Happy Customers", value: 12000, suffix: "+" },
              { icon: Award, label: "Design Templates", value: 500, suffix: "+" },
              { icon: TrendingUp, label: "Success Rate", value: 99, suffix: "%" },
            ].map(({ icon: Icon, label, value, suffix }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-[#D4AF37]" />
                </div>
                <div className="text-white text-3xl font-bold mb-1 font-sans">
                  <Counter target={value} suffix={suffix} />
                </div>
                <p className="text-gray-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-3 block">Printing Services</span>
          <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4 font-sans">Choose Your Printing Method</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Professional printing technology for every need. From vibrant graphics to full-coverage designs.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            {
              title: "DTF Printing", subtitle: "Direct to Film",
              desc: "Perfect for cotton fabrics. Vibrant colors, photographic quality prints. Works on any garment color.",
              features: ["Works on any fabric color", "Photographic quality", "Wash-resistant colors", "No minimum order"],
              color: "#D4AF37",
              image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
              href: "/shop?category=dtf",
            },
            {
              title: "Sublimation Printing", subtitle: "All-Over Print",
              desc: "Full coverage printing for polyester fabrics. Perfect for sports jerseys and premium all-over designs.",
              features: ["All-over coverage", "Photographic colors", "Breathable results", "Ideal for sportswear"],
              color: "#7C3AED",
              image: "https://images.unsplash.com/photo-1521498542256-5aeb47ba2b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
              href: "/shop?category=sublimation",
            },
          ].map((cat) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative overflow-hidden rounded-3xl bg-[#111] border border-[#1e1e1e] hover:border-[#333] transition-all duration-300">
              <div className="aspect-video overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <span className="text-xs font-semibold uppercase tracking-widest mb-2 block" style={{ color: cat.color }}>{cat.subtitle}</span>
                <h3 className="text-white text-2xl font-bold mb-3 font-sans">{cat.title}</h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{cat.desc}</p>
                <ul className="grid grid-cols-2 gap-2 mb-6">
                  {cat.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-400 text-xs">
                      <Check size={12} style={{ color: cat.color }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={cat.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                  style={{ backgroundColor: `${cat.color}20`, color: cat.color, border: `1px solid ${cat.color}40` }}
                >
                  Explore {cat.title} <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {["Embroidery", "Screen Printing", "Vinyl Printing"].map((method) => (
            <div key={method} className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl p-5 text-center opacity-60">
              <p className="text-gray-400 text-sm font-medium">{method}</p>
              <span className="text-xs text-gray-600 mt-1 block">Coming Soon</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-3 block">Featured Collection</span>
              <h2 className="text-white text-3xl lg:text-4xl font-bold font-sans">Bestselling Products</h2>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 text-[#D4AF37] hover:text-[#C49B2A] font-medium text-sm transition-colors">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-xl font-semibold text-sm">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-3 block">Why Choose Us</span>
          <h2 className="text-white text-3xl lg:text-4xl font-bold font-sans">The Zumrah Difference</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Award, title: "Premium Quality", desc: "100% combed cotton and performance polyester fabrics. Every product meets our strict quality standards." },
            { icon: Zap, title: "Fast Turnaround", desc: "Standard orders ready in 5-7 business days. Express options available for urgent requirements." },
            { icon: Sparkles, title: "Pro Design Studio", desc: "Our design tool lets you preview exactly what you'll receive. No surprises, just perfection." },
            { icon: Shield, title: "Secure Checkout", desc: "Cash on Delivery available nationwide today — card, EasyPaisa, and JazzCash are coming soon." },
            { icon: Truck, title: "Nationwide Delivery", desc: "Fast shipping across Pakistan. Karachi ₨300 | All other cities ₨450." },
            { icon: Users, title: "Built for Teams", desc: "Perfect for teams, events, and businesses ordering custom apparel in bulk." },
          ].map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all group">
              <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                <Icon size={22} className="text-[#D4AF37]" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 font-sans">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-3 block">Simple Process</span>
          <h2 className="text-white text-3xl lg:text-4xl font-bold font-sans">How It Works</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { step: "01", title: "Choose Product", desc: "Select from our premium collection of T-shirts, jerseys, and more.", icon: ShoppingBag },
            { step: "02", title: "Customize Design", desc: "Use our design studio to add text, logos, and images.", icon: Sparkles },
            { step: "03", title: "Preview & Review", desc: "See your design exactly as it will be printed.", icon: Play },
            { step: "04", title: "Checkout Securely", desc: "Pay via Cash on Delivery, with more options coming soon.", icon: Shield },
            { step: "05", title: "Fast Delivery", desc: "Your custom apparel delivered within 5-7 business days.", icon: Truck },
          ].map(({ step, title, desc, icon: Icon }, i) => (
            <motion.div key={step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
              {i < 4 && <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#D4AF37]/40 to-transparent z-0" />}
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon size={24} className="text-[#D4AF37]" />
                </div>
                <span className="text-[#D4AF37]/50 text-xs font-bold">{step}</span>
                <h3 className="text-white font-semibold mb-2 mt-1 font-sans">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-[#0d0d0d] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-3 block">Customer Love</span>
            <h2 className="text-white text-3xl lg:text-4xl font-bold font-sans">What Our Customers Say</h2>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <motion.div animate={{ x: `-${activeTestimonial * 100}%` }} transition={{ duration: 0.5, ease: "easeInOut" }} className="flex">
                {TESTIMONIALS.map((t) => (
                  <div key={t.id} className="min-w-full px-4">
                    <div className="max-w-2xl mx-auto bg-[#111] border border-[#1e1e1e] rounded-3xl p-8 text-center">
                      <div className="flex items-center justify-center gap-1 mb-4">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} size={18} fill="#D4AF37" stroke="#D4AF37" />
                        ))}
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">&quot;{t.comment}&quot;</p>
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold">{t.avatar}</div>
                        <div className="text-left">
                          <p className="text-white font-semibold">{t.name}</p>
                          <p className="text-gray-500 text-sm">{t.role} · {t.city}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-3 mt-8">
              <button onClick={() => setActiveTestimonial((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] text-gray-400 hover:text-white hover:border-[#D4AF37] transition-all flex items-center justify-center">
                <ChevronLeft size={18} />
              </button>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} className={`transition-all rounded-full ${i === activeTestimonial ? "w-8 h-2 bg-[#D4AF37]" : "w-2 h-2 bg-[#333] hover:bg-[#555]"}`} />
              ))}
              <button onClick={() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length)} className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] text-gray-400 hover:text-white hover:border-[#D4AF37] transition-all flex items-center justify-center">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-3 block">Got Questions?</span>
          <h2 className="text-white text-3xl lg:text-4xl font-bold font-sans">Frequently Asked Questions</h2>
        </motion.div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors">
                <span className="text-white font-medium text-sm">{faq.q}</span>
                <ChevronDown size={18} className={`text-[#D4AF37] flex-shrink-0 transition-transform ml-4 ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-6 pb-5">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#D4AF37]/20 via-[#111] to-[#D4AF37]/10 border border-[#D4AF37]/30 p-12 text-center">
            <div className="relative">
              <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4 font-sans">Ready to Create Something Amazing?</h2>
              <p className="text-gray-400 mb-8 text-lg">Start designing your premium custom apparel today. No design skills needed.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/designer" className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] transition-all hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <Sparkles size={18} /> Start Designing — It&apos;s Free
                </Link>
                <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/15 transition-all">
                  Browse Products
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
