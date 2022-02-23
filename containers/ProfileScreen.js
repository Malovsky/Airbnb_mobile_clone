import { useRoute } from "@react-navigation/core";
import { Text, View, Button } from "react-native";

export default function ProfileScreen({ setToken }) {
  const { params } = useRoute();
  return (
    <View>
      <Text>user id : todo</Text>
      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
