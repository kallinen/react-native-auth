import type { AppleCredential } from './types'
import ReactNativeAuth from './NativeReactNativeAuth'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { Pressable } from 'react-native'
import { Platform } from 'react-native'
import { requireNativeComponent } from 'react-native'
import type { ViewStyle } from 'react-native'

type AppleSignInButtonProps = {
    style?: ViewStyle
    onPress?: () => void
    disabled?: boolean
}

const NativeAppleButton = requireNativeComponent<{ style?: ViewStyle }>(
    'ReactNativeAuthButton',
)

export const AppleSignInButton: React.FC<AppleSignInButtonProps> = ({
    onPress,
    disabled,
    style,
}) => {
    if (Platform.OS !== 'ios') return null
    return (
        <Pressable onPress={onPress} disabled={disabled} style={style}>
            <NativeAppleButton style={{ width: '100%', height: 44 }} />
        </Pressable>
    )
}

type GoogleSignInButtonProps = {
    onPress: () => void
    disabled?: boolean
    style?: ViewStyle
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
    onPress,
    disabled,
    style,
}) => {
    if (Platform.OS !== 'android') return null

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={[
                {
                    height: 44,
                    borderRadius: 8,
                    borderWidth: 1,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    paddingHorizontal: 12,
                    opacity: disabled ? 0.6 : 1,
                },
                style,
            ]}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={require('./assets/google-logo.png')}
                    style={{ width: 18, height: 18, marginRight: 12 }}
                    resizeMode="contain"
                />

                <Text
                    style={{ fontSize: 16, fontWeight: '600', color: '#000' }}
                >
                    Continue with Google
                </Text>
            </View>
        </Pressable>
    )
}

export function signInWithApple(): Promise<AppleCredential> {
    return ReactNativeAuth.signInWithApple()
}
export function signInWithGoogle(): Promise<any> {
    return ReactNativeAuth.signInWithGoogle()
}
