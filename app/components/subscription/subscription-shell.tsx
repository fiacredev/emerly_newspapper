import TopBar from "@/app/components/TopBar";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";
import SubscriptionContent from "@/app/components/subscription/subscription-content";

export default function SubscriptionShell() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-gray-900">
      <TopBar />
      <Masthead />

      <main className="flex-1">
        <SubscriptionContent />
      </main>

      <Footer />
    </div>
  );
}
