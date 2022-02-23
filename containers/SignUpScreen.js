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
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  const createAccount = async () => {
    try {
      if ((email, username, password, confirmPassword, description)) {
        if (password === confirmPassword) {
          setError("");
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              password: password,
              description: description,
            }
          );
          console.log(response.data);
          setToken(response.data.token);
        } else {
          setError("Les 2 MDP ne sont pas identiques !");
        }
      } else {
        setError("Remplir tous les champs");
      }
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);

      if (
        error.response.data.error === "This username already has an account." ||
        error.response.data.error === "This email already has an account."
      ) {
        setError(error.response.data.error);
      }
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
        <Text style={styles.title}>Sign up</Text>
        <View style={styles.signup_form}>
          <TextInput
            style={styles.input_signup}
            onChangeText={(text) => setEmail(text)}
            placeholder="email"
          />
          <TextInput
            style={styles.input_signup}
            onChangeText={(text) => setUsername(text)}
            placeholder="username"
          />
          <TextInput
            multiline={true}
            onChangeText={(text) => setDescription(text)}
            numberOfLines={4}
            style={styles.textarea_signup}
            placeholder="Describe yourself in a few words..."
          />
          <TextInput
            onChangeText={(text) => setPassword(text)}
            style={styles.input_signup}
            placeholder="password"
            secureTextEntry={true}
          />
          <TextInput
            onChangeText={(text) => setConfirmPassword(text)}
            style={styles.input_signup}
            placeholder="confirm password"
            secureTextEntry={true}
          />
        </View>

        <Text style={styles.err_signup}>{error}</Text>
        <TouchableOpacity style={styles.btn} onPress={createAccount}>
          <Text>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.link_to_signin}>
            Already have an account ? Sign in
          </Text>
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
    width: 80,
    height: 80,
  },

  title: {
    marginTop: 5,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#717171",
  },

  signup_form: {
    marginTop: 20,
    marginBottom: 20,
  },

  input_signup: {
    borderBottomColor: "#D96466",
    borderBottomWidth: 1,
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 30,
    paddingBottom: 5,
  },

  textarea_signup: {
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

  err_signup: {
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

  link_to_signin: {
    color: "#717171",
    alignSelf: "center",
  },
});
