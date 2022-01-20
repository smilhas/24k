import React, { createElement, useEffect, useState } from 'react'
import { Layout, Menu, Card, Comment, PageHeader, Button, Descriptions, Space, Modal, Image, List, Tooltip, Form, Input, Alert, Row, Col, Typography } from 'antd'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled  } from '@ant-design/icons'
import './DevComentarios.css'

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
	check: boolean;

	constructor() {
		super()
		this.name = ''
		this.content = ''
		this.createdAt = ''
		this.postCommentsId = ''
		this.check = false
	}	
}

function DevComentarios (): JSX.Element {
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

	const [action, setAction] = useState<string | null>(null)

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
				),
				check: comment.check
			}})
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			setComments(commentsData)
		} catch (err) { console.log('error fetching todos') }
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

	const like = () => {
		setAction('liked')
	}
    
	const dislike = () => {
		setAction('disliked')
	}

	const actions = (item: any) => { return [
		<Tooltip key='comment-basic-like' title='Like'>
			<span onClick={like}>
				{createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
			</span>
		</Tooltip>,
		<Tooltip key='comment-basic-dislike' title='Dislike'>
			<span onClick={dislike}>
				{React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
			</span>
		</Tooltip>,
	]}

	return (
		<>
			<Space className='regalos-space' direction='horizontal' wrap={true}>
				<List
					className='comment-list'
					header={`${comments.length} replies`}
					itemLayout='horizontal'
					dataSource={comments}
					renderItem={(item: any) => (
						<li>
							<Comment
								author={item.author}
								avatar={item.avatar}
								content={item.content}
								datetime={item.datetime}
								actions={actions(item)}
								className={item.check ? 'checked_comment' : 'unchecked_comment'}
							/>
						</li>
					)}
				/>
			</Space>
		</>
	)
}

export default withAuthenticator(DevComentarios)