import { groqService } from "./services/groq.service";
import { userProfileSchema } from "./validators/learning-path.validator";

async function readRequestJson(req: any): Promise<unknown> {
  if (req.body) {
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body);
      } catch (_e) {
        return req.body;
      }
    }
    return req.body;
  }
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: Buffer | string) => {
      data += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req: any, res: any) {
  // Handle CORS preflight if needed
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(404).json({ error: "Not found" });
    return;
  }

  try {
    const body = (await readRequestJson(req)) as unknown;
    const validatedProfile = userProfileSchema.parse(body);

    const result = await groqService.generateLearningPath(validatedProfile);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    if (error?.name === "ZodError") {
      res.status(400).json({
        success: false,
        error: "Dados inválidos",
        details: error.issues?.map((err: any) => ({
          field: Array.isArray(err.path) ? err.path.join(".") : String(err.path ?? ""),
          message: err.message,
        })),
      });
      return;
    }

    console.error("Error in /api/generate-path:", error?.message ?? String(error));
    res.status(500).json({
      success: false,
      error: error?.message ?? "Erro interno do servidor",
    });
  }
}



