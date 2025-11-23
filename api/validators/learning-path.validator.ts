import { z } from "zod";

/**
 * Schema validation for user profile input
 */
export const userProfileSchema = z.object({
  objective: z
    .string()
    .min(5, "Objetivo deve ter pelo menos 5 caracteres")
    .max(120, "Objetivo deve ter no máximo 120 caracteres"),
  
  area: z.enum([
    "Desenvolvimento Web",
    "IA/ML",
    "Dados",
    "Design",
    "DevOps",
  ]),
  
  level: z.enum(["iniciante", "intermediário", "avançado"]),
  
  weeklyTime: z
    .number()
    .min(1, "Tempo semanal deve ser pelo menos 1 hora")
    .max(20, "Tempo semanal não pode exceder 20 horas"),
  
  deadlineWeeks: z
    .number()
    .min(2, "Prazo mínimo é de 2 semanas")
    .max(26, "Prazo máximo é de 26 semanas")
    .optional(),
  
  preferredFormat: z
    .array(z.enum(["vídeo", "artigo", "curso", "documentação"]))
    .optional(),
});

export type ValidatedUserProfile = z.infer<typeof userProfileSchema>;

