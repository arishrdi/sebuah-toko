import Link from "next/link";
import React from "react";
import { RiDashboardFill, RiHomeSmile2Fill, RiStickyNoteFill, RiTableAltFill } from "react-icons/ri";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const SIDEBAR_MENU = [
    { icon: <RiHomeSmile2Fill />, href: "/", label: "Home" },
    { icon: <RiDashboardFill />, href: "/dashboard", label: "Dashboard" },
    { icon: <RiStickyNoteFill />, href: "/order", label: "Order" },
    { icon: <RiTableAltFill />, href: "/product", label: "Product" },
  ];

  const pathname = usePathname()
  
  return (
    <div className="flex flex-col gap-5 border-r-2 py-5">
      <div className="p-5 border-b-2 font-bold">
        Sales Spirit
      </div>
      {SIDEBAR_MENU.map((menu) => {
        return (
          <Link
            href={menu.href}
            className={`${pathname === menu.href ? "bg-slate-300 text-slate-900" : ""} mx-5  flex items-center gap-3 text-slate-500 hover:text-slate-900 hover:bg-slate-400 py-3 px-4 rounded-xl transition-all duration-300`}
            key={menu.href}
          >
            <span className="text-4xl">
            {menu.icon}
            </span>
            <span className="text-xl">{menu.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
