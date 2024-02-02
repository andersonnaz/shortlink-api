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
    describe('Encode method', () => {
        describe('RandomNumberGenerator', () => {
            it('Should throw if RandomNumberGenerator throws', async () => {
                const { sut, randomNumberGeneratorStub } = makeSut()
                jest.spyOn(randomNumberGeneratorStub, 'exec').mockRejectedValueOnce(new Error())
                const promise = sut.encode('any_url')
                await expect(promise).rejects.toThrow()
            })
    
            it('Should return an Error if RandomNumberGenerator returns a number smaller than zero', async () => {
                const { sut, randomNumberGeneratorStub } = makeSut()
                jest.spyOn(randomNumberGeneratorStub, 'exec').mockReturnValueOnce(new Promise(resolve => resolve(-123456)))
                const promise = sut.encode('any_url')
                await expect(promise).rejects.toThrow()
            })
    
        })
    
        describe('Encoder', () => {
            it('Should throw if Encoder throws', async () => {
                const { sut, encoderStub } = makeSut()
                jest.spyOn(encoderStub, 'encode').mockRejectedValueOnce(new Error())
                const promise = sut.encode('any_url')
                await expect(promise).rejects.toThrow()
            }) 
        })

        it('Should return a value encoded', async () => {
            const { sut } = makeSut()
            const result = await sut.encode('any_url')
            expect(result).toStrictEqual({ value: 'any_url' })
        })
    })

    describe('Decode Method', () => {
        it('Should throw if Decoder throws', async () => {
            const { sut, decoderStub } = makeSut()
            jest.spyOn(decoderStub, 'decode').mockRejectedValueOnce(new Error())
            const promise = sut.decode('any_url')
            await expect(promise).rejects.toThrow()
        })

    })
})