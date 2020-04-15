import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

//get products from server
export async function getProducts() {
        const response = await axios.get(`${BASE_URL}/api/product`);
        return response.data;
}

//get products base on cart
export async function getCartProducts(cart) {
        const response = await axios.post(`${BASE_URL}/api/product/cart`, { cart });
        return response.data;
}


export async function login(data) {
        try {
                const response = await axios.post(`${BASE_URL}/api/auth`,
                        { name: data.name, password: data.password });
                localStorage.setItem('x-access-token', response.data.token);
                //2 hours expire time
                localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
                return response.data;
        }
        catch (err) {
                return await Promise.reject('Authentication Denied');
        }
}

//using token to verify payment
export async function pay(data) {
        try {
                const response = await axios.get(`${BASE_URL}/api/pay`,
                        { params: { 'x-access-token': localStorage.getItem('x-access-token') } });
                return response.data;
        }
        catch (err) {
                return await Promise.reject(err);
        }
}

export function isAuthenticated() {
        return localStorage.getItem('x-access-token') 
        && localStorage.getItem('x-access-token-expiration') > Date.now()
}