import { useRoute } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function ProfileScreen({ setToken }) {
  const { params } = useRoute();
  return (
    <View style={styles.profile_container}>
      <View style={styles.photos_container}>
        <View style={styles.profile_picture_container}>
          <Image
            style={styles.profile_picture}
            resizeMode="cover"
            source={require("../assets/person-outline.png")}
          ></Image>
        </View>

        <View style={styles.photos_picture_container}>
          <Image
            style={styles.icon_photos}
            source={require("../assets/image-outline.png")}
          ></Image>
          <Image
            style={styles.icon_photos}
            source={require("../assets/camera-outline.png")}
          ></Image>
        </View>
      </View>

      <TextInput
        style={styles.input_profile}
        // onChangeText={(text) => setUsername(text)}
        placeholder="email"
      />
      <TextInput
        style={styles.input_profile}
        // onChangeText={(text) => setUsername(text)}
        placeholder="username"
      />
      <TextInput
        multiline={true}
        // onChangeText={(text) => setDescription(text)}
        numberOfLines={4}
        style={styles.textarea_profile}
        placeholder="Describe yourself in a few words..."
      />
      <TouchableOpacity style={styles.btn_profile}>
        <Text style={styles.txt_btn}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn_profile, styles.logout_background]}>
        <Text
          style={styles.txt_btn}
          onPress={() => {
            setToken(null);
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profile_container: {
    padding: 20,
  },
  photos_container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
  profile_picture_container: {
    alignItems: "center",
    height: 150,
    width: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#D96466",
  },
  profile_picture: {
    height: 130,
    width: 130,
  },
  photos_picture_container: {
    justifyContent: "center",
  },
  icon_photos: {
    height: 30,
    width: 30,
    marginBottom: 20,
    marginLeft: 30,
  },
  input_profile: {
    borderBottomColor: "#D96466",
    borderBottomWidth: 1,
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 30,
    paddingBottom: 5,
  },
  textarea_profile: {
    height: 100,
    borderColor: "#D96466",
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 30,
    padding: 10,
  },
  btn_profile: {
    alignSelf: "center",
    margin: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 2,
    borderColor: "#D96466",
    borderRadius: 25,
  },
  logout_background: {
    backgroundColor: "#E7E7E7",
  },
  txt_btn: {
    fontSize: 20,
  },
});
