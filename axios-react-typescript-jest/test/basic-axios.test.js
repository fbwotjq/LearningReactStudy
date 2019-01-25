"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var url = require("url");
var testCommon_1 = require("../src/components/testCommon");
var server;
describe('Basic Axios', function () {
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
                res.end();
            }
            else {
                res.statusCode = testCommon_1.TEST_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
                res.end();
            }
        }, function () {
            axios_1.default.get("http://localhost:" + testCommon_1.testServerPort + targetUrl).then(function (res) {
                expect(res.status).toBe(testCommon_1.TEST_HTTP_STATUS_CODE.OK);
                expect(payload).toEqual(res.data);
                done();
            });
        });
    });
    test('NOT HTTP 200', function (done) {
        server = testCommon_1.defineSpec(function (req, res) {
            res.statusCode = testCommon_1.TEST_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            res.end();
        }, function () {
            axios_1.default.get("http://localhost:" + testCommon_1.testServerPort + "/12312").then(null, function (err) {
                expect(err.message).toBe('Request failed with status code 500');
                done();
            });
        });
    });
    test('HTTP UNAUTHENTICATED', function (done) {
        server = testCommon_1.defineSpec(function (req, res) {
            res.statusCode = testCommon_1.TEST_HTTP_STATUS_CODE.UNAUTHENTICATED;
            res.end();
        }, function () {
            axios_1.default.get("http://localhost:" + testCommon_1.testServerPort + "/UNAUTHENTICATED").then(null, function (err) {
                expect(err.message).toBe('Request failed with status code 401');
                done();
            });
        });
    });
});
