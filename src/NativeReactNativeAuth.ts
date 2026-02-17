import { TurboModuleRegistry, type TurboModule } from 'react-native'
import type { AppleCredential, GoogleCredential } from './types'

export interface Spec extends TurboModule {
    signInWithApple(): Promise<AppleCredential>
    signInWithGoogle(): Promise<GoogleCredential>
}

export default TurboModuleRegistry.getEnforcing<Spec>('ReactNativeAuthModule')
