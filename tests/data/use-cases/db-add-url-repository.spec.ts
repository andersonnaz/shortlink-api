import { AddUrlRepository, LoadByLongerUrlRepository, ShortnerUrl } from "../../../src/data/protocols"
import { DbAddUrlRepository } from "../../../src/data/use-cases/db-add-url-repository"
import { AddShortenUrl } from "../../../src/domain/use-cases/add-shorten-url"
import { UrlRepository } from "../../../src/infra/repositories/url-repository"

const makeUrlRepository = (): UrlRepository => {
    class UrlRepositoryStub implements UrlRepository {
        add(params: AddUrlRepository.Params): Promise<AddUrlRepository.Result> {
            return new Promise(resolve => resolve({
                id: 'any_id',
                shortUrl: 'any_url',
                longUrl: 'any_url'
            }))
        }

        load(longerUrl: LoadByLongerUrlRepository.Params): Promise<LoadByLongerUrlRepository.Result> {
            return new Promise(resolve => resolve({
                id: 'any_id',
                shortUrl: 'any_url'
            }))
        }
    }
    return new UrlRepositoryStub()
}

const makeShortner = (): ShortnerUrl => {
    class ShortnerUrlStub implements ShortnerUrl {
        encode(longerUrl: ShortnerUrl.Params): Promise<ShortnerUrl.Result> {
            return new Promise(resolve => resolve({
                value: 'any_url'
            }))
        }

        decode(shorterUrl: ShortnerUrl.Params): Promise<ShortnerUrl.Result> {
            return new Promise(resolve => resolve({
                value: 'any_url'
            }))
        }

    }
    return new ShortnerUrlStub()
}

interface SutTypes {
    sut: DbAddUrlRepository
    urlRepositoryStub: UrlRepository
    shortnerStub: ShortnerUrl
}

const makeSut = (): SutTypes => {
    const urlRepositoryStub = makeUrlRepository()
    const shortnerStub = makeShortner()
    const dependencies: AddShortenUrl.Dependencies = {
        urlRepository: urlRepositoryStub,
        shortner: shortnerStub
    }
    const sut = new DbAddUrlRepository(dependencies)
    return {
        urlRepositoryStub,
        shortnerStub,
        sut
    }
}

describe('DbAddUrlRepository', () => {
    const urlProps = {
        id: 'any_id',
        shortUrl: 'any_url',
        longUrl: 'any_url'
    }

    describe('UrlRepository', () => {
        it('Should return a shortUrl if already exists', async () => {
            const { sut } = makeSut()
            const result = await sut.add(urlProps.longUrl)
            expect(result).toEqual(urlProps)
        })
    
        it('Should throw if LoadUrlRepository throws', async () => {
            const { sut, urlRepositoryStub } = makeSut()
            jest.spyOn(urlRepositoryStub, 'load').mockRejectedValueOnce(new Error())
            const promise = sut.add(urlProps.longUrl)
            await expect(promise).rejects.toThrow()
        })

        it('Should calls loadUrlRepository with correct value', async () => {
            const { sut, urlRepositoryStub } = makeSut()
            const loadUrlRepositorySpy = jest.spyOn(urlRepositoryStub, 'load')
            await sut.add(urlProps.longUrl)
            expect(loadUrlRepositorySpy).toHaveBeenCalledWith(urlProps.longUrl)
        })

        it('Should throw if AddUrlRepository throws', async () => {
            const { sut, urlRepositoryStub } = makeSut()
            jest.spyOn(urlRepositoryStub, 'load').mockReturnValueOnce(undefined)
            jest.spyOn(urlRepositoryStub, 'add').mockRejectedValueOnce(new Error())
            const promise = sut.add(urlProps.longUrl)
            await expect(promise).rejects.toThrow()
        })

        it('Should calls AddUrlRepository with correct values', async () => {
            const { sut, urlRepositoryStub } = makeSut()
            jest.spyOn(urlRepositoryStub, 'load').mockReturnValueOnce(undefined)
            const addUrlRepositorySpy = jest.spyOn(urlRepositoryStub, 'add')
            await sut.add(urlProps.longUrl)
            expect(addUrlRepositorySpy).toHaveBeenCalledWith({
                longUrl: urlProps.longUrl,
                shortUrl: urlProps.shortUrl
            })
        })
        it('Should return a shortUrl on success', async () => {
            const { sut, urlRepositoryStub } = makeSut()
            jest.spyOn(urlRepositoryStub, 'load').mockReturnValueOnce(undefined)
            const result = await sut.add(urlProps.longUrl)
            expect(result).toEqual(urlProps)
        })

    })

    describe('Shortner', () => {
        it('Should throw if Shortner throws', async () => {
            const { sut, urlRepositoryStub, shortnerStub } = makeSut()
            jest.spyOn(urlRepositoryStub, 'load').mockReturnValueOnce(undefined)
            jest.spyOn(shortnerStub, 'encode').mockRejectedValueOnce(new Error())
            const promise = sut.add(urlProps.longUrl)
            await expect(promise).rejects.toThrow()
        })

        it('Should calls Shortner with correct value', async () => {
            const { sut, urlRepositoryStub, shortnerStub } = makeSut()
            jest.spyOn(urlRepositoryStub, 'load').mockReturnValueOnce(undefined)
            const shortnerStubSpy = jest.spyOn(shortnerStub, 'encode')
            await sut.add(urlProps.longUrl)
            expect(shortnerStubSpy).toHaveBeenCalledWith(urlProps.longUrl)
        })
    })
})