import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../utils/colors";

export const Header = ({ onLogout }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.topHeader}>
        <Text style={styles.logoName}>GeoFencing</Text>
        <TouchableOpacity onPress={onLogout} style={styles.notificationIcon}>
          <MaterialIcons name="notifications" size={24} color={colors.WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: colors.PRIMARY,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 30,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.WHITE,
  },
  notificationIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});