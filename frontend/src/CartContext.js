import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const API_URL = 'http://localhost:9999';

  const getToken = () => localStorage.getItem('token');

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const updateCartCount = useCallback((items) => {
    const count = items.reduce((total, item) => total + (item.quantity || 1), 0);
    setCartCount(count);
  }, []);

  const fetchCart = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setCart([]);
      updateCartCount([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data.items || []);
      updateCartCount(response.data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } finally {
      setLoading(false);
    }
  }, [API_URL, updateCartCount]); // updateCartCount is memoized, so stable

  const addToCart = async (product, quantity = 1) => {
    const token = getToken();
    if (!token) {
      toast.info('Please login to add items to cart');
      setTimeout(() => window.location.href = '/login', 1500);
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/cart/add`,
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.items);
      updateCartCount(response.data.items);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const removeFromCart = async (productId) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await axios.delete(`${API_URL}/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data.items);
      updateCartCount(response.data.items);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const increaseQty = async (productId) => {
    const token = getToken();
    if (!token) return;

    const item = cart.find(item => (item.productId || item._id) === productId);
    if (!item) return;
    const newQuantity = (item.quantity || 1) + 1;

    try {
      const response = await axios.put(
        `${API_URL}/cart/update/${productId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.items);
      updateCartCount(response.data.items);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update quantity');
    }
  };

  const decreaseQty = async (productId) => {
    const token = getToken();
    if (!token) return;

    const item = cart.find(item => (item.productId || item._id) === productId);
    if (!item || (item.quantity || 1) <= 1) return;
    const newQuantity = (item.quantity || 1) - 1;

    try {
      const response = await axios.put(
        `${API_URL}/cart/update/${productId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.items);
      updateCartCount(response.data.items);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update quantity');
    }
  };

  const clearCart = async () => {
    const token = getToken();
    if (!token) return;

    try {
      await axios.delete(`${API_URL}/cart/clear`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart([]);
      updateCartCount([]);
      toast.success('Cart cleared');
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  // Merge guest cart after login (if any)
  const mergeGuestCart = async () => {
    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    if (guestCart.length === 0) return;

    const token = getToken();
    if (!token) return;

    try {
      for (const item of guestCart) {
        await axios.post(
          `${API_URL}/cart/add`,
          { productId: item._id, quantity: item.quantity || 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      localStorage.removeItem('guestCart');
      await fetchCart();
      toast.success('Cart synced successfully');
    } catch (error) {
      console.error('Error merging cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]); // now fetchCart is stable, no warning

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      loading,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      clearCart,
      getSubtotal,
      mergeGuestCart,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};