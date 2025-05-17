import { Colors } from "@/theme/colors";
import {
  ColorValue,
  TouchableOpacity as RNButton,
  Text,
  TouchableOpacityProps,
} from "react-native";

interface RNButtonProps extends TouchableOpacityProps {
  active?: boolean;
  title: string;
  color: ColorValue;
  textColor: ColorValue;
}

type ButtonProps = Omit<RNButtonProps, "color" | "textColor">;

const Button = ({ title, color, textColor, ...otherProps }: RNButtonProps) => {
  return (
    <RNButton
      {...otherProps}
      style={{
        backgroundColor: color,
        borderRadius: 20,
        padding: 10,
      }}
    >
      <Text
        style={{
          color: textColor,
        }}
      >
        {title}
      </Text>
    </RNButton>
  );
};

const PrimaryButton = ({ active, title, onPress }: ButtonProps) => {
  return (
    <Button
      title={title}
      color={active ? Colors.ACTIVE : Colors.PRIMARY}
      textColor="#fff"
      onPress={onPress}
    />
  );
};

Button.Primary = PrimaryButton;

export default Button;
