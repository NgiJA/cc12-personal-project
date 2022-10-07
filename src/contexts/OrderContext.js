import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

function OrderContextProvider({ children }) {
	const [order, setOrder] = useState({});

	const addOrderItem = (input) => {
		setOrder({ ...order, OrderItems: input });
	};

	return (
		<OrderContext.Provider value={{ order: order, addOrderItem: addOrderItem }}>
			{children}
		</OrderContext.Provider>
	);
}

export const useOrder = () => {
	return useContext(OrderContext);
};

export default OrderContextProvider;
