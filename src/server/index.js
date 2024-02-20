
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/subscriptionDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
