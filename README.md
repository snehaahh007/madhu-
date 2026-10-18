# Madhuu — My Putteyyy 🎀

A pastel scrapbook-style birthday surprise made with React + Vite. It runs entirely in the browser; no backend or paid API is needed.

## 1. Requirements
Install [Node.js LTS](https://nodejs.org/) and use a terminal such as VS Code Terminal or PowerShell.

## 2. Add your own photos and song
Open `public/assets/` and place your files there using these exact names:

- `snemad.jpg`
- `snemad2.jpg`
- `snemad3.jpg`
- `snemad4.jpg`
- `snemad5.jpg`
- `snemad6.jpg`
- `snemad7.jpg`
- `snemad8.jpg`
- `snemad9.jpg`
- `snemad10.jpg`
- `song.mp3`

The project includes an `assets/PUT_YOUR_FILES_HERE.txt` reminder. Your photos and song are intentionally not included. Missing images show a graceful placeholder, and missing audio won't crash the website. Use photos you have permission to share.

## 3. Run locally
1. Extract the ZIP file.
2. Open the extracted `madhu-birthday-surprise` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local address printed by Vite, usually `http://localhost:5173`.

To test the production build:

```bash
npm run build
npm run preview
```

## 4. Customize the letter and captions
- The letter can be edited on the website using **Edit Letter**. Press **Save** to keep it in that browser's LocalStorage.
- To change the original letter, edit `DEFAULT_LETTER` in `src/App.jsx`.
- To change photo captions, edit the `memories` array in `src/App.jsx`.
- LocalStorage is browser/device-specific. It does not automatically sync to another device.

## 5. Upload to GitHub (optional)
1. Create a new repository on GitHub.
2. In the project folder, open a terminal and run:

   ```bash
   git init
   git add .
   git commit -m "Create Madhu birthday surprise"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   git push -u origin main
   ```

3. Replace the example remote URL with your own repository URL. If Git asks you to sign in, use the GitHub account that owns the repository.
4. Do not upload private or sensitive photos unless you are comfortable with the repository's visibility. A public repository makes its assets public.

## 6. Deploy to Vercel
1. Push the project to GitHub.
2. Sign in at [Vercel](https://vercel.com/).
3. Choose **Add New → Project**, then import the repository.
4. Vercel should detect Vite automatically. Use:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
5. Select **Deploy** and wait for the build to finish.
6. Open the generated website URL and share it with Madhuu.

You can also deploy with the Vercel CLI, but importing the GitHub repository is easier for beginners.

## Notes
- Music begins only after you press **Open Your Surprise** or use the music controls, due to browser autoplay rules.
- The lightbox supports Escape, Left Arrow, and Right Arrow.
- The website respects the device's reduced-motion preference.
- The app is a single-page site; `vercel.json` keeps client-side routes working if routes are added later.
