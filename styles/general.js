import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flexCenterHor: {
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    // backgroundColor: "red",
  },
  flexAllCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pageContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 30,
    // alignItems: "center",
    // justifyContent: "space-around",
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
