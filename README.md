# Inversion of Control Container

This project represents an initial attempt at building an Inversion of Control Container. The majority of the code exists in `src/ioc-container/container.ts`
I wrote a test suite to hold me to the mark as well as work as examples. You can see the tests in action by running `npm run test:ui`

## Notes

### TS

I chose to use Typescript for the project, though it does not always agree with what I am doing. I am using a `Proxy` to allow access to properties on an object that aren't actually there. As such it is hard to let TS know how to handle these things.

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/vitest-dev-vitest-wbtgvr)

- [x] 🥦 setup project infrastructure
- [x] 🥦 create initial tests
- [ ] 🥦 create roadmap
- [ ] 🥦 create type def for container

- [x] 🥦 create initial container

  - [x] 🥦 register Map
  - [x] 🥦 initialized Map
  - [x] 🥦 isRegistered, hasInstance for debugging
  - [x] 🥦 register function
  - [ ] 🍰 unregister function
  - [x] 🥦 get handling
  - [x] 🥦 happy path tests passing
  - [x] 🍰 error handling tests passing
  - [x] 🥦 Inject

- [x] 🥦 revisit roadmap

- [ ] 🥦 Clean UP

  - [x] 🥦 Pull out types
  - [ ] 🍰 Fix type errors
  - [ x 🥦 Pull util functions
  - [x] 🥦 Document functionality
  - [x] 🥦 Document strange parts
  - [x] 🥦 Update README

- [ ] 🍰 example app using container

  - [ ] 🥦 register DB
  - [ ] 🥦 register Auth
  - [ ] 🥦 register User API
  - [ ] 🥦 Inject User API

- [ ] 🍰 Add Lifecycle Handling for each service

  - [ ] 🥦 create tests for creation lifecycles
  - [ ] 🥦 `beforeCreation`
  - [ ] 🥦 `afterCreate`
  - [ ] 🍰 create tests for other lifecycles
  - [ ] 🍰 `onGet`
  - [ ] 🍰 `beforeKill`
  - [ ] 🍰 `afterKill`

- [ ] 🍰 Other Service Options
  - [ ] 🍰 Singleton vs Transient
  - [ ] 🍰 Memoize
  - [ ] 🍰 Hidden
  - [ ] 🍰 `beforeKill`
