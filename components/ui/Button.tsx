import { Colors } from "@/theme/colors";
import React from "react";
import {
  ColorValue,
  TouchableOpacity as RNButton,
  Text,
  TouchableOpacityProps,
  View,
} from "react-native";

interface RNButtonProps extends TouchableOpacityProps {
  active?: boolean;
  title: string;
  color: ColorValue;
  textColor: ColorValue;
  iconLeft?: React.ReactNode;
  paddingVertical?: number;
  paddingHorizontal?: number;
  borderColor?: ColorValue;
  borderWidth?: number;
}

type ButtonProps = Omit<RNButtonProps, "color" | "textColor">;

const Button = ({
  title,
  color,
  textColor,
  iconLeft,
  ...otherProps
}: RNButtonProps) => {
  return (
    <RNButton
      {...otherProps}
      activeOpacity={0.7}
      style={{
        backgroundColor: color,
        borderRadius: 999,
        paddingVertical: otherProps.paddingVertical || 10,
        paddingHorizontal: otherProps.paddingHorizontal || 15,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {iconLeft && iconLeft}
        <Text
          style={{
            color: textColor,
          }}
        >
          {title}
        </Text>
      </View>
    </RNButton>
  );
};

const PrimaryButton = ({ active, ...otherProps }: ButtonProps) => {
  return (
    <Button
      {...otherProps}
      color={active ? Colors.ACTIVE : Colors.PRIMARY}
      textColor="#fff"
    />
  );
};

const SecondaryButton = ({ active, ...otherProps }: ButtonProps) => {
  return (
    <Button
      {...otherProps}
      color={active ? Colors.ACTIVE : Colors.SECONDARY}
      textColor="#fff"
    />
  );
};

Button.Primary = PrimaryButton;
Button.Secondary = SecondaryButton;

export default Button;
