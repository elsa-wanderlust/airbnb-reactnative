import { View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
// IMPORT STYLES
import styles from "../styles/general";
import stylesOfferBasic from "../styles/styleOfferBasic";

const DetailedOffer = () => {
  const route = useRoute();
  //   console.log(route.params.offerId);
  // DECLARE STATES
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");

  //   USE EFFECT
  useEffect(() => {
    // console.log("im here1");
    const fetchOfferDetails = async () => {
      try {
        // console.log("im here2");
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${route.params.offerId}`
        );
        setData(response.data);
        setIsLoading(false);
        // console.log(response.data);
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
  console.log("user details", user);
  return (
    <View style={styles.pageContainer}>
      <View style={stylesOfferBasic.offerPictureBlock}>
        {/* <Image
          source={{
            uri: photos[0].url,
          }}
          style={stylesOfferBasic.offerPicture}
        /> */}
        <Text style={stylesOfferBasic.offerPrice}>{price} €</Text>
      </View>
      <Text style={stylesOfferBasic.title}>{title}</Text>
      <Text>{ratingValue}</Text>
      <Text>{reviews} reviews</Text>
      {/* <Image
        source={{
          uri: user.account.photo.url,
        }}
        style={stylesOfferBasic.avatar} */}
      {/* /> */}
      <Text>{description}</Text>
      <View>
        <Text>map</Text>
      </View>
    </View>
  );
};

export default DetailedOffer;
