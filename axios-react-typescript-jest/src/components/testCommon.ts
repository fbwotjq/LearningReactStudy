import {Server} from "http";
import * as http from "http";

export enum TEST_HTTP_STATUS_CODE {
    OK = 200,
    INTERNAL_SERVER_ERROR = 500,
    UNAUTHENTICATED = 401
}
export const testServerPort: number = 29999
export const defineSpec = (serverSpec: (req: any, res: any) => void, clientSpec: () => void): Server =>
    http.createServer(serverSpec).listen(testServerPort, clientSpec)

export const clearServer = (server: Server): void => {
    if (server) {
        server.close()
        //@ts-ignore
        server = null
    }
}