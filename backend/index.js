const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");

const PORT = process.env.PORT || 3001;

let LOGGED = [
  { id: 1, login: "admin", password: "qwerty" },
  { id: 2, login: "admin2", password: "qwerty" },
];

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/logged", (req, res) => {
  res.json(LOGGED);
});

app.post("", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
