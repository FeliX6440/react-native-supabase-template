import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { FontAwesome } from "react-native-vector-icons";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  containerStyles,
  ...props
}) => {
  const [showPassword, setsSowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${containerStyles}`}>
      <View className="w-full items-start justify-center h-14 rounded-xl relative">
        <TextInput
          placeholder={title + "..."}
          className="text-md font-publicRegular items-center justify-start text-start w-full h-full border border-1 border-secondary focus:border-highlight p-3 rounded-xl"
          placeholderTextColor="#E3E3E4"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        <Text className="text-base text-secondary font-publicRegular absolute top-[-13px] left-4 bg-white px-1">
          {title}
        </Text>
        {title === "Password" && (
          <TouchableOpacity
            className="absolute top-[8px] right-3 p-[10px] bg-primary rounded-md"
            onPress={() => {
              setsSowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <FontAwesome name="eye" color="white" />
            ) : (
              <FontAwesome name="eye-slash" color="white" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
