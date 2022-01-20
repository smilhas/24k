import React, { useEffect, useState } from 'react'
import { Layout, Typography, Image , Space, Divider, Button, BackTop, Row, Col} from 'antd'

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

	return (
		<Layout  className='site-layout'>
			<Content className='site-layout-content'>
				<br/>
				<br/>
				<br/>
				<br/>
				<Title level={2} className='title-header'>¡NOS CASAMOS!</Title>
				<br/>
				<br/>
				<Text className='site-text'>Y queremos compartir este día con vos.</Text>
				<br/>
				<span className='dot'/><span className='dot'/><span className='dot'/>
				<br/>
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
				<Row
					className='regalos-row'
					justify='space-around'
					gutter={[0, 80]}
					wrap={true}
				>
					<Col
						xs={24}
						sm={24}
						lg={12}
						xl={12}
						// style={{maxWidth: '40%'}}
					>
						<Space direction='vertical'>
							<Title level={4} className='title-header'>CEREMONIA RELIGIOSA</Title>
							<Text className='title-header'>
								SÁBADO 19 DE MARZO 2022
								<br/>
								15:00 HS.
							</Text>
							<Image
								width={72}
								src={rings}
								preview={false}
							/>
							<Text className='title-header'>
								Basílica Nuestra Señora del Pilar
								<br/>
								Junín 1898, C1113 AAV, Buenos Aires
							</Text>
						</Space>
					</Col>
					<Col
						xs={24}
						sm={24}
						lg={12}
						xl={12}
						// style={{maxWidth: '40%'}}
					>
						<Space direction='vertical'>
							<Title level={4} className='title-header'>FIESTA</Title>
							<Text className='title-header'>
								SÁBADO 19 DE MARZO 2022
								<br/>
								17:30 HS.
							</Text>
							<Image
								width={72}
								src={party}
								preview={false}
							/>
							<Text className='title-header'>
								<a
									href='http://www.quintalapaz.com.ar/'
									target='_blank'
									rel='noopener noreferrer'
									className='my-link'
								>
									Quinta la Paz
								</a>
								<br/>
								<a
									href='https://goo.gl/maps/nBURnSW68xL7C2GRA'
									target='_blank'
									rel='noopener noreferrer'
									className='my-link'
								>
									Gorostiaga, Fatima, Provincia de Buenos Aires
								</a>
							</Text>
						</Space>
					</Col>
				</Row>
				<br/>
				<span className='dot'/><span className='dot'/><span className='dot'/>
				<br/>
				{/* <Divider type='vertical' className='divider-layout'/> */}
				<br/>
			</Content>
			<Footer className='site-layout-footer'>
				<Space direction='vertical' style={{margin: '10%', padding: '5%', backgroundColor: 'hsla(30,15%,95%,.85)'}}>
					<Title level={4} className='title-header'>¿QUERÉS REGALARNOS?</Title>
					<Button
						type='primary'
						style={{backgroundColor: 'rgba(115, 133, 114, 1)', borderColor: 'rgba(115, 133, 114, 1)', margin: '0 0.7rem'}}
					>
						<Link to='/regalos' target='' onClick={() => {window.scrollTo(0, 0)}}>
							<Text className='title-header' style={{color: 'white', letterSpacing: '.13rem'}}>
								VER LISTA
							</Text>
						</Link>
					</Button>
				</Space>
			</Footer>
		</Layout >
	)
}