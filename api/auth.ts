import axios from "axios";
import { API_URL } from "../constants/constant";
import { Register, SignIn } from "../types/authType";
import Constants from 'expo-constants';
import https from 'https';



export async function login(params: SignIn) {
    try {
        console.log("form data backende gönderilmek üzere alındı", params)
      // const url = API_URL + 'login';
      // const url = 'http://localhost:3000/api/login';
    //  const url = 'http://192.168.1.105:3000/api/login';

      // const url = `https://92.113.27.13:3000/api/login` ;
      const url = `https://baysoftworks.com/api/login` ;
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


  export async function fetchDogImage() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "x-api-key": "DEMO-API-KEY", 
    });
  
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    };
  
    try {
      const response = await fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions);
  
      if (!response.ok) {
        throw new Error(`HTTP Hatası! Durum: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Gelen veri:", result);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Hata:", error.message);
      } else {
        console.error("Bilinmeyen hata:", error);
      }
      throw error;
    }
  }
  
