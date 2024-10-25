import { View, Text } from "react-native";
import React from "react";
import { logOut } from "../../helpers/supabase/authentication";

const Home = () => {
  return (
    <View className="h-full items-center justify-center">
      <Text
        onPress={async () => {
          await logOut();
        }}
      >
        Home
      </Text>
    </View>
  );
};

export default Home;
