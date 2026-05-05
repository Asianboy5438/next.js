import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Sign In",
  description: "Sign in or register for an account",
};

export default function SignInPage() {
  return (
    <div style={{ maxWidth: "400px", margin: "60px auto", padding: "0 1rem" }}>
      <Suspense fallback={<p>Loading...</p>}>
        <AuthForm />
      </Suspense>
    </div>
  );
}