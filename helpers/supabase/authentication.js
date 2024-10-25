import { useContext } from "react";

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
    console.error(error.message);
    if (error.message == "Email not confirmed") {
      router.push({
        pathname: "verification-code",
        params: { email: form.email },
      });
    }
    setLoading(false);
  } else {
    console.log("Signed in:", data);
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
    console.error(error.message);
    setLoading(false);
  } else {
    console.log("Signed up:", data);
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
    console.error("Verification failed:", error.message);
    setLoading(false);
  } else {
    console.log("Account verified successfully!");
    router.push("/home");
  }
};

export const getNewCode = async (setLoading, email) => {
  console.log(email);
  setLoading(true);

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
  });

  if (error) {
    console.error("Failed to resend verification code:", error.message);
    setLoading(false);
  } else {
    console.log("New verification code sent successfully!");
    setLoading(false);
  }
};

export const logOut = async () => {
  //await supabase.auth.signOut();
  //router.push("/sign-in");
  showPopup({
    type: "succeass",
    title: "Operation Complete",
    text: "Your task was successful!",
    duration: 3000,
  });
};
