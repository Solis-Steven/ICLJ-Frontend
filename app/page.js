import { AuthProvider } from "@/context/AuthProvider";
import Login from "./login/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Login/>
    </main>
  )
}
