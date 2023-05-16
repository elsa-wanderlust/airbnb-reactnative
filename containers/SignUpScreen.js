import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  return (
    <View>
      <View>
        <TextInput placeholder="email" />
        <TextInput placeholder="username" />
        <TextInput placeholder="describe yourself in a few words" />
        <TextInput placeholder="password" secureTextEntry={true} />
        <TextInput placeholder="confirm password" secureTextEntry={true} />
        <Button
          title="Sign up"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
