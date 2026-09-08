"use client";

import { signOut } from "@/features/auth/services/auth";
import { Bell, LogOut, Menu } from "lucide-react";

interface DashboardHeaderProps {
  userEmail?: string;
  fullName?: string;
  kycStatus?: string;
}

export function DashboardHeader({
  userEmail,
  fullName,
  kycStatus,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Mobile menu button (placeholder for future) */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden lg:block" />

        <div className="flex items-center gap-3">
          {/* KYC badge */}
          {kycStatus && (
            <span
              className={`hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                kycStatus === "verified"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  : kycStatus === "pending"
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              KYC: {kycStatus}
            </span>
          )}

          {/* Notifications */}
          <button
            type="button"
            className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Bell className="h-5 w-5" />
          </button>

          {/* User */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {fullName || "Utilisateur"}
            </span>
            <span className="text-xs text-gray-500">{userEmail}</span>
          </div>

          {/* Logout */}
          <form action={signOut}>
            <button
              type="submit"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Déconnexion"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
