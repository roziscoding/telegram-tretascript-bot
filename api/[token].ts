import { NowRequest, NowResponse } from '@now/node'
import { getAuthenticatedContext, getUpdateHandler, InvalidTokenError } from '../lib/telegram'
import { tretaHandler } from '../handlers/tags/treta'

export default (req: NowRequest, res: NowResponse) => {
  const handleUpdate = getUpdateHandler({
    tags: {
      treta: tretaHandler
    }
  })

  getAuthenticatedContext(process.env.TELEGRAM_API_TOKEN!, req, res)
    .then(handleUpdate)
    .catch(err => {
      console.error(err)
      if (err.response) console.error(err.response.body)
      if (err instanceof InvalidTokenError) return res.status(401).end()

      if (!res.headersSent) res.status(500).json({ status: 500, error: { message: err.message, code: 'internal_server_error', stack: err.stack, body: err.response?.body } })
    })
}
