'use client';
import React, { useState } from "react";
import Form from "./form";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  
  interface LoginData {
    user: string;
    password: string;
  }
  
  interface AuthResponse {
    token: string;
    user: {
      _id: string;
      email: string;
      username: string;
    }
  }

  async function authenticate(creds: LoginData) {
      // Map frontend field names to what the backend expects
      const backendCreds = {
        email: creds.user,  // Backend expects 'email' but our form uses 'user'
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
        setError("Please enter both email and password");
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
