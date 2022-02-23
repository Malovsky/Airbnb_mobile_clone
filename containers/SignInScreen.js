import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
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
      console.log(response.data);
      setToken(response.data.token);
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
    }
  };

  return (
    <View>
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

        <TouchableOpacity onPress={logIn}>
          <Text>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.link_to_singup}>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginTop: 15,
    alignSelf: "center",
    fontSize: 25,
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

  link_to_singup: {
    color: "#717171",
    alignSelf: "center",
  },
});
