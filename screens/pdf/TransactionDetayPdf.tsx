import React from "react";
import { Button, View, Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import {  TransactionDetailInfo } from "../../interface/IPdfType";

const generateTransactionReportHTML = (transactionInfo: TransactionDetailInfo,t:any) => {
  const currentDate = new Date().toLocaleString("tr-TR");

  const formattedDate = new Date(transactionInfo.pdfTransactionDate).toLocaleString("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>İşlem Dekontu</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', Arial, sans-serif;
      background-color: #f5f5f5;
      color: #333;
    }

    .receipt-container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      padding: 35px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      border-top: 4px solid #1a5f9c;
    }

    .header {
      text-align: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px dashed #ddd;
    }

    .bank-logo {
      height: 30px;
      margin-bottom: 10px;
    }

    .receipt-title {
      font-size: 18px;
      font-weight: 600;
      color: #000000 ;
      margin: 5px 0;
    }

    .receipt-subtitle {
      font-size: 20px;
      color: #1a5f9c;
      margin: 5px 0;
    }

    .datetime {
      font-size: 13px;
      color: #777;
      margin-bottom: 20px;
      text-align: center;
    }

    .transaction-info {
      margin: 25px 0;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }

    .info-label {
      font-weight: 500;
      color: #555;
      font-size: 17px;
    }

    .info-value {
      font-weight: 600;
      color: #333;
      font-size: 14px;
      text-align: right;
    }

    .amount-row {
      background-color: #f8f9fa;
      padding: 12px;
      border-radius: 6px;
      margin: 20px 0;
    }

    .amount-label {
      font-size: 15px;
      color: #555;
    }

    .amount-value {
      font-size: 22px;
      font-weight: 700;
      color: #1a5f9c;
      margin-top: 5px;
    }

    .footer {
      margin-top: 30px;
      text-align: center;
      padding-top: 15px;
      border-top: 1px dashed #ddd;
      font-size: 12px;
      color: #999;
    }

    .reference-number {
      background-color: #f0f0f0;
      padding: 8px;
      border-radius: 4px;
      font-family: monospace;
      margin-top: 10px;
      font-size: 13px;
    }

    .watermark {
      opacity: 0.1;
      position: absolute;
      font-size: 80px;
      transform: rotate(-30deg);
      z-index: -1;
      top: 30%;
      left: 10%;
      font-weight: bold;
      color: #1a5f9c;
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="header">
      <div class="receipt-title">${t.transactionReceipt.title}</div>
    </div>

<div class="datetime">
  <strong>${t.transactionReceipt.reportDateLabel}:</strong>
  ${new Date().toLocaleString("tr-TR", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}
</div>
    <div class="transaction-info">
      <div class="info-row">
        <span class="info-label">${t.transactionReceipt.customerName}:</span>
        <span class="info-value">${transactionInfo.userName ?? ""} ${transactionInfo.userSurname ?? ""}</span>
      </div>
      <div class="info-row">
        <span class="info-label">${t.transactionReceipt.phone}:</span>
        <span class="info-value">${transactionInfo.userPhone ?? "-"}</span>
      </div>
      <div class="info-row">
        <span class="info-label">${t.transactionReceipt.transactionNumber}:</span>
        <span class="info-value">#${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span>
      </div>
    </div>

    <div class="amount-row">
      <div class="amount-label">${t.transactionReceipt.amountLabel}</div>
      <div class="amount-value">${transactionInfo.pdfTransactionAmount.toLocaleString("tr-TR")} ₺</div>
    </div>

    <div class="transaction-info">
      <div class="info-row">
        <span class="info-label">${t.transactionReceipt.description} :</span>
        <span class="info-value">${transactionInfo.pdfTransactionDescription}</span>
      </div>

      <div class="info-row">
        <span class="info-label">${t.transactionReceipt.transactionDate}:</span>
        <span class="info-value">${formattedDate}</span>
      </div>
    </div>

    <div class="footer">
       <div class="receipt-subtitle">MoneyTransfer</div>

    </div>
  </div>
</body>
</html>
`;
};
export const detailTransactionPDF = async (
  transactionInfo: TransactionDetailInfo,
  t:any
) => {
  try {
    console.log(
      "pdf sayfasında pdf  verisi console yazdırılıyor",
      transactionInfo
    );

    const htmlContent = generateTransactionReportHTML(
      transactionInfo,t
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
  transactionInfo: TransactionDetailInfo,
  t:any
) => {
  return (
    <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
      <Button
        title="İşlem Raporu PDF Oluştur"
        onPress={() => detailTransactionPDF(transactionInfo,t)}
      />
    </View>
  );
};

export default CreatePdfButton;
