export type DriveFileBaseMeta = { id: string; name: string }

export async function listDriveFiles(
    token: string,
    q: string = "",
): Promise<DriveFileBaseMeta[]> {
    const url = new URL("https://www.googleapis.com/drive/v3/files")
    url.searchParams.set("spaces", "appDataFolder")
    if (q !== "") url.searchParams.set("q", q)
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    if (response.ok) {
        const body: {
            files: DriveFileBaseMeta[]
        } = await response.json()
        return body.files.map((file) => {
            return { id: file.id, name: file.name }
        })
    } else {
        return Promise.reject(response)
    }
}

export async function getDriveFileID(token: string, q: string) {
    const files = await listDriveFiles(token, q)
    if (files.length > 0) {
        return files[0].id
    } else {
        return undefined
    }
}

export async function getDriveFile(id: string, token: string): Promise<string> {
    const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    )
    if (response.ok) {
        return await response.text()
    } else {
        return Promise.reject(response)
    }
}

export async function createDriveTextFile({
    name,
    content,
    token,
}: {
    name: string
    content: string
    token: string
}): Promise<DriveFileBaseMeta> {
    const metadata = {
        name: name,
        mimeType: "text/plain",
        parents: ["appDataFolder"],
    }
    const formData = new FormData()
    formData.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" }),
    )
    formData.append("file", new Blob([content], { type: "text/plain" }))
    const response = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        },
    )
    if (response.ok) {
        return await response.json()
    } else {
        return Promise.reject(response)
    }
}

export async function updateDriveTextFile({
    id,
    name,
    content,
    token,
}: {
    id: string
    name: string
    content: string
    token: string
}): Promise<DriveFileBaseMeta> {
    const metadata = {
        name: name,
        mimeType: "text/plain",
    }
    const formData = new FormData()
    formData.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" }),
    )
    formData.append("file", new Blob([content], { type: "text/plain" }))
    const response = await fetch(
        `https://www.googleapis.com/upload/drive/v3/files/${id}?uploadType=multipart`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        },
    )
    if (response.ok) {
        return await response.json()
    } else {
        return Promise.reject(response)
    }
}

export async function deleteDriveFile({
    id,
    token,
}: {
    id: string
    token: string
}) {
    const response = await fetch(
        `https://content.googleapis.com/drive/v3/files/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    )
    if (!response.ok) {
        return Promise.reject(response)
    }
}
