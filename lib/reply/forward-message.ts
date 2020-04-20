import got from 'got'
import { TelegramContext } from "../types/TelegramContext"
import { Message } from 'telegram-typings'

export const forwardMessage = async (messageId: number, chatId: number | string, { update }: TelegramContext, params: { silent?: boolean } = {}): Promise<Message> => {
  const { silent = false } = params

  if (!update.message) throw new Error('Invalid update: no message')

  const payload = {
    chat_id: chatId,
    from_chat_id: update.message.chat.id,
    message_id: messageId,
    disable_notification: !silent
  }

  return got<{ result: Message }>(`https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/forwardMessage`, {
    searchParams: new URLSearchParams(payload as any),
    responseType: 'json',
    retry: 0
  }).then(({ body }) => body.result)
}
