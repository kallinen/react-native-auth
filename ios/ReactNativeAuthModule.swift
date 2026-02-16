import AuthenticationServices
import Foundation
import React
import UIKit

@objc(ReactNativeAuthModule)
final class ReactNativeAuthModule: NSObject, ASAuthorizationControllerDelegate,
  ASAuthorizationControllerPresentationContextProviding
{

  private var resolve: RCTPromiseResolveBlock?
  private var reject: RCTPromiseRejectBlock?
  private var authController: ASAuthorizationController?

  @objc
  func signInWithApple(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {

    DispatchQueue.main.async {
      if self.resolve != nil {
        reject("E_IN_PROGRESS", "Apple sign-in already in progress", nil)
        return
      }

      self.resolve = resolve
      self.reject = reject

      let provider = ASAuthorizationAppleIDProvider()
      let request = provider.createRequest()
      request.requestedScopes = [.fullName, .email]

      let controller = ASAuthorizationController(authorizationRequests: [request])
      self.authController = controller
      controller.delegate = self
      controller.presentationContextProvider = self
      controller.performRequests()
    }
  }

  func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
    for scene in UIApplication.shared.connectedScenes {
      guard
        let windowScene = scene as? UIWindowScene,
        scene.activationState == .foregroundActive
      else { continue }

      if let window = windowScene.windows.first(where: { $0.isKeyWindow }) {
        return window
      }
    }

    return ASPresentationAnchor()
  }

  func authorizationController(
    controller: ASAuthorizationController,
    didCompleteWithAuthorization authorization: ASAuthorization
  ) {
    defer {
      self.resolve = nil
      self.reject = nil
      self.authController = nil
    }

    guard let credential = authorization.credential as? ASAuthorizationAppleIDCredential else {
      reject?("E_NO_CREDENTIAL", "Missing AppleID credential", nil)
      return
    }

    let user = credential.user

    let identityToken: String? = credential.identityToken.flatMap {
      String(data: $0, encoding: .utf8)
    }
    let authorizationCode: String? = credential.authorizationCode.flatMap {
      String(data: $0, encoding: .utf8)
    }

    var fullNameDict: [String: Any]? = nil
    if let fullName = credential.fullName {
      fullNameDict = [
        "givenName": fullName.givenName as Any,
        "familyName": fullName.familyName as Any,
        "middleName": fullName.middleName as Any,
        "namePrefix": fullName.namePrefix as Any,
        "nameSuffix": fullName.nameSuffix as Any,
        "nickname": fullName.nickname as Any,
      ]
    }

    let result: [String: Any] = [
      "user": user,
      "identityToken": identityToken as Any,
      "authorizationCode": authorizationCode as Any,
      "email": credential.email as Any,
      "fullName": fullNameDict as Any,
    ]
    resolve?(result)
  }

  func authorizationController(
    controller: ASAuthorizationController, didCompleteWithError error: Error
  ) {
    defer {
      self.resolve = nil
      self.reject = nil
      self.authController = nil
    }
    reject?("E_AUTH_FAILED", error.localizedDescription, error)
  }

  @objc
  static func requiresMainQueueSetup() -> Bool { true }
}
