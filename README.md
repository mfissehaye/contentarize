# @mfissehaye/contentarize

Headless CMS editing tools for React applications. A powerful, flexible component library for building content management interfaces.

## Features

- 🎨 Rich text editor built on Tiptap
- 📝 Form components for CMS integration
- 🖼️ Image picker with Unsplash integration
- 🔗 URL picker component
- ♻️ Repeater component for dynamic content
- 🎯 TypeScript support
- 🎨 Tailwind CSS styling

## Installation

```bash
npm install @mfissehaye/contentarize
```

## Usage

### Basic Setup

```tsx
import { Contentarize } from '@mfissehaye/contentarize';
// Import the CSS file - REQUIRED for styles to work
import '@mfissehaye/contentarize/styles.css';

function App() {
  return (
    <Contentarize
      // your props here
    />
  );
}
```

### Tailwind CSS Integration

This package uses Tailwind CSS v4. If your project also uses Tailwind, see [TAILWIND_INTEGRATION.md](./TAILWIND_INTEGRATION.md) for detailed integration instructions.

**Quick Start**: Simply import the CSS file:
```tsx
import '@mfissehaye/contentarize/styles.css';
```

If styles aren't loading, check the [Tailwind Integration Guide](./TAILWIND_INTEGRATION.md) for troubleshooting.

## Documentation

For detailed documentation, please visit the [GitHub repository](https://github.com/mfissehaye/contentarize).

## License

MIT

