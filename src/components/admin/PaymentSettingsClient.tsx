"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Wallet, Smartphone, CreditCard } from "lucide-react";
import { updatePaymentSettingAction } from "@/lib/actions/payments";

interface Setting {
  method: "COD" | "EASYPAISA" | "JAZZCASH";
  enabled: boolean;
  accountName: string | null;
  accountNumber: string | null;
  instructions: string | null;
}

const METHOD_INFO = {
  COD: { label: "Cash on Delivery", icon: Wallet, needsAccount: false },
  EASYPAISA: { label: "EasyPaisa", icon: Smartphone, needsAccount: true },
  JAZZCASH: { label: "JazzCash", icon: Smartphone, needsAccount: true },
} as const;

function MethodCard({ setting }: { setting: Setting }) {
  const info = METHOD_INFO[setting.method];
  const Icon = info.icon;
  const [enabled, setEnabled] = useState(setting.enabled);
  const [accountName, setAccountName] = useState(setting.accountName ?? "");
  const [accountNumber, setAccountNumber] = useState(setting.accountNumber ?? "");
  const [instructions, setInstructions] = useState(setting.instructions ?? "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const res = await updatePaymentSettingAction(setting.method, {
      enabled,
      accountName,
      accountNumber,
      instructions,
    });
    setSaving(false);
    if ("error" in res) {
      toast.error(res.error);
      return;
    }
    toast.success(`${info.label} settings saved`);
  };

  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${enabled ? "bg-[#D4AF37] text-black" : "bg-[#242424] text-gray-400"}`}>
            <Icon size={18} />
          </div>
          <div>
            <p className="text-white font-semibold">{info.label}</p>
            <p className={`text-xs ${enabled ? "text-emerald-400" : "text-gray-400"}`}>{enabled ? "Active — visible at checkout" : "Disabled — hidden from checkout"}</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="sr-only peer" />
          <div className="w-11 h-6 bg-[#333] border border-[#444] rounded-full peer peer-checked:bg-[#D4AF37] peer-checked:border-[#D4AF37] transition-colors" />
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
        </label>
      </div>

      {info.needsAccount && (
        <div className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-1.5">Account / Wallet Holder Name</label>
              <input value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Zumrah Apparel" className="input" />
            </div>
            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-1.5">Account / Wallet Number</label>
              <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="03XX-XXXXXXX" className="input" />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-1.5">Instructions shown to customer at checkout</label>
            <textarea rows={2} value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder={`Send payment to the above ${info.label} account and enter your transaction ID below.`} className="input resize-none" />
          </div>
        </div>
      )}

      <button onClick={handleSave} disabled={saving} className="mt-4 px-5 py-2.5 bg-[#D4AF37] text-black rounded-xl text-sm font-semibold hover:bg-[#C49B2A] disabled:opacity-50 transition-colors">
        {saving ? "Saving..." : "Save"}
      </button>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.65rem 1rem;
          background: #1c1c1c;
          border: 1.5px solid #444;
          border-radius: 0.75rem;
          color: #ffffff;
          font-size: 0.8125rem;
          outline: none;
        }
        .input::placeholder {
          color: #8a8a8a;
        }
        .input:focus {
          background: #212121;
          border-color: #D4AF37;
        }
      `}</style>
    </div>
  );
}

export function PaymentSettingsClient({ settings }: { settings: Setting[] }) {
  const byMethod = (m: Setting["method"]) =>
    settings.find((s) => s.method === m) ?? { method: m, enabled: false, accountName: null, accountNumber: null, instructions: null };

  return (
    <div>
      <p className="text-gray-400 text-sm mb-6">
        Turn a method on to make it selectable at checkout. EasyPaisa/JazzCash are manual — customers transfer to your account and you confirm payment from the Orders page.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <MethodCard setting={byMethod("COD")} />
        <MethodCard setting={byMethod("EASYPAISA")} />
        <MethodCard setting={byMethod("JAZZCASH")} />

        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 opacity-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#242424] text-gray-400">
              <CreditCard size={18} />
            </div>
            <div>
              <p className="text-white font-semibold">Credit / Debit Card</p>
              <p className="text-gray-400 text-xs">Requires a payment gateway integration — not available yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
