export class ConflictEmailUserError extends Error {
    constructor(){
        super('Email already exists')
        this.name = 'ConflictEmailUserError'
    }
}