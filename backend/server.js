import express from "express";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "backend"
  });
});

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from the Node.js backend!",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend listening on port ${PORT}`);
});
