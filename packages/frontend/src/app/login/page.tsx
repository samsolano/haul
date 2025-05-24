'use client';
import React, { useState } from "react";
import Form from "./form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { UserWithId } from "../../../../backend/src/models/user";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  interface LoginData {
    user: string;
    password: string;
  }

  interface AuthResponse {
    token: string;
    user: UserWithId
  }

  async function authenticate(creds: LoginData): Promise<AuthResponse> {
      // Map frontend field names to what the backend expects
      const backendCreds = {
        username: creds.user,
        password: creds.password
      };

      try {
        const response = await fetch("http://localhost:8000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(backendCreds)
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || `Server error: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error("Authentication error:", error);
        throw error;
      }
    }

  const handleLogin = async (loginData: LoginData) => {
      // Clear any previous errors
      setError(null);

      // Basic validation
      if (!loginData.user || !loginData.password) {
        setError("Please enter both username and password");
        return;
      }

      try {
        // Attempt to authenticate with the backend
        const authResponse = await authenticate(loginData);

        // Store the JWT token in localStorage for later use in authenticated requests
        localStorage.setItem('authToken', authResponse.token);

        // Store user info for use across the app
        localStorage.setItem('user', JSON.stringify(authResponse.user));

        console.log("Login successful:", authResponse.user.username);

        // Navigate to finds page after successful login
        router.push('/finds');

      } catch (error) {
          setError("Failed to login. Please check your credentials.");
      }
    };

  return (
    <div>
        <Form handleSubmit={handleLogin} />
          <p>{error}</p>
          <Link href="/signup">
        <button className="bg-white text-black p-3 rounded-lg mt-5">
          Create an account
        </button>
      </Link>
    </div>
  );
}
