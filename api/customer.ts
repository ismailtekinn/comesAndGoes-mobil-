import { API_URL } from "../constants/constant";
import { TransactionFormData } from "../screens/EditTransaction";
import { UpdatePassword } from "../types/authType";
import {
  AddUserCash,
  Customer,
  Debt,
  DebtDetail,
  MoneyTransfer,
  NewDebt,
} from "../types/customerType";

export async function getCustomerList(userId: number) {
  try {
    const url = `${API_URL}api/comesandgoes/getCustomerList?userId=${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "getCustomerList failed");
    }
    
    const customerList = await response.json();
    return customerList;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching the customer list");
  }
}
export async function getfilterCustomerList(userId: number, searchQuery: string ) {
  try {
    const url = `${API_URL}api/comesandgoes/getfilterCustomerList?userId=${userId}&serachQuery=${searchQuery}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "getCustomerList failed");
    }
    const customerList = await response.json();
    console.log("Home sayfasında listelenen veri yazdırılıyor ")
   
    return customerList;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching the customer list");
  }
}

export async function moneyTransfer(params: MoneyTransfer): Promise<{isSuccess: boolean; message: string}> {
  try {
    const url = API_URL + "api/comesandgoes/addTransferMany";
    const response = await fetch(url, {
      method: "Post",
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
    return responseData;
  } catch (error:any) {
    throw error
  }
}

export async function addUserCash(params: AddUserCash): Promise<{isSuccess: boolean; message: string}> {
  try {
    const url = API_URL + "api/comesandgoes/addUserCash";
    const response = await fetch(url, {
      method: "Post",
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
    return responseData;
  } catch (error:any) {
    throw error
  }
}
export async function addDebt(params: NewDebt): Promise<{isSuccess: boolean; message: string}> {
  try {
    const url = API_URL + "api/comesandgoes/addDebt";
    const response = await fetch(url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params,
      }),
    });
    
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Bilinmeyen bir hata oluştu.");
    }
    return responseData;
  } catch (error:any) {
    return { isSuccess: false, message: error.message };
  }
}

export async function addCustomer(
  params: Customer
): Promise<{ isSuccess: boolean; message: string }> {
  try {
    const url = API_URL + "api/comesandgoes/addCustomer";
    const response = await fetch(url, {
      method: "Post",
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
    return responseData;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}
export async function updateCustomer(
  params: Customer
): Promise<{ isSuccess: boolean; message: string }> {
  try {
    const url = API_URL + "api/comesandgoes/updateCustomer";
    const response = await fetch(url, {
      method: "Post",
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
    return responseData;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}

export async function addCashReceivable(params: NewDebt):Promise<{isSuccess: boolean; message:string}> {
  try {
    const url = API_URL + "api/comesandgoes/addCashReceivable";
    const response = await fetch(url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params,
      }),
    });
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || "Bilinmeyen bir hata oluştu.");
    }
    return responseData;
  } catch (error: any) {
    return { isSuccess: false, message: error.message };

  }
}

export async function homeCustomerList(userId: number) {
  try {
    const url = `${API_URL}api/comesandgoes/getCombinedCustomerData?userId=${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "addCustomer failed");
    }
    const customerList = await response.json();
    return customerList;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during register");
  }
}

export async function debtdetailCustomerList(params: DebtDetail) {
  try {
    const url = API_URL + "comesandgoes/getCombinedDetailCustomerData";
    // const url = `${API_URL}comesandgoes/getCombinedDetailCustomerData?userId=${1}&customerId=${1}`;
    const response = await fetch(url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "addCustomer failed");
    }
    const debtdetailCustomerList = await response.json();
    return debtdetailCustomerList;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during register");
  }
}

export async function updatePassword(params: UpdatePassword) {
  try {
    const url = API_URL + "api/comesandgoes/updatePassword";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message);
    }
    return responseData;
  } catch (error: any) {
    throw error;
  }
}

export async function debCustomerList(userId: number) {
  try {
    const url = `${API_URL}api/comesandgoes/debCustomerList?userId=${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "addCustomer failed");
    }
    const customerList = await response.json();
    return customerList;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during register");
  }
}

export async function cashReceivableList(userId: number) {
  try {
    const url = `${API_URL}api/comesandgoes/cashReceivableList?userId=${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "addCustomer failed");
    }
    const customerList = await response.json();

    return customerList;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during register");
  }
}
export async function getMoneyTransfers(userId: number) {
  try {
    const url = `${API_URL}api/comesandgoes/getMoneyTransfers?userId=${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "addCustomer failed");
    }
    const customerList = await response.json();
    return customerList;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during register");
  }
}
export async function accountInfo(userId: number) {
  try {
    const url = `${API_URL}api/comesandgoes/getAccountInfo?userId=${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(errorData.error || "getAccountInfo failed");
    }
    const accountInfo = await response.json();
    return accountInfo;
  } catch (error) {
    console.error("Network request failed error:", error);
    throw new Error("An error occurred during getAccountInfo");
  }
}
export async function getCustomerCashDebtList(params: DebtDetail) {
  try {
    const url = API_URL + "api/comesandgoes/getCustomerCashDebtList";
    const response = await fetch(url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "addCustomer failed");
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during register");
  }
}
export async function getCustomerCashDebtAllList(userId: number) {
  try {
    const url = API_URL + "api/comesandgoes/getCustomerCashDebtAllList";
    const response = await fetch(url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "addCustomer failed");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during register");
  }
}


export async function compareDebtAndCashReceivable(params: DebtDetail) {
  try {
    const url = API_URL + "api/comesandgoes/getCompareDebtAndCashReceivable";
    const response = await fetch(url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "addCustomer failed");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during register");
  }
}
export async function compareDebtAndCashReceivableAllList(userId: number) {
  try {
    const url = API_URL + "api/comesandgoes/compareDebtAndCashReceivableAllCustomers";
    const response = await fetch(url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "addCustomer failed");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during register");
  }
}



export async function getUserCash(userId: number) {
  try {
    const url = `${API_URL}api/comesandgoes/getUserCashAmount?userId=${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "addCustomer failed");
    }
    const userCashList = await response.json();
    return userCashList;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during register");
  }
}
export async function getUserCashAmountAllList(userId: number) {
  try {
    const url = `${API_URL}api/comesandgoes/getUserCashAmountAllList?userId=${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "addCustomer failed");
    }
    const userCashList = await response.json();
    return userCashList;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during register");
  }
}

export async function editTransaction<T extends string>(
  params: Partial<TransactionFormData>,
  type: T
): Promise<{ isSuccess: boolean; message: string }> {
  try {
    let url = "";

    if (type === "Borç") {
      url = API_URL + "api/comesandgoes/updatedebtReserve";
    } else if (type === "Alacak") {
      url = API_URL + "api/comesandgoes/updatecashReserve";
    } else {
      throw new Error("Geçersiz işlem türü.");
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Bilinmeyen bir hata oluştu.");
    }

    return responseData;
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
}


export async function deleteTransaction(recordId: number) {
  try {
    const url = API_URL + "api/comesandgoes/deleteDebtReserve";
    const response = await fetch(url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recordId,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "addCustomer failed");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during register");
  }
}