export declare function loadGoogleAuth(): Promise<void>;
export declare function authorizeDrive(scope: string, clientID: string): Promise<string>;
export declare function logoutToken(token: string): Promise<void>;
