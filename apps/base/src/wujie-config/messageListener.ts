/*
 * @Author: CP
 * @Date: 2024-01-15 15:23:17
 * @LastEditors: 
 * @Description: 
 */
import { ElNotification } from 'element-plus'

// import 'element-plus/es/components/notification/style'
import WujieVue from 'wujie-vue3'

export const RECEIVE_MESSAGE = 'receiveMessage'

const { bus } = WujieVue

export enum Types {
  success = 'success',
  warn = 'warn',
  error = 'error',
  info = 'info'
}

export interface Message {
  info: string
  type: Types
  from: string
}

export function listenReceiveMessage() {
  bus.$on('message', function (message: Message) {
    const { type, info, from } = message
    ElNotification[type]({
      title: `来自【${from}】的消息`,
      message: info
    })
  })
}

export function dispatchReceiveMessageEvent(message: Omit<Message, 'from'>) {
  bus.$emit('message', {
    ...message,
    from: '主应用'
  })
}
