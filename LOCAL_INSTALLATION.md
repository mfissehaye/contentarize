# Local Installation Guide

This guide shows you how to install and test `@mfissehaye/contentarize` in another local repository.

## Method 1: Using pnpm link (Recommended for Development)

This method creates a symlink so changes in the package are immediately reflected in your test project.

### Step 1: In the contentarize package directory

```bash
# Build the package first
pnpm build

# Create a global link
pnpm link --global
```

### Step 2: In your test project directory

```bash
# Link to the global package
pnpm link --global @mfissehaye/contentarize

# Install peer dependencies (if not already installed)
pnpm add react react-dom
```

### Step 3: Use the package in your test project

```typescript
import { CMSProvider, Contentarize, useContentarize } from '@mfissehaye/contentarize';
// Import the CSS - IMPORTANT: This is required for styles to work
import '@mfissehaye/contentarize/styles.css';

// Your component
function App() {
  return (
    <CMSProvider
      user={user}
      initialPageData={pageData}
      onSignout={() => {}}
      onSignin={() => {}}
    >
      <Contentarize />
    </CMSProvider>
  );
}
```

### Step 4: Watch for changes (optional)

While developing, you can run in watch mode to automatically rebuild:

```bash
# In the contentarize package directory
pnpm dev
```

### Unlinking

When you're done testing:

```bash
# In your test project
pnpm unlink --global @mfissehaye/contentarize

# In the contentarize package
pnpm unlink --global
```

---

## Method 2: Using Local File Path (Alternative)

This method directly references the local package without building.

### In your test project's package.json

```json
{
  "dependencies": {
    "@mfissehaye/contentarize": "file:../contentarize"
  }
}
```

Then install:

```bash
pnpm install
```

**Note:** This method uses the `./src` export from the package, so you'll need to:
1. Ensure your test project can handle TypeScript source files
2. Import CSS from the source: `import '@mfissehaye/contentarize/src/tailwind.css'`
3. Or build the package first and use: `import '@mfissehaye/contentarize/styles.css'`

---

## Method 3: Using pnpm Workspace (Best for Monorepos)

If you want to manage both projects in a monorepo:

### Create a workspace root (e.g., `workspace-root/`)

```json
// workspace-root/pnpm-workspace.yaml
packages:
  - 'contentarize'
  - 'test-project'
```

### In your test project's package.json

```json
{
  "dependencies": {
    "@mfissehaye/contentarize": "workspace:*"
  }
}
```

Then from the workspace root:

```bash
pnpm install
```

---

## Important Notes

1. **CSS Import**: Don't forget to import the CSS file (required for styles to work):
   ```typescript
   // For built version (recommended):
   import '@mfissehaye/contentarize/styles.css';
   
   // Or if using source files directly:
   import '@mfissehaye/contentarize/src/tailwind.css';
   ```

2. **Peer Dependencies**: Make sure your test project has React 18+ or 19+ installed:
   ```bash
   pnpm add react@^18.0.0 react-dom@^18.0.0
   ```

3. **Build Before Testing**: Always build the package before linking:
   ```bash
   pnpm build
   ```

4. **TypeScript**: If using TypeScript, types are automatically included via the `types` field in package.json.

---

## Troubleshooting

### Issue: Module not found
- **Solution**: Make sure you've built the package (`pnpm build`) and the `dist` folder exists.

### Issue: CSS not loading
- **Solution**: 
  - Make sure you've imported the CSS: `import '@mfissehaye/contentarize/styles.css'`
  - If using source files, use: `import '@mfissehaye/contentarize/src/tailwind.css'`
  - Ensure the package is built: `pnpm build` (for built CSS)
  - Check that your bundler is configured to handle CSS imports

### Issue: React version mismatch
- **Solution**: Ensure both projects use compatible React versions (18.x or 19.x).

### Issue: Changes not reflecting
- **Solution**: 
  - Rebuild the package: `pnpm build`
  - Or use watch mode: `pnpm dev` (in package directory)
  - Restart your test project's dev server

