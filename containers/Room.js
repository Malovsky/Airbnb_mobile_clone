import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const Room = (props) => {
  const id = props.route.params.id;

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

    fetchData();
  }, [id]);
  return isLoading ? (
    <Text>Loading</Text>
  ) : (
    <View style={styles.container_room_all}>
      <View style={styles.room_image_container}></View>
      <View style={styles.room_details_container}></View>
      <View style={styles.room_map_container}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container_room_all: { flex: 1 },

  room_image_container: {
    flex: 2,
    backgroundColor: "blue",
  },
  room_details_container: {
    flex: 1,
    backgroundColor: "white",
  },
  room_map_container: {
    flex: 2,
    backgroundColor: "red",
  },
});

export default Room;
