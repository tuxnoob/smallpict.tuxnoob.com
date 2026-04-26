import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/Footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-950 min-h-screen flex flex-col mesh-gradient">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
