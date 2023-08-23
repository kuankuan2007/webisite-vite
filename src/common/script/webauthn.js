import { getRegistrationOptions, verificationRegistration, getAuthenticationOptions, verificationAuthentication } from "./connection"
export function checkSupport() {
    return new Promise((resolve, reject) => {
        if (window.PublicKeyCredential &&
            PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable &&
            PublicKeyCredential.isConditionalMediationAvailable) {
            // Check if user verifying platform authenticator is available.  
            Promise.all([
                PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
                PublicKeyCredential.isConditionalMediationAvailable(),
            ]).then(results => {
                if (results.every(r => r === true)) {
                    reject()
                } else {
                    resolve()
                }
            });
        } else {
            reject()
        }
    })
}
export async function createKeys() {
    let options = await getRegistrationOptions()
    navigator.credentials.create({ publicKey: options }).then(
        result => {
            console.log(result)
            verificationRegistration(result)
        },
        reason => {
            console.warn(reason)
        }
    )
}
export async function checkLogin() {
    let {options,id} = await getAuthenticationOptions()
    navigator.credentials.get({ publicKey: options }).then(
        result => {
            console.log(result)
            verificationAuthentication(result,id)
        },
        reason => {
            console.warn(reason)
        }
    )
}