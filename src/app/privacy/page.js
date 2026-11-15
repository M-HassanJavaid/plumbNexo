import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Privacy Policy | PlumbNexo",
  description: "Privacy policy for PlumbNexo. How we handle your demo request information and analytics data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 max-w-[800px] mx-auto px-5 min-h-[70vh]">
        <div className="mb-8">
          <Link
            href="/"
            className="text-[14px] font-bold text-[#52635F] hover:text-[#122B2A] inline-flex items-center gap-1.5 mb-6"
          >
            <span>← Back to Home</span>
          </Link>
          <h1 className="text-[36px] sm:text-[44px] font-extrabold text-[#122B2A] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-[14px] text-[#52635F] mt-2">Last updated: November 2026</p>
        </div>

        <div className="space-y-6 text-[16px] text-[#52635F] leading-relaxed">
          <section>
            <h2 className="text-[20px] font-bold text-[#122B2A] mb-2">1. Overview</h2>
            <p>
              At PlumbNexo, we respect your privacy. This policy explains what information we collect when you visit our website or submit our Free Demo request form, and how that information is used.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-[#122B2A] mb-2">2. Information You Provide</h2>
            <p>
              When you submit a demo request, we collect your business name, service area, website (if provided), type of work, your name, contact method, phone number or email, and any notes you share.
            </p>
            <p className="mt-2 font-medium text-[#122B2A]">
              We use this information exclusively to communicate with you about your demo page request. We do not sell, rent, or share your contact details with third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-[#122B2A] mb-2">3. Analytics &amp; Cookies</h2>
            <p>
              We may use Google Analytics and Microsoft Clarity to understand aggregate website performance, user interactions, and technical health. These tools collect anonymized data such as page views, button clicks, and general browser information.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-[#122B2A] mb-2">4. Data Retention &amp; Rights</h2>
            <p>
              We retain lead inquiries for the duration needed to fulfill your project inquiry. If you wish to have your details removed from our records, you may email us at plumbnexo@gmail.com and we will promptly delete them.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-[#122B2A] mb-2">5. Contact</h2>
            <p>
              If you have any questions about this privacy policy, please contact Hassan Javaid at plumbnexo@gmail.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
