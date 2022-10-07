function OrderPagination({
	numPage,
	changeCurrentPage,
	reduceCurrentPage,
	increaseCurrentPage,
	currentPageTrigger
}) {
	const pages = [];
	for (let i = 0; i < numPage; i++) {
		pages.push(i + 1);
	}

	return (
		<ul className='pagination pagination-sm mb-0'>
			<li className='page-item'>
				<button
					className='page-link'
					onClick={reduceCurrentPage}
					style={{
						display: currentPageTrigger === 1 ? 'none' : 'inline'
					}}
				>
					<i className='fa-solid fa-angle-left small text-secondary' />
				</button>
			</li>
			{pages.map((item, index) => (
				<li className='page-item' key={index}>
					<button
						className='page-link text-secondary'
						onClick={() => {
							changeCurrentPage(item);
						}}
						style={{
							backgroundColor:
								item === currentPageTrigger ? 'rgb(220, 220, 220)' : 'white'
						}}
					>
						{item}
					</button>
				</li>
			))}

			<li className='page-item'>
				<button
					className='page-link'
					onClick={increaseCurrentPage}
					style={{
						display: currentPageTrigger === numPage ? 'none' : 'inline'
					}}
				>
					<i className='fa-solid fa-angle-right small text-secondary' />
				</button>
			</li>
		</ul>
	);
}

export default OrderPagination;
