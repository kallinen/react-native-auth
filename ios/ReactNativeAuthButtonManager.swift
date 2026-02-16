import Foundation
import AuthenticationServices
import React
import UIKit

@objc(ReactNativeAuthButtonManager)
final class ReactNativeAuthButtonManager: RCTViewManager {

  override func view() -> UIView! {
    if #available(iOS 13.0, *) {
      return ASAuthorizationAppleIDButton(type: .signIn, style: .black)
    }
    return UIView()
  }

  override static func requiresMainQueueSetup() -> Bool { true }
}