import { TouchableOpacity, Text, View } from "react-native";

const CustomButton = ({ title, handlePress, containerStyles, isLoading }) => {
  return (
    <TouchableOpacity
      className={`bg-primary rounded-xl p-4 justify-center items-center ${containerStyles} ${
        isLoading && "opacity-50"
      }`}
      onPress={() => {
        handlePress();
      }}
      activeOpacity={0.6}
      disabled={isLoading}
    >
      {isLoading ? (
        <Text className="text-center text-tertiary font-publicBold">
          {"..."}
        </Text>
      ) : (
        <Text className="text-center text-tertiary font-publicBold">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
