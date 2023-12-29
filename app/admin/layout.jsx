"use client"

import { DeleteModalWarning } from "@/components/DeleteModalWarning";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "@/layouts/SideBar/SideBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const { auth, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const chechAuth = () => {
      if(loading) {
        return
      }
      if (!auth._id || auth.role != "Administrador") {
        router.push("/");
      }
    }

    chechAuth();
  }, [auth._id, router]);

  if (!auth._id) {
    return null;
  }

  return (
    <div className="flex p-3">
      <Sidebar />
      <main className="flex w-full px-10">
        {children}
        <DeleteModalWarning />
      </main>
    </div>
  );
};

export default Layout;
