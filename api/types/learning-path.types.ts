/**
 * Types for Learning Path Generation
 */

export interface UserProfileInput {
  objective: string;
  area: string;
  level: "iniciante" | "intermediário" | "avançado";
  weeklyTime: number;
  deadlineWeeks?: number;
  preferredFormat?: string[];
}

export interface LearningPathResponse {
  markdown: string;
  generatedAt: string;
}

export interface GroqChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}


