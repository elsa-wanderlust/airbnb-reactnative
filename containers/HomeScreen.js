import { useNavigation } from "@react-navigation/core";
import { View, FlatList, ActivityIndicator } from "react-native";
import axios from "axios"; // to be able to send request
import { useState, useEffect } from "react"; // to declare states
import OfferBasic from "../components/OfferBasic";
// IMPORT STYLES
import stylesOfferBasic from "../styles/styleOfferBasic";

// IMPORT COMPONENTS
import SmallLogoAirBnB from "../components/SmallLogoAirBnB";

export default function HomeScreen() {
  // DECLARE STATES
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");

  // DECLARE VARIABLES FROM IMPORT
  const navigation = useNavigation();

  // USE EFFECT
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOffers();
  }, []);
  // console.log(data);

  return (
    <View style={stylesOfferBasic.allOffersPage}>
      {isLoading ? (
        <>
          <ActivityIndicator
            size="large"
            color="purple"
            style={{ marginTop: 100 }}
          />
        </>
      ) : (
        <>
          <SmallLogoAirBnB />
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return <OfferBasic item={item} navigation={navigation} />;
            }}
            style={stylesOfferBasic.allOffers}
          />
        </>
      )}
    </View>
  );
}
