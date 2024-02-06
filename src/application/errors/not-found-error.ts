export class NotFoundError extends Error {
    constructor(param: string){
        super(`Not Found: ${param}`)
        this.name = 'NotFoundError'
    }
}