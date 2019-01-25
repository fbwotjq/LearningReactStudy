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

            if (url.parse(req.url).pathname === targetUrl) {
                res.statusCode = TEST_HTTP_STATUS_CODE.OK
                res.setHeader('Content-Type', 'application/json;charset=utf-8');
                res.end(JSON.stringify(payload));
            } else {
                res.statusCode = TEST_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR

            }
            res.end()

        }, () => {

            createAxiosInstance().get(`http://localhost:${testServerPort}${targetUrl}`).then((res: any) => {
                expect(res.status).toBe(TEST_HTTP_STATUS_CODE.OK)
                expect(payload).toEqual(res.data)
                done()
            })

        })

    })

    test('HTTP UNAUTHENTICATED', (done) => {

        server = defineSpec((req: any, res: any) => {
            if (url.parse(req.url).pathname === '/UNAUTHENTICATED') {
                res.statusCode = TEST_HTTP_STATUS_CODE.UNAUTHENTICATED
            } else {
                res.statusCode = TEST_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            }
            res.end()
        }, () => {

            createAxiosInstance().get(`http://localhost:${testServerPort}/UNAUTHENTICATED`).then((res: any) => {
                expect(res.status).toBe(TEST_HTTP_STATUS_CODE.UNAUTHENTICATED)
                done()
            }, null)

        })

    })


    test('NOT HTTP 200 - THROW 500', (done) => {

        server = defineSpec((req: any, res: any) => {
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

})