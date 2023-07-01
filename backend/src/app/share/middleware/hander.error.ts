class handerError {
    errorParse(error: string | Object | any) : string {
        const errorParse = JSON.parse(JSON.stringify(error))
        return errorParse.parent.code
    }
}

export default new handerError();