import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import colors from "../utils/colors";

export const Analytics = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Analytics</Text>

      {/* Dummy Analytics Data */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Locations Visited</Text>
        <Text style={styles.cardValue}>12</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Time Spent</Text>
        <Text style={styles.cardValue}>3h 45m</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Alerts Triggered</Text>
        <Text style={styles.cardValue}>5</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Most Visited Location</Text>
        <Text style={styles.cardValue}>Home</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: colors.WHITE,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.PRIMARY,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.LIGHT_GRAY,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.BLACK,
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.PRIMARY,
  },
});