import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Chat from './Chat';
import ImageAnalyzer from './ImageAnalyzer';
import { useLanguage } from '../hooks/useLanguage';
import { Ionicons } from '@expo/vector-icons';

type PlaygroundTab = 'chat' | 'image';

const PlaygroundView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<PlaygroundTab>('chat');
    const { t } = useLanguage();

    const renderContent = () => {
        switch (activeTab) {
            case 'chat':
                return <Chat />;
            case 'image':
                return <ImageAnalyzer />;
            default:
                return null;
        }
    };

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="p-4 border-b border-gray-200 bg-white">
                <Text className="text-2xl font-bold text-gray-900 mb-1">
                    {t('playground.title')}
                </Text>
                <Text className="text-gray-600 text-sm">
                    {t('playground.description')}
                </Text>
                
                {/* Tabs */}
                <View className="mt-4">
                    <View className="flex-row border-b border-gray-200">
                        <TouchableOpacity
                            onPress={() => setActiveTab('chat')}
                            className={`flex-row items-center px-4 py-3 mr-4 ${
                                activeTab === 'chat' 
                                    ? 'border-b-2 border-blue-500' 
                                    : ''
                            }`}
                        >
                            <Ionicons 
                                name="chatbubble-outline" 
                                size={16} 
                                color={activeTab === 'chat' ? '#3B82F6' : '#6B7280'} 
                            />
                            <Text className={`ml-2 font-semibold ${
                                activeTab === 'chat' 
                                    ? 'text-blue-500' 
                                    : 'text-gray-500'
                            }`}>
                                {t('playground.chatTab')}
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={() => setActiveTab('image')}
                            className={`flex-row items-center px-4 py-3 ${
                                activeTab === 'image' 
                                    ? 'border-b-2 border-blue-500' 
                                    : ''
                            }`}
                        >
                            <Ionicons 
                                name="image-outline" 
                                size={16} 
                                color={activeTab === 'image' ? '#3B82F6' : '#6B7280'} 
                            />
                            <Text className={`ml-2 font-semibold ${
                                activeTab === 'image' 
                                    ? 'text-blue-500' 
                                    : 'text-gray-500'
                            }`}>
                                {t('playground.imageTab')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
            {/* Content */}
            <View className="flex-1">
                {renderContent()}
            </View>
        </View>
    );
};

export default PlaygroundView;
