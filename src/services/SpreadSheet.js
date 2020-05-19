import { GoogleSpreadsheet } from "google-spreadsheet";
import creds from "../config/client_secret.json";

let doc;
let sheet;
let rows;

const authenticate = async () => {
  doc = new GoogleSpreadsheet(creds.sheet_id);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo(); // loads document properties and worksheets
};

const getExistingData = async (sheetIndex=29) => {
  console.log('getExisting for index:',sheetIndex)
  //sheet 29 = tasks
  //sheet 30 - 5mj-morning
  sheet = doc.sheetsByIndex[sheetIndex];
  return await sheet.getRows();
};

const updateRow = async (rowId, isChecked) => {
  let googleSheetsIndex;
  rows = await sheet.getRows();
  rows = rows.map((row, index) => {
    if (row.id == rowId) {
      googleSheetsIndex = index;
      row.isChecked = isChecked;
    }
    return row;
  });
  rows[googleSheetsIndex].save();
};

const deleteRow = async (rowId) => {
  let googleSheetsIndex;
  rows = await sheet.getRows();
  rows.map((row, index) => {
    if (row.id == rowId) googleSheetsIndex = index;
  });
  await rows[googleSheetsIndex].delete();
};

const addNewRow = async (data) => {
  await sheet.addRow({
    id: data.id,
    msg: data.msg,
    isChecked: data.isChecked,
    date: new Date(),
  });
  rows = await sheet.getRows();
};

export { authenticate, getExistingData, addNewRow, updateRow, deleteRow };
