import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPageLayout } from "@/components/layout/legal-page-layout";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${site.name} — questions, feedback, and support.`,
};

export default function ContactPage() {
  return (
    <LegalPageLayout title="Contact Us">
      <p>Have questions, suggestions, or feedback?</p>
      <p>We&rsquo;d love to hear from you.</p>
      <p>
        {site.name} is constantly improving, and user feedback helps us create a
        better experience for everyone.
      </p>

      <h2 className="pt-4 text-lg font-semibold text-ink">Contact Email</h2>
      <p>
        <a
          className="font-medium text-accent underline-offset-4 hover:underline"
          href={`mailto:${site.contact.email}`}
        >
          {site.contact.email}
        </a>
      </p>

      <h2 className="pt-4 text-lg font-semibold text-ink">Common Topics</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>bug reports</li>
        <li>feature requests</li>
        <li>partnership inquiries</li>
        <li>feedback and suggestions</li>
      </ul>

      <h2 className="pt-4 text-lg font-semibold text-ink">Response Time</h2>
      <p>We usually respond within 24–72 hours.</p>

      <p className="pt-2 font-medium text-ink">
        Thank you for using {site.name}.
      </p>
    </LegalPageLayout>
  );
}
