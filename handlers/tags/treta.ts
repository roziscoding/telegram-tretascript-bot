import { UpdateHandlers, endWithText, ParseMode } from "../../lib/telegram";
import { forwardMessage } from "../../lib/reply/forward-message";

export const tretaHandler: UpdateHandlers['tags']['treta'] = async (message, context) => {
  const repliedMessageId = message.reply_to_message?.message_id

  if (!repliedMessageId) return endWithText('Responda a mensagem que deseja encaminhar', context, { reply: true })

  try {
    const forwardedMessage = await forwardMessage(repliedMessageId, process.env.DESTINATION_CHAT_ID!, context)

    const messageText = forwardedMessage.chat.username ? `[Encaminhado](https://t.me/${forwardedMessage.chat.username}/${forwardedMessage.message_id})` : 'Encaminhado'

    endWithText(messageText, context, { reply: true, parseMode: ParseMode.MarkdownV1 })
  } catch (err) {
    endWithText(`Erro ao encaminhar mensagem: ${err.message}`, context, { reply: true })
    throw err
  }
}
