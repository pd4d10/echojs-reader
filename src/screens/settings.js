import React from "react";
import { ScrollView, View, Button, Text } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { context as ThemeContext } from "../ThemeContext.bs";
import CustomSwitch from "../components/switch";
import { confirm } from "../utils";
import { AuthContext } from "../context/auth";
import { SettingsContext } from "../context/settings";

export const SettingsScreen = (props) => {
  const { theme, setTheme, colors } = React.useContext(ThemeContext);
  const { auth, username, logout } = React.useContext(AuthContext);
  const { svEnable, svAvailable, setSvEnable, openLink } =
    React.useContext(SettingsContext);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 20,
        backgroundColor: colors.settingsBackground,
      }}
    >
      <TableView>
        <Section sectionTintColor="transparent">
          {auth ? (
            <Cell
              cellContentView={
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16 }}>{username}</Text>
                </View>
              }
              cellAccessoryView={
                <Button
                  title="Logout"
                  color={colors.settingsActive}
                  onPress={() => {
                    confirm("Are you sure to logout?", logout);
                  }}
                />
              }
            />
          ) : (
            <Cell
              cellContentView={
                <View style={{ flex: 1 }}>
                  <Button
                    title="Login / Create account"
                    color={colors.settingsActive}
                    onPress={() => {
                      props.navigation.navigate("Login");
                    }}
                  />
                </View>
              }
            />
          )}
        </Section>

        <Section header="THEME" sectionTintColor="transparent">
          {["light", "dark"].map((item) => (
            <Cell
              key={item}
              title={item}
              accessory={theme === item ? "Checkmark" : undefined}
              accessoryColor={colors.settingsActive}
              onPress={() => setTheme(item)}
            />
          ))}
        </Section>

        {svAvailable && (
          <Section sectionTintColor="transparent">
            <Cell
              cellAccessoryView={
                <CustomSwitch value={svEnable} onValueChange={setSvEnable} />
              }
              title="Open Links In Safari View"
            />
          </Section>
        )}
      </TableView>
      <Section header="ABOUT" sectionTintColor="transparent">
        <Cell
          title="Source Code"
          accessory="DisclosureIndicator"
          onPress={() => {
            openLink("https://github.com/pd4d10/echojs-reader", colors);
          }}
        />
      </Section>
    </ScrollView>
  );
};
