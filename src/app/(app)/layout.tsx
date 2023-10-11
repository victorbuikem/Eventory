import Navbar from "@/components/navbar";
import Session from "./session";

export default function GroupRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Session>
        <Navbar />
        {children}
      </Session>
    </main>
  );
}
