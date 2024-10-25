import { ScrollView, View, Image, Text } from "react-native";
import { Redirect, router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import images from "./const/images";

import CustomButton from "../components/buttons/CustomButton";
import ClickeableText from "../components/buttons/ClickeableText";

import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn, user } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
  console.log(user);
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full p-4">
          <Image
            source={images.brain}
            className="w-[100%] h-[200px]"
            resizeMode="contain"
          />
          <View className="w-full items-center p-5">
            <Text className="text-3xl font-publicBlack text-center">
              Retake control over yourself with Life
              <Text className="text-secondary">Board</Text>
            </Text>

            <Text className="text-sm text-center font-publicMedium mt-4">
              Turn your life into a <Text className="text-highlight">game</Text>
              —level up, compete, and achieve your biggest goals.
            </Text>

            <CustomButton
              title={"Sign Up Now!"}
              handlePress={() => router.push("sign-up")}
              containerStyles="mt-6 w-[100%]"
              isLoading={false}
            />

            <View className="items-center justify-center mt-6">
              <Text className="font-publicMedium">
                Or continue to{" "}
                <ClickeableText
                  title={"Log In"}
                  handlePress={() => router.push("sign-in")}
                />
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
