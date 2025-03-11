import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { auth } from "../config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SearchBar } from "../components/SearchBar.js";
import colors from "../utils/colors";

export const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [isMarkerEnabled, setIsMarkerEnabled] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setUser(user || "Guest");
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  const handleAddMarker = () => {
    setIsMarkerEnabled(true);
    setMarkerPosition(currentLocation);
  };

  // Update marker position when the map is moved
  const handleMapMove = (region) => {
    if (isMarkerEnabled) {
      setMarkerPosition({
        latitude: region.latitude,
        longitude: region.longitude,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar />

      {/* Map View */}
      {initialRegion && (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          onRegionChangeComplete={handleMapMove} // Triggered when map stops moving
        >
          {/* Current Location Marker */}
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
          )}

          {/* Free Marker */}
          {isMarkerEnabled && markerPosition && (
            <Marker
              coordinate={markerPosition}
              title="Selected Location"
            />
          )}
        </MapView>
      )}

      {/* Add Marker Button */}
      <TouchableOpacity style={styles.addMarkerButton} onPress={handleAddMarker}>
        <Text style={styles.addMarkerButtonText}>Add Marker</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  addMarkerButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 5,
  },
  addMarkerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.WHITE,
  },
});
