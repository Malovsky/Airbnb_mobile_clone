import axios from "axios";
import { useEffect, useState } from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Stars from "../components/Stars";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const { width } = Dimensions.get("window");

const Room = (props) => {
  const id = props.route.params.id;
  // test -> https://express-airbnb-api.herokuapp.com/rooms/58ff73cc1765a9979391c532

  const [room, setRoom] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        setRoom(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          console.log("On passe à la suite");
          //Récupérer les coordonnées GPS
          const location = await Location.getCurrentPositionAsync();

          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setIsLoading(false);
        } else {
          alert("Permission Refusée !");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
    getPermission();
  }, [id]);

  console.log(room);
  return isLoading ? (
    <Text>Loading</Text>
  ) : (
    <View style={styles.container_room_all}>
      <View style={styles.room_image_container}>
        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop
          showPagination
          data={room.photos}
          renderItem={({ item }) => (
            <ImageBackground
              style={styles.room_imgs_rbnb}
              source={{ uri: item.url }}
              resizeMode="cover"
            >
              <Text style={styles.card_price_rbnb}>{room.price} €</Text>
            </ImageBackground>
          )}
        />
      </View>

      <View style={styles.room_details_container}>
        <View style={styles.room_details_rbnb}>
          <View style={styles.room_details_title_container_rbnb}>
            <Text
              style={styles.room_details_title_rbnb}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {room.title}
            </Text>

            <View style={styles.room_details_rating_rbnb}>
              <Stars rating={room.ratingValue}></Stars>
              <Text style={styles.room_details_reviews_rbnb}>
                {room.reviews} reviews
              </Text>
            </View>
          </View>

          <View style={styles.room_profile_picture_container_rbnb}>
            <Image
              style={styles.room_profile_picture_rbnb}
              source={{ uri: room.user.account.photo.url }}
              resizeMode="cover"
            />
          </View>
        </View>
        <Text numberOfLines={4} ellipsizeMode="tail">
          {room.description}
        </Text>
      </View>
      <View style={styles.room_map_container}>
        <MapView
          style={{ height: "100%", width: "100%" }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: room.location[1],
            longitude: room.location[0],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation={true}
        >
          <MapView.Marker
            coordinate={{
              latitude: room.location[1],
              longitude: room.location[0],
            }}
          />
          {/* {coords.map((item, index) => {
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            />
          );
        })} */}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container_room_all: { flex: 1 },

  room_image_container: {
    flex: 3,
  },
  room_imgs_rbnb: {
    width,
    resizeMode: "cover",
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
  room_details_container: {
    flex: 2,
    backgroundColor: "white",

    padding: 10,
  },
  room_details_rating_rbnb: {
    flexDirection: "row",
  },
  room_details_title_container_rbnb: {
    flex: 4,
  },
  room_details_rbnb: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  room_details_title_rbnb: {
    fontSize: 20,
    marginBottom: 20,
  },
  room_details_reviews_rbnb: {
    color: "gray",
    marginLeft: 5,
  },
  room_profile_picture_container_rbnb: {
    flex: 1,
    alignItems: "center",
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  room_profile_picture_rbnb: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  room_map_container: {
    flex: 3,

    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "green",
  },
});

export default Room;
