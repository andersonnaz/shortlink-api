import { AddUrlRepository, LoadByLongerUrlRepository, LoadUrlRepository } from "../../../src/data/protocols"
import { DbLoadUrlRepository } from "../../../src/data/use-cases/db-load-url-repository"
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

        loadLongUrl(shorterUrl: LoadUrlRepository.Params): Promise<LoadUrlRepository.Result> {
            return new Promise(resolve => resolve({
                id: 'any_id',
                longUrl: 'any_url'
            }))
        }

        loadShortUrl(longerUrl: LoadByLongerUrlRepository.Params): Promise<LoadByLongerUrlRepository.Result> {
            return new Promise(resolve => resolve({
                id: 'any_id',
                shortUrl: 'any_url'
            }))
        }

    }

    return new UrlRepositoryStub()
}

interface SutTypes {
    sut: DbLoadUrlRepository
    urlRepositoryStub: UrlRepository
}

const makeSut = (): SutTypes => {
    const urlRepositoryStub = makeUrlRepository()
    const sut = new DbLoadUrlRepository({
        urlRepository: urlRepositoryStub
    })
    return {
        sut,
        urlRepositoryStub
    }
}

describe('DbLoadUrlRepository', () => {
    const urlProps = {
        id: 'any_id',
        shortUrl: 'any_url',
        longUrl: 'any_url'
    }

    it('Should throw if LoadLongUrl throws', async () => {
        const { sut, urlRepositoryStub } = makeSut()
        jest.spyOn(urlRepositoryStub, 'loadLongUrl').mockRejectedValueOnce(new Error())
        const promise = sut.load(urlProps.shortUrl)
        expect(promise).rejects.toThrow()
    })
})