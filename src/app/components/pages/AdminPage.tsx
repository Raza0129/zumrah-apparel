import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings, Bell,
  TrendingUp, ArrowUp, ArrowDown, Search, Edit2, Trash2,
  Eye, Plus, X, Check, BarChart3, Menu, LogOut, Shirt,
  Download, FileText, Image, Layers, MapPin, Phone, Mail, CreditCard,
  Truck, Hash, MessageSquare, Globe, DollarSign, RefreshCw, ExternalLink,
  FileJson, FolderArchive
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { PRODUCTS, MOCK_ORDERS, formatPKR } from "../../data/products";
import { useApp } from "../../context/AppContext";

type AdminTab = "dashboard" | "orders" | "products" | "customers" | "analytics" | "cms" | "settings";

// ─── Mock Data ──────────────────────────────────────────────────────────────────
const REVENUE_DATA = [
  { month: "Jan", revenue: 185000, orders: 124 },
  { month: "Feb", revenue: 220000, orders: 148 },
  { month: "Mar", revenue: 195000, orders: 131 },
  { month: "Apr", revenue: 280000, orders: 186 },
  { month: "May", revenue: 310000, orders: 207 },
  { month: "Jun", revenue: 425000, orders: 284 },
  { month: "Jul", revenue: 380000, orders: 253 },
];

const PAYMENT_DISTRIBUTION = [
  { name: "Card", value: 35, color: "#D4AF37" },
  { name: "JazzCash", value: 28, color: "#7C3AED" },
  { name: "EasyPaisa", value: 22, color: "#10B981" },
  { name: "COD", value: 15, color: "#F59E0B" },
];

const MOCK_CUSTOMERS = [
  { id: "C001", name: "Ahmed Hassan", email: "ahmed@email.com", phone: "+92-300-1234567", orders: 8, spent: 18500, status: "vip", city: "Karachi", joined: "2025-09-15" },
  { id: "C002", name: "Fatima Malik", email: "fatima@email.com", phone: "+92-321-9876543", orders: 5, spent: 12300, status: "active", city: "Lahore", joined: "2025-10-22" },
  { id: "C003", name: "Usman Tariq", email: "usman@email.com", phone: "+92-333-5551234", orders: 3, spent: 6700, status: "active", city: "Islamabad", joined: "2025-11-08" },
  { id: "C004", name: "Sara Qureshi", email: "sara@email.com", phone: "+92-300-8887766", orders: 12, spent: 28000, status: "vip", city: "Faisalabad", joined: "2025-08-01" },
  { id: "C005", name: "Bilal Ahmed", email: "bilal@email.com", phone: "+92-345-1234567", orders: 1, spent: 1800, status: "new", city: "Multan", joined: "2026-06-20" },
];

const EXTENDED_ORDERS = MOCK_ORDERS.map((o, i) => ({
  ...o,
  customer: {
    name: ["Ahmed Hassan", "Fatima Malik", "Usman Tariq", "Sara Qureshi"][i % 4],
    email: ["ahmed@email.com", "fatima@email.com", "usman@email.com", "sara@email.com"][i % 4],
    phone: ["+92-300-1234567", "+92-321-9876543", "+92-333-5551234", "+92-300-8887766"][i % 4],
    address: ["House 12, St 5, DHA Phase 5", "G-11/2, Islamabad", "Gulshan-e-Iqbal, Block 7", "Model Town, Lahore"][i % 4],
    province: ["Sindh", "Punjab", "Sindh", "Punjab"][i % 4],
    postalCode: ["75500", "44000", "75300", "54000"][i % 4],
  },
  transactionId: `TXN-${Math.random().toString(36).substr(2, 10).toUpperCase()}`,
  trackingNumber: o.status === "shipped" || o.status === "delivered" ? `TCS-${Math.floor(100000000 + Math.random() * 900000000)}` : null,
  courier: o.status === "shipped" || o.status === "delivered" ? "TCS Courier" : null,
  notes: i === 0 ? "Please use vibrant colors" : null,
  design: {
    front: {
      layers: 3,
      images: 1,
      texts: 2,
      fonts: ["Poppins", "Inter"],
      colors: ["#ffffff", "#D4AF37"],
      thumbnail: PRODUCTS[i % PRODUCTS.length].image,
    },
    back: {
      layers: 1,
      images: 0,
      texts: 1,
      fonts: ["Impact"],
      colors: ["#ffffff"],
      thumbnail: null,
    },
    leftSleeve: { layers: 0, images: 0, texts: 0, fonts: [], colors: [], thumbnail: null },
    rightSleeve: { layers: 0, images: 0, texts: 0, fonts: [], colors: [], thumbnail: null },
  },
  shirtColor: PRODUCTS[i % PRODUCTS.length].colors[0],
  productName: PRODUCTS[i % PRODUCTS.length].name,
  productImage: PRODUCTS[i % PRODUCTS.length].image,
  printingMethod: PRODUCTS[i % PRODUCTS.length].printingMethod,
}));

