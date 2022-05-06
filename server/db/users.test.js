const { faUpRightFromSquare } = require('@fortawesome/free-solid-svg-icons')
const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const users = require('./users')

// Prevent Jest from timing out (5s often isn't enough)
jest.setTimeout(10000)

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

// describe('getUserById', () => {
test('getUserById returns the correct user', () => {
  return users.getUserById('1', testDb).then((user) => {
    expect(user.id).toBe(1)
    expect(user.name).toBe('kelmarna')
    expect(user.description).toBe('the awesome developer')
    expect(user.rank).toBe('Bush Lord')
    expect(user.xp).toBe(1000)
    return null
  })
})

test('addUser adds a user to the users table', () => {
  const newUser = {
    id: 3,
    auth0_id: 69,
    name: 'Purious Fube',
    email: 'pfube@faUpRightFromSquare.com',
    description: 'great guy',
    rank: 'expert',
    xp: 9001,
  }
  return users.addUser(newUser, testDb).then((users) => {
    console.log(users)
    expect(users[2]).toBe('Purious Fube')
  })
})

// describe('createUser', () => {
//   it('creates a new user', () => {
//     const user = {
//       firstName: 'firstname',
//       lastName: 'lastname',
//       gardenId: 3,
//       email: 'random@emailz.co',
//       auth0Id: 'auth0|thisisfortesting',
//     }
//     return users
//       .createUser(user, testDb)
//       .then((ids) => users.getUserById(ids[0], testDb))
//       .then((user) => {
//         expect(user.id).not.toBeNull()
//         expect(user.firstName).toBe('firstname')
//         expect(user.lastName).toBe('lastname')
//         expect(user.gardenId).toBe(3)
//         expect(user.email).toBe('random@emailz.co')
//         expect(user.auth0Id).toBe('auth0|thisisfortesting')
//         return null
//       })
//   })
// })

// describe('userExists', () => {
//   it('returns true if user exists', () => {
//     return users
//       .userExists('auth0|61414f84d35ac900717bc280', testDb)
//       .then((exists) => {
//         expect(exists).toBeTruthy()
//         return null
//       })
//   })
//   it('returns false if user not found', () => {
//     return users
//       .userExists('other-non-existent-user', testDb)
//       .then((exists) => {
//         expect(exists).toBeFalsy()
//         return null
//       })
//   })
// })

// describe('get users details by garden', () => {
//   it('returns the details of the non admin users in related garden', () => {
//     expect.assertions(2)
//     return users.getUserDetailsByGarden('1', testDb).then((users) => {
//       expect(users).toHaveLength(1)
//       expect(users[0].is_admin).toBeFalsy()
//       return null
//     })
//   })
// })
