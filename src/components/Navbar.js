"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1rem 2rem", borderBottom: "1px solid #eee", marginBottom: "1rem"
    }}>
      <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none", margin: 0, padding: 0 }}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        {session?.user && (
          <li><Link href="/add-profile">Add Profile</Link></li>
        )}
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {session?.user ? (
          <>
            <span style={{ fontSize: "0.9rem", color: "#555" }}>
              Hi, {session.user.name || session.user.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              style={{
                padding: "0.4rem 0.9rem", backgroundColor: "#e00",
                color: "white", border: "none", borderRadius: "6px",
                cursor: "pointer", fontSize: "0.9rem"
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/auth/signin"
            style={{
              padding: "0.4rem 0.9rem", backgroundColor: "#0070f3",
              color: "white", borderRadius: "6px", fontSize: "0.9rem",
              textDecoration: "none"
            }}
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}