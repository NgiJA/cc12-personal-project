import { useEffect, useRef, useState } from 'react';
import { Modal as BsModal } from 'bootstrap';

function ModalShopLogin({ children, onClose, open, title, goToConfirmOrder }) {
	const modalEl = useRef(); // สิ่งที่ได้จาก useRef() จะเป็น object ที่มี key ชื่อ current และมี value เป็นค่าที่เรากำหนดให้มัน --> { current: <div className='modal fade' tabIndex='-1'></div>}
	// useRef ทำให้เราเก็บค่า DOM ไว้ในตัวมันได้
	const [modal, setModal] = useState(null);

	useEffect(() => {
		const modalObj = new BsModal(modalEl.current);
		setModal(modalObj);
	}, []);

	useEffect(() => {
		if (open) {
			return modal?.show(); // เปรียบเสมือน modal && modal.show();
		}
		modal?.hide(); // เปรียบเสมือน modal && modal.hide();
	}, [open, modal]);

	return (
		<div className='modal fade' tabIndex='-1' ref={modalEl} onClick={onClose}>
			<div
				className='modal-dialog modal-dialog-centered cart-modal-width'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>{title}</h5>
						<button
							type='button'
							className='btn-close'
							onClick={onClose}
						></button>
					</div>
					<div className='modal-body'>{children}</div>
					<div className='d-flex justify-content-end'>
						<button
							className='btn btn-dark border-0 px-4 product-add-button confirm-order-modal-button'
							onClick={goToConfirmOrder}
						>
							Confirm Order
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModalShopLogin;
