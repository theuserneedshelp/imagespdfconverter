import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPageLayout } from "@/components/layout/legal-page-layout";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} — fast, simple, privacy-focused image to PDF conversion in your browser.`,
};

export default function AboutPage() {
  return (
    <LegalPageLayout title={`About ${site.name}`}>
      <p>
        {site.name} is a fast, simple, and privacy-focused tool that helps you
        convert images into high-quality PDF files instantly.
      </p>
      <p>
        We built this tool because most online PDF converters feel slow,
        cluttered, and overloaded with unnecessary ads or sign-up requirements.{" "}
        {site.name} focuses on a clean and modern experience that works directly
        in your browser.
      </p>

      <h2 className="pt-2 text-lg font-semibold text-ink">
        Our mission is simple:
      </h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Fast image-to-PDF conversion</li>
        <li>Simple and clean design</li>
        <li>No complicated tools</li>
        <li>No sign-up required</li>
        <li>Privacy-first processing</li>
      </ul>

      <p>
        Everything is processed locally in your browser, which means your files
        never leave your device.
      </p>

      <p>Whether you&apos;re converting:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>documents</li>
        <li>receipts</li>
        <li>assignments</li>
        <li>screenshots</li>
        <li>notes</li>
        <li>scanned pages</li>
      </ul>
      <p>
        {site.name} helps you create PDFs in seconds on both desktop and mobile
        devices.
      </p>

      <h2 className="pt-2 text-lg font-semibold text-ink">Features:</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Multiple image upload</li>
        <li>Instant PDF generation</li>
        <li>JPG and PNG support</li>
        <li>Mobile-friendly design</li>
        <li>Fast downloads</li>
        <li>Secure browser-based processing</li>
      </ul>

      <p>Thank you for using {site.name}.</p>
    </LegalPageLayout>
  );
}
