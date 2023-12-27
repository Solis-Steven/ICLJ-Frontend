"use client"

import { useState } from "react";

import SideButton from "./SideButton";
import NavItem from "./NavItem";

import menus from "./items.json";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  // if() {

  // }

  return (
    <aside
      className={`${
        open ? "min-w-fit md:w-1/3 xl:w-1/5" : "w-20" 
      } bg-primary min-h-screen  duration-150 overflow-hidden text-gray-100 px-3
      rounded-md`}
    >
      <SideButton onClick={() => setOpen(!open)} open={open} />
      <div className="flex flex-col justify-center ">
        {menus?.map((item, i) => <NavItem key={i} item={item} open={open} />)}
      </div>
    </aside>
  );
};

export default Sidebar;