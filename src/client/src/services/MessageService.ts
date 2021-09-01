import { AxiosResponse } from 'axios'
import http from '../http-common'
import { MessageModel } from '../models/MessageModel'

const sendMessage = (data: MessageModel): Promise<AxiosResponse> => {
	return http.post('/HttpExample', data)
}

const MessageService = {
	sendMessage
}

export default MessageService