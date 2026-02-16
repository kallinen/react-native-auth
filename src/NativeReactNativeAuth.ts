import { TurboModuleRegistry, type TurboModule } from 'react-native'
import type { AppleCredential } from './types'

export interface Spec extends TurboModule {
    signInWithApple(): Promise<AppleCredential>
    signInWithGoogle(): Promise<any>
}

export default TurboModuleRegistry.getEnforcing<Spec>('ReactNativeAuthModule')
