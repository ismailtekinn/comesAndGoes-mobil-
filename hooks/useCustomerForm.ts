// hooks/useCustomerForm.ts
import { useState, useEffect } from 'react';
import { Customer } from '../types/customerType';
import { getCustomerList } from '../api/customer';


export interface FormData {
  name: string;
  surname: string;
  phone: string;
  cashAmount: number;
  debtDate: string;
  repaymentDate: string;
  debtCurrency: string;
}
export interface MoneyTransferFormData {
  senderName: string;
  surname: string;
  phone: string;
  receivedAmount: string;
  moneyCurrency: string;
  receivedName: string;
  // intermediaryId :number;
  receivedDate: string;
  transferDate: string,
}
export interface AddDebtFormData {
  creditorId: number ; 
  customerPhone: string; 
  debtorId : number,
  debtAmount: number; 
  debtCurrency: string; 
  debtIssuanceDate: Date;
  debtRepaymentDate: Date;
}

export function useCustomerForm(userId: number) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [receiverCustomer, setReceiverCustomer] = useState<Customer | null>(null);


  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    phone: '',
    cashAmount: 0,
    debtDate: '',
    repaymentDate: '',
    debtCurrency: 'TL',
  });


  const [transferFormData, setTransferFormData] = useState<MoneyTransferFormData>({
    senderName: '',
    surname: '',
    phone: '',
    receivedAmount:'',
    moneyCurrency: 'TL',
    receivedName:'',
    receivedDate: '2025-07-17',
    transferDate: '2025-07-24',
  });


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCustomerList(userId);
        
        // Eğer response bir nesne ise ve data alanı varsa, müşterileri buradan al
        if (response && response.data) {
          setCustomers(response.data);  
        } else {
          setCustomers([]); // Eğer yanlış bir veri yapısı dönerse, güvenli bir fallback
        }
        
      } catch (error) {
        console.error('Failed to fetch customers', error);
        setCustomers([]); // Hata durumunda da boş dizi setle
      }
    }
    fetchData();
  }, [userId]);
  


  const handleCustomerChange = (selectedId: number) => {
    const foundCustomer = customers.find((cust) => cust.id === selectedId) || null;
    setSelectedCustomer(foundCustomer);
    if (foundCustomer) {
      setFormData({
        name: foundCustomer.clientName,
        surname: foundCustomer.clientSurname,
        phone: foundCustomer.clientPhone,
        cashAmount: formData.cashAmount,
        debtDate: formData.debtDate,
        repaymentDate: formData.repaymentDate,
        debtCurrency: formData.debtCurrency,
      });
    } else {
      setFormData({
        name: '',
        surname: '',
        phone: '',
        cashAmount: formData.cashAmount,
        debtDate: formData.debtDate,
        repaymentDate: formData.repaymentDate,
        debtCurrency: formData.debtCurrency,
      });
    }
  };



  const handleMoneyTransferCustomerChange = (selectedId: number) => {
    const foundCustomer = customers.find((cust) => cust.id === selectedId) || null;
    setReceiverCustomer(foundCustomer);
  

    if (foundCustomer) {
      setTransferFormData({
        senderName: foundCustomer.clientName,
        surname: foundCustomer.clientSurname,
        phone: foundCustomer.clientPhone,
        
        receivedAmount: transferFormData.receivedAmount,
        receivedDate: transferFormData.receivedDate,
        transferDate: transferFormData.transferDate,
        receivedName: transferFormData.receivedName,
        moneyCurrency: transferFormData.moneyCurrency,
      });
    } else {
      setTransferFormData({
        senderName: '',
        surname: '',
        phone: '',
        receivedAmount: transferFormData.receivedAmount,
        receivedDate: transferFormData.receivedDate,
        transferDate: transferFormData.transferDate,
        receivedName: transferFormData.receivedName,
        moneyCurrency: transferFormData.moneyCurrency,
      });
    }
  };


  const handleSenderCustomerChange = (selectedId: number) => {
    const foundCustomer = customers.find((cust) => cust.id === selectedId) || null;
    setSelectedCustomer(foundCustomer);
  

    if (foundCustomer) {
      setTransferFormData({
        senderName: foundCustomer.clientName,
        surname: foundCustomer.clientSurname,
        phone: foundCustomer.clientPhone,
        
        receivedAmount: transferFormData.receivedAmount,
        receivedDate: transferFormData.receivedDate,
        transferDate: transferFormData.transferDate,
        receivedName: transferFormData.receivedName,
        moneyCurrency: transferFormData.moneyCurrency,
      });
    } else {
      setTransferFormData({
        senderName: '',
        surname: '',
        phone: '',
        receivedAmount: transferFormData.receivedAmount,
        receivedDate: transferFormData.receivedDate,
        transferDate: transferFormData.transferDate,
        receivedName: transferFormData.receivedName,
        moneyCurrency: transferFormData.moneyCurrency,
      });
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
// const handleMoneyTransferInputChange = (name: string, value: string) => {
//   setTransferFormData((prevFormData) => ({
//     ...prevFormData,
//     [name]: value,
//   }));
// };
const handleMoneyTransferInputChange = (name: string, value: string) => {
    setTransferFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  

  return {
    customers,
    selectedCustomer,
    receiverCustomer,
    formData,
    transferFormData,
    setFormData,
    handleCustomerChange,
    setSelectedCustomer,
    handleInputChange,
    handleMoneyTransferInputChange,
    handleMoneyTransferCustomerChange,
    handleSenderCustomerChange,
  };
}