import React, { useState } from 'react'
import { Layout, Menu, Card, PageHeader, Button, Descriptions } from 'antd'
import { MailOutlined, GiftOutlined, SettingOutlined } from '@ant-design/icons'
import '../../../App.css'
import sillonL from '../regalos/images/sillonL.jpg'

export function LandingPageDev (): JSX.Element {
	const { SubMenu } = Menu
	const { Meta } = Card
	const { Content, Footer } = Layout

	const [current, setCurrent] = useState('app')

	const handleClick = (e: { key: string; }) => {
		console.log('click ', e)
		setCurrent(e.key)
	}

	return (
		<div className='site-page-header-ghost-wrapper'>
			<PageHeader
				ghost={false}
				title='Tini y Sebas 🏄‍♀️🏄‍♂️'
				subTitle='19 de Marzo 2022'
				extra={[
					<Button key='2'>⚙</Button>,
					<Button
						key='1'
						type='primary'
					>
						Login
					</Button>,
				]}
			>
				<Descriptions size='small' column={3}>
					<Descriptions.Item label='Devloped by'>Sebastian Milhas</Descriptions.Item>
					<Descriptions.Item label='Remarks'>
						🌎 Buenos Aires, Argentina
					</Descriptions.Item>
				</Descriptions>
			</PageHeader>
			<Menu
				theme='light'
				onClick={handleClick}
				selectedKeys={[current]}
				mode='horizontal'
			>
				<Menu.Item key='mail' icon={<MailOutlined />}>
					Home
				</Menu.Item>
				<Menu.Item key='app' disabled icon={<GiftOutlined />}>
					Regalos
				</Menu.Item>
				<SubMenu key='SubMenu' icon={<SettingOutlined />} title='Navigation Three - Submenu'>
					<Menu.ItemGroup title='Item 1'>
						<Menu.Item key='setting:1'>Option 1</Menu.Item>
						<Menu.Item key='setting:2'>Option 2</Menu.Item>
					</Menu.ItemGroup>
					<Menu.ItemGroup title='Item 2'>
						<Menu.Item key='setting:3'>Option 3</Menu.Item>
						<Menu.Item key='setting:4'>Option 4</Menu.Item>
					</Menu.ItemGroup>
				</SubMenu>
				<Menu.Item key='alipay'>
					<a href='/dev' target='_blank' rel='noopener noreferrer'>
						Navigation Four - Link
					</a>
				</Menu.Item>
			</Menu>
			<Content >
				<div className='site-layout-content'>
					<Card
						hoverable
						style={{ width: 240 }}
						cover={<img alt='example' src={sillonL} />}
					>
						<Meta title='Nuestro sillon en L 🏄‍♂️' description='www.instagram.com' />
					</Card>
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
		</div>
	)
}