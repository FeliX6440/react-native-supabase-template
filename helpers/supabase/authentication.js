import { router } from "expo-router";
import { supabase } from "./supabase";
import { showPopup } from "../../components/popups/PopupService";

export const signInWithPassword = async (setLoading, form) => {
  setLoading(true);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  });

  if (error) {
    showPopup({
      type: "fail",
      title: "Sign-In Failed",
      text:
        error.message === "Email not confirmed"
          ? "Please confirm your email to proceed."
          : "Failed to sign in. Please check your email and password.",
      duration: 3000,
    });

    if (error.message === "Email not confirmed") {
      router.push({
        pathname: "verification-code",
        params: { email: form.email },
      });
    }

    setLoading(false);
  } else {
    showPopup({
      type: "success",
      title: "Signed In",
      text: "You have successfully signed in.",
      duration: 3000,
    });
    router.push("/home");
  }
};

export const signUpWithPassword = async (setLoading, form) => {
  setLoading(true);
  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      data: {
        firstname: form.firstname,
        lastname: form.lastname,
      },
    },
  });

  if (error) {
    showPopup({
      type: "fail",
      title: "Sign-Up Failed",
      text: "Unable to create an account. Please try again.",
      duration: 3000,
    });
    setLoading(false);
  } else {
    showPopup({
      type: "success",
      title: "Sign-Up Successful",
      text: "Account created. Please verify your email.",
      duration: 3000,
    });
    router.push({
      pathname: "verification-code",
      params: { email: form.email },
    });
  }
};

export const verifyCode = async (setLoading, code, email) => {
  const verificationCode = code.join("");
  setLoading(true);

  const { error } = await supabase.auth.verifyOtp({
    type: "signup",
    email: email,
    token: verificationCode,
  });

  if (error) {
    showPopup({
      type: "fail",
      title: "Verification Failed",
      text: "Invalid verification code. Please try again.",
      duration: 3000,
    });
    setLoading(false);
  } else {
    showPopup({
      type: "success",
      title: "Account Verified",
      text: "Your account has been verified successfully!",
      duration: 3000,
    });
    router.push("/home");
  }
};

export const getNewCode = async (setLoading, email) => {
  setLoading(true);

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
  });

  if (error) {
    showPopup({
      type: "fail",
      title: "Resend Failed",
      text: "Could not resend verification code. Please try again later.",
      duration: 3000,
    });
    setLoading(false);
  } else {
    showPopup({
      type: "success",
      title: "Code Resent",
      text: "A new verification code has been sent to your email.",
      duration: 3000,
    });
    setLoading(false);
  }
};

export const logOut = async () => {
  await supabase.auth.signOut();
  router.push("/sign-in");
  showPopup({
    type: "success",
    title: "Logged Out",
    text: "You have been logged out of your account - you can log back in at any time.",
    duration: 3000,
  });
};
