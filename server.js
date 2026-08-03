const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Your routes should come here
// Example:
// app.use("/api/users", userRoutes);


// Start Server
app.listen(PORT, () => {
  console.log(`RAI backend running on http://localhost:${PORT}`);
});