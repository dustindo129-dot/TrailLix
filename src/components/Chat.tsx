import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createChat } from '../services/geminiService';
import { Ionicons } from '@expo/vector-icons';
import type { DisplayMessage, ChatSession } from '../services/geminiService';
import { useLanguage } from '../hooks/useLanguage';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<DisplayMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<ChatSession | null>(null);
    const scrollViewRef = useRef<ScrollView>(null);
    const { t } = useLanguage();

    useEffect(() => {
        chatRef.current = createChat();
    }, []);

    const scrollToBottom = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(scrollToBottom, 100);
        }
    }, [messages]);

    const handleSendMessage = useCallback(async () => {
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: DisplayMessage = { role: 'user', text: input.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chatRef.current.sendMessage(input.trim());
            const modelMessage: DisplayMessage = { role: 'model', text: response.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: DisplayMessage = { 
                role: 'model', 
                text: t('playground.error') 
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, t]);

    const clearChat = () => {
        setMessages([]);
        chatRef.current = createChat();
    };

    if (messages.length === 0 && !isLoading) {
        return (
            <KeyboardAvoidingView 
                className="flex-1 bg-gray-50" 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1">
                        <View className="flex-1 items-center justify-center p-6">
                            <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center mb-4">
                                <Ionicons name="chatbubble" size={32} color="white" />
                            </View>
                            <Text className="text-xl font-bold text-gray-900 mb-2 text-center">
                                {t('playground.noConversations')}
                            </Text>
                            <Text className="text-gray-600 text-center mb-6">
                                {t('playground.startNewConversation')}
                            </Text>
                        </View>
                        
                        {/* Input Area */}
                        <View className="p-4 bg-white border-t border-gray-200">
                            <View className="flex-row items-center space-x-3">
                                <TextInput
                                    value={input}
                                    onChangeText={setInput}
                                    placeholder={t('playground.typeMessage')}
                                    className="flex-1 bg-gray-100 border border-gray-300 rounded-full px-4 py-3 text-gray-900 text-base"
                                    multiline
                                    maxLength={1000}
                                    editable={!isLoading}
                                />
                                <TouchableOpacity
                                    onPress={handleSendMessage}
                                    disabled={isLoading || !input.trim()}
                                    className={`w-12 h-12 rounded-full items-center justify-center ${
                                        isLoading || !input.trim() 
                                            ? 'bg-gray-300' 
                                            : 'bg-blue-500'
                                    }`}
                                >
                                    <Ionicons 
                                        name="send" 
                                        size={20} 
                                        color={isLoading || !input.trim() ? '#9CA3AF' : 'white'} 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

    return (
        <KeyboardAvoidingView 
            className="flex-1 bg-gray-50" 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 240 : 0}
        >
            {/* Header */}
            <View className="bg-white border-b border-gray-200 px-4 py-3">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center mr-3">
                            <Ionicons name="chatbubble" size={16} color="white" />
                        </View>
                        <Text className="text-lg font-semibold text-gray-900">AI Chat</Text>
                    </View>
                    <TouchableOpacity
                        onPress={clearChat}
                        className="px-3 py-1 bg-gray-100 rounded-lg"
                    >
                        <Text className="text-sm text-gray-600">{t('playground.clear')}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Messages */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1">
                    <ScrollView 
                        ref={scrollViewRef}
                        className="flex-1 px-4 py-6"
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {messages.map((msg, index) => (
                            <View key={index} className={`mb-4 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <View className="flex-row items-start max-w-[85%]">
                                    {msg.role === 'model' && (
                                        <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center mr-3 mt-1">
                                            <Ionicons name="sparkles" size={16} color="white" />
                                        </View>
                                    )}
                                    <View className={`px-4 py-3 rounded-2xl ${
                                        msg.role === 'user' 
                                            ? 'bg-blue-500 rounded-br-md' 
                                            : 'bg-white border border-gray-200 rounded-bl-md'
                                    }`}>
                                        <Text className={`text-base leading-relaxed ${
                                            msg.role === 'user' ? 'text-white' : 'text-gray-900'
                                        }`}>
                                            {msg.text}
                                        </Text>
                                    </View>
                                    {msg.role === 'user' && (
                                        <View className="w-8 h-8 bg-gray-300 rounded-full items-center justify-center ml-3 mt-1">
                                            <Ionicons name="person" size={16} color="#6B7280" />
                                        </View>
                                    )}
                                </View>
                            </View>
                        ))}
                        
                        {isLoading && (
                            <View className="mb-4 items-start">
                                <View className="flex-row items-start max-w-[85%]">
                                    <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center mr-3 mt-1">
                                        <Ionicons name="sparkles" size={16} color="white" />
                                    </View>
                                    <View className="px-4 py-3 rounded-2xl bg-white border border-gray-200 rounded-bl-md">
                                        <View className="flex-row items-center">
                                            <ActivityIndicator size="small" color="#3B82F6" />
                                            <Text className="text-gray-600 ml-2">{t('playground.thinking')}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>

            {/* Input Area */}
            <View className="p-4 bg-white border-t border-gray-200">
                <View className="flex-row items-end space-x-3">
                    <TextInput
                        value={input}
                        onChangeText={setInput}
                        placeholder={t('playground.typeMessage')}
                        className="flex-1 bg-gray-100 border border-gray-300 rounded-2xl px-4 py-3 text-gray-900 text-base min-h-[44px] max-h-24"
                        multiline
                        maxLength={1000}
                        editable={!isLoading}
                        textAlignVertical="center"
                    />
                    <TouchableOpacity
                        onPress={handleSendMessage}
                        disabled={isLoading || !input.trim()}
                        className={`w-12 h-12 rounded-full items-center justify-center ${
                            isLoading || !input.trim() 
                                ? 'bg-gray-300' 
                                : 'bg-blue-500'
                        }`}
                    >
                        <Ionicons 
                            name="send" 
                            size={20} 
                            color={isLoading || !input.trim() ? '#9CA3AF' : 'white'} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Chat;
