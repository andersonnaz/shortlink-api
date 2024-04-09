import { LoadUrl } from "../../../src/application/controllers"
import { HttpRequest, notFound, serverError } from "../../../src/application/helpers"
import { LoadLongerUrl } from "../../../src/domain/use-cases"

const makeLoadLongerUrl = (): LoadLongerUrl => {
    class LoadLongerUrlStub implements LoadLongerUrl {
        load(shortUrl: LoadLongerUrl.Params): Promise<LoadLongerUrl.Result> {
            return new Promise(resolve => resolve({
                longUrl: 'any_url'
            }))
        }
    }
    return new LoadLongerUrlStub()
}

interface SutTypes {
    sut: LoadUrl,
    loadUrlStub: LoadLongerUrl
}

const makeSut = (): SutTypes => {
    const loadUrlStub = makeLoadLongerUrl()
    const sut = new LoadUrl({
        loadUrl: loadUrlStub
    })
    return {
        sut,
        loadUrlStub
    }
}

describe('LoadUrl', () => {
    const fakeHttpRequest: HttpRequest = {
        params: {
            shortUrl: 'any_url'
        }
    }

    it('Should return 500 (ServerError) if LoadUrl throws', async () => {
        const { sut, loadUrlStub } = makeSut()
        const fakeError = new Error()
        fakeError.stack = 'any_stack'
        jest.spyOn(loadUrlStub, 'load').mockRejectedValueOnce(fakeError)
        const httpResponse = await sut.handle(fakeHttpRequest)
        expect(httpResponse).toEqual(serverError(fakeError))
    })

    it('Should call LoadUrl with the correct value', async () => {
        const { sut, loadUrlStub } = makeSut()
        const loadUrlSpy = jest.spyOn(loadUrlStub, 'load')
        await sut.handle(fakeHttpRequest)
        expect(loadUrlSpy).toHaveBeenCalledWith(fakeHttpRequest.params.shortUrl)
    })

    it('Should return 404 (NotFound) if LoadUrl returns undefined', async () => {
        const { sut, loadUrlStub } = makeSut()
        jest.spyOn(loadUrlStub, 'load').mockReturnValueOnce(undefined)
        const httpResponse = await sut.handle(fakeHttpRequest)
        expect(httpResponse).toEqual(notFound(fakeHttpRequest.params.shortUrl))
    })

    it('Should return 200 (success) if a shortUrl is found', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(fakeHttpRequest)
        expect(httpResponse).toStrictEqual({
            statusCode: 200,
            body: {
                longUrl: 'any_url'
            }
        })
    })
})