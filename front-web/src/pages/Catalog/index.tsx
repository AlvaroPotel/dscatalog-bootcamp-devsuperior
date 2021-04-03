import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import './styles.scss';
import { makeRequest } from 'core/utils/request';
import { ProductsResponse } from 'core/types/Products';
import ProductCardLoader from './components/Loaders/ProductCardLoader';

const Catalog = () => {
    const[productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const[isloading, setIsloading] = useState(false);

    useEffect(()=>{
        const params = {
            page:0,
            linesPerPage:12
        }
        setIsloading(true);
        makeRequest({url: '/products', params})
        .then(response => setProductsResponse(response.data))
        .finally(() => {
            setIsloading(false);
        })
    }, []);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálogo de produtos
            </h1>
            <div className="catalog-products">
                {isloading ? <ProductCardLoader/> : (
                    productsResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <ProductCard product={product} />
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
};

export default Catalog;