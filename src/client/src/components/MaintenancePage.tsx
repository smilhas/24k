import React, { useState, useEffect } from 'react'
import logo from '../images/logo.svg'
import '../App.css'
import { Button } from 'antd'
import MessageService from '../services/MessageService'
import { MessageModel } from '../models/MessageModel'

const textA = 'Hola Tinguis 🏄‍♂️.'
const textB = 'Bonjour Tinguis 🏄‍♂️.'

function MaintenancePage(): JSX.Element {
	const [current, setCurrent] = useState(textA)

	useEffect(() => {
		const sayHello = async () => {
			const messageModel = new MessageModel(current) 
			const response = await MessageService.sendMessage(messageModel)
			const body = response.data
			console.log(body)
		}
		sayHello()
	}, [])

	const handleClick = () => {
		const sayHello = async () => {
			const messageModel = new MessageModel(current) 
			const response = await MessageService.sendMessage(messageModel)
			const body = response.data
			console.log(body)
		}
		sayHello()
		setCurrent(current === textA ? textB : textA)
	}

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p className='App-link'>
					Esta parte del la aplicación esta en construcción 👷‍♂️
				</p>
			</header>
		</div>
	)
}

export default MaintenancePage