import { Image, View, StyleSheet } from "react-native";

// IMPORT IMAGE
import logo from "../assets/logo.png";

// IMPORT STYLE
import stylesLogo from "../styles/logo";

const SmallLogoAirBnB = () => {
  return (
    <View style={stylesLogo.smallLogoBlock}>
      <Image source={logo} style={stylesLogo.smallLogo} />
    </View>
  );
};

export default SmallLogoAirBnB;
