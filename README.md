# Wordle Clone Complete Project Documentation

## Overview

This documentation details the structure and functionality of a Wordle clone that supports daily challenges and custom word challenges that users can create and share.

## Features

- **Daily Challenge**: Engage with a new word challenge every day.
- **Custom Challenge**: Create and share custom word puzzles with friends.
- **Responsive Design**: Optimized for both desktop and mobile users.

## Technology Stack

- **Frontend**: React, TypeScript, Vite, CSS
- **Backend**: Node.js (optional for custom challenge handling)
- **Routing**: react-router-dom for frontend routing

## Pages and Components

### Home Page

- **Path**: `/home`
- **Components**:
  - `NavBar`: Navigation bar with links to all main pages.
  - `HomePage`: Introduction and selection between daily or custom challenges.

### Daily Challenge Page

- **Path**: `/daily-challenge`
- **Components**:
  - `WordGrid`: Displays the grid for the word puzzle.
  - `Keyboard`: Virtual keyboard for input on mobile devices.
  - `GameStatus`: Information about the current game state.

### Custom Challenge Page

- **Path**: `/custom-challenge`
- **Components**:
  - `ChallengeForm`: Form to create a new custom word challenge.
  - `JoinChallengeForm`: Form to enter a code and join an existing challenge.

### Landing Page

- **Path**: `/`
- **Components**:
  - `LandingPage`: Welcome and overview of the game.

## Navigation

Implemented using `react-router-dom`, the routes are defined in the `App` component, ensuring smooth navigation across different parts of the application.

## Deployment

- **Platform**: Vercel for frontend hosting, ensures fast delivery and easy deployment.
- **Continuous Integration**: GitHub Actions for automated testing and deployment processes.

## Security Considerations

- Use HTTPS to secure all data transmissions.
- Implement encryption for custom challenges to ensure word secrecy.

## Future Enhancements

- **User Authentication**: Introduce user accounts to track scores and manage settings.
- **Leaderboard**: Leaderboard for high scores and competitive play.
- **Accessibility Features**: Enhance accessibility for all users, including keyboard navigability and screen reader support.
  
## Structure

heres the structure of the project

### Dashboard Page

#### Dashboard Page Components

- **Navbar Component:** Contains links to different parts of the site (Daily Challenge, Custom Challenge).
- **WelcomeMessage Component:** Displays a greeting and brief instructions or introduction.
- **Button Component:** Generic button for navigation; used for "Start Daily Challenge" and "Create/Join Custom Challenge".

### Daily Challenge Page

This page allows users to play the daily Wordle game.

#### Daily Challenge Page Components

- **WordGrid Component:** Displays the grid where users input their guesses.
- **Keyboard Component:** A virtual keyboard to enter guesses (especially useful for touch devices).
- **GuessInput Component:** Allows text input for entering guesses.
- **SubmitButton Component:** Submits the current guess.
- **GameStatus Component:** Shows the number of attempts left and feedback on the current game state.
- **DailyWordProvider Component:** Context provider that fetches and stores the daily word and manages game state.

### Landing Page

A simple introductory page for new visitors.

#### Landing Page Components

- **Header Component:** Displays the game name and a welcome message.
- OverviewComponent: Briefly describes how to play the game.
- **StartButton Component:** Directs users to the Home Page to start playing.

### Custom Challenge Page

Allows users to create a challenge with a custom word or join one via a shared link.

#### Custom Challenge Page Components

- **ChallengeForm Component:** For creating a new custom challenge. Includes an input for the word and a submit button.
- **JoinChallengeForm Component:** Includes an input to enter a challenge code or link.
- **CustomChallengeProvider Component:** Manages the creation and retrieval of custom challenges, including encryption and decryption of words.
- **ChallengeLinkDisplay Component:** Shows the generated link for a custom challenge that can be shared.

### Shared/Common Components

Components that are used across different pages for consistency and code reusability.

#### Shared Components

- **Footer Component:** Displays copyright and basic info about the site.
- **LoadingSpinner Component:** Shown during API calls or data fetching.
- **Alert Component:** For displaying errors, warnings, or informational messages.
Routing and Navigation
Manage navigation between different pages using React Router.

- **App Component:** The main component that uses React Router to switch between the Landing Page, Home Page, Daily Challenge Page, and Custom Challenge Page.

### CSS/Styles

Each component will have its associated CSS module for styling. Use CSS modules or styled-components for scoped and maintainable styles.

### Utilities

- **api.js:** For handling fetch requests to your backend for words, challenges, and validations.
- **auth.js:** (If implementing user authentication) Manages user sessions, sign-ins, and sign-outs.
- **encrypt.js:** Handles encryption and decryption of custom challenge words.
