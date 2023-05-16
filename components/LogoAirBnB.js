import logo from "../assets/logo.png";
import { Image, View, StyleSheet } from "react-native";

const LogoAirBnB = () => {
  return (
    <View style={styles.logoBlock}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoBlock: {
    height: 100,
    // backgroundColor: "blue",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    height: "100%",
    // width: "100%",
    resizeMode: "contain",
  },
});

export default LogoAirBnB;
