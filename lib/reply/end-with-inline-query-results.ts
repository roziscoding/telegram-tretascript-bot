import got from 'got'
import { InlineQueryResult } from 'telegram-typings'
import { TelegramContext } from '../types/TelegramContext'

export type AnswerInlineQueryConfig = {
  cacheTime: number
  isPersonal: boolean
  nextOffset: string
}

const mapConfig = (config: Partial<AnswerInlineQueryConfig>) => ({
  cache_time: config.cacheTime,
  is_personal: config.isPersonal,
  next_offset: config.nextOffset
})

export async function endWithInlineQueryResults (results: InlineQueryResult[], context: TelegramContext, config: Partial<AnswerInlineQueryConfig> = {}) {
  if (!context.update.inline_query) throw new Error('the provided context does not contain an inline query')

  const query = context.update.inline_query

  const payload = {
    method: 'answerInlineQuery',
    inline_query_id: query.id,
    results: JSON.stringify(results),
    ...mapConfig(config)
  }

  await got(`https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/answerInlineQuery`, {
    searchParams: new URLSearchParams(payload as any),
    responseType: 'json',
    retry: 0
  })
    .catch(err => {
      context.res.end()
      throw err
    })

  if (!context.res.headersSent) context.res.status(200)
    .end()
}
