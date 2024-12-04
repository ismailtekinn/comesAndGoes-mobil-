import { API_URL } from "../constants/constant";
import { Customer, Debt, DebtDetail, MoneyTransfer } from "../types/customerType";

export async function getCustomerList(userId: number) {
  try {
    const url = `${API_URL}comesandgoes/getCustomerList?userId=${userId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'getCustomerList failed');
    }
    
    const customerList = await response.json();
    return customerList;
    
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching the customer list');
  }
}


export async function moneyTransfer(params: MoneyTransfer){
  try{
      const url = API_URL + 'comesandgoes/addTransferMany';
      const response = await fetch(url, {
          method: 'Post',
          headers:{
              'Content-Type': 'application/json'
          },
          body :JSON.stringify({
              ...params
          })
      });
      if(!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.error || 'addTransferMany failed');
          
      }
      const customer = await response.json();
      return customer;
  }catch(error){}

}

export async function addCustomer(params: Customer): Promise<{ success: boolean; message: string }> {
  try{
     const url = API_URL + 'comesandgoes/addCustomer';
     console.log("öğeler buraya geldi", params)
 
     const response = await fetch(url, {
         method: 'Post',
         headers:{
             'Content-Type': 'application/json'
         },
         body :JSON.stringify({
             ...params
         })
     });
     if(!response.ok){
         const errorData = await response.json();
         throw new Error(errorData.error || 'addCustomer failed');
         
     }
     const customer = await response.json();
     return customer;
  }catch(error){
     console.error(error);
     throw new Error('An error occurred during register');
  }
 }

export async function addCashReceivable(params: Debt) {
  try{
      const url = API_URL + 'comesandgoes/addCashReceivable';
      const response = await fetch(url, {
          method: 'Post',
          headers:{
              'Content-Type': 'application/json'
          },
          body :JSON.stringify({
              ...params
          })
      });
      if(!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.error || 'addCashReceivable failed');
          
      }
      const result = await response.json();
      return result.message;
  }catch(error){}

}
 
 export async function homeCustomerList(userId: number){
  try{
      const url = `${API_URL}comesandgoes/getCombinedCustomerData?userId=${userId}`;
      const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if(!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.error || 'addCustomer failed');
          
      }
      const customerList = await response.json();
      return customerList;
  }catch(error){
      console.error(error);
      throw new Error('An error occurred during register');
   }
}


export async function debtdetailCustomerList(params: DebtDetail){
  try{
      console.log("userId ve customerId yazdırıldı",params)
      const url = API_URL + 'comesandgoes/getCombinedDetailCustomerData';
      // const url = `${API_URL}comesandgoes/getCombinedDetailCustomerData?userId=${1}&customerId=${1}`;

      console.log("burası dept detay api: " , params);
      const response = await fetch(url, {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({
              ...params
          })
        });
        console.log(" burası api dönen response ",response)
        if(!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.error || 'addCustomer failed');
          
      }
      const debtdetailCustomerList = await response.json();
      console.log(debtdetailCustomerList)
      return debtdetailCustomerList;
  }catch(error){
      console.error(error);
      throw new Error('An error occurred during register');
   }
}

export async function debCustomerList(userId: number){
  try{
      const url = `${API_URL}comesandgoes/debCustomerList?userId=${userId}`;
      const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if(!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.error || 'addCustomer failed');
          
      }
      const customerList = await response.json();
      return customerList;
  }catch(error){
      console.error(error);
      throw new Error('An error occurred during register');
   }
}

export async function cashReceivableList(userId: number){
  try{
      const url = `${API_URL}comesandgoes/cashReceivableList?userId=${userId}`;
      const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if(!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.error || 'addCustomer failed');
          
      }
      const customerList = await response.json();

      return customerList;
  }catch(error){
      console.error(error);
      throw new Error('An error occurred during register');
   }
}
export async function getMoneyTransfers(userId: number){
  try{
      const url = `${API_URL}comesandgoes/getMoneyTransfers?userId=${userId}`;
      const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if(!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.error || 'addCustomer failed');
          
      }
      const customerList = await response.json();
      return customerList;
  }catch(error){
      console.error(error);
      throw new Error('An error occurred during register');
   }
}

export async function accountInfo(userId: number){
  try{
      const url = `${API_URL}comesandgoes/getAccountInfo?userId=${userId}`;
      const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if(!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.error || 'addCustomer failed');
          
      }
      const accountInfo = await response.json();
      console.log("Account bilgileri api fonksiyonu : " , accountInfo)
      return accountInfo;
  }catch(error){
      console.error(error);
      throw new Error('An error occurred during register');
   }
}

