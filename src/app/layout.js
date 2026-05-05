import "../styles/reset.css";
import "../styles/variables.css";
import "../styles/global.css";
import Navbar from "../components/Navbar";
import SessionProvider from "../components/SessionProvider";
import { auth } from "@/auth";

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Navbar />
          <main>
            <div className="section">
              <div className="container">
                {children}
              </div>
            </div>
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}