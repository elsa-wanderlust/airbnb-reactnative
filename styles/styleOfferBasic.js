import { StyleSheet } from "react-native";

const stylesOfferBasic = StyleSheet.create({
  anOffer: {
    height: 400,
    paddingVertical: 10,
    // backgroundColor: "pink",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  offerTitle: {
    fontSize: 12,
  },
  offerPictureBlock: {
    height: "70%",
    width: "100%",
    position: "relative",
  },
  offerPicture: {
    height: "100%",
    width: "100%",
  },
  offerPrice: {
    backgroundColor: "black",
    color: "white",
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  avatar: {
    height: 30,
    width: 30,
  },
});

export default stylesOfferBasic;
