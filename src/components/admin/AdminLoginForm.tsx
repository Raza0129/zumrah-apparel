"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Shirt, ShieldCheck } from "lucide-react";
import { adminLoginAction, type AuthActionState } from "@/lib/actions/auth";

const initialState: AuthActionState = {};

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(adminLoginAction, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success("Welcome back, admin!");
      router.push("/admin");
      router.refresh();
    }
    if (state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 bg-gradient-to-br from-[#D4AF37] to-[#B8960C] rounded-lg flex items-center justify-center">
            <Shirt size={20} className="text-black" />
          </div>
          <span className="text-white font-bold text-xl">
            Zumrah <span className="text-[#D4AF37]">Apparel</span>
          </span>
        </div>

        <div className="bg-[#111] border border-[#282828] rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={20} className="text-[#D4AF37]" />
            <h1 className="text-white text-2xl font-semibold">Admin Login</h1>
          </div>
          <p className="text-gray-500 text-sm mb-6">Restricted access — admin accounts only</p>

          <form action={formAction} className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm mb-1.5 block">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="admin@zumrahapparel.com"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-xl text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] text-sm transition-colors"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm mb-1.5 block">Password</label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-xl text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] text-sm transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className="w-full py-3 bg-[#D4AF37] text-black rounded-xl font-semibold text-sm hover:bg-[#C49B2A] transition-colors disabled:opacity-50"
            >
              {pending ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
