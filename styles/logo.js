import { StyleSheet } from "react-native";

const stylesLogo = StyleSheet.create({
  // ------ BIG LOGO --------
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
  // ------ SMALL LOGO --------
  smallLogoBlock: {
    height: 50,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
    // marginBottom: 10,
    // borderBottomColor: "grey",
    // borderBottomWidth: 0.5,
  },
  smallLogo: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
});

export default stylesLogo;
