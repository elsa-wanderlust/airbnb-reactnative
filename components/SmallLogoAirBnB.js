import { Image, View, Text } from "react-native";

// IMPORT IMAGE
import logo from "../assets/logo.png";

// IMPORT STYLE
import stylesLogo from "../styles/logo";

const SmallLogoAirBnB = () => {
  return <Image source={logo} style={stylesLogo.smallLogo} />;
};

export default SmallLogoAirBnB;
