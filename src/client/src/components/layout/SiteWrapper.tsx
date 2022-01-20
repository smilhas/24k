import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, PageHeader, Descriptions, Button, Divider, Space, BackTop, Typography } from 'antd'
import { HomeOutlined, GiftOutlined, AppstoreOutlined, SettingOutlined, GithubOutlined } from '@ant-design/icons'

import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'

import '../../App.css'
import './SiteWrapper.css'

const { SubMenu } = Menu
const { Header, Content, Footer } = Layout
const { Title, Text } = Typography

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SiteWrapper(props: React.ComponentProps<any>):JSX.Element {

	const calculateTimeLeft = () => {
		const year = new Date().getFullYear()
		const difference = +new Date('03/19/2022') - +new Date()

		let timeLeft = '00 , 00:00:00'

		if (difference > 0) {
			const days = Math.floor(difference / (1000 * 60 * 60 * 24))
			const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
			const minutes = Math.floor((difference / 1000 / 60) % 60)
			const seconds = Math.floor((difference / 1000) % 60)
			timeLeft = `${days} días , ${hours}:${minutes}:${seconds}`
		}
		return timeLeft
	}

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
	const [authenticated, setAuthState] = useState(false)

	useEffect(() => {
		fetchUser()
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000)

		return () => clearTimeout(timer)
	})

	const randomString = (): string => {
		let result = ''
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		const charactersLength = characters.length
		for ( let i = 0; i < 10; i++ ) {
			result += characters.charAt(
				Math.floor(Math.random() * charactersLength))
		}
		return result
	}

	async function fetchUser() {
		const result = await Auth.currentCredentials()
		setAuthState(result.authenticated)
	}

	const getOppositePath = () => {
		return {
			name: window.location.pathname.includes('regalos') ? 'INVITACIONES' : 'REGALOS',
			path: window.location.pathname.includes('regalos') ? '' : 'regalos'
		}
	}

	return (
		<div>
			<BackTop />
			<Layout
				className='layout'
			>
				<BackTop />
				<Header 
					// className='header'
					// style={{ padding: '0 50px' }}
					className='header-menu'
				>
					<Menu
						className='header-menu'
						theme='dark'
						mode='horizontal'
					>
						<Menu.Item
							key='home_item'
							icon={<HomeOutlined />}
							className='site_menu_item_left'
						>
							<Link to='/' target=''>
								Home
							</Link>
						</Menu.Item>
						<Menu.Item
							key='regalos_item'
							icon={<GiftOutlined />}
							className='site_menu_item_left'
						>
							<Link to='/regalos' target=''>
								Regalos
							</Link>
						</Menu.Item>
						{ authenticated &&
							<>
								<Menu.Item
									key='alipay'
									icon={<AppstoreOutlined />}
									className='site_menu_item_left'
								>
									<Link to='/dev' target=''>
										Dev site
									</Link>
								</Menu.Item>
								<Menu.Item
									key='DevComments'
									icon={<AppstoreOutlined />}
									className='site_menu_item_left'
								>
									<Link to='/dev/comentarios' target=''>
										Dev Comments
									</Link>
								</Menu.Item>
								<Menu.Item
									key='logout_item'
									// className='site_menu_item_right'
									style={{marginLeft: 'auto', marginTop: 'auto'}}
								>
									<Button
										key='1'
										type='primary'
										onClick={() => Auth.signOut()}
									>
										Logout
									</Button>
								</Menu.Item>
							</>
						}
						{/* <Menu.Item
							key='git_icon_item'
							className='site_menu_item_right'
							icon={<GithubOutlined style={{ fontSize: '32px' }} />}
						>
							
							<a
								href='https://github.com/smilhas/24k'
								target='_blank'
								rel='noopener noreferrer'
								className='my-link'
							/>
						</Menu.Item> */}
					</Menu>
				</Header>
				<Content
					className='site-layout-content'
				>
					<Header className='site-layout-header'>
						<Space
							className='header-space'
						>
							<Title level={2} className='title-header'>TINI Y SEBAS</Title>
							<Title level={3} className='title-header'>{timeLeft}</Title>
							<Button
								type='primary'
								style={{backgroundColor: '#ccae9d', borderColor: '#ccae9d', margin: '0 0.7rem'}}
							>
								<Link to={`/${getOppositePath().path}`} target=''>
									<Text className='title-header' style={{color: 'white', letterSpacing: '.13rem'}}>
										{getOppositePath().name}
									</Text>
								</Link>
							</Button>
						</Space>
					</Header>
					{props.children}
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					🤵👰
					<Divider />
					<Descriptions size='small' column={1}>
						<Descriptions.Item label='Location'>
							🌎 Buenos Aires, Argentina
						</Descriptions.Item>
					</Descriptions>
				</Footer>
			</Layout>
		</div>
	)
}

export default SiteWrapper