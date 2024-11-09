import { API_URL } from "../constants/constant";
import { Register, SignIn } from "../types/authType";

export async function login(params: SignIn) {
    try {
        console.log("form data backende gönderilmek üzere alındı", params)
      const url = API_URL + 'login';
      // const url = "http://localhost:3000/api/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: params.phone,
          password: params.password
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
      const userData = await response.json();
      console.log("response ekrana yazdırıldı ", userData);
      return userData;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred during login');
    }
  }

  export async function register(params: Register) {
    try {
      const url = API_URL + 'register';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...params
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'register failed');
      }
  
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred during register');
    }
  }