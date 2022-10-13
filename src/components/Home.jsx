import React,{useEffect,useState} from 'react'
import {useGetAllProductsQuery} from '../features/productsApi'

const Home = () => {
const {data,error,isLoading} =useGetAllProductsQuery()

//checking whether the application is offlin
  return (
    <div className="home-container">
      
       {isLoading ?(<p>Loading...</p>):error?(<p>An error occured</p>):(
        <>
          <h2>Products</h2>
          <div className="products">
              {data.map(product=>
                <div key={product.id} className="product">
                    <h3>{product.name}</h3>
                    <img src={product.image} alt={product.name} loading={React.lazy()}/>
                    <div className="details">
                         <span>{product.desc}</span>
                         <span>{product.price}</span>
                    </div>
                    <button>Add to Cart</button>
                </div>
                )}
          </div>
        </>
       )}
      
    </div>
  )
}

export default Home