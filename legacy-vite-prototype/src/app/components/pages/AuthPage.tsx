import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import {
  Eye, EyeOff, Mail, Lock, User, Phone, Check, Shirt,
  ArrowLeft, Chrome, Facebook
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export function AuthPage() {
  const location = useLocation();
  const isRegister = location.pathname === "/register";
  const navigate = useNavigate();
  const { login, showNotification } = useApp();

  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPw: "", terms: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister && form.password !== form.confirmPw) {
      showNotification("Passwords don't match", "error");
      return;
    }
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    const name = isRegister ? `${form.firstName} ${form.lastName}` : "Ahmed Hassan";
    login(form.email || "ahmed@example.com", name);
    navigate("/account");
    setIsLoading(false);
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    login("user@gmail.com", "Google User");
    navigate("/account");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0d0d0d] via-[#111] to-[#0d0d0d] flex-col">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-2xl" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }}
          />
        </div>

        <div className="relative flex flex-col justify-between p-12 h-full">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center">
              <Shirt size={22} className="text-black" />
            </div>
            <span className="text-white font-bold text-2xl" style={{ fontFamily: "Poppins, sans-serif" }}>
              Zumrah <span className="text-[#D4AF37]">Apparel</span>
            </span>
          </Link>

          <div>
            <h2 className="text-white text-4xl font-bold mb-5 leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
              {isRegister ? "Start Designing.\nStart Earning." : "Welcome Back\nto Zumrah."}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {isRegister
                ? "Join 50,000+ customers who design premium custom apparel with Zumrah Apparel."
                : "Your custom designs and orders are waiting for you. Let's create something amazing together."}
            </p>

            <div className="space-y-4">
              {[
                { text: "Professional 3D shirt designer", icon: Check },
                { text: "DTF & Sublimation printing", icon: Check },
                { text: "Pakistan-wide delivery", icon: Check },
                { text: "EasyPaisa, JazzCash & COD accepted", icon: Check },
              ].map(({ text, icon: Icon }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                    <Icon size={13} className="text-[#D4AF37]" />
                  </div>
                  <span className="text-gray-300 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111]/80 backdrop-blur-sm border border-[#333] rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold flex-shrink-0">AH</div>
              <div>
                <p className="text-gray-300 text-sm italic">"Zumrah Apparel transformed our corporate merchandise. The quality is unmatched!"</p>
                <p className="text-[#D4AF37] text-xs font-semibold mt-2">Ahmed Hassan — CEO, TechStart Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Back link */}
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] text-sm mb-8 transition-colors lg:hidden">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-white text-3xl font-bold mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
              {isRegister ? "Create Account" : "Login"}
            </h1>
            <p className="text-gray-400 text-sm">
              {isRegister ? "Already have an account? " : "Don't have an account? "}
              <Link to={isRegister ? "/login" : "/register"} className="text-[#D4AF37] hover:text-[#C49B2A] font-semibold transition-colors">
                {isRegister ? "Login" : "Create Account"}
              </Link>
            </p>
          </div>

          {/* Social login */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => handleSocialLogin("google")}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#111] border border-[#333] text-gray-300 rounded-xl text-sm hover:border-[#444] hover:text-white transition-all"
            >
              <Chrome size={17} className="text-blue-400" />
              Google
            </button>
            <button
              onClick={() => handleSocialLogin("facebook")}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#111] border border-[#333] text-gray-300 rounded-xl text-sm hover:border-[#444] hover:text-white transition-all"
            >
              <Facebook size={17} className="text-blue-500" />
              Facebook
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#222]" />
            <span className="text-gray-600 text-xs">or continue with email</span>
            <div className="flex-1 h-px bg-[#222]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="First Name"
                  type="text"
                  value={form.firstName}
                  onChange={(v) => setForm({ ...form, firstName: v })}
                  placeholder="Ahmed"
                  icon={<User size={15} />}
                  required
                />
                <InputField
                  label="Last Name"
                  type="text"
                  value={form.lastName}
                  onChange={(v) => setForm({ ...form, lastName: v })}
                  placeholder="Hassan"
                  required
                />
              </div>
            )}

            <InputField
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="ahmed@example.com"
              icon={<Mail size={15} />}
              required
            />

            {isRegister && (
              <InputField
                label="Phone Number"
                type="tel"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                placeholder="+92-300-0000000"
                icon={<Phone size={15} />}
              />
            )}

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder={isRegister ? "Create a strong password" : "Enter your password"}
                  required
                  className="w-full pl-10 pr-11 py-3 bg-[#111] border border-[#333] rounded-xl text-white outline-none focus:border-[#D4AF37]/50 transition-colors text-sm placeholder-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {isRegister && (
              <InputField
                label="Confirm Password"
                type="password"
                value={form.confirmPw}
                onChange={(v) => setForm({ ...form, confirmPw: v })}
                placeholder="Repeat your password"
                icon={<Lock size={15} />}
              />
            )}

            {!isRegister && (
              <div className="flex justify-end">
                <Link to="/login" className="text-[#D4AF37] text-sm hover:text-[#C49B2A] transition-colors">Forgot password?</Link>
              </div>
            )}

            {isRegister && (
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  onClick={() => setForm({ ...form, terms: !form.terms })}
                  className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-all ${form.terms ? "bg-[#D4AF37] border-[#D4AF37]" : "border-[#333]"}`}
                >
                  {form.terms && <Check size={12} className="text-black" />}
                </div>
                <span className="text-gray-400 text-sm leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-[#D4AF37] hover:text-[#C49B2A]">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-[#D4AF37] hover:text-[#C49B2A]">Privacy Policy</a>
                </span>
              </label>
            )}

            <button
              type="submit"
              disabled={isLoading || (isRegister && !form.terms)}
              className="w-full py-4 bg-[#D4AF37] text-black rounded-xl font-bold text-lg hover:bg-[#C49B2A] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : isRegister ? "Create Account" : "Login to Account"}
            </button>
          </form>

          {/* Demo note */}
          <p className="text-center text-gray-600 text-xs mt-6">
            Demo: Use any email/password to {isRegister ? "register" : "login"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function InputField({ label, type, value, onChange, placeholder, icon, required }: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon?: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-gray-400 text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`w-full py-3 bg-[#111] border border-[#333] rounded-xl text-white outline-none focus:border-[#D4AF37]/50 transition-colors text-sm placeholder-gray-600 ${icon ? "pl-10 pr-4" : "px-4"}`}
        />
      </div>
    </div>
  );
}
