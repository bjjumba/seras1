import React from 'react'
import {useGetAllProductsQuery} from '../features/productsApi'
import {useDispatch} from 'react-redux'
import {addToCart} from '../features/cartSlice'

const Home = () => {
const {data,error,isLoading} =useGetAllProductsQuery()
const dispatch=useDispatch()
//function to handle add to Cart
const handleAddToCart=(product)=>{
    dispatch(addToCart(product))
}

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
                    <button onClick={()=>handleAddToCart(product)}>Add to Cart</button>
                </div>
                )}
          </div>
        </>
       )}
      
    </div>
  )
}

export default Home