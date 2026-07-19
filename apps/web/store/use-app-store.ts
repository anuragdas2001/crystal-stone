import { create } from "zustand";
import { authClient } from "../lib/auth-client";

type AuthSessionPayload = (typeof authClient.$Infer)["Session"];
type AuthUser = AuthSessionPayload["user"];
type AuthSession = AuthSessionPayload["session"];

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";
type AuthOperation = "session" | "send-otp" | "verify-otp" | "google" | "linkedin" | "sign-out";

type AuthResult = {
  ok: boolean;
  error?: string;
};

type PhoneSignInInput = {
  phoneNumber: string;
  code: string;
};

type PhoneSignUpInput = {
  phoneNumber: string;
  code: string;
  firstName: string;
  lastName: string;
  email?: string;
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
  sendPhoneOtp: (phoneNumber: string) => Promise<AuthResult>;
  verifyPhoneSignIn: (input: PhoneSignInInput) => Promise<AuthResult>;
  verifyPhoneSignUp: (input: PhoneSignUpInput) => Promise<AuthResult>;
  continueWithGoogle: (callbackURL?: string) => Promise<AuthResult>;
  continueWithLinkedIn: (callbackURL?: string) => Promise<AuthResult>;
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
    console.log("[Auth Store] ⏳ loadAuthSession initiated. Current origin:", typeof window !== "undefined" ? window.location.origin : "server");
    set({ authStatus: "loading", authOperation: "session", authError: null });

    try {
      console.log("[Auth Store] 📡 Calling authClient.getSession()...");
      const { data, error } = await authClient.getSession();
      console.log("[Auth Store] 📥 authClient.getSession() result:", { data, error });

      if (error) {
        const message = getErrorMessage(error, "Unable to load session.");
        console.warn("[Auth Store] ⚠️ getSession returned error or empty session:", message, error);

        set({
          authStatus: "unauthenticated",
          authOperation: null,
          authError: message,
          authUser: null,
          authSession: null,
        });

        return { ok: false, error: message };
      }

      const nextState = getSessionState(data);
      console.log("[Auth Store] ✅ Session loaded successfully. Setting authStatus:", nextState.authStatus, "User:", nextState.authUser?.email || nextState.authUser?.name || "null");

      set({
        ...nextState,
        authOperation: null,
      });

      return { ok: true };
    } catch (error) {
      const message = getErrorMessage(error, "Unable to load session.");
      console.error("[Auth Store] ❌ Exception in loadAuthSession:", error);

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

  sendPhoneOtp: async (phoneNumber) => {
    set({ authOperation: "send-otp", authError: null });

    try {
      // 1. Attempt Firebase Phone Authentication SMS delivery if recaptcha container exists
      if (typeof window !== "undefined" && document.getElementById("recaptcha-container")) {
        try {
          const { signInWithPhoneNumber, RecaptchaVerifier } = await import("firebase/auth");
          const { firebaseAuth } = await import("../lib/firebase");
          
          // Clear any stale reCAPTCHA instance across route navigations
          if ((window as any).recaptchaVerifier) {
            try {
              (window as any).recaptchaVerifier.clear();
            } catch (clearErr) {}
            (window as any).recaptchaVerifier = null;
          }

          const container = document.getElementById("recaptcha-container");
          if (container) container.innerHTML = "";

          (window as any).recaptchaVerifier = new RecaptchaVerifier(
            firebaseAuth,
            "recaptcha-container",
            {
              size: "invisible",
            }
          );

          const confirmationResult = await signInWithPhoneNumber(
            firebaseAuth,
            phoneNumber,
            (window as any).recaptchaVerifier
          );
          (window as any).firebaseConfirmationResult = confirmationResult;
        } catch (fbErr: any) {
          console.error("❌ Firebase Phone Auth Error:", fbErr);
          try {
            if ((window as any).recaptchaVerifier) {
              (window as any).recaptchaVerifier.clear();
            }
          } catch (clearErr) {}
          (window as any).recaptchaVerifier = null;

          const errorMessage = getErrorMessage(fbErr, "Failed to send SMS via Firebase.");
          set({ authOperation: null, authError: errorMessage });
          return { ok: false, error: errorMessage };
        }
      }

      // 2. Also trigger Better Auth server OTP endpoint for backend session readiness
      const { error } = await authClient.phoneNumber.sendOtp({
        phoneNumber,
      });

      if (error) {
        const message = getErrorMessage(
          error,
          "Unable to send verification code."
        );

        set({ authOperation: null, authError: message });
        return { ok: false, error: message };
      }

      set({ authOperation: null });
      return { ok: true };
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Unable to send verification code."
      );

      set({ authOperation: null, authError: message });
      return { ok: false, error: message };
    }
  },

  verifyPhoneSignIn: async ({ phoneNumber, code }) => {
    set({ authOperation: "verify-otp", authError: null });

    try {
      // 1. If Firebase confirmation result is active, confirm the code with Firebase first
      if (typeof window !== "undefined" && (window as any).firebaseConfirmationResult) {
        try {
          await (window as any).firebaseConfirmationResult.confirm(code);
        } catch (fbErr: any) {
          console.warn("Firebase code confirmation notice:", fbErr.message || fbErr);
        }
      }

      // 2. Verify with backend Better Auth to establish PostgreSQL user session
      const { error } = await authClient.phoneNumber.verify({
        phoneNumber,
        code,
      });

      if (error) {
        const message = getErrorMessage(error, "Invalid verification code.");

        set({ authOperation: null, authError: message });
        return { ok: false, error: message };
      }

      return get().loadAuthSession();
    } catch (error) {
      const message = getErrorMessage(error, "Invalid verification code.");

      set({ authOperation: null, authError: message });
      return { ok: false, error: message };
    }
  },

  verifyPhoneSignUp: async ({
    phoneNumber,
    code,
    firstName,
    lastName,
    email,
  }) => {
    set({ authOperation: "verify-otp", authError: null });

    try {
      // 1. If Firebase confirmation result is active, confirm with Firebase first
      if (typeof window !== "undefined" && (window as any).firebaseConfirmationResult) {
        try {
          await (window as any).firebaseConfirmationResult.confirm(code);
        } catch (fbErr: any) {
          console.warn("Firebase code confirmation notice:", fbErr.message || fbErr);
        }
      }

      // 2. Verify with backend Better Auth to create PostgreSQL user record and session
      const { error } = await authClient.phoneNumber.verify({
        phoneNumber,
        code,
        firstName,
        lastName,
        name: [firstName, lastName].filter(Boolean).join(" "),
        ...(email && email.trim() ? { email: email.trim() } : {}),
      } as any);

      if (error) {
        const message = getErrorMessage(
          error,
          "Unable to verify and create account."
        );

        set({ authOperation: null, authError: message });
        return { ok: false, error: message };
      }

      return get().loadAuthSession();
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Unable to verify and create account."
      );

      set({ authOperation: null, authError: message });
      return { ok: false, error: message };
    }
  },

  continueWithGoogle: async (callbackURL = "/dashboard") => {
    console.log("[Auth Store] 🚀 continueWithGoogle triggered. Target origin:", typeof window !== "undefined" ? window.location.origin : "server");
    set({ authOperation: "google", authError: null });

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const targetCallback = callbackURL.startsWith("http") ? callbackURL : `${baseUrl}${callbackURL.startsWith("/") ? "" : "/"}${callbackURL}`;
    console.log("[Auth Store] 🔗 Initiating Google social login with callbackURL:", targetCallback);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: targetCallback,
      });

      if (error) {
        const message = getErrorMessage(
          error,
          "Unable to continue with Google.",
        );
        console.error("[Auth Store] ❌ Google social login error:", message, error);

        set({ authOperation: null, authError: message });
        return { ok: false, error: message };
      }

      console.log("[Auth Store] ✅ Google social login request sent successfully.");
      set({ authOperation: null });
      return { ok: true };
    } catch (error) {
      const message = getErrorMessage(error, "Unable to continue with Google.");
      console.error("[Auth Store] ❌ Exception in continueWithGoogle:", error);

      set({ authOperation: null, authError: message });
      return { ok: false, error: message };
    }
  },

  continueWithLinkedIn: async (callbackURL = "/dashboard") => {
    console.log("[Auth Store] 🚀 continueWithLinkedIn triggered. Target origin:", typeof window !== "undefined" ? window.location.origin : "server");
    set({ authOperation: "linkedin", authError: null });

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const targetCallback = callbackURL.startsWith("http") ? callbackURL : `${baseUrl}${callbackURL.startsWith("/") ? "" : "/"}${callbackURL}`;
    console.log("[Auth Store] 🔗 Initiating LinkedIn social login with callbackURL:", targetCallback);

    try {
      const { error } = await authClient.signIn.social({
        provider: "linkedin",
        callbackURL: targetCallback,
      });

      if (error) {
        const message = getErrorMessage(
          error,
          "Unable to continue with LinkedIn.",
        );
        console.error("[Auth Store] ❌ LinkedIn social login error:", message, error);

        set({ authOperation: null, authError: message });
        return { ok: false, error: message };
      }

      console.log("[Auth Store] ✅ LinkedIn social login request sent successfully.");
      set({ authOperation: null });
      return { ok: true };
    } catch (error) {
      const message = getErrorMessage(error, "Unable to continue with LinkedIn.");
      console.error("[Auth Store] ❌ Exception in continueWithLinkedIn:", error);

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
