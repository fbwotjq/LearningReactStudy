export default function parseArraySearchParam(
    searchParams: URLSearchParams,
    key: string,
    defaultValue: string[]
) {
    const arrayParams = searchParams.get(key)
    return arrayParams ? arrayParams.split(',') : defaultValue
}