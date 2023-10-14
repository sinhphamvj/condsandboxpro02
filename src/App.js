import React, { useState } from "react";
import XLSX from "xlsx";

function App() {
  const [data, setData] = useState([]);

  const handleFile = (e) => {
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const xlData = XLSX.utils.sheet_to_json(ws, { header: 1, range: 7 });
      /* Update state */
      setData(xlData);
      /* Filter rows that contain 'VN-A521' */
      const filteredData = xlData.filter(row => row.includes('VN-A522'));
      console.log(filteredData);
      const convertToTimeFormat = (time) => {
        const date = new Date(time);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      };

      const time8 = convertToTimeFormat(filteredData[8]);
      const time9 = convertToTimeFormat(filteredData[9]);

      console.log(time8, time9);
    };
    reader.readAsBinaryString(files[0]);
  };


  return (
    <div>
      <input type="file" onChange={handleFile} />
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}

export default App;
