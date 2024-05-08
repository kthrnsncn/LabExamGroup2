import axios from 'axios';
  

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
   },
  });

  export const fetchCSRFToken = async () => {
    try {
        const response = await axiosInstance.get('/csrf-cookie');
        axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrf_token;
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
    }
  };
  

  export const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products');
      return response.data; 
    } catch (error) {
      console.error('Error fetching products:', error);
      return []; 
    }
  };

  export const fetchProductById = async (productId) => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
  };

  export const addProduct = async (productData) => {
    try {
       const response = await axiosInstance.post('/products', productData, {
         headers: {
           'Content-Type': 'multipart/form-data',
         },
       });
       return response.data;
    } catch (error) {
       console.error('Error adding product:', error);
       throw error;
    }
   };
   

   
   export const updateProduct = async (productId, updatedProductData) => {
    try {
      const response = await axiosInstance.post(`/products/${productId}`, updatedProductData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }
 


  export const deleteProduct = async (productId) => {
    try {
      await axiosInstance.delete(`/products/${productId}`);
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  export const addToCart = async (productId, quantity) => {
    try {
       const user = await fetchAuthenticatedUser();
       if (!user) {
         throw new Error('User not authenticated');
       }

       const response = await axiosInstance.post('/add-to-cart', {
         product_id: productId,
         quantity,
         user_id: user.id, 
       });
       return response.data;
    } catch (error) {
       console.error('Error adding product to cart:', error);
       throw error;
    }
   };

  export const fetchCartItems = async () => {
    try {
      const userToken = localStorage.getItem('userToken'); 
      const response = await axiosInstance.get('/cart-items', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
  };
 

  export const removeFromCart = async (productId) => {
    try {
        const response = await axiosInstance.delete('/remove-from-cart', { data: { product_id: productId } });
        console.log('Product removed successfully');
        return response.data;
    } catch (error) {
        console.error('Error removing product from cart:', error);
        throw error;
    }
  };

  export const registerUser = async (userData) => {
    await fetchCSRFToken(); 
    try {
        const response = await axiosInstance.post('/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
  };

  export const loginUser = async (credentials) => {
    await fetchCSRFToken(); 
    try {
        const response = await axiosInstance.post('/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
  };

  export const logoutUser = async () => {
    try {
       await axiosInstance.post('/logout');
       console.log('User logged out successfully');
       return true; 
    } catch (error) {
       console.error('Error logging out user:', error);
       return false; 
    }
   };

  export const fetchAuthenticatedUser = async () => {
    try {
       const response = await axiosInstance.get('/user');
       return response.data; 
    } catch (error) {
       console.error('Error fetching authenticated user:', error);
       return null; 
    }
   };

   export const checkout = async (checkoutData) => {
    try {
       const response = await axiosInstance.post('/checkout', checkoutData);
       return response.data;
    } catch (error) {
       if (axios.isAxiosError(error)) {
         if (error.response) {
           console.log('error here:', error.response.data);
           console.log('error 2:', error.response.status);
           console.log('Error 3:', error.response.headers);
         } else if (error.request) {
           console.log('Error request:', error.request);
         } else {
           console.log('Error message:', error.message);
         }
         console.log('Error config:', error.config);
       } else {
         console.log('Error:', error.message);
       }
       throw error;
    }
   };
   
 
  
  

  

  
