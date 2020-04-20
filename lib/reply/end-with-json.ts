import { ParseMode } from '../telegram'
import { endWithText } from './end-with-text'
import { TelegramContext } from '../types/TelegramContext'

export const endWithJSON = async (data: any, context: TelegramContext, options: { reply?: boolean } = {}) => {
  const text = `\`\`\`json\n${JSON.stringify(data, null, 4)}\`\`\``

  return endWithText(text, context, {
    parseMode: ParseMode.Markdown,
    ...options
  })
}
