"use client";

import { useState } from "react";
import { Plus, MapPin, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { addAddressAction, deleteAddressAction } from "@/lib/actions/address";
import { PAKISTAN_CITIES } from "@/lib/shipping";

interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

export function AddressList({ addresses }: { addresses: Address[] }) {
  const [showForm, setShowForm] = useState(false);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setPending(true);
    const res = await addAddressAction(formData);
    setPending(false);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Address added");
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    const res = await deleteAddressAction(id);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Address removed");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-bold font-sans">My Addresses</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-black rounded-xl text-sm font-semibold hover:bg-[#C49B2A] transition-colors"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />} {showForm ? "Cancel" : "Add Address"}
        </button>
      </div>

      {showForm && (
        <form action={handleSubmit} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 mb-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="fullName" required placeholder="Full Name" className="px-4 py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white placeholder-gray-600 text-sm outline-none focus:border-[#D4AF37]/50" />
            <input name="phone" required placeholder="Phone Number" className="px-4 py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white placeholder-gray-600 text-sm outline-none focus:border-[#D4AF37]/50" />
          </div>
          <input name="addressLine" required placeholder="Address (House #, Street, Area)" className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white placeholder-gray-600 text-sm outline-none focus:border-[#D4AF37]/50" />
          <div className="grid sm:grid-cols-3 gap-4">
            <select name="city" required defaultValue="Karachi" className="px-4 py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white text-sm outline-none focus:border-[#D4AF37]/50">
              {PAKISTAN_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input name="province" required placeholder="Province" className="px-4 py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white placeholder-gray-600 text-sm outline-none focus:border-[#D4AF37]/50" />
            <input name="postalCode" required placeholder="Postal Code" className="px-4 py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white placeholder-gray-600 text-sm outline-none focus:border-[#D4AF37]/50" />
          </div>
          <button type="submit" disabled={pending} className="w-full py-3 bg-[#D4AF37] text-black rounded-xl font-semibold text-sm hover:bg-[#C49B2A] disabled:opacity-50 transition-colors">
            {pending ? "Saving..." : "Save Address"}
          </button>
        </form>
      )}

      {addresses.length === 0 && !showForm ? (
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-10 text-center">
          <MapPin size={40} className="text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500">No saved addresses yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-white font-semibold text-sm">{addr.fullName}</p>
                  <p className="text-gray-500 text-xs">{addr.phone}</p>
                </div>
                <button onClick={() => handleDelete(addr.id)} className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                  <Trash2 size={15} />
                </button>
              </div>
              <p className="text-gray-400 text-sm">{addr.addressLine}</p>
              <p className="text-gray-500 text-xs mt-1">{addr.city}, {addr.province} {addr.postalCode}</p>
              {addr.isDefault && (
                <span className="inline-block mt-2 px-2 py-0.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-[10px] font-semibold">
                  Default
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
