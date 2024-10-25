import { useState, useRef } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "../../components/buttons/CustomButton";

import { supabase } from "../../helpers/supabase/supabase";
import { getNewCode, verifyCode } from "../../helpers/supabase/authentication";

const VerificationCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputs = Array.from({ length: 6 }, () => useRef(null));

  const { email } = useLocalSearchParams();

  const handleChangeText = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value) {
      if (index < 5) {
        inputs[index + 1].current.focus();
      }
    } else if (!value && index > 0) {
      inputs[index - 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !code[index]) {
      inputs[index - 1].current.focus();
    }
  };

  const handleSubmit = async () => {
    await verifyCode(setLoading, code, email);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full items-center justify-center p-5">
          <Text className="text-3xl font-publicBlack text-primary text-center">
            Check out your <Text className="text-secondary">email inbox</Text>{" "}
            for an email from us
          </Text>
          <Text className="text-md mt-5 font-publicMedium text-primary text-center">
            Has <Text className="text-secondary">no email</Text> reached you?
          </Text>

          <View className=" mt-5  bg-secondary rounded-md text-center">
            <Text
              className="text-md text-white font-publicMedium p-1"
              onPress={async () => {
                await getNewCode(setLoading, email);
              }}
            >
              Request a new code!
            </Text>
          </View>

          <View className="flex-row justify-center mt-8 gap-2">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputs[index]}
                value={digit}
                onChangeText={(value) => handleChangeText(index, value)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                className="border-2 font-publicMedium rounded-md text-primary border-tertiary w-10 h-14 text-center text-3xl"
              />
            ))}
          </View>

          <CustomButton
            title={"Verify Account"}
            handlePress={handleSubmit}
            containerStyles={"mt-10 w-full"}
            isLoading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerificationCode;
