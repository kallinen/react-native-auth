export interface AppleFullName {
    givenName?: string | null
    familyName?: string | null
    middleName?: string | null
    namePrefix?: string | null
    nameSuffix?: string | null
    nickname?: string | null
}

export interface AppleCredential {
    user: string
    identityToken?: string | null
    authorizationCode?: string | null
    email?: string | null
    fullName?: AppleFullName | null
}

export interface GoogleCredential {
    email?: string | null
    displayName?: string | null
    familyName?: string | null
    givenName?: string | null
    idToken: string
    userId: string
}
