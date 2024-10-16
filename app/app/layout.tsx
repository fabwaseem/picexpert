import Sidebar from "@/components/app/Sidebar";
import { ReduxProvider } from "../redux-provider";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <div className="relative  h-screen overflow-hidden flex items-stretch gap-2 p-2 w-full max-md:pt-20">
        <Sidebar />
        {children}
      </div>
    </ReduxProvider>
  );
}
