// import "./home.scss";
// const AddExcel = () => {
//     return (<div className="home">
//       <h1>Add using Excel</h1>
//     </div>);
// };
// export default AddExcel;
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import "./NavTabs.scss"; 

function AddExcel() {
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [filename, setFilename] = useState('');
  const [changesSaved, setChangesSaved] = useState(true); // Track if changes are saved or not

  useEffect(() => {
    if (!changesSaved) {
      return; // If changes are not saved, do nothing
    }

    setData([]); // Reset the data
    setEditedData({}); // Reset edited data
    setFilename('');
    console.log(filename);// Reset filename
  }, [changesSaved]); // Trigger whenever changesSaved state changes

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFilename(file.name);
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const parsedData = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = parsedData.SheetNames[0];
      const sheetData = parsedData.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheetData);
      setData(jsonData);
    };
    fileReader.readAsArrayBuffer(file);
  };

  const handleCellChange = (cell, value) => {
    setEditedData({ ...editedData, [cell]: value });
    setChangesSaved(false); // Changes have been made but not saved
  };

  const saveChanges = () => {
    const originalSheet = XLSX.utils.sheet_to_json(data);
    const updatedSheet = originalSheet.map((row, rowIndex) => {
      return Object.keys(row).reduce((updatedRow, colKey) => {
        updatedRow[colKey] = editedData[`${rowIndex + 1}-${colKey}`] || row[colKey];
        return updatedRow;
      }, {});
    });
    const updatedWorkbook = XLSX.utils.book_new();
    const updatedSheetObject = XLSX.utils.json_to_sheet(updatedSheet);
    XLSX.utils.book_append_sheet(updatedWorkbook, updatedSheetObject, 'Sheet1');
    XLSX.saveChanges 
    XLSX.writeFile(updatedWorkbook, filename);
    setChangesSaved(true); 
    console.log(filename)
  };

  return (
    <div className="addExcel">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {data.length > 0 && (
        <table className="table" contentEditable onCellChange={(cell, value) => handleCellChange(cell, value)}>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, colIndex) => (
                  <td key={`${index + 1}-${colIndex}`}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />
      <button onClick={saveChanges}>Save Changes</button>
    </div>
  );
}

export default AddExcel;





// import React from 'react';
// import './addExcel.css';
// import {RangeDirective, RangesDirective, SheetDirective, SheetsDirective, 
//   SpreadsheetComponent} from '@syncfusion/ej2-react-spreadsheet';
// // import {defaultData} from './data';
// function App() {
//   return (
//     <div className="App">
//       <SpreadsheetComponent allowOpen={true}
//         openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
//         allowSave={true}
//         saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save">
//         <SheetsDirective>
//           <SheetDirective>
//             <RangesDirective>
//               <RangeDirective ></RangeDirective>
//             </RangesDirective>
//           </SheetDirective>
//         </SheetsDirective>
//       </SpreadsheetComponent>
//     </div>
//   );
// }

// export default App;
