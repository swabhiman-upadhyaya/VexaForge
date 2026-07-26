import express from "express"
import morgan from "morgan"
import { createPod } from "./kubernetes/pod.js";
import { createService } from "./kubernetes/service.js";
import { createIngress } from "./kubernetes/ingress.js";
import { v7 as uuid } from "uuid"

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

console.log("REGISTERING START ROUTE");

app.post("/api/sandbox/start", async(req, res) => {

  const sandboxId = uuid();

  await Promise.all([
    createPod(sandboxId),
    createService(sandboxId),
    createIngress(sandboxId)
  ])

  return res.status(201).json({
    message: "Sandbox container created successfully",
    sandboxId,
    previewUrl: `http://${sandboxId}.preview.localhost`
  })

})

export default app;