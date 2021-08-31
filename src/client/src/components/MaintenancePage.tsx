import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import '../App.css'
import { Button } from 'antd'

const textA = 'Hola Tinguis 🏄‍♂️.'
const textB = 'Bonjour Tinguis 🏄‍♂️.'

function MaintenancePage(): JSX.Element {
	const [current, setCurrent] = useState(textA)

	useEffect(() => {
		const sayHello = async () => {
			const response = await fetch('/api/hello')
			const body = await response.json()
			console.log(body)
		}
		sayHello()
	}, [])

	const handleClick = () => {
		const sayHello = async () => {
			const response = await fetch('/api/hello')
			const body = await response.json()
			console.log(body)
		}
		sayHello()
		setCurrent(current === textA ? textB : textA)
	}

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<Button
					type='primary'
					onClick={handleClick}
				>
					{current}
				</Button>
				<p className='App-link'>
					Esta parte del la aplicación esta en construcción 👷‍♂️
				</p>
			</header>
		</div>
	)
}

export default MaintenancePage