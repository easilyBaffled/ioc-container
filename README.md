# Inversion of Control Container

This project represents an initial attempt at building an Inversion of Control Container. The majority of the code exists in `src/ioc-container/container.ts`
I wrote a test suite to hold me to the mark as well as work as examples. You can see the tests in action by running `npm run test:ui`

## Notes

### TS

I chose to use Typescript for the project, though it does not always agree with what I am doing. I am using a `Proxy` to allow access to properties on an object that aren't actually there. As such it is hard to let TS know how to handle these things.

[Edit on StackBlitz ??∴??](https://stackblitz.com/edit/vitest-dev-vitest-wbtgvr)

- [x] ??它 setup project infrastructure
- [x] ??它 create initial tests
- [ ] ??它 create roadmap
- [ ] ??它 create type def for container

- [x] ??它 create initial container

  - [x] ??它 register Map
  - [x] ??它 initialized Map
  - [x] ??它 isRegistered, hasInstance for debugging
  - [x] ??它 register function
  - [ ] ???? unregister function
  - [x] ??它 get handling
  - [x] ??它 happy path tests passing
  - [x] ???? error handling tests passing
  - [x] ??它 Inject

- [x] ??它 revisit roadmap

- [ ] ??它 Clean UP

  - [x] ??它 Pull out types
  - [ ] ???? Fix type errors
  - [ x ??它 Pull util functions
  - [x] ??它 Document functionality
  - [x] ??它 Document strange parts
  - [x] ??它 Update README

- [ ] ???? example app using container

  - [ ] ??它 register DB
  - [ ] ??它 register Auth
  - [ ] ??它 register User API
  - [ ] ??它 Inject User API

- [ ] ???? Add Lifecycle Handling for each service

  - [ ] ??它 create tests for creation lifecycles
  - [ ] ??它 `beforeCreation`
  - [ ] ??它 `afterCreate`
  - [ ] ???? create tests for other lifecycles
  - [ ] ???? `onGet`
  - [ ] ???? `beforeKill`
  - [ ] ???? `afterKill`

- [ ] ???? Other Service Options
  - [ ] ???? Singleton vs Transient
  - [ ] ???? Memoize
  - [ ] ???? Hidden
  - [ ] ???? `beforeKill`
