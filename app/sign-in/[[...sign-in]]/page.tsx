import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";

export const metadata: Metadata = {
  title: "Sign in | CANTABRIA",
  description: "Sign in to your CANTABRIA reader account.",
};

export default function SignInPage() {
  return (
    <AuthPageShell
      eyebrow="Reader account"
      title="Welcome back."
      description="Sign in securely, then return to CANTABRIA's clear news analysis and framing insights."
    >
      <SignIn />
    </AuthPageShell>
  );
}
