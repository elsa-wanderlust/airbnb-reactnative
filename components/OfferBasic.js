import { View, Text, Image, TouchableOpacity } from "react-native";
// IMPORT STYLES
import stylesOfferBasic from "../styles/styleOfferBasic";

// IMPORT FUNCTION
import ReviewStar from "../utils/reviewsStar";

const OfferBasic = ({ item, navigation }) => {
  const { _id, title, price, ratingValue, reviews, photos, user } = item;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("offerDetails", { offerId: _id })}
      style={stylesOfferBasic.anOffer}
    >
      {/* ------- IMAGE and PRICE------ */}
      <View style={stylesOfferBasic.offerPictureBlock}>
        <Image
          source={{
            uri: photos[0].url,
          }}
          style={stylesOfferBasic.offerPicture}
        />
        <Text style={stylesOfferBasic.offerPrice}>{price} €</Text>
      </View>
      {/* ------- OFFER INFO ------ */}
      <View style={stylesOfferBasic.offerInfo}>
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
    </TouchableOpacity>
  );
};
export default OfferBasic;
