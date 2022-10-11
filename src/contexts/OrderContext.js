import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

function OrderContextProvider({ children }) {
	const [cartProducts, setCartProducts] = useState([]);

	const increaseOrderItem = (product) => {
		const exist = cartProducts.find((item) => item.id === product.id);
		// console.log(exist);
		if (exist) {
			setCartProducts(
				cartProducts.map((item) =>
					item.id === product.id
						? { ...item, quantity: exist.quantity + 1 }
						: item
				)
			);
		} else {
			setCartProducts([
				...cartProducts,
				{ ...product, productId: product.id, quantity: 1 }
			]);
		}
	};

	const decreaseOrderItem = (product) => {
		const exist = cartProducts.find((item) => item.id === product.id);
		// console.log(exist);
		if (exist.quantity === 1) {
			setCartProducts(cartProducts.filter((item) => item.id !== product.id));
		} else {
			setCartProducts(
				cartProducts.map((item) =>
					item.id === product.id
						? { ...item, quantity: exist.quantity - 1 }
						: item
				)
			);
		}
	};

	const removeOrderItem = (product) => {
		const cartProductsFilter = cartProducts.filter(
			(item) => item.id !== product.id
		);
		setCartProducts(cartProductsFilter);
	};

	return (
		<OrderContext.Provider
			value={{
				cartProducts: cartProducts,
				setCartProducts: setCartProducts,
				increaseOrderItem: increaseOrderItem,
				decreaseOrderItem: decreaseOrderItem,
				removeOrderItem: removeOrderItem
			}}
		>
			{children}
		</OrderContext.Provider>
	);
}

export const useOrder = () => {
	return useContext(OrderContext);
};

export default OrderContextProvider;
