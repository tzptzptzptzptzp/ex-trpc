import express from "express";

const app = express();

const PORT = 2222;

app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => {
  console.log(`Server Running http://localhost:${PORT}`);
});
