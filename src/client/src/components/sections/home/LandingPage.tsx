import React, { useEffect, useState } from 'react'
import { Layout, Typography, Image , Space, Divider, Button, BackTop} from 'antd'

import '@fontsource/josefin-sans'
import '@fontsource/montserrat'

import '../../../App.css'
import './LandingPage.css'

import rings from '../../../images/icon-1.png'
import party from '../../../images/icon-3.png'
import { Link } from 'react-router-dom'

const { Header, Content, Footer } = Layout

const { Title, Text } = Typography

export function LandingPage (): JSX.Element {

	
	// const countDownDate = new Date('March 19, 2022 15:30:00').getTime()
	const calculateTimeLeft = () => {
		const year = new Date().getFullYear()
		const difference = +new Date('03/19/2022') - +new Date()

		let timeLeft = '00 , 00:00:00'

		if (difference > 0) {
			// timeLeft = {
			// 	days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			// 	hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			// 	minutes: Math.floor((difference / 1000 / 60) % 60),
			// 	seconds: Math.floor((difference / 1000) % 60)
			// }
			const days = Math.floor(difference / (1000 * 60 * 60 * 24))
			const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
			const minutes = Math.floor((difference / 1000 / 60) % 60)
			const seconds = Math.floor((difference / 1000) % 60)
			timeLeft = `${days} , ${hours}:${minutes}:${seconds}`
		}
		return timeLeft
	}

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000)

		return () => clearTimeout(timer)
	})

	return (
		<Layout  className='site-layout'>
			<BackTop />
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<Header className='site-layout-header'>
				<Title level={2} className='title-header'>TINI Y SEBAS</Title>
				<Title level={3} className='title-header'>{timeLeft}</Title>
			</Header>
			<Content className='site-layout-content'>
				<Title level={2} className='title-header'>¡NOS CASAMOS!</Title>
				<br/>
				<br/>
				<Text className='site-text'>Y queremos compartir este día con vos.</Text>
				<Divider />
				<Title level={2} className='title-header'>EVENTOS</Title>
				<br/>
				<br/>
				<Text className='site-text'>Te dejamos toda la información de nuestro casamiento, para que nos acompañes en este gran día.</Text>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<Space direction='vertical'>
					<Title level={4} className='title-header'>CEREMONIA RELIGIOSA</Title>
					<Text className='title-header'>
					SÁBADO 19 DE MARZO 2022
						<br/>
					15:30 HS.
					</Text>
					<br/>
					<Image
						width={72}
						src={rings}
						preview={false}
					/>
					<br/>
					<Text className='title-header'>
					Capilla de Fatima
						<br/>
					Ruta 8 Km 62, Fátima
					</Text>
				</Space>
				<Divider type='vertical' className='divider-layout'/>
				<Space direction='vertical'>
					<Title level={4} className='title-header'>FIESTA</Title>
					<Text className='title-header'>
					SÁBADO 19 DE MARZO 2022
						<br/>
					18:00 HS.
					</Text>
					<br/>
					<Image
						width={72}
						src={party}
						preview={false}
					/>
					<br/>
					<Text className='title-header'>
					Quinta la Paz
						<br/>
					Ruta 8 Km 62, Fátima
					</Text>
				</Space>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
			</Content>
			<Footer className='site-layout-footer'>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<Button
					key='1'
					type='primary'
					// onClick={() => Auth.signOut()}
				>
					<Link to='/regalos' target=''>
						Regalar
					</Link>
				</Button>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
			</Footer>
		</Layout >
	)
}