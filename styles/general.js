import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingBottom: 30,
    paddingTop: Constants.statusBarHeight + 10,
  },
  contentContainer: {
    alignItems: "center",
  },
  flexCenterHor: {
    alignItems: "center",
  },
  flexAllCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    // backgroundColor: "red",
  },

  // SIGN IN / SIGN UP
  logoTitle: {
    alignItems: "center",
  },
  allFields: {
    gap: 20,
    marginBottom: 20,
  },
  eachField: {
    height: 50,
    marginBottom: 10,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boxField: {
    borderColor: "#F9585D",
    borderWidth: 1,
    height: 90,
  },
  buttonSignInUp: {
    height: 60,
    width: 180,
    borderRadius: 50,
    borderColor: "#F9585D",
    borderWidth: 3,
    marginTop: 40,
    marginBottom: 20,
  },
  error: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default styles;
