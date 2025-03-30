import axios from "axios";
import { API_URL } from "../constants/constant";
import { Register, SignIn, UpdateUser } from "../types/authType";
import Constants from "expo-constants";
import https from "https";

// export async function login(params: SignIn) {
//   try {
//     const url = API_URL + "api/login";
//     // const url = `https://baysoftworks.com/api/login` ;
//     console.log("backend url ekrana yazdırılıyor : ", url);
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         phone: params.phone,
//         password: params.password,
//       }),
//     });
//     const result = await response.json();
//     console.log("burası login methodu : ", result);

//     // if (!result.isSuccess) {
//     //   console.log("if içerisine giriş yapıldı :");
//     //   const errorData = result.message;
//     //   throw new Error(errorData.error || errorData);
//     // }
//     console.log("hata aldığım kısım: ", result);
//     const responseData = await response.json();
//     return responseData;
//   } catch (error: any) {
//     throw error;
//   }
// }

export async function login(params: SignIn) {
  try {
    const url = API_URL + "api/login";
    // const url = `https://baysoftworks.com/api/login`;
    console.log("backend url ekrana yazdırılıyor : ", url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: params.phone,
        password: params.password,
      }),
    });
    const result = await response.json();
    console.log("burası login methodu : ", result);
    if (!result.isSuccess) {
      console.log("if içerisine giriş yapıldı :");
      const errorData = result.message;
      throw new Error(errorData.error || errorData);
    }
    return result;
  } catch (error: any) {
    throw error;
  }
}

export async function register(params: Register) {
  console.log("Register data verileri ekrana yazdırıldı", params);
  try {
    const url = API_URL + "api/register";
    // const url = 'http://192.168.1.105:3000/api/register';
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message);
    }

    const responseData = await response.json();
    console.log("Burası register methodu ", responseData.message);
    return responseData;
  } catch (error: any) {
    throw error;
  }
}

export async function updateUser<T>(id : number, updatedFields: Partial<T>) {
  console.log("Güncellenen veriler:", updatedFields);

  try {
    const url = API_URL + "api/comesandgoes/updateUser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        ...updatedFields,
      }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message);
    }

    const responseData = await response.json();
    console.log("Güncelleme başarılı:", responseData.message);
    return responseData;
  } catch (error: any) {
    throw error;
  }
}

export async function fetchDogImage() {
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "DEMO-API-KEY",
  });

  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1",
      requestOptions
    );

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
