import { getContext } from './get-contex'
import { authenticate } from './authenticate'
import { NowRequest, NowResponse } from '@now/node'

export async function getAuthenticatedContext (token: string, req: NowRequest, res: NowResponse) {
  await authenticate(token, { req, res })

  return getContext({ req, res })
}
