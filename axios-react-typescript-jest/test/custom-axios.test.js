"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = require("url");
var testCommon_1 = require("../src/components/testCommon");
var axiosWrapper_1 = require("../src/components/axiosWrapper");
var server;
describe('Custom Axios', function () {
    afterEach(function () {
        testCommon_1.clearServer(server);
    });
    test('HTTP 200 + JSON_PAYLOAD', function (done) {
        var payload = {
            status: testCommon_1.TEST_HTTP_STATUS_CODE.OK,
            message: testCommon_1.TEST_HTTP_STATUS_CODE[testCommon_1.TEST_HTTP_STATUS_CODE.OK]
        };
        var targetUrl = '/http_200';
        server = testCommon_1.defineSpec(function (req, res) {
            if (url.parse(req.url).pathname === targetUrl) {
                res.statusCode = testCommon_1.TEST_HTTP_STATUS_CODE.OK;
                res.setHeader('Content-Type', 'application/json;charset=utf-8');
                res.end(JSON.stringify(payload));
            }
            else {
                res.statusCode = testCommon_1.TEST_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            }
            res.end();
        }, function () {
            axiosWrapper_1.createAxiosInstance().get("http://localhost:" + testCommon_1.testServerPort + targetUrl).then(function (res) {
                expect(res.status).toBe(testCommon_1.TEST_HTTP_STATUS_CODE.OK);
                expect(payload).toEqual(res.data);
                done();
            });
        });
    });
    test('HTTP UNAUTHENTICATED', function (done) {
        server = testCommon_1.defineSpec(function (req, res) {
            if (url.parse(req.url).pathname === '/UNAUTHENTICATED') {
                res.statusCode = testCommon_1.TEST_HTTP_STATUS_CODE.UNAUTHENTICATED;
            }
            else {
                res.statusCode = testCommon_1.TEST_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            }
            res.end();
        }, function () {
            axiosWrapper_1.createAxiosInstance().get("http://localhost:" + testCommon_1.testServerPort + "/UNAUTHENTICATED").then(function (res) {
                expect(res.status).toBe(testCommon_1.TEST_HTTP_STATUS_CODE.UNAUTHENTICATED);
                done();
            }, null);
        });
    });
    test('NOT HTTP 200 - THROW 500', function (done) {
        server = testCommon_1.defineSpec(function (req, res) {
            if (url.parse(req.url).pathname === '/UNAUTHENTICATED') {
                res.statusCode = testCommon_1.TEST_HTTP_STATUS_CODE.UNAUTHENTICATED;
            }
            else {
                res.statusCode = testCommon_1.TEST_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            }
            res.end();
        }, function () {
            axiosWrapper_1.createAxiosInstance().get("http://localhost:" + testCommon_1.testServerPort + "/12312").then(null, function (err) {
                expect(err.message).toBe('Request failed with status code 500');
                done();
            });
        });
    });
});
