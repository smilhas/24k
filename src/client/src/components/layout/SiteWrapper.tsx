import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, PageHeader, Descriptions, Button, Divider, Space, BackTop, Typography, Modal, Form, Input, Spin, Alert, Select, Row, Col } from 'antd'
import { HomeOutlined, GiftOutlined, AppstoreOutlined, InstagramOutlined, SettingOutlined, GithubOutlined } from '@ant-design/icons'

import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'
import { createPost, updatePost, deletePost, createGuest, updateComment, deleteComment } from '../../services/graphql/mutations'
import { getPost, listPosts, getComment, listComments } from '../../services/graphql/queries'

import '../../App.css'
import './SiteWrapper.css'

const { SubMenu } = Menu
const { Header, Content, Footer } = Layout
const { Title, Text } = Typography

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SiteWrapper(props: React.ComponentProps<any>):JSX.Element {

	const [isAlertVisible, setAlertVisible] = useState(false)
	const [messageError, setErrorMessage] = useState(false)
	const [loadingMessage, setLoadingMessage] = useState(false)

	const [isModalVisible, setIsModalVisible] = useState(false)
	const [form] = Form.useForm()

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

		// console.log('Origin', window.location.origin)
		// console.log('Path', window.location.pathname)

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
			name: window.location.pathname.includes('regalos') ? 'INFO' : 'REGALOS',
			path: window.location.pathname.includes('regalos') ? '' : 'regalos'
		}
	}

	const showModal = () => {
		setIsModalVisible(true)
	}

	async function addGuest(formValues: any) {
		try {
			if (!formValues.name || !(formValues.email || formValues.phone) || !formValues.assist) throw 'You are missing required form params!'
			const guest = { ...formValues, assist: (formValues.assist === 'si'), check: false}
			await API.graphql(graphqlOperation(createGuest, {input: guest}))
			countDown()
			form.resetFields()
		} catch (err) {
			console.log('error creating todo:', err)
			setErrorMessage(true)
		}
	}

	const handleOk = () => {
		setIsModalVisible(false)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	const handleClose = () => {
		setAlertVisible(false)
	}

	function countDown() {
		let secondsToGo = 5
		setAlertVisible(true)
		const timer = setInterval(() => {
			secondsToGo -= 1
		}, 1000)

		setTimeout(() => {
			clearInterval(timer)
			setAlertVisible(false)
			setErrorMessage(false)
		}, secondsToGo * 1000)
	}

	const onFinish = async (values: any) => {
		console.log('Success:', values)
		setLoadingMessage(true)
		await addGuest(values)
		setLoadingMessage(false)
		
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
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
							<Link to='/' target=''/>
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
							<Row
								className='regalos-row'
								gutter={[26, 26]}
								wrap={true}
								style={{maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto'}}
							>
								{window.location.pathname === '/' &&
									<Col
										xs={24}
										sm={24}
										lg={12}
										xl={12}
									>
										<Button
											type='primary'
											style={{backgroundColor: '#ccae9d', borderColor: '#ccae9d', margin: '0 0.7rem', minWidth: '140px'}}
											onClick={showModal}
										>
											<Text className='title-header' style={{color: 'white', letterSpacing: '.13rem'}}>
												RSVP
											</Text>
										</Button>
										
									</Col>
								}
								<Col
									xs={24}
									sm={24}
									lg={window.location.pathname === '/' ? 12 : 24}
									xl={window.location.pathname === '/' ? 12 : 24}
								>
									<Button
										type='primary'
										style={{backgroundColor: '#ccae9d', borderColor: '#ccae9d', margin: '0 0.7rem', minWidth: '140px'}}
									>
										<Link to={`/${getOppositePath().path}`} target=''>
											<Text className='title-header' style={{color: 'white', letterSpacing: '.13rem'}}>
												{getOppositePath().name}
											</Text>
										</Link>
									</Button>
								</Col>
							</Row>
						</Space>
					</Header>
					{props.children}
					<Modal
						className='regalos-modal'
						title='RSVP'
						visible={isModalVisible}
						onCancel={handleCancel}
						footer={[
							<Button
								key='regalos_modal_cancel'
								type='primary'
								onClick={handleCancel}
								style={{backgroundColor: 'rgba(115, 133, 114, 1)', borderColor: 'rgba(115, 133, 114, 1)', margin: '0 0.7rem'}}
							>
								<Text className='title-header' style={{color: 'white', letterSpacing: '.13rem'}}>
									CANCELAR
								</Text>
							</Button>
						]}
						width={800}
					>
						<Form
							name='basic'
							labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}
							form={form}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							requiredMark={!form.getFieldsValue().email && !form.getFieldsValue().phone}
						>
							<Form.Item
								label='Nombre'
								name='name'
								rules={[{ required: true, message: 'Por favor ingresa tu nombre!' }]}
							>
								<Input/>
							</Form.Item>
							<Form.Item
								label='Nombre de tu acompañante'
								name='plusone'
							>
								<Input />
							</Form.Item>
							<Form.Item
								label='Email 📨'
								name='email'
								rules={[{
									validator: async (_, email) => {
										if (!email && !form.getFieldsValue().phone) {
											return Promise.reject(new Error('Ingrese teléfono o email'))
										}
									}
								}]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label='Teléfono 📞'
								name='phone'
								rules={[{
									validator: async (_, phone) => {
										if (!form.getFieldsValue().email && !phone) {
											return Promise.reject(new Error('Ingrese teléfono o email'))
										}
									}
								}]}
							>
								<Input/>
							</Form.Item>
							<Form.Item
								label='Asistencia'
								name='assist'
								rules={[{ required: true, message: 'Por favor indicá si vas a asistir' }]}
							>
								<Select>
									<Select.Option value='si'>Confirmo Asistencia</Select.Option>
									<Select.Option value='no'>No Asistiré</Select.Option>
								</Select>
							</Form.Item>

							<Form.Item>
								{loadingMessage ?
									<Spin /> :
									<Button
										type='primary'
										style={{backgroundColor: '#ccae9d', borderColor: '#ccae9d'}}
										htmlType='submit'
									>
										<Text className='title-header' style={{color: 'white', letterSpacing: '.13rem'}}>
											CONFIRMAR 🎉
										</Text>
									</Button>
								}
							</Form.Item>
						</Form>
						<div style={{minHeight: '100px'}}>
							{isAlertVisible && (
								<Alert
									message={messageError ? '¡Error!' : '¡Listo!'}
									type={messageError ? 'error' : 'success'}
									description={messageError ? 'Tu mensaje no pudo ser enviado' : 'Tu mensaje fue enviado 📨'}
									action={
										<Button size='small' type='text' onClick={handleClose}>
                                                Done
										</Button>
									}
									showIcon
								/>
							)}
						</div>
					</Modal>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					🤵👰<br/>
					<Text className='title-header' style={{color: 'white', letterSpacing: '.13rem', fontSize: '1.5em', fontWeight: 'bolder'}}>
						<InstagramOutlined style={{color: 'rgb(95, 94, 94)'}}/> &nbsp;
						<a
							href='https://www.instagram.com/espaciodelanovia/'
							target='_blank'
							rel='noopener noreferrer'>
							@espaciodelanovia
						</a>
					</Text>
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