import {authorizeDrive, loadGoogleAuth, logoutToken} from "./GoogleAuth";
import {createDriveTextFile, getDriveFile, getDriveFileID, updateDriveTextFile} from "./GoogleDriveAPI";

export async function getSimpleDriveFile(clientID: string, fileName: string): Promise<string | undefined> {
    await loadGoogleAuth()
    const token = await authorizeDrive('https://www.googleapis.com/auth/drive.appdata', clientID)
    try {
        const id = await getDriveFileID(token, `name='${fileName}'`)
        if (id === undefined) {
            return undefined
        }
        return await getDriveFile(id, token);
    } catch (error) {
        console.error(error)
        return undefined
    } finally {
        await logoutToken(token)
    }
}

export async function setSimpleDriveFile(clientID: string, fileName: string, content: string): Promise<void> {
    await loadGoogleAuth()
    const token = await authorizeDrive('https://www.googleapis.com/auth/drive.appdata', clientID)
    try {
        const id = await getDriveFileID(token, `name='${fileName}'`)
        if (id) {
            await updateDriveTextFile({
                id: id,
                name: fileName,
                content: content,
                token: token,
            })
        } else {
            await createDriveTextFile({
                name: fileName,
                content: content,
                token: token,
            })
        }
    } catch (error) {
        console.error(error)
    } finally {
        await logoutToken(token)
    }
}
