import React from "react";
import FileSaver from "file-saver";
import * as XLSX from "xlsx/xlsx.mjs";
import { Button } from "@mui/material";

const ExportToXLSX = ({ data, fileName, disabled }) => {
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (fileData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(fileData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button disabled={disabled} variant="contained" color="success" onClick={(e) => exportToCSV(data, fileName)}>
      Export to .xlsx
    </Button>
  );
};

export default ExportToXLSX;
