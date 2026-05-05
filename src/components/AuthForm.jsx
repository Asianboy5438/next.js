"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isLogin, setIsLogin] = useState(true);
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
          callbackUrl,
        });

        if (result?.error) {
          setError("Invalid email or password");
        } else {
          router.push(callbackUrl);
          router.refresh();
        }
      } else {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Registration failed");
        } else {
          // Auto-login after registration
          const result = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl,
          });

          if (result?.error) {
            setError("Registered! Please sign in.");
            setIsLogin(true);
          } else {
            router.push(callbackUrl);
            router.refresh();
          }
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #ccc",
    borderRadius: "6px", fontSize: "1rem", boxSizing: "border-box",
    marginBottom: "1rem", display: "block",
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        {isLogin ? "Sign In" : "Register"}
      </h1>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <label>Name:</label>
            <input type="text" name="name" required value={values.name}
              onChange={onChange} style={inputStyle} placeholder="Your name" />
          </>
        )}

        <label>Email:</label>
        <input type="email" name="email" required value={values.email}
          onChange={onChange} style={inputStyle} placeholder="you@example.com" />

        <label>Password:</label>
        <input type="password" name="password" required value={values.password}
          onChange={onChange} style={inputStyle} placeholder="••••••••" />

        {error && (
          <p style={{ color: "red", fontSize: "0.9rem", marginBottom: "1rem" }}>{error}</p>
        )}

        <button type="submit" disabled={isSubmitting}
          style={{ width: "100%", padding: "0.65rem", backgroundColor: "#0070f3",
            color: "white", border: "none", borderRadius: "6px", fontSize: "1rem",
            cursor: "pointer", marginTop: "0.5rem" }}>
          {isSubmitting ? "Please wait..." : isLogin ? "Sign In" : "Register"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.9rem" }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => { setIsLogin(!isLogin); setError(""); setValues({ name: "", email: "", password: "" }); }}
          style={{ background: "none", border: "none", color: "#0070f3",
            cursor: "pointer", fontSize: "0.9rem", textDecoration: "underline" }}>
          {isLogin ? "Register" : "Sign In"}
        </button>
      </p>
    </div>
  );
}