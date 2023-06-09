import { Image, View, StyleSheet } from "react-native";

// IMPORT IMAGE
import logo from "../assets/logo.png";

// IMPORT STYLE
import stylesLogo from "../styles/logo";

const LogoAirBnB = () => {
  return (
    <View style={stylesLogo.logoBlock}>
      <Image source={logo} style={stylesLogo.logo} />
    </View>
  );
};

export default LogoAirBnB;
