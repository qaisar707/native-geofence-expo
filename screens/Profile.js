import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { auth } from "../config";
import { signOut } from "firebase/auth";
import colors from "../utils/colors";

export const Profile = () => {
  const user = auth.currentUser; // Fetch current user from Firebase
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [fullName, setFullName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.log("Error signing out: ", error));
  };

  const handleSave = () => {
    // Save the updated details (you can implement Firebase update logic here)
    console.log("Updated Details:", {
      fullName,
      email,
      phone,
      dateOfBirth,
      homeAddress,
      emergencyContactNumber,
    });
    setIsEditing(false); // Exit edit mode
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* User Details */}
      <View style={styles.userInfo}>
        {/* Portrait Icon with Name */}
        <View style={styles.portraitContainer}>
          <Text style={styles.userName}>{fullName || "Guest"}</Text>
        </View>

        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Date of Birth (DD/MM/YYYY)"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
            />
            <TextInput
              style={styles.input}
              placeholder="Home Address"
              value={homeAddress}
              onChangeText={setHomeAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Emergency Contact Number"
              value={emergencyContactNumber}
              onChangeText={setEmergencyContactNumber}
              keyboardType="phone-pad"
            />
          </>
        ) : (
          <>
            <Text style={styles.userDetail}>Email: {email || "No email available"}</Text>
            <Text style={styles.userDetail}>Phone: {phone || "Not provided"}</Text>
            <Text style={styles.userDetail}>Date of Birth: {dateOfBirth || "Not provided"}</Text>
            <Text style={styles.userDetail}>Home Address: {homeAddress || "Not provided"}</Text>
            <Text style={styles.userDetail}>
              Emergency Contact: {emergencyContactNumber || "Not provided"}
            </Text>
          </>
        )}
      </View>

      {/* Edit/Save Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={isEditing ? handleSave : () => setIsEditing(true)}
      >
        <Text style={styles.editButtonText}>
          {isEditing ? "Save" : "Edit Details"}
        </Text>
      </TouchableOpacity>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.WHITE,

  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.PRIMARY,
    marginBottom:20

  },
  userInfo: {
    alignItems: "center",
  },
  portraitContainer: {
    alignItems: "center",
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colors.PRIMARY,
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.BLACK,
    marginBottom: 10,
  },
  userDetail: {
    fontSize: 21,
    color: colors.GRAY,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.LIGHT_PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  editButton: {
    backgroundColor: colors.PRIMARY,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
    marginTop:20
  },
  editButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.WHITE,
  },
  signOutButton: {
    backgroundColor: colors.RED,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  signOutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.WHITE,
  },
});