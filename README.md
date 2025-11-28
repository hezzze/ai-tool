# ZZC AI Tool

An AI-powered design tool for generating and describing images using advanced AI models.

## Features

- 🎨 **Create Images**: Generate images from text prompts with customizable aspect ratios
- 🔍 **Describe Images**: Upload images to get AI-generated descriptions
- 🌐 **Multi-language Support**: Switch between English and Simplified Chinese
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hezzze/ai-tool.git
cd ai-tool
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API key:
```
VITE_API_KEY=your-api-key-here
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8000`

## Environment Variables

This project uses environment variables for configuration:

- `VITE_API_KEY`: API key for the image generation service (required)

**Note**: In Vite, environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

## Deployment

### GitHub Pages

This project is configured to deploy automatically to GitHub Pages when you push to the `main` branch.

**Setup GitHub Secrets:**

1. Go to your repository settings
2. Navigate to **Secrets and variables** → **Actions**
3. Add a new repository secret:
   - Name: `VITE_API_KEY`
   - Value: Your API key

The GitHub Actions workflow will automatically build and deploy your app.

### Manual Build

To build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS** - Styling with CSS variables

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (Language)
├── hooks/          # Custom React hooks
├── i18n/          # Internationalization
├── pages/         # Page components
├── services/      # API services
└── styles/        # Global styles
```

## License

MIT

