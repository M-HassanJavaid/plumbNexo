export const siteConfig = {
  name: "PlumbNexo",
  tagline: "Websites built for plumbers.",
  description:
    "Clear, mobile-friendly websites for plumbing businesses. See a free demo page for your business before you commit. Charlotte, NC and across the U.S.",
  siteUrl: process.env.SITE_URL || "https://plumbnexo.vercel.app",
  demoInboxEmail: process.env.DEMO_INBOX_EMAIL || "plumbnexo@gmail.com",
  demoFromEmail: process.env.DEMO_FROM_EMAIL || "onboarding@resend.dev",
  leadWebhookUrl: process.env.LEAD_WEBHOOK_URL || "",
  instagramUrl: "https://www.instagram.com/plumbnexo/",
  founder: "Hassan Javaid",
};
