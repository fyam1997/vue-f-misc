export type DriveFileBaseMeta = {
    id: string;
    name: string;
};
export declare function listDriveFiles(token: string, q?: string): Promise<DriveFileBaseMeta[]>;
export declare function getDriveFileID(token: string, q: string): Promise<string | undefined>;
export declare function getDriveFile(id: string, token: string): Promise<string>;
export declare function createDriveTextFile({ name, content, token }: {
    name: string;
    content: string;
    token: string;
}): Promise<DriveFileBaseMeta>;
export declare function updateDriveTextFile({ id, name, content, token }: {
    id: string;
    name: string;
    content: string;
    token: string;
}): Promise<DriveFileBaseMeta>;
export declare function deleteDriveFile({ id, token }: {
    id: string;
    token: string;
}): Promise<undefined>;
