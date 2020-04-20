import { NowContext } from '../telegram'

export async function authenticate (token: string, { req, res }: NowContext) {
  if (token !== req.query.token) {
    res.status(401).end()
    throw new Error('no auth token')
  }

  return { req, res }
}
