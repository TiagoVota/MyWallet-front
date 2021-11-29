import dayjs from 'dayjs'
import styled from 'styled-components'


const Item = ({ value, description, date, isPositive, formatValue }) => {
	const formatDate = date => dayjs(date).format('DD/MM')

	return (
		<ItemContainer isPositive={isPositive}>
			<div>
				<h1>{formatDate(date)}</h1>
				<h2>{description}</h2>
			</div>

			<h3>{formatValue(value)}</h3>
		</ItemContainer>
	)
}


export default Item


const ItemContainer = styled.div`
	height: 35px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-family: Raleway;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 19px;

	div {
		display: flex;
	}

	h1 {
		color: #C6C6C6;
	}

	h2 {
		padding-left: 15px;
		color: #000000;
	}

	h3 {
		color: ${p => p.isPositive ? '#03AC00' : '#C70000'};
		text-align: right;
	}
`