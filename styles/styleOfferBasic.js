import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const stylesOfferBasic = StyleSheet.create({
  allOffersPage: {
    paddingTop: Constants.statusBarHeight + 10,
    flex: 1,
    backgroundColor: "white",
  },
  allOffers: {
    paddingHorizontal: 10,
  },
  anOffer: {
    height: 300,
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  // ------- IMAGE and PRICE------
  offerPictureBlock: {
    height: "70%",
    width: "100%",
    position: "relative",
  },
  offerPicture: {
    height: "100%",
    width: "100%",
  },
  offerPriceBlock: {
    backgroundColor: "black",
    width: 110,
    height: 40,
    position: "absolute",
    bottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  offerPrice: {
    color: "white",
    fontSize: 18,
  },
  // ------- OFFER INFO------
  offerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  offerDetails: {
    width: "75%",
    alignItems: "stretch",
    gap: 15,
  },
  offerTitle: {
    fontSize: 18,
    marginTop: 10,
  },
  ratingSystem: {
    flexDirection: "row",
    alignItems: "center",
  },
  review: {
    marginLeft: 10,
    color: "#D8D8D8",
  },
  avatar: {
    height: 80,
    width: 80,
    resizeMode: "contain",
    borderRadius: 40,
  },
});

export default stylesOfferBasic;
