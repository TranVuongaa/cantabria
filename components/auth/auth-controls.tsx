import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const quietActionStyles =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius-small)] border border-border bg-surface px-3 text-[10px] font-semibold text-text-primary transition-colors hover:bg-canvas";

const primaryActionStyles =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius-small)] border border-text-primary bg-text-primary px-3 text-[10px] font-semibold text-surface transition-colors hover:border-[#494949] hover:bg-[#494949]";

export function AuthControls() {
  return (
    <div
      role="group"
      aria-label="Account controls"
      className="flex shrink-0 items-center gap-1.5"
    >
      <Show when="signed-out">
        <SignInButton mode="redirect">
          <button type="button" className={quietActionStyles}>
            Sign in
          </button>
        </SignInButton>
        <SignUpButton mode="redirect">
          <button type="button" className={primaryActionStyles}>
            Create account
          </button>
        </SignUpButton>
      </Show>

      <Show when="signed-in">
        <UserButton
          appearance={{
            elements: {
              userButtonTrigger:
                "flex size-11 items-center justify-center rounded-[var(--radius-small)]",
              avatarBox: "size-8",
            },
          }}
        />
      </Show>
    </div>
  );
}
