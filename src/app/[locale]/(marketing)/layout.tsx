import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-950 min-h-screen flex flex-col mesh-gradient grid-pattern">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
