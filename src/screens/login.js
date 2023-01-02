import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Button, TextInput } from "react-native";
import { Cell, Section } from "react-native-tableview-simple";
import {
  context as AuthContext,
  createAccount,
  login,
} from "../AuthContext.bs";
import { context as ThemeContext } from "../ThemeContext.bs";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const authCtx = React.useContext(AuthContext);
  const { colors } = React.useContext(ThemeContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={{ flex: 1 }}>
      <Section sectionTintColor="transparent">
        <Cell
          withSafeAreaView={false}
          cellContentView={
            <TextInput
              value={username}
              style={{ fontSize: 16, flex: 1 }}
              placeholder="Username"
              onChangeText={setUsername}
            />
          }
        />
        <Cell
          withSafeAreaView={false}
          cellContentView={
            <TextInput
              secureTextEntry
              value={password}
              style={{ fontSize: 16, flex: 1 }}
              placeholder="Password"
              onChangeText={setPassword}
            />
          }
        />
      </Section>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexGrow: 1 }}>
          <Button
            title="Login"
            color={colors.settingsActive}
            onPress={async () => {
              if (!username || !password) {
                alert("Please input username and password");
                return;
              }
              try {
                await login(authCtx, username, password);
                navigation.goBack();
              } catch (err) {
                alert(err.message);
              }
            }}
          />
        </View>
        <View style={{ flexGrow: 1 }}>
          <Button
            title="Create account"
            color={colors.settingsActive}
            onPress={async () => {
              if (!username || !password) {
                alert("Please input username and password");
                return;
              }
              try {
                await createAccount(authCtx, username, password);
                await login(username, password);
                navigation.goBack();
              } catch (err) {
                alert(err.message);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};