const STATUS_COLORS: Record<string, { text: string; bg: string; label: string }> = {
  pending: { text: "text-yellow-400", bg: "bg-yellow-400/10", label: "Pending" },
  printing: { text: "text-blue-400", bg: "bg-blue-400/10", label: "Printing" },
  shipped: { text: "text-[#D4AF37]", bg: "bg-[#D4AF37]/10", label: "Shipped" },
  delivered: { text: "text-emerald-400", bg: "bg-emerald-400/10", label: "Delivered" },
  cancelled: { text: "text-red-400", bg: "bg-red-400/10", label: "Cancelled" },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function downloadJSON(data: object, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
}

function downloadText(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
}

// ─── Order Detail Panel ────────────────────────────────────────────────────────
function OrderDetailPanel({ order, onClose }: { order: typeof EXTENDED_ORDERS[0]; onClose: () => void }) {
  const [activeDesignTab, setActiveDesignTab] = useState<"front" | "back" | "leftSleeve" | "rightSleeve">("front");
  const status = STATUS_COLORS[order.status];

  const generateProductionPackageJSON = () => {
    return {
      package: "Zumrah Apparel Production Package",
      version: "1.0",
      generatedAt: new Date().toISOString(),
      orderId: order.id,
      customer: order.customer,
      product: {
        name: order.productName,
        printingMethod: order.printingMethod,
        shirtColor: order.shirtColor,
      },
      payment: {
        method: order.paymentMethod,
        transactionId: order.transactionId,
        total: order.total,
        status: "completed",
      },
      shipping: {
        address: `${order.customer.address}, ${order.city}, ${order.customer.province} ${order.customer.postalCode}`,
        courier: order.courier,
        trackingNumber: order.trackingNumber,
        charge: order.city === "Karachi" ? 300 : 450,
      },
      design: {
        front: {
          layers: order.design.front.layers,
          images: order.design.front.images,
          texts: order.design.front.texts,
          fonts: order.design.front.fonts,
          colors: order.design.front.colors,
          resolution: "300 DPI",
          printWidth: "220mm",
          printHeight: "280mm",
        },
        back: {
          layers: order.design.back.layers,
          images: order.design.back.images,
          texts: order.design.back.texts,
          fonts: order.design.back.fonts,
          colors: order.design.back.colors,
          resolution: "300 DPI",
        },
      },
      productionNotes: order.notes ?? "Standard production. No special notes.",
      printingInstructions: {
        method: order.printingMethod,
        temperatureC: order.printingMethod === "DTF Printing" ? 160 : 200,
        pressingTime: order.printingMethod === "DTF Printing" ? "10-12 seconds" : "45 seconds",
        pressure: "Medium-High",
        washInstructions: "Cold wash inside out, no bleach",
      },
    };
  };

  const sides = [
    { key: "front" as const, label: "Front" },
    { key: "back" as const, label: "Back" },
    { key: "leftSleeve" as const, label: "Left Sleeve" },
    { key: "rightSleeve" as const, label: "Right Sleeve" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="fixed inset-y-0 right-0 w-full lg:w-[680px] bg-[#0d0d0d] border-l border-[#1e1e1e] z-50 flex flex-col shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1e1e] flex-shrink-0">
        <div>
          <h2 className="text-white font-bold text-lg">Order Detail</h2>
          <p className="text-[#D4AF37] text-sm font-mono">{order.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>{status.label}</span>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg"><X size={18} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-5 space-y-5">

          {/* ── Customer Information ── */}
          <Section title="Customer Information" icon={Users}>
            <div className="grid grid-cols-2 gap-3">
              <InfoField label="Full Name" value={order.customer.name} icon={<Users size={13} />} />
              <InfoField label="Phone" value={order.customer.phone} icon={<Phone size={13} />} />
              <InfoField label="Email" value={order.customer.email} icon={<Mail size={13} />} />
              <InfoField label="City" value={order.city} icon={<MapPin size={13} />} />
              <div className="col-span-2">
                <InfoField label="Complete Address" value={`${order.customer.address}, ${order.city}, ${order.customer.province} ${order.customer.postalCode}`} icon={<MapPin size={13} />} />
              </div>
            </div>
          </Section>

          {/* ── Payment & Shipping ── */}
          <Section title="Payment & Shipping" icon={CreditCard}>
            <div className="grid grid-cols-2 gap-3">
              <InfoField label="Payment Method" value={order.paymentMethod} icon={<CreditCard size={13} />} />
              <InfoField label="Transaction ID" value={order.transactionId} icon={<Hash size={13} />} />
              <InfoField label="Shipping Charge" value={formatPKR(order.city === "Karachi" ? 300 : 450)} icon={<Truck size={13} />} />
              <InfoField label="Grand Total" value={formatPKR(order.total)} icon={<DollarSign size={13} />} highlight />
              {order.courier && <InfoField label="Courier" value={order.courier} icon={<Truck size={13} />} />}
              {order.trackingNumber && <InfoField label="Tracking #" value={order.trackingNumber} icon={<Hash size={13} />} />}
            </div>
          </Section>

          {/* ── Product ── */}
          <Section title="Product" icon={Shirt}>
            <div className="flex gap-4">
              <img src={order.productImage} alt="" className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1">
                <p className="text-white font-semibold">{order.productName}</p>
                <p className="text-gray-400 text-sm">{order.printingMethod}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-5 h-5 rounded-full border-2 border-[#333]" style={{ backgroundColor: order.shirtColor }} />
                  <span className="text-gray-400 text-xs">Shirt Color</span>
                </div>
              </div>
            </div>
          </Section>

          {/* ── Design Breakdown ── */}
          <Section title="Design Breakdown" icon={Layers}>
            <div className="flex gap-1.5 mb-4 bg-[#111] rounded-xl p-1">
              {sides.map((s) => {
                const sideData = order.design[s.key];
                const hasDesign = sideData.layers > 0;
                return (
                  <button
                    key={s.key}
                    onClick={() => setActiveDesignTab(s.key)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 ${activeDesignTab === s.key ? "bg-[#D4AF37] text-black" : "text-gray-400 hover:text-gray-200"}`}
                  >
                    {s.label}
                    {hasDesign && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] opacity-80" />}
                  </button>
                );
              })}
            </div>

            {(() => {
              const side = order.design[activeDesignTab];
              const sideLabel = sides.find((s) => s.key === activeDesignTab)?.label;
              return (
                <div className="bg-[#111] rounded-2xl p-4">
                  <div className="flex items-start gap-4 mb-4">
                    {side.thumbnail ? (
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#0d0d0d] flex-shrink-0">
                        <img src={side.thumbnail} alt={sideLabel} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-[#0d0d0d] flex items-center justify-center flex-shrink-0">
                        <p className="text-gray-700 text-xs text-center">No design<br />for {sideLabel}</p>
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="text-[#D4AF37] font-bold mb-2 uppercase text-xs tracking-wider">{sideLabel} Design</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <StatChip label="Total Layers" value={side.layers} />
                        <StatChip label="Images" value={side.images} />
                        <StatChip label="Text Layers" value={side.texts} />
                      </div>
                    </div>
                  </div>

                  {side.layers > 0 ? (
                    <div className="space-y-2">
                      {side.fonts.length > 0 && (
                        <DetailRow label="Fonts Used" value={side.fonts.join(", ")} />
                      )}
                      {side.colors.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-xs w-28">Colors Used</span>
                          <div className="flex gap-1.5">
                            {side.colors.map((c) => (
                              <div key={c} className="w-5 h-5 rounded-full border border-[#333]" style={{ backgroundColor: c }} title={c} />
                            ))}
                          </div>
                        </div>
                      )}
                      <DetailRow label="Print Resolution" value="300 DPI" />
                      <DetailRow label="Print Area" value={activeDesignTab === "front" || activeDesignTab === "back" ? "220mm × 280mm" : "80mm × 120mm"} />
                      <DetailRow label="File Format" value="PNG (Transparent)" />
                    </div>
                  ) : (
                    <p className="text-gray-600 text-xs">No design elements for {sideLabel}</p>
                  )}
                </div>
              );
            })()}
          </Section>

          {/* ── Production Notes ── */}
          {order.notes && (
            <Section title="Special Instructions" icon={MessageSquare}>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3">
                <p className="text-yellow-400 text-sm">{order.notes}</p>
              </div>
            </Section>
          )}

          {/* ── Status Update ── */}
          <Section title="Update Order Status" icon={RefreshCw}>
            <div className="flex flex-wrap gap-2">
              {Object.entries(STATUS_COLORS).map(([k, v]) => (
                <button
                  key={k}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${order.status === k ? `${v.bg} ${v.text} border-current` : "border-[#333] text-gray-500 hover:text-gray-300"}`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </Section>

          {/* ── Download Assets ── */}
          <Section title="Download Assets" icon={Download}>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { label: "Preview JPG", icon: Image, action: () => { const a = document.createElement("a"); a.href = order.productImage; a.download = `Preview_${order.id}.jpg`; a.click(); } },
                { label: "Preview PNG", icon: Image, action: () => { const a = document.createElement("a"); a.href = order.productImage; a.download = `Preview_${order.id}.png`; a.click(); } },
                { label: "Design JSON", icon: FileJson, action: () => downloadJSON({ orderId: order.id, customer: order.customer, design: order.design }, `Design_${order.id}.json`) },
                { label: "Metadata JSON", icon: FileText, action: () => downloadJSON(generateProductionPackageJSON(), `Metadata_${order.id}.json`) },
                { label: "Invoice TXT", icon: FileText, action: () => downloadText(`INVOICE\nOrder: ${order.id}\nCustomer: ${order.customer.name}\nTotal: ${formatPKR(order.total)}\nDate: ${order.date}`, `Invoice_${order.id}.txt`) },
                { label: "Production Package", icon: FolderArchive, action: () => downloadJSON(generateProductionPackageJSON(), `Production_Package_${order.id}.json`) },
              ].map(({ label, icon: Icon, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className="flex items-center gap-2 p-3 bg-[#111] border border-[#333] rounded-xl text-xs text-gray-300 hover:text-white hover:border-[#D4AF37]/50 transition-all"
                >
                  <Icon size={14} className="text-[#D4AF37] flex-shrink-0" />
                  {label}
                </button>
              ))}
            </div>

            {/* Download All ZIP (simulated) */}
            <button
              onClick={() => downloadJSON({
                package: `Order_${order.id}`,
                contents: ["Front.png", "Back.png", "LeftSleeve.png", "RightSleeve.png", "Preview.jpg", "Transparent.png", "Design.json", "Metadata.json", "Invoice.txt", "ProductionNotes.txt"],
                generatedAt: new Date().toISOString(),
                ...generateProductionPackageJSON()
              }, `Order_${order.id}_Production.zip.json`)}
              className="w-full py-3 bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] rounded-xl text-sm font-semibold hover:bg-[#D4AF37]/20 transition-all flex items-center justify-center gap-2"
            >
              <FolderArchive size={16} /> Download Complete Production Package (ZIP)
            </button>

            <p className="text-gray-600 text-[10px] mt-2 text-center">Production package includes all print-ready files, metadata, fonts, and invoice</p>
          </Section>
        </div>
      </div>
    </motion.div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={15} className="text-[#D4AF37]" />
        <h3 className="text-white font-semibold text-sm">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function InfoField({ label, value, icon, highlight }: { label: string; value: string; icon?: React.ReactNode; highlight?: boolean }) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-3">
      <p className="text-gray-500 text-[10px] mb-0.5 flex items-center gap-1">{icon}{label}</p>
      <p className={`text-sm font-medium break-all ${highlight ? "text-[#D4AF37] font-bold" : "text-white"}`}>{value}</p>
    </div>
  );
}

function StatChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-[#0d0d0d] rounded-lg p-2 text-center">
      <p className="text-[#D4AF37] font-bold text-lg">{value}</p>
      <p className="text-gray-500 text-[9px]">{label}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-500 text-xs w-28 flex-shrink-0">{label}</span>
      <span className="text-gray-200 text-xs">{value}</span>
    </div>
  );
}

// ─── Product Modal ────────────────────────────────────────────────────────────
function ProductModal({ product: initProduct, onClose, onSave }: {
  product?: typeof PRODUCTS[0] | null;
  onClose: () => void;
  onSave: (p: Partial<typeof PRODUCTS[0]>) => void;
}) {
  const [form, setForm] = useState({
    name: initProduct?.name ?? "",
    price: initProduct?.price ?? 1499,
    salePrice: initProduct?.salePrice ?? 0,
    category: initProduct?.category ?? "dtf",
    printingMethod: initProduct?.printingMethod ?? "DTF Printing",
    description: initProduct?.description ?? "",
    material: initProduct?.material ?? "",
    inStock: initProduct?.inStock ?? true,
    badge: initProduct?.badge ?? "",
    sku: initProduct?.sku ?? `ZA-${Date.now()}`,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0d0d0d] border border-[#333] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#1e1e1e]">
          <h2 className="text-white font-bold">{initProduct ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <FormLabel>Product Name</FormLabel>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-white text-sm outline-none focus:border-[#D4AF37]/50" />
            </div>
            <div>
              <FormLabel>Regular Price (PKR)</FormLabel>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-white text-sm outline-none focus:border-[#D4AF37]/50" />
            </div>
            <div>
              <FormLabel>Sale Price (0 = no sale)</FormLabel>
              <input type="number" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-white text-sm outline-none focus:border-[#D4AF37]/50" />
            </div>
            <div>
              <FormLabel>Category</FormLabel>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-white text-sm outline-none">
                <option value="dtf">DTF Printing</option>
                <option value="sublimation">Sublimation Printing</option>
              </select>
            </div>
            <div>
              <FormLabel>Printing Method</FormLabel>
              <select value={form.printingMethod} onChange={(e) => setForm({ ...form, printingMethod: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-white text-sm outline-none">
                <option value="DTF Printing">DTF Printing</option>
                <option value="Sublimation Printing">Sublimation Printing</option>
              </select>
            </div>
            <div>
              <FormLabel>Badge</FormLabel>
              <select value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-white text-sm outline-none">
                <option value="">None</option>
                <option value="new">New Arrival</option>
                <option value="bestseller">Best Seller</option>
                <option value="sale">Sale</option>
              </select>
            </div>
            <div>
              <FormLabel>Stock Status</FormLabel>
              <select value={form.inStock ? "true" : "false"} onChange={(e) => setForm({ ...form, inStock: e.target.value === "true" })}
                className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-white text-sm outline-none">
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
            <div>
              <FormLabel>SKU</FormLabel>
              <input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-white text-sm outline-none focus:border-[#D4AF37]/50" />
            </div>
            <div>
              <FormLabel>Material</FormLabel>
              <input value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-white text-sm outline-none focus:border-[#D4AF37]/50"
                placeholder="e.g. 100% Combed Cotton" />
            </div>
            <div className="col-span-2">
              <FormLabel>Description</FormLabel>
              <textarea value={form.description} rows={3} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-white text-sm outline-none focus:border-[#D4AF37]/50 resize-none" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 p-5 border-t border-[#1e1e1e]">
          <button onClick={onClose} className="px-6 py-2.5 bg-[#111] border border-[#333] text-gray-400 rounded-xl text-sm hover:text-white">Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }}
            className="flex-1 py-2.5 bg-[#D4AF37] text-black rounded-xl font-bold text-sm hover:bg-[#C49B2A] transition-colors flex items-center justify-center gap-2">
            <Check size={16} /> {initProduct ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function FormLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-gray-400 text-xs font-medium mb-1.5">{children}</label>;
}

// ─── CMS Section ─────────────────────────────────────────────────────────────
function CMSSection() {
  const [activeSection, setActiveSection] = useState("hero");
  const [heroTitle, setHeroTitle] = useState("Design. Print. Wear Your Vision.");
  const [heroSubtitle, setHeroSubtitle] = useState("Pakistan's premium custom apparel platform. DTF & Sublimation printing. Delivered anywhere in Pakistan.");
  const [heroCta, setHeroCta] = useState("Start Designing");
  const [announcements, setAnnouncements] = useState("🎉 Summer Sale: Use code ZUMRAH10 for 10% off all orders!");
  const [faqItems, setFaqItems] = useState("Q: What is minimum order? A: No minimum for standard products.");
  const [saved, setSaved] = useState(false);

  const sections = [
    { id: "hero", label: "Hero Section" },
    { id: "announcement", label: "Announcements" },
    { id: "faq", label: "FAQ" },
    { id: "footer", label: "Footer" },
    { id: "seo", label: "SEO" },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex gap-6">
      {/* CMS Sidebar */}
      <div className="w-48 flex-shrink-0">
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full text-left px-4 py-3 border-b border-[#1a1a1a] last:border-0 text-sm transition-colors ${activeSection === s.id ? "text-[#D4AF37] bg-[#D4AF37]/10" : "text-gray-400 hover:text-white"}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* CMS Content */}
      <div className="flex-1">
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6">
          {activeSection === "hero" && (
            <div className="space-y-5">
              <h3 className="text-white font-bold">Hero Section</h3>
              <div>
                <FormLabel>Main Headline</FormLabel>
                <input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white outline-none focus:border-[#D4AF37]/50 text-sm" />
              </div>
              <div>
                <FormLabel>Subtitle / Description</FormLabel>
                <textarea value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} rows={3}
                  className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white outline-none focus:border-[#D4AF37]/50 text-sm resize-none" />
              </div>
              <div>
                <FormLabel>Primary CTA Button Text</FormLabel>
                <input value={heroCta} onChange={(e) => setHeroCta(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white outline-none focus:border-[#D4AF37]/50 text-sm" />
              </div>
            </div>
          )}

          {activeSection === "announcement" && (
            <div className="space-y-5">
              <h3 className="text-white font-bold">Announcement Bar</h3>
              <div>
                <FormLabel>Announcement Text</FormLabel>
                <input value={announcements} onChange={(e) => setAnnouncements(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white outline-none focus:border-[#D4AF37]/50 text-sm" />
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#D4AF37]" />
                  <span className="text-gray-300 text-sm">Show announcement bar</span>
                </label>
              </div>
            </div>
          )}

          {activeSection === "faq" && (
            <div className="space-y-5">
              <h3 className="text-white font-bold">FAQ Management</h3>
              <textarea value={faqItems} onChange={(e) => setFaqItems(e.target.value)} rows={8}
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white outline-none focus:border-[#D4AF37]/50 text-sm resize-none"
                placeholder="Q: Question here? A: Answer here." />
            </div>
          )}

          {activeSection === "footer" && (
            <div className="space-y-5">
              <h3 className="text-white font-bold">Footer Settings</h3>
              {[
                { label: "Company Description", defaultValue: "Pakistan's premier custom apparel platform." },
                { label: "Contact Email", defaultValue: "support@zumrahapparel.pk" },
                { label: "Contact Phone", defaultValue: "+92-300-ZUMRAH" },
                { label: "Address", defaultValue: "Karachi, Pakistan" },
                { label: "Copyright Text", defaultValue: "© 2026 Zumrah Apparel. All rights reserved." },
              ].map(({ label, defaultValue }) => (
                <div key={label}>
                  <FormLabel>{label}</FormLabel>
                  <input defaultValue={defaultValue}
                    className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white outline-none focus:border-[#D4AF37]/50 text-sm" />
                </div>
              ))}
            </div>
          )}

          {activeSection === "seo" && (
            <div className="space-y-5">
              <h3 className="text-white font-bold">SEO Settings</h3>
              {[
                { label: "Site Title", defaultValue: "Zumrah Apparel - Premium Custom T-Shirts & Apparel in Pakistan" },
                { label: "Meta Description", defaultValue: "Order custom DTF & Sublimation printed apparel online. Design your own t-shirts, jerseys & hoodies. Nationwide delivery in Pakistan." },
                { label: "Keywords", defaultValue: "custom t-shirts Pakistan, DTF printing, sublimation printing, custom apparel" },
                { label: "Google Analytics ID", defaultValue: "G-XXXXXXXXXX" },
              ].map(({ label, defaultValue }) => (
                <div key={label}>
                  <FormLabel>{label}</FormLabel>
                  <input defaultValue={defaultValue}
                    className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white outline-none focus:border-[#D4AF37]/50 text-sm" />
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button onClick={handleSave}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${saved ? "bg-emerald-500 text-white" : "bg-[#D4AF37] text-black hover:bg-[#C49B2A]"}`}>
              {saved ? <><Check size={15} /> Saved!</> : "Save Changes"}
            </button>
            <button className="px-6 py-2.5 bg-[#0d0d0d] border border-[#333] text-gray-400 rounded-xl text-sm hover:text-white">Preview</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export function AdminPage() {
  const { tab } = useParams<{ tab?: AdminTab }>();
  const navigate = useNavigate();
  const { logout, showNotification } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const activeTab: AdminTab = (tab as AdminTab) ?? "dashboard";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<typeof EXTENDED_ORDERS[0] | null>(null);
  const [productModal, setProductModal] = useState<{ mode: "add" | "edit"; product?: typeof PRODUCTS[0] } | null>(null);
  const [products, setProducts] = useState([...PRODUCTS]);

  const navItems: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "products", label: "Products", icon: Package },
    { id: "customers", label: "Customers", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "cms", label: "CMS", icon: Globe },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const filteredOrders = EXTENDED_ORDERS.filter((o) =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#080808] flex" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-56" : "w-14"} bg-[#0d0d0d] border-r border-[#1a1a1a] flex flex-col transition-all duration-300 flex-shrink-0`}>
        <div className="h-16 flex items-center px-3 border-b border-[#1a1a1a] gap-2.5">
          <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
            <Shirt size={16} className="text-black" />
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-white font-bold text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Zumrah Admin</p>
              <p className="text-gray-600 text-[10px]">Management Portal</p>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto text-gray-600 hover:text-gray-300 transition-colors">
            <Menu size={16} />
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-0.5">
          {navItems.map(({ id, label, icon: Icon }) => (
            <Link key={id} to={`/admin/${id}`}
              className={`flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl transition-all ${activeTab === id ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30" : "text-gray-500 hover:text-gray-200 hover:bg-white/5"}`}
            >
              <Icon size={16} className="flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-2 border-t border-[#1a1a1a] space-y-0.5">
          <Link to="/" className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-gray-500 hover:text-gray-200 hover:bg-white/5 transition-all">
            <ExternalLink size={16} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">View Site</span>}
          </Link>
          <button onClick={() => { logout(); navigate("/"); }}
            className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all w-full">
            <LogOut size={16} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <div className="h-14 bg-[#0d0d0d] border-b border-[#1a1a1a] flex items-center justify-between px-5 flex-shrink-0">
          <div>
            <h1 className="text-white font-bold capitalize text-sm">
              {activeTab === "dashboard" ? "Dashboard Overview" : navItems.find(n => n.id === activeTab)?.label ?? activeTab}
            </h1>
            <p className="text-gray-600 text-[10px]">Zumrah Apparel · {new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders, customers..."
                className="w-52 pl-8 pr-4 py-2 bg-[#111] border border-[#333] rounded-xl text-white text-xs outline-none focus:border-[#D4AF37]/50 placeholder-gray-600" />
            </div>
            <button className="relative p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg">
              <Bell size={17} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-black text-sm font-bold">A</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">

          {/* ─── DASHBOARD ─── */}
          {activeTab === "dashboard" && (
            <div className="space-y-5">
              {/* Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Revenue (Today)", value: "₨ 42,500", change: "+18%", up: true, color: "text-[#D4AF37]", icon: TrendingUp },
                  { label: "New Orders", value: "28", change: "+12%", up: true, color: "text-emerald-400", icon: ShoppingCart },
                  { label: "Total Customers", value: "12,847", change: "+5%", up: true, color: "text-blue-400", icon: Users },
                  { label: "Pending Production", value: "14", change: "-3%", up: false, color: "text-orange-400", icon: Package },
                ].map(({ label, value, change, up, color, icon: Icon }) => (
                  <div key={label} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Icon size={18} className={color} />
                      <span className={`flex items-center gap-0.5 text-[10px] font-semibold ${up ? "text-emerald-400" : "text-red-400"}`}>
                        {up ? <ArrowUp size={10} /> : <ArrowDown size={10} />}{change}
                      </span>
                    </div>
                    <p className={`text-2xl font-bold ${color}`} style={{ fontFamily: "Poppins, sans-serif" }}>{value}</p>
                    <p className="text-gray-500 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
                  <h2 className="text-white font-bold mb-4 text-sm">Revenue Overview</h2>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={REVENUE_DATA}>
                      <defs>
                        <linearGradient id="gold-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                      <XAxis dataKey="month" stroke="#555" fontSize={10} />
                      <YAxis stroke="#555" fontSize={10} tickFormatter={(v) => `₨${(v / 1000).toFixed(0)}k`} />
                      <Tooltip contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 10, fontSize: 11 }} formatter={(v: number) => [formatPKR(v), "Revenue"]} />
                      <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} fill="url(#gold-grad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
                  <h2 className="text-white font-bold mb-4 text-sm">Payment Methods</h2>
                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie data={PAYMENT_DISTRIBUTION} cx="50%" cy="50%" innerRadius={38} outerRadius={65} dataKey="value" strokeWidth={0}>
                        {PAYMENT_DISTRIBUTION.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 8, fontSize: 11 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-2 space-y-1.5">
                    {PAYMENT_DISTRIBUTION.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-gray-400 text-[10px]">{item.name}</span>
                        </div>
                        <span className="text-white text-[10px] font-semibold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent orders */}
              <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a1a1a]">
                  <h2 className="text-white font-bold text-sm">Recent Orders</h2>
                  <Link to="/admin/orders" className="text-[#D4AF37] text-xs hover:text-[#C49B2A]">View All →</Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead><tr className="border-b border-[#1a1a1a]">
                      {["Order ID", "Customer", "Status", "Payment", "Total", "Actions"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-gray-600 text-[10px] font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {EXTENDED_ORDERS.slice(0, 4).map((order) => {
                        const s = STATUS_COLORS[order.status];
                        return (
                          <tr key={order.id} className="border-b border-[#1a1a1a] last:border-0 hover:bg-white/2">
                            <td className="px-4 py-3 text-[#D4AF37] text-xs font-mono">{order.id}</td>
                            <td className="px-4 py-3 text-white text-xs">{order.customer.name}</td>
                            <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${s.bg} ${s.text}`}>{s.label}</span></td>
                            <td className="px-4 py-3 text-gray-400 text-xs">{order.paymentMethod}</td>
                            <td className="px-4 py-3 text-[#D4AF37] font-bold text-xs">{formatPKR(order.total)}</td>
                            <td className="px-4 py-3">
                              <button onClick={() => setSelectedOrder(order)}
                                className="p-1.5 bg-[#1a1a1a] text-gray-400 hover:text-white rounded-lg transition-colors">
                                <Eye size={12} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── ORDERS ─── */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-bold text-lg">All Orders ({filteredOrders.length})</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..."
                      className="pl-8 pr-4 py-2 bg-[#111] border border-[#333] rounded-xl text-white text-xs outline-none focus:border-[#D4AF37]/50 w-48 placeholder-gray-600" />
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead><tr className="border-b border-[#1a1a1a]">
                      {["Order ID", "Customer", "City", "Design", "Status", "Payment", "Total", "Date", "Actions"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-gray-500 text-[10px] font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {filteredOrders.map((order) => {
                        const s = STATUS_COLORS[order.status];
                        const totalLayers = Object.values(order.design).reduce((sum, d) => sum + d.layers, 0);
                        return (
                          <tr key={order.id} className="border-b border-[#1a1a1a] last:border-0 hover:bg-white/2 transition-colors">
                            <td className="px-4 py-4 text-[#D4AF37] text-xs font-mono">{order.id}</td>
                            <td className="px-4 py-4">
                              <div>
                                <p className="text-white text-xs font-medium">{order.customer.name}</p>
                                <p className="text-gray-600 text-[10px]">{order.customer.email}</p>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-gray-400 text-xs">{order.city}</td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-1.5">
                                <img src={order.productImage} alt="" className="w-8 h-8 rounded-lg object-cover" />
                                <div>
                                  <p className="text-gray-300 text-[10px] whitespace-nowrap">{totalLayers} layer{totalLayers !== 1 ? "s" : ""}</p>
                                  <p className="text-gray-600 text-[9px]">4 sides</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <select defaultValue={order.status}
                                className={`px-2 py-1 rounded-full text-[10px] font-medium border-0 outline-none cursor-pointer ${s.bg} ${s.text}`}>
                                {Object.entries(STATUS_COLORS).map(([k, v]) => (
                                  <option key={k} value={k} className="bg-[#111] text-white">{v.label}</option>
                                ))}
                              </select>
                            </td>
                            <td className="px-4 py-4 text-gray-400 text-xs">{order.paymentMethod}</td>
                            <td className="px-4 py-4 text-[#D4AF37] font-bold text-xs">{formatPKR(order.total)}</td>
                            <td className="px-4 py-4 text-gray-600 text-[10px] whitespace-nowrap">{order.date}</td>
                            <td className="px-4 py-4">
                              <div className="flex gap-1">
                                <button onClick={() => setSelectedOrder(order)}
                                  title="View Details"
                                  className="p-1.5 bg-[#1a1a1a] text-gray-400 hover:text-[#D4AF37] rounded-lg transition-colors">
                                  <Eye size={12} />
                                </button>
                                <button title="Download Assets"
                                  onClick={() => downloadJSON(order, `Order_${order.id}.json`)}
                                  className="p-1.5 bg-[#1a1a1a] text-gray-400 hover:text-emerald-400 rounded-lg transition-colors">
                                  <Download size={12} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── PRODUCTS ─── */}
          {activeTab === "products" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-bold text-lg">Products ({products.length})</h2>
                <button onClick={() => setProductModal({ mode: "add" })}
                  className="flex items-center gap-2 px-5 py-2 bg-[#D4AF37] text-black rounded-xl text-sm font-bold hover:bg-[#C49B2A]">
                  <Plus size={15} /> Add Product
                </button>
              </div>
              <div className="space-y-3">
                {products.map((product) => (
                  <div key={product.id} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4 flex gap-4">
                    <img src={product.image} alt={product.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm">{product.name}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{product.sku} · {product.printingMethod} · {product.material}</p>
                        </div>
                        <div className="flex gap-1.5 flex-shrink-0">
                          <button onClick={() => setProductModal({ mode: "edit", product })}
                            className="p-2 bg-[#1a1a1a] text-gray-400 hover:text-white rounded-lg transition-colors"><Edit2 size={13} /></button>
                          <button onClick={() => setProducts((p) => p.filter((x) => x.id !== product.id))}
                            className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 size={13} /></button>
                        </div>
                      </div>
                      <div className="flex items-center flex-wrap gap-3 mt-2">
                        <div>
                          <span className="text-[#D4AF37] font-bold text-sm">{formatPKR(product.salePrice ?? product.price)}</span>
                          {product.salePrice && <span className="text-gray-600 text-xs ml-2 line-through">{formatPKR(product.price)}</span>}
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${product.inStock ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] text-gray-400 bg-[#1a1a1a]">{product.category}</span>
                        {product.badge && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${product.badge === "bestseller" ? "bg-[#D4AF37]/10 text-[#D4AF37]" : product.badge === "new" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                            {product.badge}
                          </span>
                        )}
                        <div className="flex gap-1">
                          {product.colors.slice(0, 5).map((c) => (
                            <div key={c} className="w-4 h-4 rounded-full border border-[#333]" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── CUSTOMERS ─── */}
          {activeTab === "customers" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-bold text-lg">Customers ({MOCK_CUSTOMERS.length})</h2>
              </div>
              <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-[#1a1a1a]">
                    {["Customer", "Phone", "City", "Orders", "Lifetime Value", "Status", "Joined", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-gray-500 text-[10px] font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {MOCK_CUSTOMERS.map((c) => (
                      <tr key={c.id} className="border-b border-[#1a1a1a] last:border-0 hover:bg-white/2">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-black text-xs font-bold flex-shrink-0">{c.name[0]}</div>
                            <div>
                              <p className="text-white text-xs font-medium">{c.name}</p>
                              <p className="text-gray-600 text-[10px]">{c.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-400 text-xs">{c.phone}</td>
                        <td className="px-4 py-4 text-gray-400 text-xs">{c.city}</td>
                        <td className="px-4 py-4 text-white text-xs font-semibold">{c.orders}</td>
                        <td className="px-4 py-4 text-[#D4AF37] font-bold text-xs">{formatPKR(c.spent)}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${c.status === "vip" ? "bg-[#D4AF37]/10 text-[#D4AF37]" : c.status === "new" ? "bg-blue-500/10 text-blue-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                            {c.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-600 text-[10px]">{c.joined}</td>
                        <td className="px-4 py-4">
                          <div className="flex gap-1">
                            <button className="p-1.5 bg-[#1a1a1a] text-gray-400 hover:text-white rounded-lg"><Eye size={12} /></button>
                            <button className="p-1.5 bg-[#1a1a1a] text-gray-400 hover:text-white rounded-lg"><Edit2 size={12} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── ANALYTICS ─── */}
          {activeTab === "analytics" && (
            <div className="space-y-5">
              <h2 className="text-white font-bold text-lg">Sales Analytics</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Revenue (2026)", value: "₨ 2,995,000", sub: "+32% YoY" },
                  { label: "Total Orders", value: "1,333", sub: "+28% YoY" },
                  { label: "Average Order Value", value: "₨ 2,247", sub: "+3% YoY" },
                  { label: "Conversion Rate", value: "4.8%", sub: "+0.6% YoY" },
                ].map(({ label, value, sub }) => (
                  <div key={label} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4">
                    <p className="text-gray-500 text-xs mb-1">{label}</p>
                    <p className="text-white font-bold text-xl">{value}</p>
                    <p className="text-emerald-400 text-[10px] mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
                  <h3 className="text-white font-semibold mb-4 text-sm">Monthly Revenue (PKR)</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={REVENUE_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                      <XAxis dataKey="month" stroke="#555" fontSize={10} />
                      <YAxis stroke="#555" fontSize={10} tickFormatter={(v) => `₨${(v/1000).toFixed(0)}k`} />
                      <Tooltip contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 10, fontSize: 11 }} formatter={(v: number) => [formatPKR(v), "Revenue"]} />
                      <Bar dataKey="revenue" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
                  <h3 className="text-white font-semibold mb-4 text-sm">Monthly Orders</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={REVENUE_DATA}>
                      <defs>
                        <linearGradient id="orders-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                      <XAxis dataKey="month" stroke="#555" fontSize={10} />
                      <YAxis stroke="#555" fontSize={10} />
                      <Tooltip contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 10, fontSize: 11 }} />
                      <Area type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} fill="url(#orders-grad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ─── CMS ─── */}
          {activeTab === "cms" && (
            <div className="space-y-4">
              <h2 className="text-white font-bold text-lg">Content Management</h2>
              <p className="text-gray-400 text-sm">Edit your website content without writing any code.</p>
              <CMSSection />
            </div>
          )}

          {/* ─── SETTINGS ─── */}
          {activeTab === "settings" && (
            <div className="space-y-5 max-w-2xl">
              <h2 className="text-white font-bold text-lg">System Settings</h2>
              {[
                { title: "Business Information", fields: [{ l: "Business Name", v: "Zumrah Apparel" }, { l: "Contact Email", v: "support@zumrahapparel.pk" }, { l: "Contact Phone", v: "+92-300-ZUMRAH" }] },
                { title: "Shipping Rates", fields: [{ l: "Karachi Delivery", v: "₨ 300" }, { l: "Other Cities", v: "₨ 450" }, { l: "Free Shipping Above", v: "₨ 5,000" }] },
                { title: "Payment Gateways", fields: [{ l: "Stripe Status", v: "✓ Connected" }, { l: "EasyPaisa Status", v: "✓ Connected" }, { l: "JazzCash Status", v: "✓ Connected" }, { l: "COD", v: "✓ Enabled" }] },
              ].map(({ title, fields }) => (
                <div key={title} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold text-sm">{title}</h3>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] border border-[#333] text-gray-400 rounded-lg text-xs hover:text-white"><Edit2 size={11} /> Edit</button>
                  </div>
                  <div className="space-y-2">
                    {fields.map(({ l, v }) => (
                      <div key={l} className="flex items-center justify-between py-2 border-b border-[#1a1a1a] last:border-0">
                        <span className="text-gray-400 text-xs">{l}</span>
                        <span className="text-white text-xs font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Order Detail Panel ─── */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40" onClick={() => setSelectedOrder(null)} />
            <OrderDetailPanel order={selectedOrder} onClose={() => setSelectedOrder(null)} />
          </>
        )}
      </AnimatePresence>

      {/* ─── Product Modal ─── */}
      <AnimatePresence>
        {productModal && (
          <ProductModal
            product={productModal.mode === "edit" ? productModal.product : null}
            onClose={() => setProductModal(null)}
            onSave={(data) => {
              if (productModal.mode === "add") {
                showNotification("Product added!", "success");
              } else {
                showNotification("Product updated!", "success");
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
