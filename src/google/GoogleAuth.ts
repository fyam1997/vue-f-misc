export async function loadGoogleAuth(): Promise<void> {
    // skip if library already loaded
    if (typeof google !== 'undefined') {
        return Promise.resolve()
    }
    return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.addEventListener("load", () => {
            resolve()
        })
        script.addEventListener("error", (error) => {
            reject(error)
        })
        script.src = "https://accounts.google.com/gsi/client?hl=fr"
        script.async = true
        script.defer = true
        document.head.appendChild(script)
    })
}

export async function authorizeDrive(scope: string, clientID: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const client = google.accounts.oauth2.initTokenClient({
            client_id: clientID,
            callback: response => resolve(response.access_token),
            error_callback: reject,
            scope: scope,
        })
        client.requestAccessToken()
    })
}

export async function logoutToken(token: string): Promise<void> {
    return new Promise((resolve) => {
        google.accounts.oauth2.revoke(token, () => {
            resolve()
        })
    })
}
