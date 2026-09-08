"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  ShieldCheck,
  Store,
  Users,
  CreditCard,
  BarChart3,
  User,
  Settings,
  Lock,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Principal",
    items: [
      { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
      { name: "Vérification KYC", href: "/dashboard/kyc", icon: ShieldCheck },
    ],
  },
  {
    title: "Actions",
    items: [
      { name: "Recharge", href: "/dashboard/recharge", icon: ArrowDownToLine },
      { name: "Retrait", href: "/dashboard/withdraw", icon: ArrowUpFromLine },
      { name: "Transfert", href: "/dashboard/transfers", icon: Send },
      { name: "Collecte", href: "/dashboard/collecte", icon: Link2 },
    ],
  },
  {
    title: "Plateforme",
    items: [
      { name: "Mes boutiques", href: "/dashboard/shops", icon: Store },
      { name: "Clients", href: "/dashboard/customers", icon: Users },
      { name: "Paiements", href: "/dashboard/payments", icon: CreditCard },
      { name: "Statistiques", href: "/dashboard/statistics", icon: BarChart3 },
      { name: "Affiliation", href: "/dashboard/affiliation", icon: Users },
    ],
  },
  {
    title: "Compte",
    items: [
      { name: "Mon profil", href: "/dashboard/profile", icon: User },
      { name: "Sécurité", href: "/dashboard/security", icon: Lock },
      { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Sociala Money
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navigation.map((group) => (
          <div key={group.title}>
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                        isActive
                          ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
