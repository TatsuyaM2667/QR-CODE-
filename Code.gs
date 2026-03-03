const SHEET_NAME = 'ScanQRData';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function onScan(text) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error(`シート "${SHEET_NAME}" が見つかりません。`);
  }

  const data = sheet.getDataRange().getValues();
   try {
    sheet.appendRow([new Date(), text]);
  } catch (e) {
    Logger.log("Error while saving scanned data: " + e.message);
    throw new Error("データ保存中にエラーが発生しました: " + e.message);
  }
}
