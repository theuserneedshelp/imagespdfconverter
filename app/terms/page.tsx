import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPageLayout } from "@/components/layout/legal-page-layout";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `Terms and Conditions for ${site.name}.`,
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms and Conditions">
      <p className="text-ink-faint">Last updated: {site.legal.lastUpdated}</p>

      <p>
        By using {site.name}, you agree to the following terms and conditions.
      </p>

      <h2 className="pt-4 text-lg font-semibold text-ink">Use of the Service</h2>
      <p>
        {site.name} provides free browser-based tools for converting images into
        PDF files.
      </p>
      <p>
        You agree to use the service only for lawful purposes and in accordance
        with these terms.
      </p>

      <h2 className="pt-4 text-lg font-semibold text-ink">User Responsibility</h2>
      <p>You are responsible for:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>the files you upload</li>
        <li>ensuring you have permission to use those files</li>
        <li>complying with applicable laws and regulations</li>
      </ul>

      <h2 className="pt-4 text-lg font-semibold text-ink">
        Privacy and File Processing
      </h2>
      <p>
        All file processing occurs locally in your browser. {site.name} does not
        upload or store your files on its servers.
      </p>

      <h2 className="pt-4 text-lg font-semibold text-ink">No Guarantees</h2>
      <p>
        While we aim to provide a reliable and uninterrupted service, we do not
        guarantee:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>uninterrupted availability</li>
        <li>error-free performance</li>
        <li>compatibility with all devices or browsers</li>
      </ul>

      <h2 className="pt-4 text-lg font-semibold text-ink">
        Limitation of Liability
      </h2>
      <p>
        {site.name} is provided &ldquo;as is&rdquo; without warranties of any
        kind. We are not responsible for:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>data loss</li>
        <li>file corruption</li>
        <li>damages resulting from use of the service</li>
      </ul>

      <h2 className="pt-4 text-lg font-semibold text-ink">Third-Party Services</h2>
      <p>The website may use third-party services such as:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Google Analytics</li>
        <li>Google AdSense</li>
        <li>hosting providers</li>
      </ul>
      <p>
        These services operate under their own terms and privacy policies.
      </p>

      <h2 className="pt-4 text-lg font-semibold text-ink">Changes to Terms</h2>
      <p>
        We may update these Terms and Conditions at any time. Continued use of
        the website after changes means you accept the updated terms.
      </p>

      <h2 className="pt-4 text-lg font-semibold text-ink">Contact</h2>
      <p>
        For questions regarding these Terms and Conditions, contact:{" "}
        <a
          href={`mailto:${site.contact.email}`}
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          {site.contact.email}
        </a>
      </p>
    </LegalPageLayout>
  );
}
