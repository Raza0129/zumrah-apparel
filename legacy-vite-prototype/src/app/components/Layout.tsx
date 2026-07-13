import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useApp } from "../context/AppContext";
import { CheckCircle, Info, XCircle, X } from "lucide-react";

export function Layout() {
  const { notification } = useApp();
  const location = useLocation();

  const hideFooter = ["/designer"].some((p) => location.pathname.startsWith(p));
  const hideNav = ["/designer"].some((p) => location.pathname.startsWith(p));
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-[#0a0a0a]" style={{ fontFamily: "Inter, sans-serif" }}>
      {!isAdmin && !hideNav && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {!hideFooter && !isAdmin && <Footer />}

      {/* Global Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border max-w-sm"
            style={{
              background: notification.type === "success" ? "rgba(16, 185, 129, 0.15)" :
                notification.type === "error" ? "rgba(239, 68, 68, 0.15)" : "rgba(59, 130, 246, 0.15)",
              borderColor: notification.type === "success" ? "rgba(16, 185, 129, 0.4)" :
                notification.type === "error" ? "rgba(239, 68, 68, 0.4)" : "rgba(59, 130, 246, 0.4)",
              backdropFilter: "blur(12px)",
            }}
          >
            {notification.type === "success" && <CheckCircle size={20} className="text-emerald-400 flex-shrink-0" />}
            {notification.type === "error" && <XCircle size={20} className="text-red-400 flex-shrink-0" />}
            {notification.type === "info" && <Info size={20} className="text-blue-400 flex-shrink-0" />}
            <p className="text-white text-sm font-medium">{notification.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
