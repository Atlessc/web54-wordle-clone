# Custom Wordle Challenge Feature Documentation

## Overview

This document provides guidelines for implementing a feature in a Wordle-like game where users can create a challenge with a custom word. The challenge can be shared with friends via a unique URL. The word is encrypted to ensure it is not exposed in the URL or the client-side code.

## Features

- **Challenge Creation**: Users can input a word to create a new game challenge.
- **Unique Challenge URL**: Each challenge has a unique URL that can be shared but does not contain the solution word.
- **Secure Word Storage**: Words are encrypted and securely stored on the server.
- **Challenge Resolution**: Users can enter their guesses, and the server validates these without revealing the solution.

## Technology Stack

- **Frontend**: React, TypeScript, CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (for storing challenge data, including encrypted words)
- **Encryption**: AES encryption for word security

## API Endpoints

### POST /api/challenge

- **Description**: Create a new challenge.
- **Request Body**:
  
  ```json

  { "word": "encrypted_word" }
  ```

- **Response**:
  
  ```json
  { "challengeId": "unique_challenge_id" }
  ```

### GET /api/challenge/:id

- **Description**: Retrieve the challenge using a unique ID.
- **Response**:

  ```json
  { "gameState": "current_game_state", "id": "challenge_id" }
  ```

## Database Schema

### Challenges

- **id** (UUID): Unique identifier for each challenge.
- **encryptedWord** (Text): AES encrypted word.
- **createdAt** (Timestamp): Date and time the challenge was created.

- cron job of deleteing the challenges after 24 hours

## Security Considerations

- **Encryption**: Use AES for encrypting the solution word. The key should be stored securely using environment variables or a key management service.
- **HTTPS**: Ensure all data transmitted between the client and server is encrypted using SSL/TLS.
- **Rate Limiting**: Implement rate limiting on API endpoints to prevent brute force attacks.

## Deployment

- **Platform**: Vercel
- **Continuous Integration**: Set up GitHub Actions for CI/CD pipelines to automate testing and deployment.

## Future Enhancements

- **User Authentication**: Implement user authentication to track and save user progress and high scores.
- **Leaderboard**: Develop a leaderboard to display scores based on the number of guesses or time taken to solve challenges.
  
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
