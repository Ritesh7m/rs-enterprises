import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 350; 
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([])
  const [token, setToken] = useState("")

  const navigate = useNavigate();

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    }
    else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    
    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', { itemId }, { headers: { token } })
      }
      catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  }

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      try {
        if (cartItems[itemId] > 0) {
          totalCount += cartItems[itemId];
        }
      } catch (error) {
        console.log(error);
      }
    }
    return totalCount;
  }

  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData)
    
    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, quantity }, { headers: { token } })
      }
      catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  }

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);

      if (itemInfo) {
        try {
          const quantity = cartItems[itemId];
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity;
          }
        } catch (error) {
          console.error('Error calculating cart amount:', error);
        }
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setProducts(response.data.products)
      }
      else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
      if (response.data.success) {
        setCartItems(response.data.cartData)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProductsData()
  }, [])

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
    if (token) {
      getUserCart(token)
    }
  }, [])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    setCartItems,
    token
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;