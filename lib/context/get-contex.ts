import { NowContext } from '../telegram'
import { Update } from 'telegram-typings'
import { TelegramContext } from '../types/TelegramContext'

export async function getContext ({ req, res }: NowContext): Promise<TelegramContext> {
  const update: Update = req.body

  return { req, res, update }
}
