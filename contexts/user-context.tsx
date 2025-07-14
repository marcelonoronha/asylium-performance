"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { getUserProfile } from "@/actions/user";

interface UserData {
  name: string;
  email: string;
  avatar: string;
}

interface UserContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const supabase = createClient();

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        setError(error.message);
        return;
      }

      if (user) {
        // Try to get user data from custom users table first
        const profileResult = await getUserProfile(user.id);

        if (profileResult.user) {
          // Use data from custom users table
          const userData: UserData = {
            name:
              profileResult.user.full_name ||
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              user.email?.split("@")[0] ||
              "User",
            email: profileResult.user.email || user.email || "",
            avatar:
              profileResult.user.avatar_url ||
              user.user_metadata?.avatar_url ||
              user.user_metadata?.picture ||
              "",
          };
          setUser(userData);
        } else {
          // Fallback to auth user metadata
          const userData: UserData = {
            name:
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              user.email?.split("@")[0] ||
              "User",
            email: user.email || "",
            avatar:
              user.user_metadata?.avatar_url ||
              user.user_metadata?.picture ||
              "",
          };
          setUser(userData);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  }, [supabase.auth]);

  const refetch = () => {
    fetchUser();
  };

  useEffect(() => {
    if (!isInitialized) {
      fetchUser();
    }

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Try to get user data from custom users table first
        const profileResult = await getUserProfile(session.user.id);

        if (profileResult.user) {
          // Use data from custom users table
          const userData: UserData = {
            name:
              profileResult.user.full_name ||
              session.user.user_metadata?.full_name ||
              session.user.user_metadata?.name ||
              session.user.email?.split("@")[0] ||
              "User",
            email: profileResult.user.email || session.user.email || "",
            avatar:
              profileResult.user.avatar_url ||
              session.user.user_metadata?.avatar_url ||
              session.user.user_metadata?.picture ||
              "",
          };
          setUser(userData);
        } else {
          // Fallback to auth user metadata
          const userData: UserData = {
            name:
              session.user.user_metadata?.full_name ||
              session.user.user_metadata?.name ||
              session.user.email?.split("@")[0] ||
              "User",
            email: session.user.email || "",
            avatar:
              session.user.user_metadata?.avatar_url ||
              session.user.user_metadata?.picture ||
              "",
          };
          setUser(userData);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
      setIsInitialized(true);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, isInitialized, fetchUser]);

  return (
    <UserContext.Provider value={{ user, loading, error, refetch }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
