import Footer from "@/components/Footer";
import CustomNavbar from "@/components/navbar";
import { Link } from "@nextui-org/link";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomNavbar />
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
