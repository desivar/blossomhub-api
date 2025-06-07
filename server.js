const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5500; // Use port from .env or default to 5500

// Connect to MongoDB directly in server.js
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
      console.error("❌ MongoDB Connection Error:", err);
      process.exit(1);
  });

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
