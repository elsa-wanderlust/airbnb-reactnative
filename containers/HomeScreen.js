import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, ScrollView, FlatList } from "react-native";
import axios from "axios"; // to be able to send request
import { useState, useEffect } from "react"; // to declare states
import OfferBasic from "../components/OfferBasic";
import styles from "../styles/general";

// IMPORT COMPONENT(S)

export default function HomeScreen() {
  // DECLARE STATES
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");

  // DECLARE VARIABLES FROM IMPORT
  const navigation = useNavigation();

  // DECLARE USE EFFECT
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
    <View style={styles.pageContainer}>
      <Text>Welcome home! this is where the logo should go instead</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <OfferBasic item={item} navigation={navigation} />;
        }}
      />
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}
