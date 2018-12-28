import * as qs from "qs";

const EMPTY_STRING = "";

export default function queryString(params: { [key: string]: any }): string {
    return qs.stringify(params, {
        encode: false,
        indices: false,
        arrayFormat: 'repeat',
        skipNulls: true,
        filter: (
            prefix: string,
            value: string | any[]
        ): string | any[] | undefined => {
            if (typeof value === 'string' && value.trim() === EMPTY_STRING) {
                return
            }
            if (value === undefined || value === null) {
                return
            }
            if (Array.isArray(value) && value.length === 0) {
                return
            }
            if(Array.isArray(value) && value.length !== 0 && prefix !== 'sort') {
                return value.join(',')
            }
            return value
        }
    });
}
