
export default {
    HTTP_STATUS_CODES: {
        OK: 200 as number,
        CREATED: 201 as number,
        BAD_REQUEST: 400 as number,
        UNAUTHORIZED: 401 as number,
        FORBIDDEN: 403 as number,
        NOT_FOUND: 404 as number,
        GONE: 410 as number,
        SERVER_ERROR: 500 as number,
        SERVICE_UNAVAILABLE: 503 as number
    },
    ROLE: {
        ADMIN: 1,
        CUSTOMSER: 0
    },
    /**
    * @author Nguyễn Quốc Hào
    * @created_at 16/12/2022
    * @description Millisecond / Second
    * @param { "Name":"value" => Example: Male: 1 }
    */
    _30_SECONDS: 30 * 1000 as number,
    _10_SECONDS: 10 * 1000 as number,
    _1_MINUTES: 60 * 1000 as number,
    _5_MINUTES: 5 * 60 * 1000 as number,
    _10_MINUTES: 10 * 60 * 1000 as number,
    _15_MINUTES: 15 * 60 * 1000 as number,
    _1_DAY_S: 1000 * 60 * 60 * 24 as number,
    _7_DAY_S: 7 * 60 * 60 * 1000 as number,
    _1_HOURS_S: 60 * 60 * 1000 as number,
    _1_YEAR: 365 * 24 * 60 * 60 * 1000 as number,
    _1_MONTH: 30 * 24 * 60 * 60 * 1000 as number,

    // Delete User
    DELETED_DISABLE: 0 as number,
    DELETED_ENABLE: 1 as number
}