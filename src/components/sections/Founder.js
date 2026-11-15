"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "../Section";
import Eyebrow from "../Eyebrow";

export default function Founder() {
  const [imgError, setImgError] = useState(false);

  return (
    <Section id="about" labelledBy="founder-heading">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Photo Column Left (4:5, rounded 20px) */}
        <div className="lg:col-span-5 max-w-[420px] mx-auto lg:mx-0 w-full">
          <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-[#122B2A] shadow-soft border border-[#122B2A]/10 flex items-center justify-center">
            {/* Real photo if available; if missing/fails to load, fallback to ink panel with N mark per README 4.7 */}
            {!imgError ? (
              <Image
                src="/images/my-img.png"
                alt="Hassan Javaid, founder of PlumbNexo"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center"
                onError={() => setImgError(true)}
              />
            ) : null}

            {/* TODO: Place founder's photo at /public/images/my-img.png to replace this fallback */}
            {imgError && (
              <div className="flex flex-col items-center justify-center text-center p-8 select-none">
                <div className="w-16 h-16 rounded-[16px] bg-[#122B2A] border-2 border-[#B8F36B]/40 flex items-center justify-center text-[#B8F36B] font-extrabold text-[32px] mb-4 shadow-md">
                  N
                </div>
                <span className="text-white font-extrabold text-[20px] tracking-tight">
                  Hassan Javaid
                </span>
                <span className="text-[#B8F36B] text-[14px] font-semibold tracking-wider uppercase mt-1">
                  Founder, PlumbNexo
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Text Column Right */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <Eyebrow className="mb-4">WHO YOU&apos;LL WORK WITH</Eyebrow>
          <h2 id="founder-heading" className="h2-headline text-[#122B2A] mb-6">
            Hi, I&apos;m Hassan, founder of PlumbNexo.
          </h2>

          <div className="space-y-4 body-text text-[#52635F] mb-8">
            <p>
              I build websites for plumbing businesses. I already know what a homeowner with a leaking water heater is looking for when they land on your site.
            </p>
            <p>
              You&apos;ll deal with me directly, from the first call to launch and support afterwards. I&apos;ll show you a free demo page first, so you can judge my work instead of my promises.
            </p>
          </div>

          {/* Signature-style line */}
          <div className="pt-6 border-t border-[#122B2A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="font-extrabold text-[17px] text-[#122B2A]">
              Hassan Javaid <span className="font-medium text-[#52635F]">· Founder, PlumbNexo</span>
            </div>

            <div>
              <a
                href="https://www.instagram.com/plumbnexo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[15px] font-bold text-[#122B2A] underline underline-offset-4 decoration-[#122B2A]/30 hover:decoration-[#B8F36B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
              >
                <span>Instagram</span>
                <span className="ml-1 text-[13px]" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
