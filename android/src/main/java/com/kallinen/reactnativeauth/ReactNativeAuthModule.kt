package com.kallinen.reactnativeauth

import androidx.credentials.CredentialManager
import androidx.credentials.CustomCredential
import androidx.credentials.GetCredentialRequest
import com.facebook.react.bridge.*
import com.google.android.libraries.identity.googleid.GetGoogleIdOption
import kotlinx.coroutines.*
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential

class ReactNativeAuthModule(private val reactContext: ReactApplicationContext) :
  NativeReactNativeAuthSpec(reactContext) {

  private val mainScope = CoroutineScope(SupervisorJob() + Dispatchers.Main.immediate)

  override fun signInWithGoogle(promise: Promise) {
    val activity = reactApplicationContext.getCurrentActivity()
    if (activity == null) {
      promise.reject("E_NO_ACTIVITY", "No current Activity")
      return
    }

    val credentialManager = CredentialManager.create(activity)
    val serverClientId = reactContext.getString(R.string.google_web_client_id)

    val googleIdOption =
      GetGoogleIdOption.Builder()
        .setServerClientId(serverClientId)
        .setFilterByAuthorizedAccounts(false)
        .build()

    val request = GetCredentialRequest.Builder().addCredentialOption(googleIdOption).build()

    mainScope.launch {
      try {
        val result =
          credentialManager.getCredential(
            context = activity,
            request = request,
          )

        val credential = result.credential
        if (credential is CustomCredential &&
          credential.type == GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL
        ) {
          val googleCred = GoogleIdTokenCredential.createFrom(credential.data)

          val map =
            Arguments.createMap().apply {
              putString("idToken", googleCred.idToken)
              putString("userId", googleCred.uniqueId)
              putString("displayName", googleCred.displayName)
              putString(
                "givenName", googleCred.givenName
              )
              putString(
                "familyName", googleCred.familyName
              )
              putString("email", googleCred.email)
            }

          promise.resolve(map)
        } else {
          promise.reject(
            "E_UNEXPECTED_CREDENTIAL",
            "Unexpected credential type: ${credential::class.java.name}"
          )
        }
      } catch (t: Throwable) {
        promise.reject("E_GOOGLE_SIGNIN", t.message, t)
      }
    }
  }

  override fun signInWithApple(promise: Promise) {
    promise.reject("E_UNSUPPORTED", "Sign in with Apple is not implemented on Android")
  }

  override fun invalidate() {
    super.invalidate()
    mainScope.cancel()
  }

  companion object {
    const val NAME = NativeReactNativeAuthSpec.NAME
  }
}
