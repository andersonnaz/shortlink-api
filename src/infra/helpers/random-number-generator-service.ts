import { parse, v4 as uuid } from 'uuid'
import { RandomNumberGenerator } from './protocols'

export class RandomNumberGeneratorService implements RandomNumberGenerator {
    async exec(): Promise<number> {
        const parsedUuid = parse(uuid())
        const buffer = Buffer.from(parsedUuid)
        const result = buffer.readUInt32BE(0)
        return result
    }
}