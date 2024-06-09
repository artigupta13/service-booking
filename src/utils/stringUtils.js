// src/utils/stringUtils.js
export function capitalizeWords(str) {
    return str
      .trim()                             // Remove leading and trailing spaces
      .replace(/\s+/g, ' ')               // Replace multiple spaces with a single space
      .replace(/\b\w/g, char => char.toUpperCase());  // Capitalize first letter of each word
  }
  