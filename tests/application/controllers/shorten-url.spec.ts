import { ShortenUrl } from "../../../src/application/controllers/shorten-url"
import { HttpRequest, HttpResponse, serverError } from "../../../src/application/helpers"
import { AddShortenUrl } from "../../../src/domain/use-cases"

const makeAddShortenUrl = (): AddShortenUrl => {
    class AddShortenUrlStub implements AddShortenUrl {
        add(longUrl: AddShortenUrl.Params): Promise<AddShortenUrl.Result> {
            return new Promise(resolve => resolve({
                id: 'any_id',
                shortUrl: 'any_url',
                longUrl: 'any_url'
            }))
        }
    }
    return new AddShortenUrlStub()
}

interface SutTypes {
    sut: ShortenUrl
    shortenUrlStub: AddShortenUrl
}

const makeSut = (): SutTypes => {
    const addShortenUrlStub = makeAddShortenUrl()
    const dependencies: ShortenUrl.Dependencies = {
        shortenUrl: addShortenUrlStub
    }
    const sut = new ShortenUrl(dependencies)
    return {
        sut,
        shortenUrlStub: addShortenUrlStub
    }
}

describe('ShortenUrl', () => {
    const fakeHttpRequest: HttpRequest = {
        body: {
            longUrl: 'any_url'
        }
    }

    it('Should return 500 (ServerError) if ShortenUrl throws', async () => {
        const { sut, shortenUrlStub} = makeSut()
        const fakeError = new Error()
        fakeError.stack = 'any_stack'
        jest.spyOn(shortenUrlStub, 'add').mockRejectedValueOnce(fakeError)
        const httpResponse = await sut.handle(fakeHttpRequest)
        expect(httpResponse).toEqual(serverError(fakeError))
    })

    it('Should call ShortenUrl with the correct value', async () => {
        const { sut, shortenUrlStub } = makeSut()
        const shortenUrlSpy = jest.spyOn(shortenUrlStub, 'add')
        await sut.handle(fakeHttpRequest)
        expect(shortenUrlSpy).toHaveBeenCalledWith(fakeHttpRequest.body.longUrl)
    })
})