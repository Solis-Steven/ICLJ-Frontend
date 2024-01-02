"use client"

import { useState } from "react";

import SideButton from "./SideButton";
import NavItem from "./NavItem";

import menus from "./items.json";
import { useAuth } from "@/hooks/useAuth";

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
          className="mt-5 flex  font-medium p-2 hover:bg-secondary rounded-xl duration-200
          items-center gap-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
          </svg>
          Cerrar Sesi&oacute;n
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;