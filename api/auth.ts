import axios from "axios";
import { API_URL } from "../constants/constant";
import { Register, SignIn } from "../types/authType";
import Constants from 'expo-constants';


export async function login(params: SignIn) {
    try {
        console.log("form data backende gönderilmek üzere alındı", params)
      // const url = API_URL + 'login';
      // const url = 'http://92.113.27.13:3000/api/login';
      const API_URL = Constants.expoConfig?.extra?.API_URL;
      const url = `${API_URL}/Login`;
      // const url = Constants.manifest?.extra?.apiUrl; ;
      console.log("backend url ekrana yazdırılıyor : ", url)
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: params.phone,
          password: params.password
        }),
        mode: 'cors' 
        
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
// export async function login(params: SignIn) {
//   try {
//     console.log("form data backende gönderilmek üzere alındı", params);
//     // const url = API_URL + 'login';
//     const url = 'http://92.113.27.13:3000/api/login';
//     console.log("backend url ekrana yazdırılıyor : ", url);

//     const response = await axios.post(url, {
//       phone: params.phone,
//       password: params.password
//     }, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       }
//     });

//     console.log("response ekrana yazdırıldı ", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error('An error occurred during login');
//   }
// }



  export async function register(params: Register) {
    console.log("Register data verileri ekrana yazdırıldı", params)
    try {
      const url = API_URL + 'register';
      // const url = 'http://192.168.1.105:3000/api/register';
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
      console.log("Burası register methodu ", userData.message)
      return userData;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred during register');
    }
  }



 12342354546 