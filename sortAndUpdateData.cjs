const fs = require('fs');

// Path to the JSON file
const filePath = 'listOfWords.json';

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Parse the JSON data
  const file = JSON.parse(data);

  // Create an array to store filtered words
  const filteredWords = [];

  // Iterate through each word, check the conditions, and log the word
  file.words.forEach(word => {
    console.log(`Processing word: ${word}`); // Log the current word
    if (word.length > 10 && word.length <= 15) {
      filteredWords.push(word);
    }
  });

  // Update the object with filtered words
  file.words = filteredWords;

  // Write the updated JSON back to the file
  fs.writeFile(filePath, JSON.stringify(file, null, 2), 'utf8', (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("File has been updated successfully!");
    }
  });
});
