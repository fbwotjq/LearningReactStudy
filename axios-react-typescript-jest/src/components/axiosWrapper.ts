import axios, {AxiosInstance} from 'axios'
import {TEST_HTTP_STATUS_CODE, testServerPort} from "./testCommon";

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Cache'] = 'no-cache'
axios.defaults.withCredentials = true

export function createAxiosInstance(): AxiosInstance {

    const instance = axios.create({
        baseURL: `https://localhost:${testServerPort}`,
        timeout: 1000,
        validateStatus: function (status) {
            return status >= 100 && status < 410
        }
    })

    instance.interceptors.response.use((response :any) => {
        console.log("success ===========================")
        //console.log(response)
        //console.dir(response)
        return response
    }, (error: any) => {
        console.log("error ===========================")
        if (error.response) {
            const {
                status, data
            } = error.response

            if(status && TEST_HTTP_STATUS_CODE.UNAUTHENTICATED === Number(status)) {
                console.log(error)
                return Promise.resolve({
                    status: TEST_HTTP_STATUS_CODE.UNAUTHENTICATED,
                    data: 'success'
                })
            } else {
                return Promise.reject(error)
            }
        } else {
            return Promise.reject(error)
        }
        /*

        console.dir(error)*/

    })

    return instance

}