import { Decoder, Encoder, RandomNumberGenerator } from "../../../src/infra/helpers/protocols"
import { ShortnerUrlService } from "../../../src/infra/service/shortner-url-service"

const makeRandomNumberGeneratorStub = (): RandomNumberGenerator => {
    class RandomNumberGeneratorStub implements RandomNumberGenerator {
        exec(): Promise<number> {
            return new Promise(resolve => resolve(123456))
        }
    }
    return new RandomNumberGeneratorStub()
}

const makeEncoder = (): Encoder => {
    class EncoderStub implements Encoder {
        encode(randomNumber: number): Promise<string> {
            return new Promise(resolve => resolve('any_url'))
        }
    }
    return new EncoderStub()
}

const makeDecoder = (): Decoder => {
    class DecoderStub implements Decoder {
        decode(shortUrl: string): Promise<number> {
            return new Promise(resolve => resolve(123456))
        }
    }
    return new DecoderStub()
}

interface SutTypes {
    sut: ShortnerUrlService
    randomNumberGeneratorStub: RandomNumberGenerator
    encoderStub: Encoder
    decoderStub: Decoder
}

const makeSut = (): SutTypes => {
    const randomNumberGeneratorStub = makeRandomNumberGeneratorStub()
    const encoderStub = makeEncoder()
    const decoderStub = makeDecoder()
    const dependencies: ShortnerUrlService.Dependencies = {
        randomNumberGenerator: randomNumberGeneratorStub,
        encoder: encoderStub,
        decoder: decoderStub
    }
    const sut = new ShortnerUrlService(dependencies)
    return {
        sut,
        randomNumberGeneratorStub,
        encoderStub,
        decoderStub
    }
}

describe('ShortnerUrlService', () => {
    describe('RandomNumberGenerator', () => {
        it('Should throw if RandomNumberGenerator throws', async () => {
            const { sut, randomNumberGeneratorStub } = makeSut()
            jest.spyOn(randomNumberGeneratorStub, 'exec').mockRejectedValueOnce(new Error())
            const promise = sut.exec('any_url')
            await expect(promise).rejects.toThrow()
        })

    })
})