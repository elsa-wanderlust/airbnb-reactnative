import { View, Text, Image, Button } from "react-native";
// import "../styles/styleOfferBasic";
import stylesOfferBasic from "../styles/styleOfferBasic";

const OfferBasic = ({ item, navigation }) => {
  const { title, price, ratingValue, reviews, photos, user } = item;
  return (
    <View style={stylesOfferBasic.anOffer}>
      <View style={stylesOfferBasic.offerPictureBlock}>
        <Image
          source={{
            uri: photos[0].url,
          }}
          style={stylesOfferBasic.offerPicture}
        />
        <Text style={stylesOfferBasic.offerPrice}>{price} €</Text>
      </View>
      <Text style={stylesOfferBasic.title}>{title}</Text>
      <Text>{ratingValue}</Text>
      <Text>{reviews}</Text>
      <Image
        source={{
          uri: user.account.photo.url,
        }}
        style={stylesOfferBasic.avatar}
      />
      <Button
        title="Press here"
        onPress={() => {
          console.log("pressed !");
        }}
      />
    </View>
  );
};
export default OfferBasic;
