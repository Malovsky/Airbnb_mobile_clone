import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import Stars from "../components/Stars";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <Text>Loading ...</Text>
  ) : (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View style={styles.card_rbnb}>
              <TouchableOpacity
                style={styles.card_img_container_rbnb}
                onPress={() => {
                  navigation.navigate("Room", {
                    id: item._id,
                  });
                }}
              >
                <ImageBackground
                  style={styles.card_img_rbnb}
                  source={{ uri: item.photos[0].url }}
                  resizeMode="cover"
                >
                  <Text style={styles.card_price_rbnb}>{item.price} €</Text>
                </ImageBackground>
              </TouchableOpacity>
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
                    source={{ uri: item.user.account.photo.url }}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card_rbnb: {
    height: 300,
    borderBottomColor: "#ECECEC",
    borderBottomWidth: 2,
    margin: 10,
    paddingBottom: 5,
  },
  card_img_container_rbnb: {
    flex: 3,
    paddingTop: 5,
    paddingBottom: 5,
  },
  card_img_rbnb: {
    flex: 1,
    justifyContent: "flex-end",
  },
  card_price_rbnb: {
    color: "white",
    fontSize: 20,
    padding: 10,
    width: "25%",
    backgroundColor: "black",
    textAlign: "center",
    marginBottom: 20,
  },
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
