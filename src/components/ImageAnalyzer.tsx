import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { analyzeImage } from '../services/geminiService';
import { useLanguage } from '../hooks/useLanguage';

const ImageAnalyzer: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [imageType, setImageType] = useState<string>('');
    const [prompt, setPrompt] = useState<string>('');
    const [analysis, setAnalysis] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const { t } = useLanguage();

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission needed',
                'We need camera roll permissions to select images.',
                [{ text: 'OK' }]
            );
            return false;
        }
        return true;
    };

    const pickImage = async () => {
        const hasPermission = await requestPermission();
        if (!hasPermission) return;

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: [ImagePicker.MediaType.Images],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
                base64: true,
            });

            if (!result.canceled && result.assets[0]) {
                const asset = result.assets[0];
                setImage(asset.uri);
                setImageType(asset.mimeType || 'image/jpeg');
                setAnalysis('');
                setError('');
            }
        } catch (error) {
            console.error('Error picking image:', error);
            setError('Failed to pick image. Please try again.');
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission needed',
                'We need camera permissions to take photos.',
                [{ text: 'OK' }]
            );
            return;
        }

        try {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
                base64: true,
            });

            if (!result.canceled && result.assets[0]) {
                const asset = result.assets[0];
                setImage(asset.uri);
                setImageType(asset.mimeType || 'image/jpeg');
                setAnalysis('');
                setError('');
            }
        } catch (error) {
            console.error('Error taking photo:', error);
            setError('Failed to take photo. Please try again.');
        }
    };

    const showImageOptions = () => {
        Alert.alert(
            'Select Image',
            'Choose how you want to add an image',
            [
                { text: 'Camera', onPress: takePhoto },
                { text: 'Photo Library', onPress: pickImage },
                { text: 'Cancel', style: 'cancel' }
            ]
        );
    };

    const handleAnalyze = useCallback(async () => {
        if (!image || !prompt.trim()) {
            setError('Please select an image and enter a prompt.');
            return;
        }

        setError('');
        setIsLoading(true);
        setAnalysis('');

        try {
            // For the mobile app, we need to get the base64 data differently
            // Since expo-image-picker provides base64, we can use it directly
            const response = await fetch(image);
            const blob = await response.blob();
            const reader = new FileReader();
            
            reader.onload = async () => {
                const base64Data = (reader.result as string).split(',')[1];
                if (!base64Data) {
                    setError('Could not process image data.');
                    setIsLoading(false);
                    return;
                }
                
                try {
                    const result = await analyzeImage(prompt, base64Data, imageType);
                    setAnalysis(result);
                } catch (err) {
                    setError('An error occurred during analysis. Please try again.');
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };
            
            reader.readAsDataURL(blob);
        } catch (error) {
            setError('Failed to process image. Please try again.');
            console.error('Error processing image:', error);
            setIsLoading(false);
        }
    }, [image, prompt, imageType]);

    return (
        <KeyboardAvoidingView 
            className="flex-1 bg-white"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1">
                    <ScrollView 
                        className="flex-1" 
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        <View className="p-4 space-y-6">
                            {/* Image Upload Section */}
                            <View>
                                <Text className="text-lg font-semibold text-gray-900 mb-3">Upload Image</Text>
                                <TouchableOpacity
                                    onPress={showImageOptions}
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 items-center justify-center min-h-48"
                                >
                                    {image ? (
                                        <Image source={{ uri: image }} className="w-full h-48 rounded-lg" resizeMode="contain" />
                                    ) : (
                                        <View className="items-center">
                                            <Ionicons name="image-outline" size={48} color="#9CA3AF" />
                                            <Text className="text-gray-500 text-center mt-2">
                                                Tap to select an image
                                            </Text>
                                            <Text className="text-gray-400 text-sm text-center mt-1">
                                                From camera or photo library
                                            </Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                                {image && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setImage(null);
                                            setAnalysis('');
                                            setError('');
                                        }}
                                        className="mt-2 self-end"
                                    >
                                        <Text className="text-red-500 text-sm">Remove Image</Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* Prompt Input Section */}
                            <View>
                                <Text className="text-lg font-semibold text-gray-900 mb-3">Your Question</Text>
                                <TextInput
                                    value={prompt}
                                    onChangeText={setPrompt}
                                    placeholder="e.g., What is in this image? Describe it in detail."
                                    className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-gray-900 h-24"
                                    multiline
                                    textAlignVertical="top"
                                    maxLength={500}
                                />
                            </View>

                            {/* Analyze Button */}
                            <TouchableOpacity
                                onPress={handleAnalyze}
                                disabled={isLoading || !image || !prompt.trim()}
                                className={`p-4 rounded-lg items-center justify-center ${
                                    isLoading || !image || !prompt.trim()
                                        ? 'bg-gray-300'
                                        : 'bg-blue-500'
                                }`}
                            >
                                <View className="flex-row items-center">
                                    {isLoading && <ActivityIndicator size="small" color="white" className="mr-2" />}
                                    <Text className={`font-semibold ${
                                        isLoading || !image || !prompt.trim() ? 'text-gray-500' : 'text-white'
                                    }`}>
                                        {isLoading ? 'Analyzing...' : 'Analyze Image'}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            {/* Error Message */}
                            {error && (
                                <View className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <Text className="text-red-600">{error}</Text>
                                </View>
                            )}

                            {/* Analysis Result */}
                            <View>
                                <Text className="text-lg font-semibold text-gray-900 mb-3">Analysis Result</Text>
                                <View className="bg-gray-50 rounded-lg p-4 min-h-32">
                                    {isLoading && !analysis ? (
                                        <View className="items-center justify-center h-32">
                                            <ActivityIndicator size="large" color="#3B82F6" />
                                            <Text className="text-gray-600 mt-2">Analyzing image...</Text>
                                        </View>
                        ) : analysis ? (
                            <Text className="text-gray-800 leading-relaxed">
                                {analysis.split(/(\*\*[^*]+\*\*)/).map((part, index) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        return (
                                            <Text key={index} className="font-bold">
                                                {part.slice(2, -2)}
                                            </Text>
                                        );
                                    }
                                    return part;
                                })}
                            </Text>
                        ) : (
                                        <View className="items-center justify-center h-32">
                                            <Ionicons name="document-text-outline" size={32} color="#9CA3AF" />
                                            <Text className="text-gray-500 text-center mt-2">
                                                Your image analysis will appear here
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default ImageAnalyzer;
