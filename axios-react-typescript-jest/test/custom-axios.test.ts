import axios from 'axios'
import * as url from 'url'
import { clearServer, defineSpec, TEST_HTTP_STATUS_CODE, testServerPort } from "../src/components/testCommon"
import { createAxiosInstance } from "../src/components/axiosWrapper";


let server: any

describe('Custom Axios', () => {

    afterEach(() => {
        clearServer(server)
    })

    test('HTTP 200 + JSON_PAYLOAD', (done) => {

        const payload = {
            status: TEST_HTTP_STATUS_CODE.OK,
            message: TEST_HTTP_STATUS_CODE[TEST_HTTP_STATUS_CODE.OK]
        }
        const targetUrl = '/http_200'

        server = defineSpec((req: any, res: any) => {
            res.setHeader('Content-Type', 'application/json;charset=utf-8')
            if (url.parse(req.url).pathname === targetUrl) {
                res.statusCode = TEST_HTTP_STATUS_CODE.OK
                res.end(JSON.stringify(payload))
            } else {
                res.statusCode = TEST_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                res.end()
            }

        }, () => {

            createAxiosInstance().get(`http://localhost:${testServerPort}${targetUrl}`).then((res: any) => {
                expect(res.status).toBe(TEST_HTTP_STATUS_CODE.OK)
                expect(payload).toEqual(res.data)
                done()
            })

        })

    })

    test('HTTP UNAUTHENTICATED - YES PAYLOAD - VALID PAYLOAD', (done) => {

        const payload = {
            status: TEST_HTTP_STATUS_CODE.UNAUTHENTICATED,
            message: TEST_HTTP_STATUS_CODE[TEST_HTTP_STATUS_CODE.UNAUTHENTICATED]
        }
        server = defineSpec((req: any, res: any) => {
            res.setHeader('Content-Type', 'application/json;charset=utf-8')
            if (url.parse(req.url).pathname === '/UNAUTHENTICATED') {
                res.statusCode = TEST_HTTP_STATUS_CODE.UNAUTHENTICATED
                res.end(JSON.stringify(payload))
            } else {
                res.statusCode = TEST_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                res.end()
            }

        }, () => {

            createAxiosInstance().get(`http://localhost:${testServerPort}/UNAUTHENTICATED`).then((res: any) => {
                expect(res.status).toBe(TEST_HTTP_STATUS_CODE.UNAUTHENTICATED)
                expect(payload).toEqual(res.data)
                done()
            }, null)

        })

    })

    test('HTTP UNAUTHENTICATED - YES PAYLOAD - INVALID PAYLOAD', (done) => {

        const payload = {
            statu: TEST_HTTP_STATUS_CODE.UNAUTHENTICATED,
            message: TEST_HTTP_STATUS_CODE[TEST_HTTP_STATUS_CODE.UNAUTHENTICATED]
        }
        server = defineSpec((req: any, res: any) => {
            res.setHeader('Content-Type', 'application/json;charset=utf-8')
            if (url.parse(req.url).pathname === '/UNAUTHENTICATED') {
                res.statusCode = TEST_HTTP_STATUS_CODE.UNAUTHENTICATED
                res.end(JSON.stringify(payload))
            } else {
                res.statusCode = TEST_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                res.end()
            }

        }, () => {

            createAxiosInstance().get(`http://localhost:${testServerPort}/UNAUTHENTICATED`).then( null , (err: any) => {
                done()
            })

        })

    })

    test('HTTP UNAUTHENTICATED - NO PAYLOAD', (done) => {

        server = defineSpec((req: any, res: any) => {
            res.setHeader('Content-Type', 'application/json;charset=utf-8')
            if (url.parse(req.url).pathname === '/UNAUTHENTICATED') {
                res.statusCode = TEST_HTTP_STATUS_CODE.UNAUTHENTICATED
            } else {
                res.statusCode = TEST_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            }
            res.end()
        }, () => {

            createAxiosInstance().get(`http://localhost:${testServerPort}/UNAUTHENTICATED`).then(null,(err: any) => {
                done()
            })

        })

    })

    test('NOT HTTP 200 - THROW 500', (done) => {

        server = defineSpec((req: any, res: any) => {
            res.setHeader('Content-Type', 'application/json;charset=utf-8')
            if (url.parse(req.url).pathname === '/UNAUTHENTICATED') {
                res.statusCode = TEST_HTTP_STATUS_CODE.UNAUTHENTICATED
            } else {
                res.statusCode = TEST_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            }
            res.end()
        }, () => {

            createAxiosInstance().get(`http://localhost:${testServerPort}/12312`).then(null, (err: any) => {
                expect(err.message).toBe('Request failed with status code 500')
                done()
            })

        })

    })

   test('HTTP 4xx + JSON_PAYLOAD + INVALID HEADER', (done) => {

        const payload = {
            status: TEST_HTTP_STATUS_CODE.UNAUTHENTICATED,
            message: TEST_HTTP_STATUS_CODE[TEST_HTTP_STATUS_CODE.UNAUTHENTICATED]
        }
        const targetUrl = '/http_4xx'

        server = defineSpec((req: any, res: any) => {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            if (url.parse(req.url).pathname === targetUrl) {
                res.statusCode = TEST_HTTP_STATUS_CODE.UNAUTHENTICATED
                res.end(JSON.stringify(payload))
            } else {
                res.statusCode = TEST_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                res.end()
            }

        }, () => {

            createAxiosInstance().get(`http://localhost:${testServerPort}${targetUrl}`).then(null,  (err: any) => {
                done()
            })

        })

    })

})