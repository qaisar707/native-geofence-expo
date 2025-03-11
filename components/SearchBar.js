import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/colors";

export const MapWithSearch = () => {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          query
        )}&key=YOUR_GOOGLE_API_KEY`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      } else {
        Alert.alert("Location not found", "Please try a different query.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while searching for the location.");
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion} />
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Location"
          placeholderTextColor={colors.GRAY}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color={colors.PRIMARY} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  searchBar: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.WHITE,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.BLACK,
    marginRight: 10,
  },
  searchButton: { padding: 8 },
});

export default MapWithSearch;
