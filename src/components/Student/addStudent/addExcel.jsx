// import "./home.scss";
// const AddExcel = () => {
//     return (<div className="home">
//       <h1>Add using Excel</h1>
//     </div>);
// };
// export default AddExcel;

// import { useState } from "react";
// import * as XLSX from "xlsx";
// import "./addExcel.css"

// function AddExcel() {

//   const [data, setData] = useState([]);

//   const handleFileUpload = (e) => {
//     const reader = new FileReader();
//     reader.readAsBinaryString(e.target.files[0]);
//     reader.onload = (e) => {
//       const data = e.target.result;
//       const workbook = XLSX.read(data, { type: "binary" });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const parsedData = XLSX.utils.sheet_to_json(sheet);
//       setData(parsedData);
//     };
//   }

//   return (
//     <div className="addExcel">

//       <input 
//         type="file" 
//         accept=".xlsx, .xls" 
//         onChange={handleFileUpload} 
//       />

//       {data.length > 0 && (
//         <table className="table">
//           <thead>
//             <tr>
//               {Object.keys(data[0]).map((key) => (
//                 <th key={key}>{key}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, index) => (
//               <tr key={index}>
//                 {Object.values(row).map((value, index) => (
//                   <td key={index}>{value}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <br /><br />
    
//     </div>
//   );
// }
// 
// export default AddExcel;

import React from 'react';
import './addExcel.css';
import {RangeDirective, RangesDirective, SheetDirective, SheetsDirective, 
  SpreadsheetComponent} from '@syncfusion/ej2-react-spreadsheet';
// import {defaultData} from './data';
function App() {
  return (
    <div className="App">
      <SpreadsheetComponent allowOpen={true}
        openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
        allowSave={true}
        saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save">
        <SheetsDirective>
          <SheetDirective>
            <RangesDirective>
              <RangeDirective ></RangeDirective>
            </RangesDirective>
          </SheetDirective>
        </SheetsDirective>
      </SpreadsheetComponent>
    </div>
  );
}

export default App;
