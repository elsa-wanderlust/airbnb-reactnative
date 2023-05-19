import { View, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";

const AroundMeScreen = ({ navigation }) => {
  const [refusal, setRefusal] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userCoordinate, setUserCoordinate] = useState({
    // by default (if refusal from the user), it will be Paris
    latitude: 48.856614,
    longitude: 2.3522219,
  });
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    // GET AUTHORISATION AND LOCATION FROM USER
    const getUserPermissionAndCoordinate = async () => {
      // get authorization
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);

      let query = "";
      if (status === "granted") {
        // get location if authorized
        const { coords } = await Location.getCurrentPositionAsync();
        console.log(coords);
        setUserCoordinate({
          latitude: coords.latitude,
          longitude: coords.latitude,
        });
        query = `?latitude=${coords.latitude}&longitude=${coords.longitude}`;
      } else {
        alert("request to use location has been denied");
      }

      // GET ROOMS, TAKING INTO ACCOUNT USER'S COORDINATES, IF PROVIDED
      try {
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around${query}`
        );
        setOffers(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        alert("we weren't able to load the offers around you");
      }
    };
    getUserPermissionAndCoordinate();
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <MapView
          style={style.map}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsUserLocation
        >
          {offers.map((offer) => {
            return (
              <Marker
                key={offer._id}
                coordinate={{
                  latitude: offer.location[1],
                  longitude: offer.location[0],
                }}
                onPress={() => {
                  navigation.navigate("offerDetailsMap", {
                    offerId: offer._id,
                  });
                }}
              />
            );
          })}
        </MapView>
      )}
    </View>
  );
};

export default AroundMeScreen;

const style = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});
