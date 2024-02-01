import { AddUrlRepository, LoadByLongerUrlRepository, ShortnerUrl } from "../../../src/data/protocols"
import { DbAddUrlRepository } from "../../../src/data/use-cases/db-add-url-repository"
import { AddShortenUrl } from "../../../src/domain/use-cases/add-shorten-url"

const makeAddUrlRepository = (): AddUrlRepository => {
    class AddUrlrepositoryStub implements AddUrlRepository {
        add(params: AddUrlRepository.Params): Promise<AddUrlRepository.Result> {
            return new Promise(resolve => resolve({
                id: 'any_id',
                shortUrl: 'any_url',
                longUrl: 'any_url'
            }))
        }
    }
    return new AddUrlrepositoryStub()
}

const makeLoadByLongerUrlRepository = (): LoadByLongerUrlRepository => {
    class LoadByLongerUrlRepositoryStub implements LoadByLongerUrlRepository {
        load(longerUrl: LoadByLongerUrlRepository.Params): Promise<LoadByLongerUrlRepository.Result> {
            return new Promise(resolve => resolve({
                id: 'any_id',
                shortUrl: 'any_url'
            }))
        }
    }
    return new LoadByLongerUrlRepositoryStub()
}

const makeShortner = (): ShortnerUrl => {
    class ShortnerUrlStub implements ShortnerUrl {
        exec(longerUrl: ShortnerUrl.Params): Promise<ShortnerUrl.Result> {
            return new Promise(resolve => resolve({
                shortUrl: 'any_url'
            }))
        }
    }
    return new ShortnerUrlStub()
}

interface SutTypes {
    sut: DbAddUrlRepository
    addUrlRepositoryStub: AddUrlRepository
    loadByLongerUrlRepositoryStub: LoadByLongerUrlRepository
    shortnerStub: ShortnerUrl
}

const makeSut = (): SutTypes => {
    const addUrlRepositoryStub = makeAddUrlRepository()
    const loadByLongerUrlRepositoryStub = makeLoadByLongerUrlRepository()
    const shortnerStub = makeShortner()
    const dependencies: AddShortenUrl.Dependencies = {
        addUrlRepository: addUrlRepositoryStub,
        loadUrlRepository: loadByLongerUrlRepositoryStub,
        shortner: shortnerStub
    }
    const sut = new DbAddUrlRepository(dependencies)
    return {
        addUrlRepositoryStub,
        loadByLongerUrlRepositoryStub,
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
    it('Should return a shortUrl if already exists', async () => {
        const { sut } = makeSut()
        const result = await sut.add(urlProps.longUrl)
        expect(result).toEqual(urlProps)
    })

    it('Should throw if LoadUrlRepository throws', async () => {
        const { sut, loadByLongerUrlRepositoryStub } = makeSut()
        jest.spyOn(loadByLongerUrlRepositoryStub, 'load').mockRejectedValueOnce(new Error())
        const promise = sut.add(urlProps.longUrl)
        await expect(promise).rejects.toThrow()
    })

    it('Should return a shortUrl on success', async () => {
        const { sut, loadByLongerUrlRepositoryStub } = makeSut()
        jest.spyOn(loadByLongerUrlRepositoryStub, 'load').mockReturnValueOnce(undefined)
        const result = await sut.add(urlProps.longUrl)
        expect(result).toEqual(urlProps)
    })
})