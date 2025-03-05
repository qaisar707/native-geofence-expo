import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import colors from "../utils/colors";

export const Support = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you?", sender: "support" },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: message, sender: "user" }]);
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === "user" ? styles.userMessage : styles.supportMessage,
            ]}
          >
            <Text style={msg.sender === "user" ? styles.userMessageText : styles.supportMessageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor={colors.GRAY}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT_GRAY,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: colors.PRIMARY, 
  },

  supportMessage: {
    alignSelf: "flex-start",
    backgroundColor: colors.WHITE 
  },

  userMessageText: {
    fontSize: 16,
    color: colors.WHITE,
  },

  supportMessageText: {
    fontSize: 16,
    color: colors.PRIMARY,
  },
  
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.LIGHT_GRAY,
    backgroundColor: colors.WHITE,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 10,
    padding: 12,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: colors.PRIMARY,
    borderRadius: 10,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.WHITE,
  },
});