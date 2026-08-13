// Fixture pages take their props from the query string, so one route per
// component can stand in for every documented combination
const flag = (params: URLSearchParams, name: string, fallback: boolean) => {
    const value = params.get(name)

    return value === null ? fallback : value === 'true'
}

const number = (params: URLSearchParams, name: string, fallback: number) => {
    const value = params.get(name)

    return value === null ? fallback : Number(value)
}

const text = (params: URLSearchParams, name: string, fallback = '') => {
    return params.get(name) ?? fallback
}

export {
    flag,
    number,
    text
}
