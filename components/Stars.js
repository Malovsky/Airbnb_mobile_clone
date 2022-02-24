import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const Stars = ({ rating }) => {
  const tabStars = [];

  for (let i = 0; i < 5; i++) {
    tabStars.push(
      i < rating ? (
        <FontAwesome
          key={i}
          style={styles.spacing_stars}
          name="star"
          size={18}
          color="#FFB100"
        />
      ) : (
        <FontAwesome
          key={i}
          style={styles.spacing_stars}
          name="star"
          size={18}
          color="grey"
        />
      )
    );
  }

  return tabStars;
};

const styles = StyleSheet.create({
  spacing_stars: {
    marginRight: 3,
  },
});
export default Stars;
