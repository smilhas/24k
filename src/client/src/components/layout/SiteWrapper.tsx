import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, PageHeader, Descriptions, Button, Divider, Space, BackTop, Typography } from 'antd'
import { HomeOutlined, GiftOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'

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
			timeLeft = `${days} , ${hours}:${minutes}:${seconds}`
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
						>
							<Link to='/' target=''>
								Home
							</Link>
						</Menu.Item>
						<Menu.Item
							key='regalos_item'
							icon={<GiftOutlined />}
						>
							<Link to='/regalos' target=''>
								Regalos
							</Link>
						</Menu.Item>
						{ authenticated &&
							<>
								<SubMenu
									key='test_submenu'
									icon={<SettingOutlined />}
									title='Test'
								>
									<Menu.ItemGroup title='Item 1'>
										<Menu.Item key='setting:1'>
											<Link to={`/${randomString()}`} target=''>
											Random
											</Link>
										</Menu.Item>
										<Menu.Item key='setting:2'>Option 2</Menu.Item>
									</Menu.ItemGroup>
									<Menu.ItemGroup title='Item 2'>
										<Menu.Item key='setting:3'>Option 3</Menu.Item>
										<Menu.Item key='setting:4'>Option 4</Menu.Item>
									</Menu.ItemGroup>
								</SubMenu>
								<Menu.Item
									key='alipay'
									icon={<AppstoreOutlined />}
								>
									<Link to='/dev' target=''>
										Dev site
									</Link>
								</Menu.Item>
								<Menu.Item
									key='logout_item'
									className='menu-item-right'
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
						</Space>
					</Header>
					{props.children}
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					🏄‍♂️
					<Divider />
					<Descriptions size='small' column={1}>
						<Descriptions.Item label='Devloped by'>
							Sebastian Milhas
						</Descriptions.Item>
						<Descriptions.Item label='Location'>
							🌎 Buenos Aires, Argentina
						</Descriptions.Item>
					</Descriptions>
					<a
						href='https://github.com/smilhas/24k'
						target='_blank'
						rel='noopener noreferrer'
						className='my-link'
					>
							Go checkout my Github →
					</a>
				</Footer>
			</Layout>
		</div>
	)
}

export default SiteWrapper