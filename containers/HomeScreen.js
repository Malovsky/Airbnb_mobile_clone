import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View style={styles.card_rbnb}>
              <View style={styles.card_img_container_rbnb}>
                <ImageBackground
                  style={styles.card_img_rbnb}
                  source={item.photos[0]}
                  // source={{ uri: `${item.photos[0]}` }}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.card_details_rbnb}>
                <View>
                  <Text style={styles.card_details_title_rbnb}>
                    {item.title}
                  </Text>
                  <Text>⭐️⭐️⭐️⭐️</Text>
                </View>

                <View style={styles.card_profile_picture_rbnb}></View>
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
  },
  card_img_container_rbnb: {
    flex: 2,
  },
  card_img_rbnb: {
    flex: 1,
  },
  card_details_rbnb: {
    flexDirection: "row",
    flex: 1,
  },
  card_details_title_rbnb: {
    flex: 3,
    fontSize: 15,
    fontWeight: "bold",
  },
  card_profile_picture_rbnb: {
    backgroundColor: "red",
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
  },
});
