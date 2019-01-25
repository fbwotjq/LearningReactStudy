"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var testCommon_1 = require("./testCommon");
axios_1.default.defaults.headers.common['Content-Type'] = 'application/json';
axios_1.default.defaults.headers.common['Cache'] = 'no-cache';
axios_1.default.defaults.withCredentials = true;
function createAxiosInstance() {
    var instance = axios_1.default.create({
        baseURL: "https://localhost:" + testCommon_1.testServerPort,
        timeout: 1000,
        validateStatus: function (status) {
            return status >= 100 && status < 410;
        }
    });
    instance.interceptors.response.use(function (response) {
        console.log("success ===========================");
        //console.log(response)
        //console.dir(response)
        return response;
    }, function (error) {
        console.log("error ===========================");
        if (error.response) {
            var _a = error.response, status_1 = _a.status, data = _a.data;
            if (status_1 && testCommon_1.TEST_HTTP_STATUS_CODE.UNAUTHENTICATED === Number(status_1)) {
                console.log(error);
                return Promise.resolve({
                    status: testCommon_1.TEST_HTTP_STATUS_CODE.UNAUTHENTICATED,
                    data: 'success'
                });
            }
            else {
                return Promise.reject(error);
            }
        }
        else {
            return Promise.reject(error);
        }
        /*

        console.dir(error)*/
    });
    return instance;
}
exports.createAxiosInstance = createAxiosInstance;
