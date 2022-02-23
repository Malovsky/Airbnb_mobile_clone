import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import axios from "axios";
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

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const logIn = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      setToken(response.data.token);
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      setError(error.response.data.error);
    }
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.home_logo_container}>
          <Image
            style={styles.home_logo}
            resizeMode="contain"
            source={require("../assets/airbnb_logo.png")}
          />
        </View>
        <Text style={styles.title}>Sign in</Text>
        <View style={styles.signin_form}>
          <TextInput
            style={styles.input_signin}
            onChangeText={(text) => setEmail(text)}
            placeholder="email"
          />
          <TextInput
            style={styles.input_signin}
            onChangeText={(text) => setPassword(text)}
            placeholder="password"
            secureTextEntry={true}
          />
        </View>

        <Text style={styles.err_signin}>{error}</Text>

        <TouchableOpacity style={styles.btn} onPress={logIn}>
          <Text>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.link_to_singup}>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  home_logo_container: {
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
  },

  home_logo: {
    width: 90,
    height: 90,
  },

  title: {
    marginTop: 5,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#717171",
  },

  signin_form: {
    marginTop: 80,
    marginBottom: 80,
  },

  input_signin: {
    borderBottomColor: "#D96466",
    borderBottomWidth: 1,
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 30,
    paddingBottom: 5,
  },

  err_signin: {
    color: "#D96466",
    alignSelf: "center",
  },

  btn: {
    alignSelf: "center",
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 30,
    borderColor: "#D96466",
    margin: 10,
  },

  link_to_singup: {
    color: "#717171",
    alignSelf: "center",
  },
});
