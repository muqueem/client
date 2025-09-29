import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { getProducts } from '../src/api/auth';

export const dataContext = React.createContext();
export const useContextElement = () => {
    return useContext(dataContext);
}

const Context = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getProducts();
            setProducts(res);
        }

        fetchProducts();
    }, [])

    const contextElement = {
        products,
    }

    return (
        <dataContext.Provider value={contextElement}>
            <Outlet />
        </dataContext.Provider>
    );
}

export default Context;
