# All for Jiyu - Premium Celebrity Fan Support Platform (MVP)

A highly polished, premium, and dreamy fan support platform built for the ultimate celebration of **Zack, Jeremy, and Jiyu**. Designed with a luxurious European starry-sky aesthetic, interactive constellations, Cupid bow animation triggers, fan submissions with moderation flows, and localized offline-first persistence.

## 🌟 Key Features

### 🏹 Romantic Cupid Intro Sequence
An elegant 3-second animated intro featuring Cupid pulling a starry bow and shooting a dynamic heart. Upon impact, heart spark particles burst outwards, leading to a smooth fade-in transition to the main dashboard.

### 🌌 Interactive Constellation Navigation
A futuristic, glowing cosmic starry sky overlay that floats dynamically in the background. Around the glassmorphic crystal-textured core stands five interactive star-nodes representing the supporting modules:
1. **圖片相簿 (Gallery)**: Year-by-year and category-tagged high-definition photo grids with elegant lightboxes.
2. **影片特區 (Cinema)**: Nostalgic cassette-tape styled videos with an integrated cinematic MP4 stream player.
3. **星星信罐 (Wish Star Jar)**: Interactive glass wish jar containing floating glowing stars. Click any star to open and read heart-felt fan letters on parchment.
4. **美術展館 (Museum)**: A classical European gilt-frame visual art showcase with zoom-in catalog descriptions.
5. **音樂播放器 (Melody)**: A retro vinyl turntable player with spinning animation, toggle play/pause mechanisms, audio-arm transitions, and custom streaming support playlists.

### 🏠 Crystal Pet Home Nested Preview
A crystal glass-dome pet nest located at the feet of the crystal central character. Click to view a beautiful roadmap update notification for Stage 2 features.

### 🛡️ Admin Moderation Console
A secure password-protected back-office (`default pass: admin`) capable of:
- **Approval Queue**: Approve or reject fan-submitted media items instantly before they go live on the public starry sky.
- **Dynamic Content Editing**: Live-updates to key home headers, names ("ZACK", "JEREMY"), slogans, and design copyright texts.
- **VIP Member Registry**: High-contrast tables summarizing active members, contribution points, and support tags.
- **Database Backup & Recovery**: Full-pack JSON export/import tool ensuring maximum safety against data loss.

## 📁 Technical Architecture & Files

- `index.html`: Entry point for browser render.
- `src/main.tsx`: React runtime initializer.
- `src/App.tsx`: Central state machine, global audio managers, modals layout, and submission controllers.
- `src/types.ts`: Strictly typed interfaces for photos, videos, letters, config settings, and system state.
- `src/constants.ts`: Complete mock dataset with safe, universally-accessible audio, video, and image streaming URLs.
- `src/index.css`: Tailored modern Tailwind variables, serif display typography pairings, and custom visual scrollbar aesthetics.
- `src/components/`:
  - `CupidIntro.tsx`: Cupid SVG drawing, bow-string tension vectors, heart-shattering spark mechanics.
  - `StarryBackground.tsx`: Interactive HTML5 Canvas animation rendering sparkling deep pink nebulae and flying shooting stars.
  - `HomeVisual.tsx`: Reaching crystal character, constellation connection filaments, five orbiting button anchors.
  - `ModuleModal.tsx`: Complete support interface housing custom filters, video streams, letter jar parsers, art galleries, and spinning vinyl disc nodes.
  - `SubmissionForm.tsx`: Drag-and-drop file uploaders, automatic Base64 local asset conversion, and structured forms.
  - `AdminPanel.tsx`: Password lock screens, real-time slogan editing, user registers, and backup systems.

## 🚀 Development Quickstart

1. **Verify Dependencies**:
   Ensure `motion/react` (for fluid animations) and standard dependencies are configured.
2. **Launch Dev Server**:
   ```bash
   npm run dev
   ```
3. **Admin Key**:
   The default password to enter the moderation dashboard is `admin`.
