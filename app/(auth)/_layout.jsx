import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen
          name="verification-code"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
