import React, { useEffect, useState } from 'react'
import { Layout, Menu, Card, Comment, PageHeader, Button, Descriptions, Space, Modal, Image, List, Tooltip } from 'antd'
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

	constructor() {
		super()
		this.title = ''
		this.description = ''
		this.price = ''
		this.imagepath = ''
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

	const [isModalVisible, setIsModalVisible] = useState(false)
	const [formState, setFormState] = useState(new Post())
	const [posts, setPosts] = useState<Post[]>([])
	const [comments, setComments] = useState([])
	const [selectedPost, setPost] = useState(new Post())

	useEffect(() => {
		fetchPosts()
		fetchComments()
	}, [])

	const showModal = (post: Post) => {
		setPost(post)
		setIsModalVisible(true)
	}

	const handleOk = () => {
		setIsModalVisible(false)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	function setInput(key: string, value: string) {
		setFormState({ ...formState, [key]: value })
	}
	
	async function fetchPosts() {
		try {
			// const result = await Storage.vault.get('sillonL.png')
			const postData = await API.graphql(graphqlOperation(listPosts))
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const postsData = postData.data.listPosts.items
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
	
	async function addPost() {
		try {
			if (!formState.title || !formState.description || !formState.imagepath || !formState.price) return
			const post = { ...formState, blogPostsId: '099756fc-4c0f-4ebd-81ec-49bf1e917e19' }
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			setPosts([...posts, post])
			setFormState(new Post())
			await API.graphql(graphqlOperation(createPost, {input: post}))
		} catch (err) {
			console.log('error creating todo:', err)
		}
	}

	return (
		<>
			<input
				onChange={event => setInput('title', event.target.value)}
				value={formState.title}
				placeholder='Title'
			/>
			<input
				onChange={event => setInput('description', event.target.value)}
				value={formState.description}
				placeholder='Description'
			/>
			<input
				onChange={event => setInput('imagepath', event.target.value)}
				value={formState.imagepath}
				placeholder='Image Path'
			/>
			<input
				onChange={event => setInput('price', event.target.value)}
				value={formState.price}
				placeholder='Price'
			/>
			<button onClick={addPost}>Create Post</button>
			<br/>
			<br/>
			<Space direction='horizontal' wrap={true}>
				{
					posts.map((postItem, index) => (
						<div key={postItem.id ? postItem.id : index}>
							<Card
								hoverable
								style={{ width: 350, height: 450 }}
								cover={<img style={{ width: 350, height: 350 }} alt='example' src={postItem.imagepath} />}
								onClick={() => showModal(postItem)}
							>
								<Meta title={`${postItem.title}: ${postItem.price}` } description={postItem.description} />
							</Card>
						</div>
					))
				}
			</Space>
			<Modal title={selectedPost.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
				<Image
					src={selectedPost.imagepath}
					width={550}
					height={550}
				/>
				<List
					className='comment-list'
					header={`${comments.length} replies`}
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