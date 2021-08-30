import React, { useState } from 'react'
import { Card, Modal, Image } from 'antd'
import '../../../App.css'
import sillonL from './images/sillonL.png'

export function Regalos (): JSX.Element {
	const { Meta } = Card

	const [isModalVisible, setIsModalVisible] = useState(false)

	const showModal = () => {
		setIsModalVisible(true)
	}

	const handleOk = () => {
		setIsModalVisible(false)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	return (
		<>
			<Card
				hoverable
				style={{ width: 240 }}
				cover={<img alt='example' src={sillonL} />}
				onClick={showModal}
			>
				<Meta title='Nuestro sillon en L 🏄‍♂️' description='www.instagram.com' />
			</Card>
			<Modal title='Nuestro sillon en L 🏄‍♂️' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<Image
					src={sillonL}
				/>
			</Modal>
		</>
	)
}