# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TweetFolio is a Twitter-inspired portfolio website built with React.js. It presents professional information (education, experience, projects, achievements) in a familiar social media interface format. The project allows users to customize their portfolio by modifying the `config.js` file with their personal data.

## Development Commands

```bash
# Install dependencies (using Bun as primary package manager)
bun install

# Start development server
bun start
# or
npm start

# Build for production
npm run build

# Run tests
npm test

# Format code with Prettier
npm run format
```

## Project Architecture

### Core Structure
- **Single Page Application**: Main content rendered in `App.js` with React Router for navigation
- **Configuration-driven**: All personal data centralized in `src/config.js` for easy customization
- **Component-based**: Modular architecture with clear separation of concerns

### Key Directories
- `src/components/tweets/`: Portfolio content components (Education, Skills, Experience, etc.)
- `src/components/user/`: User profile and modal components
- `src/components/engage/`: Twitter-like interaction components (Like, Share, Comment, Retweet)
- `src/components/utils/`: Utility components (Error handling, Icons, etc.)

### Data Flow
- All portfolio data exports from `src/config.js` 
- Components import and render specific data sections
- Tweet-like UI wrapper (`Tweet.js`) provides consistent formatting

### Styling
- **TailwindCSS**: Primary styling framework with custom animations
- **Custom animations**: Defined in `tailwind.config.js` (fadeIn, spin-reverse, scale effects)
- **Responsive design**: Mobile-first approach with Twitter-like visual hierarchy

### Routing
- Main portfolio: `/` (renders all tweet components)
- Project details: `/projects` (expanded project list view)
- Error handling with custom Error component

## Key Customization Points

- **Personal Data**: Modify `src/config.js` to update all portfolio content
- **Profile Information**: Update HEADER_DISPLAY_NAME, social usernames, and bio
- **Content Sections**: Edit data arrays (EducationData, ExperienceData, ProjectsData, etc.)
- **Styling**: Extend Tailwind config or modify component styles

## Development Notes

- Uses Bun as package manager (lockfile: `bun.lockb`)
- Prettier configured for code formatting
- No TypeScript - plain JavaScript/JSX
- React 18 with React Router v6
- Loading screen with circular animations on initial load