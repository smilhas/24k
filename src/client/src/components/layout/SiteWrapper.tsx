import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, PageHeader, Descriptions, Button, Divider, Space } from 'antd'
import { HomeOutlined, GiftOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'

import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'

import '../../App.css'
import './SiteWrapper.css'

const { SubMenu } = Menu
const { Header, Content, Footer } = Layout

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SiteWrapper(props: React.ComponentProps<any>):JSX.Element {

	const [authenticated, setAuthState] = useState(false)

	useEffect(() => {
		fetchUser()
	}, [])

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
			<Layout
				className='layout'
			>
				<Header 
					className='header'
					style={{ padding: '0 50px' }}
				>
					<div
						style={{width: '100%', background: '#001529', padding: '0 50px'}}
					>
						<a
							href='https://github.com/smilhas/24k'
							target='_blank'
							rel='noopener noreferrer'
							className='my-link'
						>
							Go checkout my Github →
						</a>
						<Space style={{float: 'right'}}>
							<Button
								key='2'
							>
								⚙
							</Button>
							{ authenticated &&
								<Button
									key='1'
									type='primary'
									onClick={() => Auth.signOut()}
								>
									Logout
								</Button>
							}

						</Space>
					</div>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					<PageHeader
						ghost={false}
						title='Tini y Sebas 🏄‍♀️🏄‍♂️'
						subTitle='19 de Marzo 2022'
					/>
					<Menu
						theme='light'
						mode='horizontal'
					>
						<Menu.Item
							key='home'
							icon={<HomeOutlined />}
						>
							<Link to='/' target=''>
								Home
							</Link>
						</Menu.Item>
						<Menu.Item
							key='regalos'
							icon={<GiftOutlined />}
						>
							<Link to='/regalos' target=''>
								Regalos
							</Link>
						</Menu.Item>
						{ authenticated &&
							<>
								<SubMenu key='SubMenu' icon={<SettingOutlined />} title='Test'>
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
								</SubMenu><Menu.Item key='alipay' icon={<AppstoreOutlined />}>
									<Link to='/dev' target=''>
										Dev site
									</Link>
								</Menu.Item>
							</>
						}
					</Menu>
					<div className='site-layout-content'>
						{props.children}
					</div>
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
				</Footer>
			</Layout>
		</div>
	)
}

export default SiteWrapper