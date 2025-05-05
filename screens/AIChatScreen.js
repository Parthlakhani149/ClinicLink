// 🤖 Local AI Chatbot Screen (No API, 100% Free)

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Simple logic for fake AI response
const fakeBotReply = (userMessage) => {
  const msg = userMessage.toLowerCase();
  if (msg.includes('appointment')) return "You can book appointments from the 'Book Now' page.";
  if (msg.includes('prescription')) return "Check the 'Prescriptions' tab for your records.";
  if (msg.includes('hello') || msg.includes('hi')) return "Hello! How can I assist you today?";
  return "I'm here to help you navigate ClinicLink. Try asking about appointments or doctors!";
};

export default function AIChatScreen({ navigation }) {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi! I am your ClinicLink Assistant 🤖', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);

    const botText = fakeBotReply(input);
    setInput('');
    setTimeout(() => {
      const botMsg = { id: Date.now().toString(), text: botText, sender: 'bot' };
      setMessages((prev) => [...prev, botMsg]);
    }, 700);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Chat Assistant</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      {/* Input */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask anything..."
            style={styles.textInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: {
    backgroundColor: '#1D4ED8',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  messageList: {
    padding: 20,
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563EB',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E7EB',
  },
  messageText: {
    color: '#111827',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
  },
  sendButton: {
    backgroundColor: '#2563EB',
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
  },
});
