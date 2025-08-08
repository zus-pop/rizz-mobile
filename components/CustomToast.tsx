// glass-toast.tsx
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { toast } from 'sonner-native';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface GlassToastOptions {
  description?: string;
  duration?: number;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onPress: () => void;
  };
}

const toastStyles: Record<
  ToastType,
  {
    borderColor: string;
    icon: React.ReactNode;
    gradient: [string, string];
    textColor: string;
    descColor: string;
  }
> = {
  success: {
    borderColor: '#34d399',
    icon: <Ionicons name="checkmark" size={24} color="#34d399" />, // minimal checkmark
    gradient: ['rgba(52,211,153,0.25)', 'rgba(52,211,153,0.10)'],
    textColor: '#065f46',
    descColor: '#065f46',
  },
  error: {
    borderColor: '#f87171',
    icon: <Ionicons name="close" size={24} color="#f87171" />, // minimal close
    gradient: ['rgba(248,113,113,0.25)', 'rgba(248,113,113,0.10)'],
    textColor: '#7f1d1d',
    descColor: '#7f1d1d',
  },
  info: {
    borderColor: '#60a5fa',
    icon: <Ionicons name="ellipsis-horizontal" size={24} color="#60a5fa" />, // minimal info
    gradient: ['rgba(96,165,250,0.25)', 'rgba(96,165,250,0.10)'],
    textColor: '#1e3a8a',
    descColor: '#1e3a8a',
  },
  warning: {
    borderColor: '#fbbf24',
    icon: <Ionicons name="alert" size={24} color="#fbbf24" />, // minimal alert
    gradient: ['rgba(251,191,36,0.25)', 'rgba(251,191,36,0.10)'],
    textColor: '#78350f',
    descColor: '#78350f',
  },
};

function GlassToastView({
  type,
  message,
  description,
  icon,
  action,
  onClose,
}: {
  type: ToastType;
  message: string;
  description?: string;
  icon?: React.ReactNode;
  action?: GlassToastOptions['action'];
  onClose: () => void;
}) {
  const style = toastStyles[type];

  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      intensity={100}
      style={{
        borderRadius: 25,
        overflow: 'hidden',
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 0.8,
        borderColor: style.borderColor,
        backgroundColor: 'rgba(255,255,255,0.8)',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}>
        <View className="pt-1">{icon ?? style.icon}</View>
        <View className="flex-1">
          <Text className="text-lg font-bold" style={{ color: style.textColor }}>
            {message}
          </Text>
          {description && (
            <Text className="mt-0.5 text-xs" style={{ color: style.descColor }}>
              {description}
            </Text>
          )}
          {action && (
            <Pressable
              className="mt-2 self-start rounded-lg px-3 py-1.5"
              style={{ backgroundColor: style.borderColor }}
              onPress={() => {
                action.onPress();
                onClose();
              }}>
              <Text className="font-bold text-white">{action.label}</Text>
            </Pressable>
          )}
        </View>
        {/* <Pressable onPress={onClose} className="ml-2 p-1">
        <Ionicons name="close" size={20} color={style.textColor} />
      </Pressable> */}
      </View>
    </BlurView>
  );
}

function showToast(type: ToastType, message: string, options?: GlassToastOptions) {
  const id = toast.custom(
    <GlassToastView
      type={type}
      message={message}
      description={options?.description}
      icon={options?.icon}
      action={options?.action}
      onClose={() => toast.dismiss(id)}
    />,
    { duration: options?.duration ?? 3500 }
  );
}

export const customToast = {
  success: (msg: string, opts?: GlassToastOptions) => showToast('success', msg, opts),
  error: (msg: string, opts?: GlassToastOptions) => showToast('error', msg, opts),
  info: (msg: string, opts?: GlassToastOptions) => showToast('info', msg, opts),
  warning: (msg: string, opts?: GlassToastOptions) => showToast('warning', msg, opts),
};
