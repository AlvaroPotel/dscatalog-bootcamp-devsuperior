import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import { makeRequest } from 'core/utils/request';
import { ProductsResponse } from 'core/types/Products';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';
import './styles.scss';

const Catalog = () => {
    const[productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const[isloading, setIsloading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    useEffect(()=>{
        const params = {
            page:activePage,
            linesPerPage:12
        }
        setIsloading(true);
        makeRequest({url: '/products', params})
        .then(response => setProductsResponse(response.data))
        .finally(() => {
            setIsloading(false);
        })
    }, [activePage]);

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
            {productsResponse && (
            <Pagination 
                totalPages={productsResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
            />
            )}
        </div>
    )
};

export default Catalog;