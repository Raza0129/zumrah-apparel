"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, ShieldOff, Ban, CheckCircle2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { updateUserRoleAction, toggleUserBlockedAction, deleteUserAction } from "@/lib/actions/users";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
  blocked: boolean;
  createdAt: Date;
  ordersCount: number;
}

export function UsersClient({ users, currentUserId }: { users: AdminUser[]; currentUserId: string }) {
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleToggleRole = async (u: AdminUser) => {
    setPendingId(u.id);
    const res = await updateUserRoleAction(u.id, u.role === "ADMIN" ? "CUSTOMER" : "ADMIN");
    setPendingId(null);
    if ("error" in res) return toast.error(res.error);
    toast.success(u.role === "ADMIN" ? "Demoted to customer" : "Promoted to admin");
  };

  const handleToggleBlocked = async (u: AdminUser) => {
    setPendingId(u.id);
    const res = await toggleUserBlockedAction(u.id, !u.blocked);
    setPendingId(null);
    if ("error" in res) return toast.error(res.error);
    toast.success(u.blocked ? "User unblocked" : "User blocked");
  };

  const handleDelete = async (u: AdminUser) => {
    if (!confirm(`Delete "${u.name}"? This cannot be undone.`)) return;
    setPendingId(u.id);
    const res = await deleteUserAction(u.id);
    setPendingId(null);
    if ("error" in res) return toast.error(res.error);
    toast.success("User deleted");
  };

  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6 font-sans">Users ({users.length})</h1>

      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e1e1e] text-left text-gray-500">
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Orders</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isSelf = u.id === currentUserId;
                const disabled = pendingId === u.id;
                return (
                  <tr key={u.id} className="border-b border-[#1a1a1a] last:border-0">
                    <td className="px-4 py-3">
                      <Link href={`/admin/users/${u.id}`} className="text-white font-medium hover:text-[#D4AF37] transition-colors">
                        {u.name} {isSelf && <span className="text-gray-500 text-xs">(you)</span>}
                      </Link>
                      <p className="text-gray-500 text-xs">{u.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${u.role === "ADMIN" ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "bg-gray-500/10 text-gray-400"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${u.blocked ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                        {u.blocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{u.ordersCount}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{u.createdAt.toLocaleDateString("en-PK")}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          disabled={isSelf || disabled}
                          onClick={() => handleToggleRole(u)}
                          className="p-1.5 text-gray-400 hover:text-[#D4AF37] rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none"
                          title={u.role === "ADMIN" ? "Demote to customer" : "Promote to admin"}
                        >
                          {u.role === "ADMIN" ? <ShieldOff size={15} /> : <Shield size={15} />}
                        </button>
                        <button
                          disabled={isSelf || disabled}
                          onClick={() => handleToggleBlocked(u)}
                          className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none"
                          title={u.blocked ? "Unblock user" : "Block user"}
                        >
                          {u.blocked ? <CheckCircle2 size={15} /> : <Ban size={15} />}
                        </button>
                        <button
                          disabled={isSelf || disabled}
                          onClick={() => handleDelete(u)}
                          className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-400/10 disabled:opacity-30 disabled:pointer-events-none"
                          title="Delete user"
                        >
                          <Trash2 size={15} />
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
  );
}
