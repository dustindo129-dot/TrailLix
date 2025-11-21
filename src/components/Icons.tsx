import React from 'react';
import { View } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// Helper to extract size and color from className
const parseClassName = (className?: string, defaultSize = 24) => {
  let size = defaultSize;
  let color = '#000000';

  if (className) {
    // Parse width/height (w-5 = 20px, w-6 = 24px, etc.)
    const sizeMatch = className.match(/[wh]-(\d+)/);
    if (sizeMatch) {
      const val = parseInt(sizeMatch[1]);
      size = val * 4; // Tailwind scale: 1 = 4px
    }

    // Parse text color
    if (className.includes('text-white')) color = '#FFFFFF';
    else if (className.includes('text-gray-')) {
      if (className.includes('text-gray-300')) color = '#D1D5DB';
      else if (className.includes('text-gray-400')) color = '#9CA3AF';
      else if (className.includes('text-gray-500')) color = '#6B7280';
      else if (className.includes('text-gray-600')) color = '#4B5563';
    } else if (className.includes('text-primary-red')) color = '#d90d03';
    else if (className.includes('text-green-')) {
      if (className.includes('text-green-400')) color = '#4ade80';
      else if (className.includes('text-green-500')) color = '#22c55e';
    } else if (className.includes('text-red-')) color = '#ef4444';
    else if (className.includes('text-yellow-')) color = '#f59e0b';
  }

  return { size, color };
};

export const EyeIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="eye-outline" size={customSize || size} color={customColor || color} />;
};

export const EyeOffIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="eye-off-outline" size={customSize || size} color={customColor || color} />;
};

export const CheckIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="checkmark-circle" size={customSize || size} color={customColor || color} />;
};

export const LockIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="lock-closed" size={customSize || size} color={customColor || color} />;
};

export const MenuIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="menu" size={customSize || size} color={customColor || color} />;
};

export const XIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="close" size={customSize || size} color={customColor || color} />;
};

export const GlobeIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="globe-outline" size={customSize || size} color={customColor || color} />;
};

export const UserIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="person" size={customSize || size} color={customColor || color} />;
};

export const LogoutIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="log-out-outline" size={customSize || size} color={customColor || color} />;
};

export const SettingsIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="settings-outline" size={customSize || size} color={customColor || color} />;
};

export const StarIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="star" size={customSize || size} color={customColor || color} />;
};

export const AwardIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="trophy" size={customSize || size} color={customColor || color} />;
};

export const PlaygroundIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <MaterialCommunityIcons name="flask" size={customSize || size} color={customColor || color} />;
};

export const ChevronRightIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="chevron-forward" size={customSize || size} color={customColor || color} />;
};

export const ChevronLeftIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="chevron-back" size={customSize || size} color={customColor || color} />;
};

export const SendIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="send" size={customSize || size} color={customColor || color} />;
};

export const ImageIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color} = parseClassName(className);
  return <Ionicons name="image" size={customSize || size} color={customColor || color} />;
};

export const CopyIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="copy-outline" size={customSize || size} color={customColor || color} />;
};

export const DownloadIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="download-outline" size={customSize || size} color={customColor || color} />;
};

export const ShareIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="share-social-outline" size={customSize || size} color={customColor || color} />;
};

export const FireIcon: React.FC<IconProps> = ({ className, size: customSize, color: customColor }) => {
  const { size, color } = parseClassName(className);
  return <Ionicons name="flame" size={customSize || size} color={customColor || color} />;
};

