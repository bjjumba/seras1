import { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeCartItem,decreaseCart,addToCart,clearCart,getTotal} from '../features/cartSlice'

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch=useDispatch()
  
  //USE THE EFFECT TO DETECT CHANGES
  useEffect(() =>{
    dispatch(getTotal())
  },[cart,dispatch])
  //creaing a helper function to remove items from the cart
  const handleRemoveCartItem=(cartItem)=>{
       dispatch(removeCartItem(cartItem))
  }
  //decreasing quantity of cartItem
  const handleDecreaseQuantity=(cartItem)=>{
    dispatch(decreaseCart(cartItem))
  }
  //adding or inreasing item to cartItem
  const handleIncreaseItem=(cartItem)=>{
    dispatch(addToCart(cartItem))
  }

  const handleClearCart=()=>{
     dispatch(clearCart())
  }
  //end of function
  return (
    <div className="cart-container">
      {/* First check whether the cart is empty */}
      {cart.cartItems.length ===0?(
        <div className="cart-empty">
          <p>Your Cart is Empty</p>
          <div className="start-shopping">
              <Link to= "/">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                 <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
              </svg>
                <span>Start Shopping</span>
              </Link>
          </div>
        </div>
      ):(
      <div>
      <div className="titles">
        <h3 className="product-title">Product</h3>
        <h3 className="price">Price</h3>
        <h3 className="Quantity">Quantity</h3>
        <h3 className="total">Total</h3>
      </div>
      <div className="cart-items">
          {cart.cartItems?.map((cartItem)=>(
            <div className="cart-item" key={cartItem.id}>
              <div className="cart-product">
                 < img src={cartItem.image} alt={cartItem.name} />
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                      <button onClick={()=>{handleRemoveCartItem(cartItem)}}>
                        Remove
                      </button>
                    </div>
              </div>
              <div className="cart-product-price"> shs  {cartItem.price} </div>
              <div className="cart-product-quantity">
                    <button onClick={()=>handleDecreaseQuantity(cartItem)}>-</button>
                    <div className='count'>{cartItem.cartQuantity}</div>
                    <button onClick={()=>handleIncreaseItem(cartItem)}>+</button>
              </div>
              <div className="cart-product-total-price">
                shs {cartItem.price*cartItem.cartQuantity}

              </div>
            </div>
          ))}
      </div>
      <div className="cart-summary">
        <button className="clear-btn" onClick={()=>handleClearCart()}>
          Clear Cart
        </button>
        <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">shs {cart.cartTotalAmount}</span>
              </div>
              <p>Taxes and Transport Costs Are calculated at checkout</p>
              <button>Check out</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
        </div>
      </div>
      </div>
      )}
    </div>
  )
}

export default Cart