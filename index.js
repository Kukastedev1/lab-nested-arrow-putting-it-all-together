function createLoginTracker(userInfo) {
  let attemptCount = 0;
  let isLocked = false;

  // Inner arrow function (returned)
  return (passwordAttempt) => {
    // If account is already locked
    if (isLocked) {
      return "Account locked due to too many failed login attempts";
    }

    // Increase attempt count
    attemptCount++;

    // Successful login
    if (passwordAttempt === userInfo.password && attemptCount <= 3) {
      return "Login successful";
    }

    // Failed login (count still <= 3)
    if (passwordAttempt !== userInfo.password && attemptCount <= 3) {
      // Lock the account right after the 3rd failed attempt
      if (attemptCount === 3) {
        isLocked = true;
      }
      return `Attempt ${attemptCount}: Login failed`;
    }

    // Any attempt past 3 → locked
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
