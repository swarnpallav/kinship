import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native'
import { AppTextInput, AppButton, Avatar } from '../components'
import { useChat } from '../hooks'
import type { MatchesStackScreenProps } from '../navigation/types'

type Props = MatchesStackScreenProps<'Chat'>

export default function ChatScreen({ navigation, route }: Props) {
  const [message, setMessage] = useState('')

  // Get match info from route params
  const { matchId, matchName } = route.params

  // Use the chat hook for real-time messaging
  const { messages, sendMutation, isSending } = useChat(matchId)

  const handleSendMessage = () => {
    if (message.trim() && !isSending) {
      sendMutation.mutate({
        roomId: matchId,
        content: message.trim(),
      })
      setMessage('')
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Avatar size={40} />
          <Text style={styles.headerTitle}>{matchName}</Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map(msg => (
          <View
            key={msg.id}
            style={[
              styles.messageWrapper,
              msg.senderId === 'current-user'
                ? styles.messageWrapperSent
                : styles.messageWrapperReceived,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                msg.senderId === 'current-user'
                  ? styles.messageBubbleSent
                  : styles.messageBubbleReceived,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.senderId === 'current-user'
                    ? styles.messageTextSent
                    : styles.messageTextReceived,
                ]}
              >
                {msg.content}
              </Text>
            </View>
            <Text style={styles.messageTime}>
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <AppTextInput
            placeholder='Type a message...'
            value={message}
            onChangeText={setMessage}
            style={styles.textInput}
            multiline
          />
          <AppButton
            title={isSending ? 'Sending...' : 'Send'}
            onPress={handleSendMessage}
            disabled={!message.trim() || isSending}
            size='sm'
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
    marginLeft: 12,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  messageWrapperSent: {
    alignItems: 'flex-end',
  },
  messageWrapperReceived: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  messageBubbleSent: {
    backgroundColor: '#ef4444',
    borderBottomRightRadius: 4,
  },
  messageBubbleReceived: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  messageTextSent: {
    color: '#ffffff',
  },
  messageTextReceived: {
    color: '#171717',
  },
  messageTime: {
    fontSize: 12,
    color: '#737373',
    marginTop: 4,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
  },
})
