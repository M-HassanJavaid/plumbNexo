import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Thank You | PlumbNexo",
  description: "Your demo request has been received. We'll be in touch within 1 business day.",
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="pt-36 pb-24 max-w-[640px] mx-auto px-5 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#B8F36B]/30 text-[#122B2A] flex items-center justify-center mb-6 shadow-sm">
          <svg className="w-8 h-8 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-[32px] sm:text-[40px] font-extrabold text-[#122B2A] tracking-tight mb-4">
          Thanks! Your request is in.
        </h1>

        <p className="text-[17px] text-[#52635F] leading-relaxed mb-8">
          I&apos;ll reply within 1 business day to confirm a few details, then get to work on your personalized demo page. Meanwhile, feel free to watch the case studies again.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/#work"
            className="inline-flex items-center justify-center font-bold bg-[#B8F36B] text-[#122B2A] rounded-full h-[52px] px-7 text-[16px] shadow-sm hover:brightness-105 transition-all"
          >
            <span>Watch case studies</span>
            <span className="ml-2" aria-hidden="true">→</span>
          </Link>
          <Link
            href="/"
            className="text-[15px] font-semibold text-[#122B2A] underline underline-offset-4 decoration-[#122B2A]/30 hover:decoration-[#B8F36B] transition-colors"
          >
            Back to homepage
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
