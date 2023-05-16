import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import styles from "../styles/general"; // import styling
import { useState } from "react"; // to declare state
import axios from "axios"; // to be able to send request

// IMPORT COMPONENTS
import LogoAirBnB from "../components/LogoAirBnB";

export default function SignUpScreen({ setToken }) {
  // DECLARE VARIABLES FOR IMPORTS
  const navigation = useNavigation();
  // DECLARE STATES
  const [data, setData] = useState("");
  // const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  // const [description, setDescription] = useState("");
  // const [password, setPassword] = useState("");
  // const [password2, setPassword2] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const [fields, setFields] = useState([
    { name: "email", input: "", message: "" },
    { name: "username", input: "", message: "" },
    { name: "description", input: "", message: "" },
    { name: "password", input: "", message: "" },
    { name: "confirm password", input: "", message: "" },
  ]);

  // DECLARE FUNCTION TO CREATE ALERT IF LOGIN SUCESSFULL
  const loginAlert = () =>
    Alert.alert("Signin", "your account has been created", [
      { text: "OK", onPress: () => setToken(data.token) },
    ]);

  // DECLARE FUNCTION TO HANDLE SUBMIT
  const handleSubmit = async () => {
    for (let i = 0; i < fields.length; i++) {
      // reset the errorMessage to null at submit
      fieldsCopy = [...fields];
      fieldsCopy[i].message = "";
      setFields(fieldsCopy);
      // set error message if a field is empty
      if (fields[i].input === "") {
        fieldsCopy = [...fields];
        fieldsCopy[
          i
        ].message = `the ${fieldsCopy[i].name} field must not be empty`;
        setFields(fieldsCopy);
        // or if the password are not identical
      } else if (fields[3].input !== fields[4].input) {
        fieldsCopy = [...fields];
        fieldsCopy[4].message = `the passwords must be identical`;
        setFields(fieldsCopy);
        return;
      }
    }
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        {
          email: fields[0].input,
          username: fields[1].input,
          description: fields[2].input,
          password: fields[3].input,
        }
      );
      setData(response.data);
      loginAlert();
    } catch (error) {
      console.log(`issue ${error.response.data.error}`);
      if (error.response.data.error === "This email already has an account") {
        fieldsCopy = [...fields];
        fieldsCopy[0].message = `This email already has an account`;
        setFields(fieldsCopy);
      }
      if (
        error.response.data.error === "This username already has an account."
      ) {
        fieldsCopy = [...fields];
        fieldsCopy[1].message = `This username already has an account`;
        setFields(fieldsCopy);
      }
    }
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView>
        {/* ------ LOGO AND PAGE NAME ------*/}
        <View style={styles.logoTitle}>
          <LogoAirBnB />
          <Text style={styles.title}>Sign Up </Text>
        </View>
        {/* ------ FORM ------*/}
        <View style={styles.allFields}>
          <TextInput
            style={styles.eachField}
            placeholder="email"
            onChangeText={(text) => {
              fieldsCopy = [...fields];
              fieldsCopy[0].input = text.toLowerCase();
              setFields(fieldsCopy);
            }}
            value={fields[0].input}
          />
          {fields[0].message ? (
            <Text style={styles.error}>{fields[0].message}</Text>
          ) : (
            ""
          )}
          {/* <Text>error email </Text> */}
          <TextInput
            style={styles.eachField}
            placeholder="username"
            onChangeText={(text) => {
              fieldsCopy = [...fields];
              fieldsCopy[1].input = text;
              setFields(fieldsCopy);
            }}
            value={fields[1].input}
          />
          {fields[1].message ? (
            <Text style={styles.error}>{fields[1].message}</Text>
          ) : (
            ""
          )}
          <TextInput
            style={[styles.eachField, styles.boxField]}
            placeholder="describe yourself in a few words"
            onChangeText={(text) => {
              fieldsCopy = [...fields];
              fieldsCopy[2].input = text;
              setFields(fieldsCopy);
            }}
            value={fields[2].input}
          />
          {fields[2].message ? (
            <Text style={styles.error}>{fields[2].message}</Text>
          ) : (
            ""
          )}
          <TextInput
            style={styles.eachField}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              fieldsCopy = [...fields];
              fieldsCopy[3].input = text;
              setFields(fieldsCopy);
            }}
            value={fields[3].input}
          />
          {fields[3].message ? (
            <Text style={styles.error}>{fields[3].message}</Text>
          ) : (
            ""
          )}
          <TextInput
            style={styles.eachField}
            placeholder="confirm password"
            secureTextEntry={true}
            onChangeText={(text) => {
              fieldsCopy = [...fields];
              fieldsCopy[4].input = text;
              setFields(fieldsCopy);
            }}
            value={fields[4].input}
          />
          {fields[4].message ? (
            <Text style={styles.error}>{fields[4].message}</Text>
          ) : (
            ""
          )}
          <View style={[styles.flexCenterHor]}>
            <TouchableHighlight
              style={[styles.buttonSignInUp, styles.flexAllCenter]}
              onPress={async () => {
                // const userToken = "secret-token";
                // setToken(userToken);
                handleSubmit();
              }}
            >
              <Text>Sign up</Text>
            </TouchableHighlight>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text>Already have an account? Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
