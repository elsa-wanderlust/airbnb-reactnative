import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import { Octicons } from "@expo/vector-icons";
// IMPORT STYLES
import styles from "../styles/general";
import stylesOfferBasic from "../styles/styleOfferBasic";
// IMPORT FUNCTION
import ReviewStar from "../utils/reviewsStar";

// IMPORT COMPONENTS
import SmallLogoAirBnB from "../components/SmallLogoAirBnB";
import stylesDetailsOffer from "../styles/styleDetailsOffer";

const DetailedOffer = () => {
  const route = useRoute();
  //   console.log(route.params.offerId);
  // DECLARE STATES
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [descriptionLines, setDescriptionLines] = useState(3);
  const [fullDescription, setFullDescription] = useState(false);

  //   USE EFFECT
  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${route.params.offerId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOfferDetails();
  }, []);
  const {
    description,
    location,
    photos,
    price,
    ratingValue,
    reviews,
    title,
    user,
  } = data;
  // console.log("user details", user);
  console.log(location);
  return (
    <View style={stylesOfferBasic.allOffersPage}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="purple"
          style={{ marginTop: 100 }}
        />
      ) : (
        <>
          {/* <SmallLogoAirBnB /> */}
          {/* ----- PICTURE and PRICE --------*/}
          <View style={stylesDetailsOffer.offerPictureBlock}>
            <Image
              source={{
                uri: photos[0].url,
              }}
              style={stylesOfferBasic.offerPicture}
            />
            <Text style={stylesOfferBasic.offerPrice}>{price} €</Text>
          </View>
          {/* ----- OFFER INFO --------*/}
          <View style={stylesDetailsOffer.allOfferInfo}>
            <View style={stylesDetailsOffer.offerInfo}>
              <View style={stylesOfferBasic.offerDetails}>
                <Text style={stylesOfferBasic.offerTitle} numberOfLines={1}>
                  {title}
                </Text>
                <View style={stylesOfferBasic.ratingSystem}>
                  <ReviewStar ratingValue={ratingValue} />
                  <Text style={stylesOfferBasic.review}>{reviews} reviews</Text>
                </View>
              </View>
              <Image
                source={{
                  uri: user.account.photo.url,
                }}
                style={stylesOfferBasic.avatar}
              />
            </View>
            <Text numberOfLines={fullDescription ? null : 3}>
              {description}
            </Text>
            {/* ------ description : display more or less -------*/}
            <TouchableHighlight
              style={stylesDetailsOffer.changeLineNberBlock}
              onPress={() => {
                setFullDescription(!fullDescription);
              }}
            >
              {!fullDescription ? (
                <>
                  <Text style={stylesDetailsOffer.changeLineNber}>
                    Show more
                  </Text>
                  <Octicons name="triangle-down" size={24} color="grey" />
                </>
              ) : (
                <>
                  <Text style={stylesDetailsOffer.changeLineNber}>
                    Show less
                  </Text>
                  <Octicons name="triangle-up" size={24} color="grey" />
                </>
              )}
            </TouchableHighlight>
          </View>
          {/* ----- MAP --------*/}
          <MapView
            style={stylesDetailsOffer.map}
            initialRegion={{
              latitude: location[1],
              longitude: location[0],
              // latitude: 48.856614,
              // longitude: 2.3522219,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
          >
            <Marker
              coordinate={{ latitude: location[1], longitude: location[0] }}
            />
          </MapView>
        </>
      )}
    </View>
  );
};

export default DetailedOffer;
