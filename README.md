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
  