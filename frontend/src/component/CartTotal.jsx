import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  
    const subtotal = getCartAmount();
    const total = subtotal + (subtotal > 0 ? delivery_fee : 0);
  
    return (
      <div className='w-full'>
        <div className='text-2xl'>
          <Title text1={'CART'} text2={'TOTALS'} />
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
          <div className='flex justify-between'>
            <p>Sub total</p>
            <p>{currency} {subtotal.toFixed(2)}</p>
          </div>
          <hr />
          <div className='flex justify-between'>
            <p>Shipping Fee(As per distance*)</p>
            <p>{currency} {subtotal > 0 ? delivery_fee.toFixed(2) : 0}</p>
          </div>
          <hr />
          <div className='flex justify-between'>
            <p>Total</p>
            <b>{currency} {total.toFixed(2)}</b>
          </div>
        </div>
      </div>
    );
  };
  

export default CartTotal
