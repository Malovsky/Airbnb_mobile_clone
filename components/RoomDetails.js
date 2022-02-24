import { Text, View, Image, StyleSheet } from "react-native";
import Stars from "./Stars";

// TODO
const RoomDetails = (item) => {
  console.log(item);
  return (
    <View style={styles.card_details_rbnb}>
      <View style={styles.card_details_title_container_rbnb}>
        <Text
          style={styles.card_details_title_rbnb}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <View style={styles.card_details_rating_rbnb}>
          <Stars rating={item.ratingValue}></Stars>
          <Text style={styles.card_details_reviews_rbnb}>
            {item.reviews} reviews
          </Text>
        </View>
      </View>

      <View style={styles.card_profile_picture_container_rbnb}>
        <Image
          style={styles.card_profile_picture_rbnb}
          //   source={{ uri: item.user.account.photo.url }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card_details_rbnb: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  card_details_title_container_rbnb: {
    flex: 4,
  },
  card_details_title_rbnb: {
    fontSize: 20,
    marginBottom: 20,
  },
  card_details_rating_rbnb: {
    flexDirection: "row",
  },
  card_details_reviews_rbnb: {
    color: "gray",
    marginLeft: 5,
  },
  card_profile_picture_container_rbnb: {
    flex: 1,
    alignItems: "center",
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  card_profile_picture_rbnb: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
});

export default RoomDetails;
