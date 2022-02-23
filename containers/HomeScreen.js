import { useNavigation } from "@react-navigation/core";
import { Text, View } from "react-native";
import { useState } from "react";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  const fetchData = async () => {};

  return (
    <View>
      <Text>Welcome home!</Text>
    </View>
  );
}
