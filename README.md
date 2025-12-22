# Académie Royale

A modern, futuristic website for a fictional academy, built with React, Vite, and TailwindCSS (via standard CSS or utility classes if present).

<div align="center">
  <!-- Add banner image if available -->
</div>

## ✨ Features

- **Modern UI/UX**: Animations with Framer Motion, responsive design.
- **Internationalization**: Multi-language support (Français/English).
- **Dark/Light Mode**: Theme switching capability.
- **Routing**: Client-side routing with React Router.

## 🛠️ Tech Stack

- **Framework**: React 18+ with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (presumed based on class names) / CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd académie-royale
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Duplicate `.env.example` to `.env.local` and configure your keys.
    ```bash
    cp .env.example .env.local
    ```
    - `VITE_GEMINI_API_KEY`: API key for Gemini features (if any).

### Running the App

Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📜 Scripts

- `npm run dev`: Start dev server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint check
- `npm run format`: Format code with Prettier
- `npm test`: Run tests with Vitest

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components and sections
├── contexts/       # React Context providers (Theme, Language)
├── lib/            # Utilities and translations
├── ui/             # Generic UI elements
├── App.tsx         # Main application component
└── main.tsx        # Entry point
```

## 🤝 Contributing

1.  Fork the repo
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
