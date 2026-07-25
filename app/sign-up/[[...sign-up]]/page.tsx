import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";

export const metadata: Metadata = {
  title: "Create account | CANTABRIA",
  description: "Create your CANTABRIA reader account.",
};

export default function SignUpPage() {
  return (
    <AuthPageShell
      eyebrow="Reader account"
      title="Create your account."
      description="Create a secure Clerk-powered account while keeping CANTABRIA's public news coverage open and easy to explore."
    >
      <SignUp />
    </AuthPageShell>
  );
}
