import axios, {AxiosInstance} from 'axios'
import {TEST_HTTP_STATUS_CODE, testServerPort} from "./testCommon";

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Cache'] = 'no-cache'
axios.defaults.withCredentials = true

export function createAxiosInstance(): AxiosInstance {

    const instance = axios.create({
        baseURL: `https://localhost:${testServerPort}`,
        timeout: 1000
    })

    instance.interceptors.response.use((response :any) => {
        //console.log("success ===========================")
        //console.log(response)
        return response

    }, (error: any) => {
        //console.log("error ===========================")
        //console.log(error)
        //console.log("error.response ===========================")
        //console.log(error.response)
        if (error.response) {

            const {
                status, data, headers
            } = error.response

            const isChekcAbleHttpStatusCode: boolean = TEST_HTTP_STATUS_CODE.UNAUTHENTICATED === Number(status)
            const isValidPayload: boolean = data && data.status && data.message
            const isContentTypewhen4xx: boolean = isChekcAbleHttpStatusCode && (!headers['content-type'] || headers['content-type'].trim() !== 'application/json;charset=utf-8')

            if(isContentTypewhen4xx) {
                return Promise.reject({
                    status,
                    data
                })
            } else if(status && isChekcAbleHttpStatusCode && isValidPayload) {
                return Promise.resolve({
                    status,
                    data
                })
            } else {
                return Promise.reject(error)
            }
        } else {
            return Promise.reject(error)
        }

    })

    return instance

}