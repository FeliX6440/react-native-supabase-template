import { useState } from "react";

import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import FormField from "../../components/inputs/FormField";
import CustomButton from "../../components/buttons/CustomButton";
import ClickeableText from "../../components/buttons/ClickeableText";

import { signInWithPassword } from "../../helpers/supabase/authentication";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    await signInWithPassword(setLoading, form);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full items-center justify-center p-5">
          <Text className="text-3xl font-publicBlack text-primary text-center">
            Do you already{" "}
            <Text className="text-secondary">have an account</Text> with us?
          </Text>

          <Text className="text-md mt-5 font-publicMedium text-primary text-center">
            Then go ahead and
            <Text className="text-secondary"> log in</Text> below!
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
            containerStyles="mt-14 w-full"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
            }}
            containerStyles="mt-8 w-full"
          />

          <CustomButton
            title={"Sign In"}
            handlePress={submit}
            containerStyles={"mt-10 w-full"}
            isLoading={loading}
          />
          <View className="w-full text-center items-center justify-center mt-5">
            <Text className="font-publicRegular">
              Dont have an account yet?
            </Text>
            <Text className="mt-2 font-publicRegular">
              <ClickeableText
                title="Create one"
                handlePress={() => router.push("sign-up")}
              />{" "}
              today!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
