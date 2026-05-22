# Test on your phone (mobile browser)

## Option 1: Same Wi‑Fi (quickest)

1. On your PC, run the dev server:
   ```bash
   npm run dev
   ```
2. Note the **Network** URL from the terminal, e.g. `http://192.168.31.135:3000`
3. On your phone, connect to the **same Wi‑Fi** as the PC.
4. Open that URL in Chrome or Safari on your phone.

**Tip:** Some APIs (camera, `randomUUID`) behave differently on LAN HTTP vs `localhost`. This app includes fallbacks for IDs; for camera scanning, use **Add photo** on LAN HTTP, or deploy with HTTPS.

## Option 2: Chrome DevTools (desktop only)

1. Open `http://localhost:3000` on your PC.
2. Press **F12** → toggle **device toolbar** (phone icon).
3. Pick a device (e.g. iPhone 14) and reload.

This simulates screen size but not real touch/camera behavior.

## Option 3: Production URL (best for real mobile)

Deploy to Vercel with HTTPS, open your domain on your phone — camera and downloads work most reliably there.

## What to test on mobile

- [ ] Tool tabs: Images → PDF, PDF → Images, Scanner
- [ ] Upload images + download PDF
- [ ] Scanner → **Add photo** (camera capture)
- [ ] Dark mode toggle
- [ ] Menu links: About, Privacy, Terms, Contact
- [ ] Ad placeholder areas visible (no broken layout)
