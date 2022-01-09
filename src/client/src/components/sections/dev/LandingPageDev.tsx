import React, { useEffect, useState } from 'react'
import { Layout, Menu, Card, Comment, PageHeader, Button, Descriptions, Space, Modal, Image, List, Tooltip, Form, Input, Alert, Row, Col, Typography } from 'antd'
import { MailOutlined, GiftOutlined, SettingOutlined } from '@ant-design/icons'
import '../../../App.css'

import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { createPost, updatePost, deletePost, createComment, updateComment, deleteComment } from '../../../services/graphql/mutations'
import { getPost, listPosts, getComment, listComments } from '../../../services/graphql/queries'
import { stringify } from 'querystring'


class Item {
	id!: string
}

class Post extends Item {
	title: string;
	description: string;
	price: string;
	imagepath: string;
	blogPostsId: string;

	constructor() {
		super()
		this.title = ''
		this.description = ''
		this.price = ''
		this.imagepath = ''
		this.blogPostsId = ''
	}	
}

class PostComment extends Item {
	name: string;
	content: string;
	createdAt: string;
	postCommentsId: string;

	constructor() {
		super()
		this.name = ''
		this.content = ''
		this.createdAt = ''
		this.postCommentsId = ''
	}	
}

function LandingPageDev (): JSX.Element {
	const { SubMenu } = Menu
	const { Meta } = Card
	const { Title, Paragraph, Text, Link } = Typography

	const [isModalVisible, setIsModalVisible] = useState(false)
	// const [formState, setFormState] = useState(new Post())
	const [posts, setPosts] = useState<Post[]>([])
	const [comments, setComments] = useState([])
	const [selectedPost, setPost] = useState(new Post())

	const [isAlertVisible, setAlertVisible] = useState(false)
	const [messageError, setErrorMessage] = useState(false)
	const [form] = Form.useForm()

	useEffect(() => {
		fetchPosts()
		fetchComments()
	}, [])


	const showModal = (post: Post) => {
		setPost(post)
		setIsModalVisible(true)
	}

	const handleOk = async () => {
		try {
			if (!selectedPost.id || !selectedPost.title || !selectedPost.description || !selectedPost.price) return
			const post = {
				id: selectedPost.id,
				title: selectedPost.title,
				description: selectedPost.description,
				price: selectedPost.price,
				imagepath: selectedPost.imagepath,
				blogPostsId: selectedPost.blogPostsId
			}
			await API.graphql(graphqlOperation(updatePost, {input: post}))
			setIsModalVisible(false)
		} catch (err) {
			console.log('error creating todo:', err)
			setErrorMessage(true)
		}
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	// function setInput(key: string, value: string) {
	// 	setFormState({ ...formState, [key]: value })
	// }
	
	async function fetchPosts() {
		try {
			// const result = await Storage.vault.get('sillonL.png')
			const postData = await API.graphql(graphqlOperation(listPosts))
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const postsData = postData.data.listPosts.items.sort((a,b) => Number(a.price) - Number(b.price))
			setPosts(postsData)
		} catch (err) { console.log('error fetching todos') }
	}

	async function fetchComments() {
		try {
			// const result = await Storage.vault.get('sillonL.png')
			const commentData = await API.graphql(graphqlOperation(listComments))
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const commentsItems = commentData.data.listComments.items as PostComment[]
			const commentsData = commentsItems.map( (comment) => {return {
				id: comment.postCommentsId,
				author: comment.name,
				avatar: 'https://joeschmoe.io/api/v1/random',
				content: (
					<p>
						{comment.content}
					</p>
				),
				datetime: (
					<Tooltip title={comment.createdAt}>
						<span>{comment.createdAt}</span>
					</Tooltip>
				)
			}})
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			setComments(commentsData)
		} catch (err) { console.log('error fetching todos') }
	}
	
	async function addPost(formValues: any) {
		try {
			if (!formValues.title || !formValues.description || !formValues.price) return
			const post = {
				...formValues,
				imagepath: `https://24kserverbucket151152-dev.s3.us-east-2.amazonaws.com/imagenes/${formValues.title}.jpg`,
				blogPostsId: '099756fc-4c0f-4ebd-81ec-49bf1e917e19'
			}
			await API.graphql(graphqlOperation(createPost, {input: post}))
			setPosts([...posts, post])
			countDown()
			form.resetFields()
			// setFormState(new Post())
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
		await addPost(values)
		
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<>
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
					label='Title'
					name='title'
					rules={[{ required: true, message: 'Please input the title of the new post!' }]}
				>
					<Input/>
				</Form.Item>

				<Form.Item
					label='Description'
					name='description'
					rules={[{ required: true, message: 'Please input the description of the new post!' }]}
				>
					<Input/>
				</Form.Item>

				<Form.Item
					label='Price'
					name='price'
					rules={[{ required: true, message: 'Please input the price of the new post!' }]}
				>
					<Input/>
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit'>
									Submit
					</Button>
				</Form.Item>
			</Form>
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
			<br/>
			<br/>
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
											height={window.innerWidth > 768 ? 400 : 150}
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
			<Modal
				title={
					<>
						<Title level={1}><Input defaultValue={`${selectedPost.title}`} onChange={(event) => setPost({...selectedPost, title: event.target.value})} /></Title>
						<Title level={1}><Input value={`${selectedPost.price}`} onChange={(event) => setPost({...selectedPost, price: event.target.value})} /></Title>
						<Title level={1}><Input value={selectedPost.description} onChange={(event) => setPost({...selectedPost, description: event.target.value})} /></Title>
					</>
				}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				width={800}
			>
				<Image
					// className='regalos-center regalos-modal-image'
					src={selectedPost.imagepath}
					width={'70%'}
					height={550}
					preview={false}
					fallback='data:image/png;base64,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'
				/>
				<List
					className='comment-list'
					header={`${comments.filter((comment: any) => comment.id === selectedPost.id).length} replies`}
					itemLayout='horizontal'
					dataSource={comments}
					renderItem={item => (
						<>
							{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
							{/* @ts-ignore */}
							{ (item.id === selectedPost.id) &&
								<li>
									<Comment
										// eslint-disable-next-line @typescript-eslint/ban-ts-comment
										// @ts-ignore
										author={item.author}
										// eslint-disable-next-line @typescript-eslint/ban-ts-comment
										// @ts-ignore
										avatar={item.avatar}
										// eslint-disable-next-line @typescript-eslint/ban-ts-comment
										// @ts-ignore
										content={item.content}
										// eslint-disable-next-line @typescript-eslint/ban-ts-comment
										// @ts-ignore
										datetime={item.datetime}
									/>
								</li>
							}
						</>
					)}
				/>
			</Modal>
		</>
	)
}

export default withAuthenticator(LandingPageDev)