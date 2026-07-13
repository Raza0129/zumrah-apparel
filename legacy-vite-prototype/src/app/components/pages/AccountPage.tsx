import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  User, Package, Heart, MapPin, Settings, Bell, Download,
  Star, Sparkles, LogOut, ChevronRight, Eye, Edit2, Plus,
  CheckCircle, Truck, Clock, XCircle, Printer
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { MOCK_ORDERS, PRODUCTS, formatPKR } from "../../data/products";

type Tab = "overview" | "orders" | "designs" | "wishlist" | "addresses" | "settings";

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "text-yellow-400", bg: "bg-yellow-400/10", icon: Clock },
  printing: { label: "Printing", color: "text-blue-400", bg: "bg-blue-400/10", icon: Printer },
  shipped: { label: "Shipped", color: "text-[#D4AF37]", bg: "bg-[#D4AF37]/10", icon: Truck },
  delivered: { label: "Delivered", color: "text-emerald-400", bg: "bg-emerald-400/10", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "text-red-400", bg: "bg-red-400/10", icon: XCircle },
};

export function AccountPage() {
  const { tab } = useParams<{ tab?: Tab }>();
  const { isLoggedIn, user, wishlist, toggleWishlist, logout } = useApp();
  const navigate = useNavigate();
  const activeTab: Tab = (tab as Tab) ?? "overview";

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20 flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center">
          <div className="w-20 h-20 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <User size={36} className="text-[#D4AF37]" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Login Required</h2>
          <p className="text-gray-400 mb-8">Please log in to access your account dashboard.</p>
          <div className="space-y-3">
            <Link to="/login" className="block w-full py-3 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] transition-all">Login to Account</Link>
            <Link to="/register" className="block w-full py-3 bg-[#111] border border-[#333] text-white rounded-xl hover:bg-[#1a1a1a] transition-all">Create Account</Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "designs", label: "Saved Designs", icon: Sparkles },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center text-black text-xl font-bold">
                  {user?.name?.[0] ?? "U"}
                </div>
                <div>
                  <p className="text-white font-semibold">{user?.name}</p>
                  <p className="text-gray-500 text-xs">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle size={12} /> Verified Account
              </div>
            </div>

            <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
              {navItems.map(({ id, label, icon: Icon }) => (
                <Link
                  key={id}
                  to={`/account/${id}`}
                  className={`flex items-center justify-between px-5 py-3.5 border-b border-[#1a1a1a] last:border-0 transition-all ${activeTab === id ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "text-gray-400 hover:text-white hover:bg-white/3"}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                  <ChevronRight size={14} />
                </Link>
              ))}
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="flex items-center gap-3 w-full px-5 py-3.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-sm"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {activeTab === "overview" && (
              <div>
                <h1 className="text-white text-2xl font-bold mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Welcome back, {user?.name?.split(" ")[0]}! 👋
                </h1>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Total Orders", value: MOCK_ORDERS.length, icon: Package, color: "text-[#D4AF37]" },
                    { label: "Wishlist Items", value: wishlist.length, icon: Heart, color: "text-red-400" },
                    { label: "Saved Designs", value: 3, icon: Sparkles, color: "text-purple-400" },
                    { label: "Points Earned", value: "1,240", icon: Star, color: "text-yellow-400" },
                  ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
                      <Icon size={22} className={`${color} mb-3`} />
                      <p className={`${color} text-2xl font-bold`}>{value}</p>
                      <p className="text-gray-500 text-sm mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent orders */}
                <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-white font-bold">Recent Orders</h2>
                    <Link to="/account/orders" className="text-[#D4AF37] text-sm hover:text-[#C49B2A] transition-colors">View All →</Link>
                  </div>
                  <div className="space-y-3">
                    {MOCK_ORDERS.slice(0, 3).map((order) => {
                      const status = STATUS_CONFIG[order.status];
                      const StatusIcon = status.icon;
                      return (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-[#0d0d0d] rounded-xl">
                          <div>
                            <p className="text-white font-medium text-sm">{order.id}</p>
                            <p className="text-gray-500 text-xs">{order.items} items · {new Date(order.date).toLocaleDateString("en-PK")}</p>
                          </div>
                          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                            <StatusIcon size={11} />
                            {status.label}
                          </div>
                          <span className="text-[#D4AF37] font-bold text-sm">{formatPKR(order.total)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h1 className="text-white text-2xl font-bold mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>My Orders</h1>
                <div className="space-y-4">
                  {MOCK_ORDERS.map((order) => {
                    const status = STATUS_CONFIG[order.status];
                    const StatusIcon = status.icon;
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-white font-bold">{order.id}</p>
                            <p className="text-gray-500 text-sm">{new Date(order.date).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}</p>
                          </div>
                          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}>
                            <StatusIcon size={12} />
                            {status.label}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-[#0d0d0d] rounded-xl">
                          <div>
                            <p className="text-gray-500 text-xs">Items</p>
                            <p className="text-white font-semibold">{order.items} items</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Payment</p>
                            <p className="text-white font-semibold">{order.paymentMethod}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Total</p>
                            <p className="text-[#D4AF37] font-bold">{formatPKR(order.total)}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="flex-1 py-2 bg-[#0d0d0d] border border-[#333] text-gray-300 rounded-xl text-sm hover:border-[#D4AF37]/50 transition-all flex items-center justify-center gap-2">
                            <Eye size={14} /> View Details
                          </button>
                          {order.status === "delivered" && (
                            <button className="flex-1 py-2 bg-[#0d0d0d] border border-[#333] text-gray-300 rounded-xl text-sm hover:border-[#D4AF37]/50 transition-all flex items-center justify-center gap-2">
                              <Download size={14} /> Invoice
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "designs" && (
              <div>
                <h1 className="text-white text-2xl font-bold mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>Saved Designs</h1>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {["Corporate Logo Tee", "Sports Jersey 2026", "University Design"].map((name, i) => (
                    <div key={name} className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden group">
                      <div className="aspect-square bg-[#0d0d0d] flex items-center justify-center relative">
                        <Sparkles size={48} className="text-gray-700" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Link to="/designer" className="px-3 py-2 bg-[#D4AF37] text-black rounded-lg text-xs font-bold">Edit</Link>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-white font-semibold text-sm">{name}</p>
                        <p className="text-gray-500 text-xs mt-1">DTF Printing · Saved {i + 1} week{i > 0 ? "s" : ""} ago</p>
                        <div className="flex gap-2 mt-3">
                          <Link to="/designer" className="flex-1 py-2 text-center bg-[#0d0d0d] border border-[#333] text-gray-300 rounded-lg text-xs hover:border-[#D4AF37]/50 transition-all">Edit Design</Link>
                          <Link to="/cart" className="flex-1 py-2 text-center bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg text-xs">Add to Cart</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link to="/designer" className="bg-[#111] border-2 border-dashed border-[#333] rounded-2xl aspect-square flex flex-col items-center justify-center hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all group">
                    <Plus size={32} className="text-gray-600 group-hover:text-[#D4AF37] mb-2 transition-colors" />
                    <p className="text-gray-600 group-hover:text-[#D4AF37] text-sm font-medium transition-colors">New Design</p>
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div>
                <h1 className="text-white text-2xl font-bold mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                  My Wishlist {wishlist.length > 0 && <span className="text-gray-500 text-base font-normal">({wishlist.length} items)</span>}
                </h1>
                {wishlist.length === 0 ? (
                  <div className="text-center py-20">
                    <Heart size={64} className="text-gray-700 mx-auto mb-4" />
                    <h3 className="text-white text-xl font-semibold mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-6">Save your favourite products here</p>
                    <Link to="/shop" className="px-6 py-3 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] transition-all">Browse Products</Link>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {wishlist.map(({ product }) => (
                      <div key={product.id} className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden group">
                        <div className="aspect-square overflow-hidden relative">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                          >
                            <Heart size={14} fill="currentColor" />
                          </button>
                        </div>
                        <div className="p-4">
                          <p className="text-white font-semibold text-sm line-clamp-1">{product.name}</p>
                          <p className="text-[#D4AF37] font-bold mt-1">{formatPKR(product.salePrice ?? product.price)}</p>
                          <div className="flex gap-2 mt-3">
                            <Link to={`/shop/${product.id}`} className="flex-1 py-2 text-center bg-[#0d0d0d] border border-[#333] text-gray-300 rounded-lg text-xs">View</Link>
                            <Link to={`/designer/${product.id}`} className="flex-1 py-2 text-center bg-[#D4AF37] text-black rounded-lg text-xs font-bold">Design</Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-white text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Saved Addresses</h1>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black rounded-xl text-sm font-bold">
                    <Plus size={15} /> Add Address
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-[#111] border-2 border-[#D4AF37]/40 rounded-2xl p-5 relative">
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full">Default</div>
                    <MapPin size={20} className="text-[#D4AF37] mb-3" />
                    <p className="text-white font-semibold mb-1">{user?.name}</p>
                    <p className="text-gray-400 text-sm">House #12, Street 5, Block B</p>
                    <p className="text-gray-400 text-sm">DHA Phase 5, Karachi, Sindh 75500</p>
                    <p className="text-gray-500 text-xs mt-2">{user?.phone}</p>
                    <div className="flex gap-2 mt-4">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] border border-[#333] text-gray-400 rounded-lg text-xs hover:text-white transition-colors"><Edit2 size={11} /> Edit</button>
                    </div>
                  </div>
                  <button className="border-2 border-dashed border-[#333] rounded-2xl p-5 flex flex-col items-center justify-center gap-2 hover:border-[#D4AF37]/50 transition-all group">
                    <Plus size={28} className="text-gray-600 group-hover:text-[#D4AF37] transition-colors" />
                    <p className="text-gray-600 group-hover:text-[#D4AF37] text-sm transition-colors">Add New Address</p>
                  </button>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h1 className="text-white text-2xl font-bold mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>Account Settings</h1>
                <div className="space-y-5">
                  <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
                    <h2 className="text-white font-semibold mb-4">Profile Information</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { label: "Full Name", value: user?.name ?? "" },
                        { label: "Email", value: user?.email ?? "" },
                        { label: "Phone", value: user?.phone ?? "" },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <label className="text-gray-500 text-xs block mb-1.5">{label}</label>
                          <input defaultValue={value} className="w-full px-4 py-2.5 bg-[#0d0d0d] border border-[#333] rounded-xl text-white text-sm outline-none focus:border-[#D4AF37]/50" />
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 px-6 py-2.5 bg-[#D4AF37] text-black rounded-xl text-sm font-bold hover:bg-[#C49B2A] transition-colors">Save Changes</button>
                  </div>

                  <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
                    <h2 className="text-white font-semibold mb-4">Notifications</h2>
                    {["Order updates", "Promotions & deals", "New product launches"].map((pref) => (
                      <div key={pref} className="flex items-center justify-between py-3 border-b border-[#1a1a1a] last:border-0">
                        <span className="text-gray-300 text-sm">{pref}</span>
                        <div className="w-10 h-5 bg-[#D4AF37] rounded-full relative cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
