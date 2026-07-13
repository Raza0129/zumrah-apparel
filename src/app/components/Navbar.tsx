import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag, Heart, User, Menu, X, Search,
  ChevronDown, Shirt, LayoutDashboard, LogOut, Settings, Package
} from "lucide-react";
import { useApp } from "../context/AppContext";

export function Navbar() {
  const { cartCount, wishlist, isLoggedIn, user, logout } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const isLanding = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Design Studio", href: "/designer" },
    { label: "DTF Printing", href: "/shop?category=dtf" },
    { label: "Sublimation", href: "/shop?category=sublimation" },
  ];

  const navBg = scrolled || !isLanding
    ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#222]"
    : "bg-transparent";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#B8960C] rounded-lg flex items-center justify-center">
                <Shirt size={18} className="text-black" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
                Zumrah <span className="text-[#D4AF37]">Apparel</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm font-medium relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link to="/account/wishlist" className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all relative">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all relative">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#D4AF37] rounded-full text-[10px] text-black font-bold flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  {isLoggedIn ? (
                    <div className="w-7 h-7 bg-[#D4AF37] rounded-full flex items-center justify-center text-black text-xs font-bold">
                      {user?.name?.[0] ?? "U"}
                    </div>
                  ) : (
                    <User size={20} />
                  )}
                  <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-52 bg-[#111] border border-[#333] rounded-xl shadow-2xl overflow-hidden"
                    >
                      {isLoggedIn ? (
                        <>
                          <div className="px-4 py-3 border-b border-[#222]">
                            <p className="text-white text-sm font-semibold">{user?.name}</p>
                            <p className="text-gray-500 text-xs">{user?.email}</p>
                          </div>
                          <Link to="/account" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 text-sm">
                            <User size={16} /> My Account
                          </Link>
                          <Link to="/account/orders" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 text-sm">
                            <Package size={16} /> My Orders
                          </Link>
                          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 text-sm">
                            <LayoutDashboard size={16} /> Admin Panel
                          </Link>
                          <Link to="/account/settings" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 text-sm">
                            <Settings size={16} /> Settings
                          </Link>
                          <button
                            onClick={() => { logout(); setUserMenuOpen(false); }}
                            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm border-t border-[#222]"
                          >
                            <LogOut size={16} /> Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link to="/login" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 text-sm">
                            <User size={16} /> Login
                          </Link>
                          <Link to="/register" className="flex items-center gap-3 px-4 py-3 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium">
                            Create Account →
                          </Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0d0d0d] border-t border-[#222] overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center py-3 text-gray-300 hover:text-[#D4AF37] font-medium border-b border-[#1a1a1a] text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 flex gap-3">
                  {isLoggedIn ? (
                    <>
                      <Link to="/account" className="flex-1 py-2.5 text-center bg-[#1a1a1a] text-white rounded-lg text-sm">Account</Link>
                      <button onClick={logout} className="flex-1 py-2.5 text-center bg-red-500/20 text-red-400 rounded-lg text-sm">Logout</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="flex-1 py-2.5 text-center bg-[#1a1a1a] text-white rounded-lg text-sm">Login</Link>
                      <Link to="/register" className="flex-1 py-2.5 text-center bg-[#D4AF37] text-black rounded-lg text-sm font-semibold">Register</Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch}>
                <div className="flex items-center bg-[#111] border border-[#333] rounded-2xl overflow-hidden shadow-2xl">
                  <Search size={20} className="ml-5 text-gray-400 flex-shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for T-shirts, jerseys, hoodies..."
                    className="flex-1 px-4 py-5 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-5 text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
              </form>
              <div className="mt-4 flex gap-2 flex-wrap">
                {["DTF T-Shirt", "Sublimation Jersey", "Hoodie", "Polo Shirt"].map((term) => (
                  <button
                    key={term}
                    onClick={() => { navigate(`/shop?search=${encodeURIComponent(term)}`); setSearchOpen(false); }}
                    className="px-4 py-2 bg-[#1a1a1a] text-gray-400 hover:text-[#D4AF37] rounded-full text-sm border border-[#333] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
