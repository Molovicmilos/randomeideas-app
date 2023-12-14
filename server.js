const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

const app = express();

//Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware
// NOTE: only use cors middleware in development as in production both client and
// API are served from the same origin
if (process.env.NODE_ENV !== "production") {
  const cors = require("cors");
  app.use(
    cors({
      origin: ["http://localhost:5000", "http://localhost:3000"],
      credentials: true,
    })
  );
}

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the RandomIdea API" });
});

const ideasRouter = require("./routes/ideas");
app.use("/api/ideas", ideasRouter);

app.listen(port, () => console.log(`Server listening on ${port}`));
