import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

const ReviewStar = ({ ratingValue }) => {
  const reviewTab = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= ratingValue) {
      reviewTab.push(
        <Ionicons name="star-sharp" size={24} color="#FFB100" key={i} />
      );
    } else {
      reviewTab.push(
        <Ionicons name="star-sharp" size={24} color="#E0DBCE" key={i} />
      );
    }
  }
  return reviewTab;
  // <View>
  //   <Text>{reviewTab}</Text>
  // </View>
};

export default ReviewStar;
