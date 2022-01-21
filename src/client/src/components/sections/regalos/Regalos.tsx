import React, { useEffect, useState } from 'react'
import { Card, Modal, Image, Space, Typography, Alert, Form, Input, Button, Row, Col, Divider, Carousel, Spin, Layout } from 'antd'
import { RightOutlined, LeftOutlined, WhatsAppOutlined } from '@ant-design/icons'
import '../../../App.css'
import './Regalos.css'
import santander from '../../../images/santander.png'

import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createPost, updatePost, deletePost, createComment, updateComment, deleteComment } from '../../../services/graphql/mutations'
import { getPost, listPosts, getComment, listComments } from '../../../services/graphql/queries'
import { stringify } from 'querystring'
import { CarouselRef } from 'antd/lib/carousel'
import { Link } from 'react-router-dom'

class Item {
	id!: string
}

class Post extends Item {
	title: string;
	description: string;
	price: string;
	imagepath: string;

	constructor() {
		super()
		this.title = ''
		this.description = ''
		this.price = ''
		this.imagepath = ''
	}	
}

class Comment extends Item {
	name: string;
	content: string;

	constructor() {
		super()
		this.name = ''
		this.content = ''
	}	
}

export function Regalos (): JSX.Element {
	const { Meta } = Card
	const { Title, Paragraph, Text } = Typography
	const { TextArea } = Input

	const { Content, Footer } = Layout

	const [isAlertVisible, setAlertVisible] = useState(false)
	const [messageError, setErrorMessage] = useState(false)
	const [loadingMessage, setLoadingMessage] = useState(false)

	const [isModalVisible, setIsModalVisible] = useState(false)
	const [posts, setPosts] = useState<Post[]>([])
	const [selectedPost, setPost] = useState(new Post())

	const [modalCarousel, setModalCarousel] = useState<CarouselRef | null>(null)

	useEffect(() => {
		fetchPosts()
	}, [])

	const [form] = Form.useForm()

	const showModal = (post: Post) => {
		setPost(post)
		const slideNumber = posts.indexOf(post)
		console.log('slide number:',slideNumber)
		modalCarousel?.goTo(slideNumber, true)
		setIsModalVisible(true)
	}

	const handleOk = () => {
		setIsModalVisible(false)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}
	
	async function fetchPosts() {
		try {
			// const result = await Storage.vault.get('sillonL.png')
			const postData = await API.graphql(graphqlOperation(listPosts))
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const postsData = postData.data.listPosts.items.sort((a,b) => Number(a.price.replace('.','')) - Number(b.price.replace('.','')))
			setPosts(postsData)
		} catch (err) { console.log('error fetching todos') }
	}
	
	async function addComment(formValues: any) {
		try {
			if (!formValues.name || !formValues.email || !formValues.content) return
			const comment = { ...formValues, postCommentsId: selectedPost.id, check: false }
			await API.graphql(graphqlOperation(createComment, {input: comment}))
			countDown()
			form.resetFields()
		} catch (err) {
			console.log('error creating todo:', err)
			setErrorMessage(true)
		}
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
		await addComment(values)
		setLoadingMessage(false)
		
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	const onCarouselChange = (fromIndex: any, toIndex: any) => {
		if (posts.indexOf(selectedPost) != toIndex)
			setPost(posts[toIndex])
	}

	const setCrouselRef = (slider: CarouselRef | null) => {
		if (modalCarousel === null && slider !== null){
			console.log('we are here')
			setModalCarousel(slider)
			const slideNumber = posts.indexOf(selectedPost)
			slider?.goTo(slideNumber, true)
		}
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// eslint-disable-next-line react/prop-types
	const SlickButtonFix = ({currentSlide, slideCount, children, ...props}) => (
		<div {...props}>{children}</div>
		// <>{children}</>
	)

	return (
		<Layout className='site-layout regalos-wrapper'>
			<Content className='site-layout-content'>
				<Space className='regalos-space' direction='horizontal' wrap={true}>
					<Row
						className='regalos-row'
						gutter={[26, 26]}
						wrap={true}
					>
						{
							posts.map((postItem, index) => (
								<Col
									key={postItem.id ? postItem.id : index}
									xs={24}
									sm={12}
									lg={12}
									xl={8}
								>
									<Card
										className='regalos_card'
										hoverable
										// style={{ width: 'auto', minWidth: 350, maxWidth: 450 }}
										// style={{ height: '100%', maxWidth: 350 }}
										cover={
											<Image
												// style={{ minHeight: 450 }}
												// width={'100%'}
												// height={window.innerWidth > 768 ? 400 : 150}
												height={400}
												preview={false}
												src={postItem.imagepath}
												fallback='data:image/png;base64,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'
											/>
										}
										onClick={() => showModal(postItem)}
									>
										<Meta title={`${postItem.title}: $${postItem.price}` } description={postItem.description} />
									</Card>
								</Col>
							))
						}
					</Row>
				</Space>
			</Content>
			<Footer className='site-layout-footer'>
				<Space direction='vertical' style={{margin: '10%', padding: '5%', backgroundColor: 'hsla(30,15%,95%,.85)'}}>
					<Title level={4} className='title-header'>¿VENÍS?</Title>
					<Button
						type='primary'
						style={{backgroundColor: 'rgba(115, 133, 114, 1)', borderColor: 'rgba(115, 133, 114, 1)', margin: '0 0.7rem'}}
					>
						<Link to='/' target='' onClick={() => {window.scrollTo(0, 0)}}>
							<Text className='title-header' style={{color: 'white', letterSpacing: '.13rem'}}>
								INFO
							</Text>
						</Link>
					</Button>
				</Space>
			</Footer>
			<Modal
				className='regalos-modal'
				title={
					<>
						<Title level={1}>{`${selectedPost.title}: $${selectedPost.price}`}</Title>
						<Title level={5}>{selectedPost.description}</Title>
					</>
				}
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
				<Carousel
					className='regalos-carousel'
					slidesToScroll={1}
					ref={slider => setCrouselRef(slider)}
					// ref={slider => (this.slider = slider)}
					// afterChange={onCarouselChange}
					beforeChange={onCarouselChange}
					// arrows={true}
					// slidesToShow={3}
					// centerMode={true}
					infinite={true}
					dots={false}
					arrows={true}
					nextArrow={(
						<SlickButtonFix currentSlide={undefined} slideCount={undefined}>
							<Button className='regalos-carousel-button' type='primary'><RightOutlined/></Button>
						</SlickButtonFix>
					)}
					prevArrow={(
						<SlickButtonFix currentSlide={undefined} slideCount={undefined}>
							<Button className='regalos-carousel-button' type='primary'><LeftOutlined/></Button>
						</SlickButtonFix>
					)}
					// nextArrow={(props: any) => {<Button className='regalos-carousel-button' type='primary'><RightOutlined/></Button>}}
					// prevArrow={(type, props: any, key) => {<Button className='regalos-carousel-button' type='primary'><LeftOutlined/></Button>}}
				>
					{
						posts.map((postItem, index) => (
							<div
								key={postItem.id ? postItem.id : index}
							>
								<Image
									// className='regalos-center regalos-modal-image'
									src={postItem.imagepath}
									width={'70%'}
									height={550}
									preview={false}
									fallback='data:image/png;base64,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'
								/>
							</div>
						))
					}
				</Carousel>

				<br/>
				<br/>
				<Typography>
					<Title level={2}>Instrucciones</Title>
					<Paragraph>
						<ul>
							<li>
								<Title level={5}>Hagan una transferencia bancaria equivalente al monto del regalo que quieren hacer (Los datos de la cuenta están al final de la página)</Title>
							</li>
							<li>
								<Title level={5}>Dejen un comentario a continuación así les podemos agradecer!</Title>
							</li>
						</ul>
						<Title level={5} style={{color: 'gray'}}>
							Si prefieren pueden mandarnos un mail a <a href='mailto:tiniysebas24k@gmail.com?subject=Mensaje de regalo!'>tiniysebas24k@gmail.com</a> 📨 o mandarnos un whatsapp <a href='https://wa.me/5491144384857' target='_blank' rel='noopener noreferrer'><WhatsAppOutlined /></a>
						</Title>
					</Paragraph>
				</Typography>
				<br/>
				<br/>
				<Card
					className='regalos-center'
					title='Comprobante de detalle de CBU y Alias'
				>
					<Image
						className='regalos-center'
						preview={false}
						src={santander}
						width={200}
						// height={550}
					/>
					<Typography>
						<Title level={2}>SEBASTIAN MILHAS</Title>
						<Title level={5}>CUIT/CUIL : 20-38996165-6</Title>
						<Divider />
						<Paragraph>
							<p>Banco:				SANTANDER</p>
							<Divider />
							<p>Tipo de cuenta:		Cuenta única</p>
							<Divider />
							<p>Cuenta:				784-025837/9</p>
							<Divider />
							<p>CBU:					0720784888000002583790</p>
							<Divider />
							<p>Alias:				SMILHAS-PESOS</p>
						</Paragraph>
					</Typography>
				</Card>
				<br/>
				<br/>
				<Alert
					message='Importante'
					description='¡Dejanos tu mensaje una vez realizada la transferencia! Es muy importante que verifiques los datos de la cuenta antes de transferir'
					type='warning'
					showIcon
				/>
				<br/>
				<br/>
				<Form
					name='basic'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					form={form}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'
				>
					<Form.Item
						label='Nombre'
						name='name'
						rules={[{ required: true, message: 'Por favor ingresa tu nombre!' }]}
					>
						<Input/>
					</Form.Item>
					<Form.Item
						label='Email 📨'
						name='email'
						rules={[{ required: true, message: 'Por favor ingresa tu email!' }]}
					>
						<Input/>
					</Form.Item>
					<Form.Item
						label='Mensaje 😁'
						name='content'
						rules={[{ required: true, message: 'Por favor dejanos tu mensaje! 🏄‍♂️' }]}
					>
						<TextArea showCount maxLength={100} style={{ height: 120 }} />
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
									ENVIAR 📨
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
		</Layout>
	)
}