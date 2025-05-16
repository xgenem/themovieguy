import { View } from "react-native";

const Space = ({ size = 10 }: { size?: number }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default Space;
