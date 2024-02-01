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
        shortner(longerUrl: ShortnerUrl.Params): Promise<ShortnerUrl.Result> {
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
    it('Should return a shortUrl if already exists', async () => {
        const { sut } = makeSut()
        const longUrl = 'any_url'
        const result = await sut.add(longUrl)
        expect(result).toEqual({
            id: 'any_id',
            shortUrl: 'any_url',
            longUrl
        })
    })
})