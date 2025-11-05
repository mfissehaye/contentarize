# Tailwind CSS Integration Guide

This package uses Tailwind CSS v4 for styling. When installing this package in a project that has its own Tailwind integration, you have two options:

## Option 1: Import Pre-built CSS (Recommended)

Import the pre-built CSS file in your application's entry point:

```tsx
// In your main.tsx, App.tsx, or index.tsx
import '@mfissehaye/contentarize/styles.css';
```

This is the simplest approach and ensures all styles are loaded.

## Option 2: Configure Tailwind to Scan Package Source Files

If you want Tailwind to process the package's classes as part of your build, configure your Tailwind setup to scan the package's source files.

### For Tailwind CSS v4 (with @tailwindcss/vite)

If you're using Tailwind CSS v4 with the `@tailwindcss/vite` plugin, add the package's source files to your CSS `@import` or configure your Vite setup:

```css
/* In your main CSS file (e.g., app.css or index.css) */
@import "tailwindcss";
@import "@mfissehaye/contentarize/src/tailwind.css";
```

**Important**: Make sure your Tailwind v4 setup can process CSS imports from `node_modules`. If you encounter issues, use Option 1 instead.

### For Tailwind CSS v3

If you're using Tailwind CSS v3, update your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@mfissehaye/contentarize/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Troubleshooting

### Classes not appearing

1. **Make sure you're importing the CSS**: 
   ```tsx
   import '@mfissehaye/contentarize/styles.css';
   ```

2. **Check your build process**: Ensure your bundler (Vite, Webpack, etc.) is configured to handle CSS imports from `node_modules`.

3. **For Tailwind v4**: If using `@tailwindcss/vite`, make sure the plugin is configured correctly in your `vite.config.ts`.

4. **Clear build cache**: Sometimes clearing your build cache helps:
   ```bash
   rm -rf node_modules/.vite  # For Vite
   rm -rf .next  # For Next.js
   ```

### Styles conflicting with your project

If you're experiencing style conflicts, you can:

1. Import the CSS in a more specific scope
2. Use CSS layers to control specificity
3. Override styles using your own Tailwind configuration

## Example Setup

Here's a complete example for a Vite + React project:

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@mfissehaye/contentarize/styles.css'; // Import package styles
import './index.css'; // Your own styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```css
/* src/index.css */
@import "tailwindcss";

/* Your custom styles here */
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4 plugin
  ],
});
```

### For Next.js Projects

```tsx
// app/layout.tsx or pages/_app.tsx
import '@mfissehaye/contentarize/styles.css';
```

If using Next.js with Tailwind CSS, make sure the CSS import comes before your own Tailwind imports or configure your `tailwind.config.js` as shown in Option 2 above.

### For Remix Projects

```tsx
// app/root.tsx
import type { LinksFunction } from '@remix-run/node';
import contentarizeStyles from '@mfissehaye/contentarize/styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: contentarizeStyles },
];
```

