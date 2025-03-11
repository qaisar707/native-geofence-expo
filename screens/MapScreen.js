// MapScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Alert,
} from 'react-native';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { ToastMessage, showToast } from '../components/ToastMessage.js';
import MarkerModal from '../components/MarkerModal.js';
import colors from '../utils/colors';

const MAX_MARKERS = 3;
const RADIUS_STEP = 10;
const MIN_RADIUS = 50;

export const MapScreen = () => {
  // States for confirmed safe zones
  const [markers, setMarkers] = useState([]);
  const [fenceRadius, setFenceRadius] = useState(100);

  // States for adding a new safe zone
  const [isMarkerEnabled, setIsMarkerEnabled] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);

  // States for location and initial region
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  // Modal state for editing or adding a safe zone
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState(null); // 'add' or 'edit'
  const [currentName, setCurrentName] = useState('');
  const [editingMarker, setEditingMarker] = useState(null);
  const [tempMarkerPosition, setTempMarkerPosition] = useState(null);
  const [tempCoordinates, setTempCoordinates] = useState(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const mapRef = useRef(null);
  const animatedValues = useRef(new Map()).current;

  // Show toast message for 2 seconds
  const showToastMessage = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        showToastMessage('Location permission is required to use this app.');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  // Animate marker for visual effect
  const animateMarker = (id) => {
    let animValue = animatedValues.get(id);
    if (!animValue) {
      animValue = new Animated.Value(0);
      animatedValues.set(id, animValue);
    }
    Animated.spring(animValue, {
      toValue: 1,
      friction: 5,
      tension: 50,
      useNativeDriver: true,
    }).start(() => animValue.setValue(0));
  };

  const handleNewMarker = () => {
    if (markers.length >= MAX_MARKERS) {
      showToastMessage(`You can only add up to ${MAX_MARKERS} safe zones.`);
      return;
    }
    const startingCoord = currentLocation || initialRegion;
    if (!startingCoord) return;
    setMarkerPosition(startingCoord);
    setIsMarkerEnabled(true);
  };

  const handleMapMove = (region) => {
    if (isMarkerEnabled) {
      setMarkerPosition({
        latitude: region.latitude,
        longitude: region.longitude,
      });
    }
  };

  const handleAddFence = () => {
    if (!markerPosition) return;
    setTempMarkerPosition(markerPosition);
    setTempCoordinates(markerPosition); // auto-fetch coordinates
    setModalMode('add');
    setCurrentName('');
    setFenceRadius(100);
    setIsMarkerEnabled(false);
    setModalVisible(true);
  };

  const handleSaveModal = () => {
    if (!currentName.trim()) {
      showToastMessage('Name cannot be empty.');
      return;
    }
    if (modalMode === 'add') {
      const newMarker = {
        id: Date.now(),
        coordinate: tempMarkerPosition,
        name: currentName,
        radius: fenceRadius,
      };
      setMarkers(prev => [...prev, newMarker]);
      animateMarker(newMarker.id);
    } else if (modalMode === 'edit' && editingMarker) {
      setMarkers(prev =>
        prev.map(marker =>
          marker.id === editingMarker.id
            ? {
                ...marker,
                name: currentName,
                radius: fenceRadius,
                coordinate: tempCoordinates || marker.coordinate,
              }
            : marker
        )
      );
    }
    setModalVisible(false);
    setModalMode(null);
    setEditingMarker(null);
    setTempCoordinates(null);
  };

  const handleMarkerDragEnd = (e, markerId) => {
    const newCoord = e.nativeEvent.coordinate;
    setMarkers(prev =>
      prev.map(marker =>
        marker.id === markerId ? { ...marker, coordinate: newCoord } : marker
      )
    );
    animateMarker(markerId);
  };

  const handleRemoveMarker = (id) => {
    setMarkers(prev => prev.filter(m => m.id !== id));
    setModalVisible(false);
    setEditingMarker(null);
  };

  const openModalForEdit = (marker) => {
    setEditingMarker(marker);
    setModalMode('edit');
    setCurrentName(marker.name);
    setFenceRadius(marker.radius);
    setTempCoordinates(marker.coordinate);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        onRegionChangeComplete={handleMapMove}
        showsUserLocation
        onPress={() => {}}
      >
        {markers.map(marker => {
          const animValue = animatedValues.get(marker.id) || new Animated.Value(0);
          const scale = animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.2],
          });
          const rotate = animValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          });
          return (
            <React.Fragment key={marker.id}>
              <Marker
                coordinate={marker.coordinate}
                draggable
                onPress={() => openModalForEdit(marker)}
                onDragEnd={(e) => handleMarkerDragEnd(e, marker.id)}
              >
                <Animated.View
                  style={[
                    styles.marker,
                    { backgroundColor: colors.PRIMARY, transform: [{ scale }, { rotate }] },
                  ]}
                >
                  <Text style={styles.markerText}>{marker.name}</Text>
                </Animated.View>
                <Callout tooltip>
                  <View style={styles.simpleCallout}>
                    <Text style={styles.calloutText}>
                      Lat: {marker.coordinate.latitude.toFixed(6)}
                    </Text>
                    <Text style={styles.calloutText}>
                      Lng: {marker.coordinate.longitude.toFixed(6)}
                    </Text>
                  </View>
                </Callout>
              </Marker>
              <Circle
                center={marker.coordinate}
                radius={marker.radius}
                fillColor="rgba(104,87,232,0.2)"
                strokeColor="rgba(104,87,232,0.8)"
                strokeWidth={2}
              />
            </React.Fragment>
          );
        })}
        {isMarkerEnabled && markerPosition && (
          <Marker coordinate={markerPosition} title="Selected Location" />
        )}
      </MapView>

      <View style={styles.controls}>
        <View style={styles.buttonRow}>
          {!isMarkerEnabled ? (
            <TouchableOpacity
              style={[styles.mainButton, markers.length >= MAX_MARKERS && styles.disabled]}
              onPress={handleNewMarker}
              disabled={markers.length >= MAX_MARKERS}
            >
              <MaterialIcons name="add-location" size={24} color="white" />
              <Text style={styles.buttonText}>Add New Safe-Zone</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.mainButton} onPress={handleAddFence}>
              <MaterialIcons name="place" size={24} color="white" />
              <Text style={styles.buttonText}>Add Fence</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <MarkerModal
        visible={modalVisible}
        mode={modalMode}
        currentName={currentName}
        setCurrentName={setCurrentName}
        fenceRadius={fenceRadius}
        setFenceRadius={setFenceRadius}
        tempCoordinates={tempCoordinates}
        onSave={handleSaveModal}
        onCancel={() => setModalVisible(false)}
        onDelete={() => {
          if (editingMarker) {
            handleRemoveMarker(editingMarker.id);
            setModalVisible(false);
          }
        }}
      />

      <ToastMessage message={toastMessage} visible={toastVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    gap: 10,
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around' },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.PRIMARY,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 5,
  },
  
  disabled: { backgroundColor: colors.GRAY },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  marker: { padding: 10, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  markerText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  simpleCallout: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    borderColor: colors.PURPLE,
    borderWidth: 1,
  },
  calloutText: { fontSize: 12, color: colors.PURPLE },
});

export default MapScreen;
