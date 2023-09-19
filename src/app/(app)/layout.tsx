import Navbar from "@/components/navbar";
import Provider from "@/components/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Provider>
        <Navbar />
        {children}
      </Provider>
    </main>
  );
}
