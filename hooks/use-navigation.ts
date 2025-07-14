"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = useCallback((url: string) => {
    if (url === pathname) {
      // Already on the page, no need to navigate
      return;
    }
    
    // Use client-side navigation
    router.push(url);
  }, [router, pathname]);

  const isActive = useCallback((url: string) => {
    return pathname === url;
  }, [pathname]);

  const isActiveSection = useCallback((urls: string[]) => {
    return urls.some(url => pathname.startsWith(url));
  }, [pathname]);

  return {
    navigate,
    isActive,
    isActiveSection,
    pathname,
  };
} 