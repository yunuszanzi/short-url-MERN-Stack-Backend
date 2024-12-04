const express = require("express");
const { connectDb } = require("./connection");
const urlRoute = require("./routes/url");
const app = express();

const PORT = process.env.PORT || 5001;

connectDb("mongodb://localhost:27017/short-url").then(() =>
  console.log("short-url DB created")
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
// Middleware to log incoming requests

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use("/url", urlRoute);

// Middleware to validate the 'name' and 'age' parameters
app.listen(PORT, (err, res) => {
  console.log(`Server Started at PORT:${PORT}`);
});
