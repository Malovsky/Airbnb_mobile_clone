import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function AroundMe() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [latUser, setLatUser] = useState();
  const [lngUser, setLngUser] = useState();

  useEffect(() => {
    const getLocationAndData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          setLatUser(location.coords.latitude);
          setLngUser(location.coords.longitude);
          // setIsLoading(false);
        }
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        alert("An error occurred");
      }
    };

    getLocationAndData();
  }, []);

  return isLoading ? (
    <Text>Loading ...</Text>
  ) : (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 48.856614,
        longitude: 2.3522219,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation={true}
    >
      {data.map((item, index) => {
        console.log(item);
        return (
          <MapView.Marker
            key={index}
            onPress={() =>
              navigation.navigate("Room", {
                id: item._id,
              })
            }
            coordinate={{
              latitude: item.location[1],
              longitude: item.location[0],
            }}
          ></MapView.Marker>
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
