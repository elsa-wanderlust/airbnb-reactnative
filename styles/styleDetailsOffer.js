import { StyleSheet } from "react-native";

const stylesDetailsOffer = StyleSheet.create({
  // ------ PICTURE--------
  offerPictureBlock: {
    height: "35%",
    width: "100%",
    position: "relative",
  },
  offerPicture: {
    height: "100%",
    width: "100%",
  },
  // ------ OFFER INFO --------
  allOfferInfo: {
    paddingHorizontal: 10,
  },
  offerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  changeLineNberBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  changeLineNber: {
    color: "grey",
  },
  // ------ MAP--------
  map: {
    marginTop: 10,
    height: 250,
    borderColor: "blue",
    borderWidth: 2,
  },
});

export default stylesDetailsOffer;
