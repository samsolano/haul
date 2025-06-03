'use client';
import React, { useState } from "react";
import Form, { type Account } from "./form";
import { useRouter } from "next/navigation";
import type { UserWithId } from "../../../../common/types/user.ts";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  interface AuthResponse {
    token: string;
    user: UserWithId
  }

  async function authenticate(creds: Account, purpose: "login" | "register"): Promise<AuthResponse> {
      // Map frontend field names to what the backend expects
      const backendCreds = {
        username: creds.user,
        password: creds.password
      };

      try {
        // todo: make this an env variable
        const baseUrl = "haul-backend-dvbsd2fufcafhsc4.westus-01.azurewebsites.net";
        const urlEndpoint = purpose === "login" ? "/auth/login" : "/auth/register";

      const response = await fetch(`${baseUrl}${urlEndpoint}`, {
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

  const handleSubmit = async (loginData: Account, purpose: "login" | "register") => {
      // Clear any previous errors
      setError(null);

      // Basic validation
      if (!loginData.user || !loginData.password) {
        setError("Please enter both username and password");
        return;
      }

      try {
        // Attempt to authenticate with the backend
        const authResponse = await authenticate(loginData, purpose);

        // Store the JWT token in localStorage for later use in authenticated requests
        localStorage.setItem('authToken', authResponse.token);

        // Store user info for use across the app
        localStorage.setItem('user', JSON.stringify(authResponse.user));

        console.log(`${purpose} successful: (user ${authResponse.user.username})`);

        // Dispatch login event for navbar update
        window.dispatchEvent(new Event('userLogin'));

        // Navigate to finds page after successful login
        router.push('/finds');

      } catch (error) {
          console.error('Authentication error details:', error);
          if (error instanceof Error) {
              setError(error.message);
          } else {
              setError(purpose === "login" ? 
                  "Failed to login. Please check your credentials." : 
                  "Failed to create account. Please try again.");
          }
      }
    };

  return (
    <div>
      <Form handleSubmit={handleSubmit} />
      <p>{error}</p>
    </div>
  );
}
