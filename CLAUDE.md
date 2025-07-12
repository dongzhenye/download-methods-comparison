# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite demonstration application that showcases three different file download methods in web browsers and their behavior when backend APIs return errors:

1. **Traditional `<a>` tag with href/download** - Cannot intercept errors, may cause page navigation
2. **`window.open()` method** - Cannot intercept errors, opens error page in new window
3. **`fetch` + Blob (Recommended)** - Can intercept errors and provide user-friendly feedback

The project specifically demonstrates download compatibility issues when backend APIs fail, helping developers understand the trade-offs between different download approaches.

## Common Commands

```bash
# Install dependencies (using pnpm or npm)
pnpm install
# or
npm install

# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Preview production build
npm run preview

# Clean build artifacts
npm run clean
```

## Architecture Overview

### Core Components

- **`src/App.jsx`** - Main React component containing all three download implementations and the interactive demo UI
  - Manages download URLs and error mode state
  - Implements three download methods: `handleHrefDownload`, `handleOpenDownload`, and `handleFetchDownload`
  - Provides a comparison table showing pros/cons of each approach

### Key Technical Details

1. **Download Methods Implementation**:
   - **a tag method**: Uses hidden anchor element with dynamic href
   - **window.open method**: Opens URL in new window/tab
   - **fetch + Blob method**: Fetches content, creates blob, generates download link

2. **Error Handling**:
   - Only the fetch + Blob method can intercept HTTP errors
   - Other methods will navigate to error pages or download error content

3. **CORS Considerations**:
   - The fetch + Blob method is subject to CORS restrictions
   - Traditional methods bypass CORS but cannot handle errors

### Development Workflow

When modifying download functionality:
1. Test with both normal and error URLs
2. Verify error handling behavior for each method
3. Check CORS headers if using fetch method with external resources
4. Ensure UI provides clear feedback about download status

### Build Tool

The project uses Vite 7.0 with the React plugin for fast development and optimized production builds.