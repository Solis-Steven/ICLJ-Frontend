"use client"

import { useState } from "react";

import SideButton from "./SideButton";
import NavItem from "./NavItem";

import menus from "./items.json";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const { signOut } = useAuth();

  return (
    <aside
      className={`${open ? "min-w-fit md:w-1/3 xl:w-1/5" : "w-20"
        } bg-primary min-h-screen  duration-150 overflow-hidden text-gray-100 px-3
      rounded-md`}
    >
      <SideButton onClick={() => setOpen(!open)} open={open} />
      <div className="flex flex-col justify-center ">
        {menus?.map((item, i) => <NavItem key={i} item={item} open={open} />)}

        <button
          onClick={signOut}
          className="mt-5 flex  font-medium p-2 hover:bg-secondary rounded-xl duration-200">
          <Image
            className={`flex w-7 h-7 min-h-max mr-2 invert duration-300 ${!open && "translate-x-1 sm:translate-x-1.5"
              }`}
            src="/SidebarIcons/logout.svg"
            width={28}
            height={28}
            alt="logout-icon.svg"
          />
          <span
            className={`whitespace-pre duration-300 ${!open && "opacity-0 translate-x-16 overflow-hidden"
              }`}
          >
            Cerrar Sesi&oacute;n
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;