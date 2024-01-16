import express from "express";
import cors from "cors";

const app = express();
const port = 8082;

app.use(express.json());
app.use(express.static("."));

app.get("/", (req, res) => {
  res.send("Hello node38 youtube");
});

app.listen(port, () => {
  console.log(`BE starting with port ${port}`);
});
