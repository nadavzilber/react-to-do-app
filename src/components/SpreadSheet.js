import { GoogleSpreadsheet } from "google-spreadsheet";
import creds from "../config/client_secret.json";

let doc;
let sheet;
let rows;

const authenticate = async () => {
  console.log("authenticate!");
  console.log("creds:", creds);
  doc = new GoogleSpreadsheet(creds.sheet_id);
  await doc.useServiceAccountAuth(creds);
  console.log("authenticated");
  await doc.loadInfo(); // loads document properties and worksheets
  console.log("doc info loaded");
  console.log(doc.title);
  console.log("doc", doc);
};

const getExistingData = async () => {
  console.log("getExistingData");
  sheet = doc.sheetsByIndex[29];
  console.log("sheet", sheet);
  return await sheet.getRows();
};

const updateRow = async (rowId, isChecked) => {
  let googleSheetsIndex;
  rows = await sheet.getRows();
  console.log("rows before:", rows);
  rows = rows.map((row, index) => {
    if (row.id == rowId) {
      console.log("at index", index);
      googleSheetsIndex = index;
      row.isChecked = isChecked;
    }
    return row;
  });
  console.log("rows after:", rows);
  console.log("saving rows");
  rows[googleSheetsIndex].save();
};

const deleteRow = async (rowId) => {
  let googleSheetsIndex;
  rows = await sheet.getRows();
  rows.map((row, index) => {
    if (row.id == rowId) googleSheetsIndex = index;
  });
  console.log("attempting to delete row", googleSheetsIndex);
  console.log("which is:", rows[googleSheetsIndex]);
  await rows[googleSheetsIndex].delete();
  console.log("deleted row");
};

const addNewRow = async (data) => {
  console.log("addNewRow", data);

  await sheet.addRow({
    id: data.id,
    msg: data.msg,
    isChecked: data.isChecked,
    date: new Date(),
  });

  rows = await sheet.getRows();
  console.log("rows after update:", rows);
};

export { authenticate, getExistingData, addNewRow, updateRow, deleteRow };
