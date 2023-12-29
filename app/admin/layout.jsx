"use client"

import { useAuth } from "@/hooks/useAuth";
import Sidebar from "@/layouts/SideBar/SideBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth._id || auth.role != "Administrador") {
      router.push("/");
    }
  }, [auth._id, router]);

  if (!auth._id) {
    return null;
  }

  return (
    <div className="flex p-3">
      <Sidebar />
      <main className="flex w-full px-10">{children}</main>
    </div>
  );
};

export default Layout;
