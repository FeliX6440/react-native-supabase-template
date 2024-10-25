import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vsqbpraonkxvrzmusgwf.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzcWJwcmFvbmt4dnJ6bXVzZ3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4NDEyMDgsImV4cCI6MjA0NTQxNzIwOH0.r6CbgG9ItqNaNG5-uJLgVB368nllKrVB2IF_JppCMGY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.log("Error fetching user:", error);
    return null;
  }
};
