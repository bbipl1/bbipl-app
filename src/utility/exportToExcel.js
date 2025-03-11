import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import _ from "lodash"; // Import lodash for deep object flattening

// Fields to remove
const FIELDS_TO_REMOVE = ["_id", "__v", "siteEngid", "siteEngObjectId"];

// Function to flatten nested objects and remove unwanted fields
const flattenObject = (obj, prefix = "") => {
  let flattened = {};

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      // Skip fields that should be removed
      if (FIELDS_TO_REMOVE.includes(key)) continue;

      if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
        // Recursively flatten nested objects
        Object.assign(flattened, flattenObject(obj[key], newKey));
      } else if (Array.isArray(obj[key])) {
        // Convert array to string (or extract relevant data)
        flattened[newKey] = obj[key].map((item) =>
          typeof item === "object" ? JSON.stringify(_.omit(item, FIELDS_TO_REMOVE)) : item
        ).join(", ");
      } else {
        flattened[newKey] = obj[key];
      }
    }
  }

  return flattened;
};

// Function to export data to Excel
const extractToExcel = (data, fileName = "data.xlsx") => {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Invalid data: Must be a non-empty array");
    return;
  }

  // Flatten and remove unwanted fields
  const cleanedData = data.map(item => flattenObject(_.omit(item, FIELDS_TO_REMOVE)));

  // Convert to worksheet
  const worksheet = XLSX.utils.json_to_sheet(cleanedData);

  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook and create a Blob
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

  // Save the file
  saveAs(blob, fileName);
};

export default extractToExcel;
