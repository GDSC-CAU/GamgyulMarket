/**
 * Validates a password
 * @param {string} password - The password to validate
 * @returns {boolean} - Whether the password is valid
 */
const validatePassword = (password) => {
  // Password must be at least 4 characters long
  if (!password || typeof password !== 'string' || password.length < 4) {
    return false;
  }
  return true;
};

/**
 * Verifies if the provided password matches the stored password
 * @param {string} providedPassword - The password provided in the request
 * @param {string} storedPassword - The password stored in the database
 * @returns {boolean} - Whether the passwords match
 */
const verifyPassword = (providedPassword, storedPassword) => {
  return providedPassword === storedPassword;
};

module.exports = {
  validatePassword,
  verifyPassword
}; 