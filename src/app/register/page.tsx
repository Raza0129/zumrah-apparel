"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Shirt } from "lucide-react";
import { registerAction, type AuthActionState } from "@/lib/actions/auth";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";

const initialState: AuthActionState = {};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerAction, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success("Account created! Welcome to Zumrah Apparel.");
      router.push("/account");
      router.refresh();
    }
    if (state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 pt-24 pb-16">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 bg-gradient-to-br from-[#D4AF37] to-[#B8960C] rounded-lg flex items-center justify-center">
            <Shirt size={20} className="text-black" />
          </div>
          <span className="text-white font-bold text-xl">
            Zumrah <span className="text-[#D4AF37]">Apparel</span>
          </span>
        </Link>

        <div className="bg-[#111] border border-[#282828] rounded-2xl p-8">
          <h1 className="text-white text-2xl font-semibold mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm mb-6">Join Zumrah Apparel and start designing</p>

          <form action={formAction} className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm mb-1.5 block">Full Name</label>
              <input
                name="name"
                type="text"
                required
                placeholder="Ahmed Hassan"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-xl text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] text-sm transition-colors"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm mb-1.5 block">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-xl text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] text-sm transition-colors"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm mb-1.5 block">Phone (optional)</label>
              <input
                name="phone"
                type="tel"
                placeholder="+92-300-0000000"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-xl text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] text-sm transition-colors"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm mb-1.5 block">Password</label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-xl text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] text-sm transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className="w-full py-3 bg-[#D4AF37] text-black rounded-xl font-semibold text-sm hover:bg-[#C49B2A] transition-colors disabled:opacity-50"
            >
              {pending ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <SocialLoginButtons />

          <p className="text-gray-500 text-sm text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#D4AF37] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
