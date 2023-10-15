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
      const xlData = XLSX.utils.sheet_to_json(ws, { header: 'A', range: 7 });
      /* Update state */

      /* Filter rows that contain 'VN-A521' */
      // const filteredData = xlData.filter(row => row.includes('VN-A522'));
      // console.log(filteredData);

      setData(xlData);
      console.log(xlData)
      console.log('Colum I:', xlData[1].I, typeof xlData[1].I)

      const getTimeDifference = (startTime, endTime) => {
        const start = new Date(`1970-01-01T${startTime}Z`);
        const end = new Date(`1970-01-01T${endTime}Z`);
        let diff = end - start;
        let diffHours = Math.floor(diff / 3.6e6); // hours
        let diffMinutes = Math.floor((diff % 3.6e6) / 6e4); // minutes
        return `${diffHours}:${diffMinutes}`;
      };

      xlData.forEach((item, index) => {
        console.log(`Time difference between J and I for row ${index + 1}: ${getTimeDifference(item.I, item.J)}`);
      });
      // console.log('value:', (xlData[1].J - xlData[1].I))
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
