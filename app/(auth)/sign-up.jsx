import { useState } from "react";

import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import FormField from "../../components/inputs/FormField";
import CustomButton from "../../components/buttons/CustomButton";
import ClickeableText from "../../components/buttons/ClickeableText";

import { supabase } from "../../helpers/supabase/supabase";
import { signUpWithPassword } from "../../helpers/supabase/authentication";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    signUpWithPassword(setLoading, form);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full items-center justify-center p-5">
          <Text className="text-3xl font-publicBlack text-primary text-center">
            Take Your <Text className="text-secondary">First Step</Text> Towards
            Success with us
          </Text>

          <Text className="text-md mt-5 font-publicMedium text-primary text-center">
            Are
            <Text className="text-secondary"> you</Text> ready to rumble?
          </Text>

          <View className="flex-row w-[100%] mt-14 justify-between">
            <FormField
              title="First Name"
              value={form.firstname}
              handleChangeText={(e) => {
                setForm({ ...form, firstname: e });
              }}
              containerStyles="w-[49%]"
            />
            <FormField
              title="Last Name"
              value={form.lastname}
              handleChangeText={(e) => {
                setForm({ ...form, lastname: e });
              }}
              containerStyles="w-[49%]"
            />
          </View>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
            containerStyles="mt-8 w-full"
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
            <Text className="font-publicRegular">Already have an account?</Text>
            <Text className="mt-2 font-publicRegular">
              <ClickeableText
                title="Sign In"
                handlePress={() => router.push("sign-in")}
              />{" "}
              now!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
