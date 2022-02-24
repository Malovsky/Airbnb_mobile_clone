import { FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";

const Stars = ({ rating }) => {
  const tabStars = [];

  for (let i = 0; i < 5; i++) {
    i < rating
      ? tabStars.push(
          <>
            <FontAwesome key={i} name="star" size={18} color="#FFB100" />
            <Text> </Text>
          </>
        )
      : tabStars.push(
          <>
            <FontAwesome key={i} name="star" size={18} color="grey" />
            <Text> </Text>
          </>
        );
  }

  return tabStars;
};
export default Stars;
