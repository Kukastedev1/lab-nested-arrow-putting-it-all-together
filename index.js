function createLoginTracker(userInfo) {
  let attemptCount = 0;
  let isLocked = false;

  return (passwordAttempt) => {
    // If account is already locked
    if (isLocked) {
      return "Account locked due to too many failed login attempts";
    }

    attemptCount++; // Increase attempts on each call

    // If password matches (and attempts <= 3)
    if (passwordAttempt === userInfo.password && attemptCount <= 3) {
      return "Login successful";
    }

    // If password is wrong and attempts <= 3
    if (passwordAttempt !== userInfo.password && attemptCount <= 3) {
      // Lock AFTER the 3rd failed attempt
      if (attemptCount === 3) {
        isLocked = true;
      }
      return `Attempt ${attemptCount}: Login failed`;
    }

    // If attempts exceeded 3 → lock account permanently
    isLocked = true;
    return "Account locked due to too many failed login attempts";
  };
}

module.exports = {
  ...(typeof createLoginTracker !== "undefined" && { createLoginTracker })
};

const tracker = createLoginTracker({
  username: "user1",
  password: "pass123"
});

console.log(tracker("wrong"));   // Attempt 1: Login failed
console.log(tracker("nope"));    // Attempt 2: Login failed
console.log(tracker("test"));    // Attempt 3: Login failed (account now locked)
console.log(tracker("pass123")); // Account locked due to too many failed login attempts
