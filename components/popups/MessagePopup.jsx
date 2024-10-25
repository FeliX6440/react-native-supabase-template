import React, { useEffect, useState } from "react";

import { Modal, View, Text, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";

import { registerPopupTrigger } from "./PopupService";

const Popup = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("neutral");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [duration, setDuration] = useState(3000);

  useEffect(() => {
    registerPopupTrigger(({ type, title, text, duration }) => {
      setType(type);
      setTitle(title);
      setText(text);
      setDuration(duration);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, duration);
    });
  }, []);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-successbox";
      case "fail":
        return "bg-failurebox";
      default:
        return "bg-gray-600";
    }
  };

  const getTextStyles = () => {
    switch (type) {
      case "success":
        return "successtext";
      case "fail":
        return "failuretext";
      default:
        return "bg-gray-600";
    }
  };

  const getIconStyles = () => {
    switch (type) {
      case "success":
        return "#3FC2A6";
      case "fail":
        return "#C23F3F";
      default:
        return "bg-gray-600";
    }
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="absolute top-[8%] right-[-2%] w-full items-center">
        <View
          className={`relative w-11/12 max-w-sm rounded-lg px-4 py-3 ${getTypeStyles()}`}
        >
          <Text className={`text-lg font-bold text-${getTextStyles()}`}>
            {title}
          </Text>
          <Text className={`text-sm text-${getTextStyles()} mt-1 mb-3`}>
            {text}
          </Text>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            className={`absolute top-3 right-3 self-end rounded bg-${getTextStyles()}`}
          >
            <Text className={`font-semibold bg-${getTextStyles()}`}>
              <Feather
                name="chevrons-right"
                size={20}
                color={getIconStyles()}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
