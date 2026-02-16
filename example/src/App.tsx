import { View, StyleSheet, Platform } from 'react-native'
import {
    AppleSignInButton,
    GoogleSignInButton,
    signInWithApple,
    signInWithGoogle,
} from '@kallinen/react-native-auth'

export default function App() {
    const onPressLogin = async () => {
        if (Platform.OS === 'ios') {
            const result = await signInWithApple()
            console.log(result)
        } else if (Platform.OS === 'android') {
            const result = await signInWithGoogle()
            console.log(result)
        }
    }

    return (
        <View style={styles.container}>
            <GoogleSignInButton onPress={onPressLogin} />
            <AppleSignInButton
                style={{ width: 240, height: 44 }}
                onPress={onPressLogin}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
