export class InvalidTokenError extends Error {
  constructor () {
    super('provided token is not valid')
  }
}
