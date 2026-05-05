// Runs on Edge Runtime — protects routes before the page loads
export { auth as proxy } from "@/auth-edge";

export const config = {
  matcher: ["/add-profile", "/profile/:path*/edit"],
};