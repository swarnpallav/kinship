import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { AppTextInput, AppButton, Avatar } from '../components'
import { useChat } from '../hooks'
import { useTheme } from '../theme'
import type { MatchesStackScreenProps } from '../navigation/types'

type Props = MatchesStackScreenProps<'Chat'>

export default function ChatScreen({ navigation, route }: Props) {
  const [message, setMessage] = useState('')
  const { theme, isDark } = useTheme()
  const insets = useSafeAreaInsets()
  const styles = createStyles(theme, insets)

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
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor='transparent'
      />
      <LinearGradient
        colors={theme.gradients.deepDesire as any}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
        >
          {/* Decorative background elements */}
          <View style={styles.decorativeContainer}>
            <Text style={[styles.decorativeEmoji, styles.emoji1]}>💞</Text>
            <Text style={[styles.decorativeEmoji, styles.emoji2]}>💕</Text>
            <Text style={[styles.decorativeEmoji, styles.emoji3]}>💗</Text>
          </View>

          {/* Messages */}
          <ScrollView
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            contentInsetAdjustmentBehavior='automatic'
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
                maxLength={500}
              />
              <AppButton
                title={isSending ? '...' : 'Send'}
                onPress={handleSendMessage}
                disabled={!message.trim() || isSending}
                size='sm'
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  )
}

const createStyles = (theme: any, insets: any) =>
  StyleSheet.create({
    gradient: {
      flex: 1,
    },
    container: {
      flex: 1,
      position: 'relative',
    },
    decorativeContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
    },
    decorativeEmoji: {
      position: 'absolute',
      fontSize: 40,
      opacity: 0.08,
    },
    emoji1: {
      top: '15%',
      left: '10%',
      transform: [{ rotate: '-20deg' }],
    },
    emoji2: {
      top: '50%',
      right: '8%',
      fontSize: 35,
    },
    emoji3: {
      top: '80%',
      left: '12%',
      fontSize: 38,
      transform: [{ rotate: '15deg' }],
    },
    messagesContainer: {
      flex: 1,
      zIndex: 1,
    },
    messagesContent: {
      flexGrow: 1,
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.xl, // Account for semi-transparent header
      paddingBottom: theme.spacing.md,
    },
    messageWrapper: {
      marginBottom: theme.spacing.md,
    },
    messageWrapperSent: {
      alignItems: 'flex-end',
    },
    messageWrapperReceived: {
      alignItems: 'flex-start',
    },
    messageBubble: {
      maxWidth: '75%',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.xl,
    },
    messageBubbleSent: {
      backgroundColor: theme.colors.primary[500],
      borderBottomRightRadius: theme.borderRadius.sm,
    },
    messageBubbleReceived: {
      backgroundColor: theme.colors.background.primary,
      borderBottomLeftRadius: theme.borderRadius.sm,
      ...theme.shadows.sm,
    },
    messageText: {
      fontSize: theme.typography.fontSizes.base,
    },
    messageTextSent: {
      color: theme.colors.text.inverse,
    },
    messageTextReceived: {
      color: theme.colors.text.primary,
    },
    messageTime: {
      fontSize: theme.typography.fontSizes.xs,
      color: theme.colors.text.tertiary,
      marginTop: theme.spacing.xs,
    },
    inputContainer: {
      backgroundColor: theme.colors.background.primary,
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.sm,
      paddingBottom: Math.max(insets.bottom, theme.spacing.sm), // Safe area bottom padding
      borderTopWidth: 1,
      borderTopColor: theme.colors.border.light,
      zIndex: 1,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: theme.spacing.sm,
    },
    textInput: {
      flex: 1,
      maxHeight: 100,
    },
  })
