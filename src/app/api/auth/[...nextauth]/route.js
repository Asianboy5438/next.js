// NextAuth entry point — handles all /api/auth/* routes automatically
import { handlers } from "@/auth";

export const { GET, POST } = handlers;