import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LegalPageLayout } from "@/components/layout/legal-page-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${site.name} — browser-based processing and how we handle your data.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p className="text-ink-faint">Last updated: {site.legal.lastUpdated}</p>

      <p>
        At {site.name}, protecting your privacy is important to us.
      </p>
      <p>
        {site.name} is designed with a privacy-first approach. All image-to-PDF
        conversion happens directly in your browser. Your files are not
        uploaded, stored, or shared on our servers.
      </p>

      <h2 className="pt-4 text-lg font-semibold text-ink">
        Information We Collect
      </h2>
      <p>We may collect limited non-personal information such as:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>browser type</li>
        <li>device information</li>
        <li>anonymous analytics data</li>
        <li>website performance metrics</li>
      </ul>
      <p>
        This information helps improve website functionality and user
        experience.
      </p>

      <h2 className="pt-4 text-lg font-semibold text-ink">Files and Uploads</h2>
      <p>Your uploaded images:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>remain on your device</li>
        <li>are processed locally in your browser</li>
        <li>are never stored on our servers</li>
        <li>are never shared with third parties</li>
      </ul>

      <h2 className="pt-4 text-lg font-semibold text-ink">Cookies</h2>
      <p>
        {site.name} may use cookies and similar technologies to:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>improve website performance</li>
        <li>analyze traffic and usage</li>
        <li>
          support future advertising services such as Google AdSense
        </li>
      </ul>

      <h2 className="pt-4 text-lg font-semibold text-ink">
        Third-Party Services
      </h2>
      <p>We may use trusted third-party services including:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Google Analytics</li>
        <li>Google AdSense</li>
        <li>hosting providers</li>
      </ul>
      <p>
        These services may collect anonymous usage information according to
        their own privacy policies.
      </p>

      <h2 className="pt-4 text-lg font-semibold text-ink">Data Security</h2>
      <p>
        Because files are processed locally in your browser, your documents
        remain under your control throughout the conversion process.
      </p>

      <h2 className="pt-4 text-lg font-semibold text-ink">
        Changes to This Policy
      </h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page.
      </p>

      <h2 className="pt-4 text-lg font-semibold text-ink">Contact</h2>
      <p>
        For questions about this Privacy Policy, contact:{" "}
        <a
          href={`mailto:${site.contact.email}`}
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          {site.contact.email}
        </a>
        . You can also visit our{" "}
        <Link
          href="/contact"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Contact
        </Link>{" "}
        page.
      </p>
    </LegalPageLayout>
  );
}
