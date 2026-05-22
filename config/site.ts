/**
 * ============================================================
 * EDIT YOUR SITE HERE — one file for name, copy, and contact
 * ============================================================
 *
 * After changing values, save the file and refresh the browser.
 * Restart `npm run dev` if metadata in the browser tab does not update.
 */

export const site = {
  /** Brand name shown in header, footer, and browser tab template */
  name: "ImagesPDFConverter",

  /** Path to brand logo (place file in /public) */
  logo: "/logo.png",

  /** Short line under the logo area / meta description base */
  tagline: "Private PDF tools in your browser — no uploads.",

  /** Home page hero */
  hero: {
    eyebrow: "ImagesPDFConverter",
    title: "Convert Images to PDF Instantly",
    subtitle:
      "With ImagesPDFConverter, your files never leave your browser. Images to PDF, PDF to images, and a document scanner — optimized for phones and desktops.",
  },

  /** Footer blurb */
  footer: {
    description:
      "ImagesPDFConverter is a private, client-side PDF toolkit. Built for speed, clarity, and trust — your files stay on your device.",
  },

  /** Contact page */
  contact: {
    email: "ipguserneedshelp@gmail.com",
  },

  /** Legal pages — update dates and text when you go live */
  legal: {
    lastUpdated: "May 2026",
    entityName: "ImagesPDFConverter",
  },

  /** Tool labels (home page tabs) */
  tools: {
    imagesToPdf: {
      id: "images-to-pdf",
      label: "Images → PDF",
      description: "Combine images into one PDF. Each image is one page.",
    },
    pdfToImages: {
      id: "pdf-to-images",
      label: "PDF → Images",
      description: "Export every PDF page as PNG or JPEG — client-side only.",
    },
    scanner: {
      id: "scanner",
      label: "Scanner",
      description: "Capture documents with your camera and save as PDF.",
    },
  },
} as const;

export type SiteConfig = typeof site;
