import React, { useContext } from "react";
import { Button, View, Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Transaction as IPdfType } from "../../interface/IHomeCustomer";
import { IPdfCustomerInfo } from "../../interface/IPdfType";

const generateTransactionReportHTML = (
  transactions: IPdfType[],
  customerInfo: IPdfCustomerInfo,
  t:any
) => {
  const currentDate = new Date().toLocaleString("tr-TR");

  const rows = transactions
    .map((item, index) => {
      const date = new Date(item.createdAt).toLocaleString("tr-TR");
      const isDebt = item.transactionType === "debt";
      return `
      <tr>
        <td>${index + 1}</td>
        <td>${date}</td>
        <td>${item.transactionType === "cash" ? t.createPdfButton.transactionTypes.cash : t.createPdfButton.transactionTypes.debt }</td>
        <td class="${isDebt ? "text-red" : "text-green"}">
          ${item.transactionAmount.toLocaleString("tr-TR")} ${
        item.transactionCurrency
      }
        </td>
        <td>${
          item.description ? item.description.replace(/\n/g, "<br>") : "-"
        }</td>
      </tr>`;
    })
    .join("");

  return `
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px;
          background-color: #f4f6f8;
          color: #333;
        }
        h1 {
          text-align: center;
          color: #0056b3;
          margin-bottom: 5px;
        }
        h2 {
          text-align: center;
          color: #0056b3;
          margin-top: 0;
          margin-bottom: 15px;
          font-weight: 600;
        }
        p {
          text-align: center;
          font-size: 14px;
          color: #666;
          margin-top: 0;
          margin-bottom: 25px;
        }
        .customer-info {
          background-color: #f9f9f9;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          max-width: 400px;
          font-family: Arial, sans-serif;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .label {
          font-weight: bold;
          color: #333;
        }

        .value {
          font-weight: 500;
        }

        .text-green {
          color: #2e7d32; /* Yeşil ton */
        }

        .text-red {
          color: #c62828; /* Kırmızı ton */
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          margin-top: 0;
        }
        th, td {
          padding: 12px;
          border-bottom: 1px solid #ccc;
          text-align: center;
        }
        th {
          background-color: #004085;
          color: white;
        }
        .text-green {
          color: #155724;
          font-weight: 600;
        }
        .text-red {
          color: #c82333;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <h1>Baysoftworks</h1>
      <b/>
      <b/>
      <b/>
      <h2>${t.createPdfButton.reportTitle}</h2>
      <p>${t.createPdfButton.reportDateLabel}: ${currentDate}</p>

      <div class="customer-info">
        <div class="info-row">
          <span class="label">${t.createPdfButton.customerLabel}:</span>
          <span class="value">${customerInfo.clientName} ${
    customerInfo.clientSurname
  }</span>
        </div>
        <div class="info-row">
          <span class="label">${t.createPdfButton.totalCashLabel}:</span>
          <span class="value text-green">${customerInfo.TotalCash.toLocaleString(
            "tr-TR"
          )} </span>
        </div>
        <div class="info-row">
          <span class="label">${t.createPdfButton.totalDebtLabel}:</span>
          <span class="value text-red">${customerInfo.TotalDebt.toLocaleString(
            "tr-TR"
          )} </span>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>${t.createPdfButton.tableHeaders.date}</th>
            <th>${t.createPdfButton.tableHeaders.transactionType}</th>
            <th>${t.createPdfButton.tableHeaders.amount}</th>
            <th>${t.createPdfButton.tableHeaders.description}</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </body>
  </html>`;
};

export const createAndSharePDF = async (
  transactions: IPdfType[],
  customerInfo: IPdfCustomerInfo,
  t:any
) => {
  try {
    console.log(
      "pdf sayfasında pdf  verisi console yazdırılıyor",
      customerInfo
    );
    const htmlContent = generateTransactionReportHTML(
      transactions,
      customerInfo,
      t
    );
    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert("Hata", "Bu cihazda paylaşma özelliği desteklenmiyor.");
      return;
    }

    await Sharing.shareAsync(uri);
  } catch (error) {
    Alert.alert("Hata", "PDF oluşturulurken bir sorun oluştu.");
    console.error(error);
  }
};
const CreatePdfButton = (
  transactions: IPdfType[],
  customerInfo: IPdfCustomerInfo,
  t:any
) => {
  return (
    <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
      <Button
        title="İşlem Raporu PDF Oluştur"
        onPress={() => createAndSharePDF(transactions, customerInfo,t)}
      />
    </View>
  );
};

export default CreatePdfButton;
