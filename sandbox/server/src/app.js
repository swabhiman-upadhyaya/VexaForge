import express from "express"
import morgan from "morgan"

const app = express();

app.use(express.json()) // for json requests
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // for html requests

app.get("/api/sandbox/health", (req, res) => {
  res.status(200).json({
    message: "Sandbox API is healthy",
    status: "ok"
  })
})

export default app;