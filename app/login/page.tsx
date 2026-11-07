"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import LoginForm from "../components/auth/login-form";
import { useAuth } from "../../src/contexts/auth-context";

export default function LoginPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      router.replace(
        user.role === "admin"
          ? "/admin"
          : "/journalist"
      );
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading || isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return <LoginForm />;
}