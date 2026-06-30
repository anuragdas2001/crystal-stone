import { create } from "zustand";
import { authClient } from "../lib/auth-client";

type AuthSessionPayload = (typeof authClient.$Infer)["Session"];
type AuthUser = AuthSessionPayload["user"];
type AuthSession = AuthSessionPayload["session"];

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";
type AuthOperation = "session" | "sign-in" | "sign-up" | "google" | "sign-out";

type AuthResult = {
  ok: boolean;
  error?: string;
};

type EmailSignInInput = {
  email: string;
  password: string;
  callbackURL?: string;
};

type EmailSignUpInput = EmailSignInInput & {
  name: string;
};

type AuthState = {
  authStatus: AuthStatus;
  authOperation: AuthOperation | null;
  authError: string | null;
  authUser: AuthUser | null;
  authSession: AuthSession | null;
};

type AuthActions = {
  clearAuthError: () => void;
  loadAuthSession: () => Promise<AuthResult>;
  signInWithEmail: (input: EmailSignInInput) => Promise<AuthResult>;
  signUpWithEmail: (input: EmailSignUpInput) => Promise<AuthResult>;
  continueWithGoogle: (callbackURL?: string) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
};

type AppStore = AuthState & AuthActions;

function getErrorMessage(error: unknown, fallback: string) {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return fallback;
}

function getSessionState(data: AuthSessionPayload | null | undefined) {
  return {
    authStatus: data
      ? ("authenticated" as const)
      : ("unauthenticated" as const),
    authUser: data?.user ?? null,
    authSession: data?.session ?? null,
    authError: null,
  };
}

export const useAppStore = create<AppStore>((set, get) => ({
  authStatus: "idle",
  authOperation: null,
  authError: null,
  authUser: null,
  authSession: null,

  clearAuthError: () => {
    set({ authError: null });
  },

  loadAuthSession: async () => {
    set({ authStatus: "loading", authOperation: "session", authError: null });

    try {
      const { data, error } = await authClient.getSession();

      if (error) {
        const message = getErrorMessage(error, "Unable to load session.");

        set({
          authStatus: "unauthenticated",
          authOperation: null,
          authError: message,
          authUser: null,
          authSession: null,
        });

        return { ok: false, error: message };
      }

      set({
        ...getSessionState(data),
        authOperation: null,
      });

      return { ok: true };
    } catch (error) {
      const message = getErrorMessage(error, "Unable to load session.");

      set({
        authStatus: "unauthenticated",
        authOperation: null,
        authError: message,
        authUser: null,
        authSession: null,
      });

      return { ok: false, error: message };
    }
  },

  signInWithEmail: async ({ email, password, callbackURL = "/" }) => {
    set({ authOperation: "sign-in", authError: null });

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL,
      });

      if (error) {
        const message = getErrorMessage(error, "Unable to sign in.");

        set({ authOperation: null, authError: message });
        return { ok: false, error: message };
      }

      return get().loadAuthSession();
    } catch (error) {
      const message = getErrorMessage(error, "Unable to sign in.");

      set({ authOperation: null, authError: message });
      return { ok: false, error: message };
    }
  },

  signUpWithEmail: async ({ name, email, password, callbackURL = "/" }) => {
    set({ authOperation: "sign-up", authError: null });

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL,
      });

      if (error) {
        const message = getErrorMessage(
          error,
          "Unable to create your account.",
        );

        set({ authOperation: null, authError: message });
        return { ok: false, error: message };
      }

      return get().loadAuthSession();
    } catch (error) {
      const message = getErrorMessage(error, "Unable to create your account.");

      set({ authOperation: null, authError: message });
      return { ok: false, error: message };
    }
  },

  continueWithGoogle: async (callbackURL = "/dashboard") => {
    set({ authOperation: "google", authError: null });

    // Build absolute URL so Better Auth redirects to the frontend, not the API
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const absoluteCallbackURL = callbackURL.startsWith("http")
      ? callbackURL
      : `${origin}${callbackURL}`;

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: absoluteCallbackURL,
      });

      if (error) {
        const message = getErrorMessage(
          error,
          "Unable to continue with Google.",
        );

        set({ authOperation: null, authError: message });
        return { ok: false, error: message };
      }

      set({ authOperation: null });
      return { ok: true };
    } catch (error) {
      const message = getErrorMessage(error, "Unable to continue with Google.");

      set({ authOperation: null, authError: message });
      return { ok: false, error: message };
    }
  },

  signOut: async () => {
    set({ authOperation: "sign-out", authError: null });

    try {
      const { error } = await authClient.signOut();

      if (error) {
        const message = getErrorMessage(error, "Unable to sign out.");

        set({ authOperation: null, authError: message });
        return { ok: false, error: message };
      }

      set({
        authStatus: "unauthenticated",
        authOperation: null,
        authError: null,
        authUser: null,
        authSession: null,
      });

      return { ok: true };
    } catch (error) {
      const message = getErrorMessage(error, "Unable to sign out.");

      set({ authOperation: null, authError: message });
      return { ok: false, error: message };
    }
  },
}));
