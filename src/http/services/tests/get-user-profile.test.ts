import { InMemoryRepository } from '@/http/repositories/in-memory/in-memory-repository'
import { test, describe, beforeEach, expect } from 'vitest'
import { GetUserProfileService } from '../get-user-profile.service'
import { UserProfileExistsError } from '../errors/user-profile-exists-error'

let repository: InMemoryRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    repository = new InMemoryRepository()
    sut = new GetUserProfileService(repository)
  })

  test('should be able to get user profile', async () => {
    const { id } = await repository.create({
      name: 'John Doe',
      email: '4lUesh@example.com',
      password_hash: '123456',
    })

    const user = await sut.execute({
      userId: id,
    })

    expect(user.user.id).toEqual(id)
  })

  test('should not be able to get user profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(UserProfileExistsError)
  })
})