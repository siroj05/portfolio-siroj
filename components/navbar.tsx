"use client";

import { useDeviceSize } from "@/hooks/use-device-size";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { isMobile, isTablet } = useDeviceSize();
  const [open, setOpen] = useState(false);

  const menuItems = ["Home", "About", "Skills", "Project", "Experience", "Contact"];

  return (
    <nav className="border-b shadow sticky z-40 top-0 dark:bg-black/80 backdrop-blur-md bg-white/80">
      <div className="flex justify-between items-center mx-10 max-[426px]:mx-1 p-4">
        <h1 className="font-bold text-2xl text-black dark:text-white max-[426px]:text-sm">Siroojuddin Apendi</h1>

        {(isTablet || isMobile) ? (
          <>
            <button onClick={() => setOpen(!open)} className="z-[99999]">
              {open ? <X className="text-black dark:text-white" /> : <Menu className="text-black dark:text-white" />}
            </button>

            {open && (
              <div className="fixed h-screen inset-0 z-[9999] bg-black/90">
                <div className="flex flex-col space-y-6 mt-10 items-center">
                  {menuItems.map((item) => (
                    <Link
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setOpen(false)}
                      className="text-white text-2xl font-medium hover:text-blue-400 transition"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex gap-5 items-center font-semibold text-slate-700 dark:text-slate-300">
            {menuItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-500 transition"
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
