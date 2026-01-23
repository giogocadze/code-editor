import { Zap } from "lucide-react";
import Link from "next/link";

export default function UpgradeButton() {
const CHECKOUT_URL = "https://testuuu.lemonsqueezy.com/checkout/buy/50fd0a63-46e0-4e91-8731-537d396430c8"
  return (
    <Link
      href={CHECKOUT_URL}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
    >
      <Zap className="w-5 h-5" />
      Upgrade to Pro
    </Link>
  );
}