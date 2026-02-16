# @kallinen/react-native-auth

Small library that provides Apple & Android sign-in capabilities

## Installation


```sh
npm install @kallinen/react-native-auth
```


## Usage

### iOS
Enable "Sign in with Apple" capability from xcode – Signing & Capabilities!

### Android
Add Google Web Client ID to `android/app/src/main/res/values/strings.xml`

```xml
<string name="google_web_client_id">MY_CLIENT_ID</string>
```

### Using the library in React Native

```js
import { AppleSignInButton, signInWithApple } from '@kallinen/react-native-auth'
// ...

export default function App() {
    const onPressLogin = async () => {
        const result = await signInWithApple()
        console.log(result)
    }

    return (
        <View style={styles.container}>
            <AppleSignInButton
                style={{ width: 240, height: 44 }}
                onPress={onPressLogin}
            />
        </View>
    )
}
```


## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT
