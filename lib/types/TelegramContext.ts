import { NowContext } from '../telegram'
import { Update } from 'telegram-typings'

export type TelegramContext = NowContext & {
  update: Update
}
