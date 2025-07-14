"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function TestAuthPage() {
  const [authStatus, setAuthStatus] = useState<string>("Checking...");
  const [envVars, setEnvVars] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check environment variables
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        setEnvVars({
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey,
          urlLength: supabaseUrl?.length || 0,
          keyLength: supabaseKey?.length || 0,
        });

        if (!supabaseUrl || !supabaseKey) {
          setAuthStatus("Missing environment variables");
          return;
        }

        const supabase = createClient();
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          setAuthStatus(`Error: ${error.message}`);
        } else if (user) {
          setAuthStatus(`Authenticated as: ${user.email}`);
        } else {
          setAuthStatus("Not authenticated");
        }
      } catch (error) {
        setAuthStatus(`Exception: ${error}`);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Test Page</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Authentication Status:</h2>
          <p className="text-sm">{authStatus}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Environment Variables:</h2>
          <pre className="bg-gray-100 p-2 rounded text-xs">
            {JSON.stringify(envVars, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Current URL:</h2>
          <p className="text-sm">
            {typeof window !== "undefined"
              ? window.location.href
              : "Server side"}
          </p>
        </div>
      </div>
    </div>
  );
}
