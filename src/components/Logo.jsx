import { Image, useMantineColorScheme } from "@mantine/core";
import logo from "src/assets/logo.png";

const Logo = (props) => {
  const { colorScheme } = useMantineColorScheme();

  return <Image src={logo} styles={{ root: { filter: colorScheme === "dark" ? "grayscale() invert()" : null } }} {...props} />;
};

export default Logo;
