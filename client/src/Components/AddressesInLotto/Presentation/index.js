import React, { Fragment } from 'react'

const createAddressOption = (address, i) =>
	<option value={address} key={i}>
		{address}
	</option>

const createLottoAddressDiv = (address, i) =>
	<div key={i}>
		{address}
	</div>

const AddressesInLottoPresentation = props => {
	const {
		accounts,
		handleClick,
		handleChange,
		addressesInLotto,
		getTransactionStatus
	} = props

	const addressOptions = accounts.map(createAddressOption)
	const addressesInLottoDivs = addressesInLotto.map(createLottoAddressDiv)

	return (
		<Fragment>
			<div>
				Addresses in Lotto:
				<br /> <br /> 
				{
					addressesInLotto.length ?
						addressesInLottoDivs :
						<b>{` There are no addresses in the current lottery`}</b>
				}
			</div>

			<br /> 

			<select onChange={handleChange}>
				{addressOptions}
			</select>

			<br /> <br />

			<button onClick={handleClick}>
				Select Address
			</button>

			<div>{getTransactionStatus()}</div>
		</Fragment>
	)
}

export default AddressesInLottoPresentation