"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var TEST_HTTP_STATUS_CODE;
(function (TEST_HTTP_STATUS_CODE) {
    TEST_HTTP_STATUS_CODE[TEST_HTTP_STATUS_CODE["OK"] = 200] = "OK";
    TEST_HTTP_STATUS_CODE[TEST_HTTP_STATUS_CODE["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    TEST_HTTP_STATUS_CODE[TEST_HTTP_STATUS_CODE["UNAUTHENTICATED"] = 401] = "UNAUTHENTICATED";
})(TEST_HTTP_STATUS_CODE = exports.TEST_HTTP_STATUS_CODE || (exports.TEST_HTTP_STATUS_CODE = {}));
exports.testServerPort = 29999;
exports.defineSpec = function (serverSpec, clientSpec) {
    return http.createServer(serverSpec).listen(exports.testServerPort, clientSpec);
};
exports.clearServer = function (server) {
    if (server) {
        server.close();
        //@ts-ignore
        server = null;
    }
};
