import { Text } from "react-native";

const ClickeableText = ({ title, handlePress, isLoading, containerStyles }) => {
  return (
    <Text
      onPress={() => {
        handlePress();
      }}
      disabled={isLoading}
      className={`text-highlight font-publicMedium ${containerStyles}`}
    >
      {title}
    </Text>
  );
};

export default ClickeableText;
