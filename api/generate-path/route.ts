import { NextRequest, NextResponse } from "next/server";
import { groqService } from "@/api/services/groq.service";
import { userProfileSchema } from "@/api/validators/learning-path.validator";
import { ZodError } from "zod";

/**
 * POST /api/generate-path
 * Generate a personalized learning path based on user profile
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input
    const validatedProfile = userProfileSchema.parse(body);

    // Generate learning path using GROQ
    const result = await groqService.generateLearningPath(validatedProfile);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Dados inválidos",
          details: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error("Error in /api/generate-path:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/generate-path
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

