import { parse, v4 as uuid } from 'uuid'

const randomNumberGenerator = (): number => {
    const parsedUuid = parse(uuid())
    const buffer = Buffer.from(parsedUuid)
    const result = buffer.readUInt32BE(0)
    return result
}

export {
    randomNumberGenerator
}