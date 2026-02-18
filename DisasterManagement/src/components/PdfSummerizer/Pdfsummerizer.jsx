import React from 'react'
import axios from "axios";
import "./Pdfsummerizer.css"
import { useState } from 'react'
function Pdfsummerizer() {
const [file,setFile]=useState(null);
const[summery,setSummery]=useState(null);
const[loading,setLoading]=useState(false);
const handleFileChange=(e)=>{
    setFile(e.target.files[0]);
    setSummery(null);
};
const handleUpload=async()=>{
    if(!file){
        alert("Please select pdf");;
        return;
    }
    const formdata=new FormData();
    formdata.append("file",file);

    try{
        setLoading(true);
       const response = await axios.post(
  "http://localhost:5000/api/summarize",
  formdata
);

        setSummery(response.data);
    }catch(error){
        console.log(error);
        alert("Upload failed");
    }finally{
        setLoading(false);
    }
};
  return (
    <div className='container'>
    <h1>PDF Summarizer</h1>
    <input type="file"
    accept='application/pdf'
    onChange={handleFileChange}
    className='file-input'
    />
    <button onClick={handleUpload}
    disabled={loading}
    className='upload-btn'
    >{loading ?"Summarizing":"Upload and summarize"}</button>

    {summery && (
  <div className='summary-box'>
    <h2>Summary</h2>

    <p><strong>Title:</strong> {summery?.case_title || "Not available"}</p>

    <p><strong>Parties:</strong> {summery?.parties_involved || "Not available"}</p>

    {Array.isArray(summery?.key_facts) && summery.key_facts.length > 0 && (
      <ul>
        {summery.key_facts.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    )}

    <p>
      <strong>Judgment:</strong>{" "}
      {summery?.judgment_summary || "AI could not structure this case, showing raw output."}
    </p>
  </div>
)}

    </div>
  )
}

export default Pdfsummerizer