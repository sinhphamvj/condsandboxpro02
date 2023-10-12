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
      const xlData = XLSX.utils.sheet_to_json(ws);
      console.log(xlData);
      /* Update state */
      setData(xlData);
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
