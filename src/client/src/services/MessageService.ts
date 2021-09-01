import { AxiosResponse } from 'axios'
import http from '../http-common'
import { MessageModel } from '../models/MessageModel'

const sendMessage = async (data: MessageModel): Promise<AxiosResponse> => {
	return await http.post('/HttpExample', data)
}

const MessageService = {
	sendMessage
}

export default MessageService