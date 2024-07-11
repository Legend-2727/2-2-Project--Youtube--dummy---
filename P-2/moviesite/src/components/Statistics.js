import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Chart as ChartJS,
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);
function Statistics()
{
    const {videoid}=useParams();
    const [data,setdata]=useState(null);
    useEffect(()=>{
        // console.log("vodai",videoid);
            fetch("http://localhost:5000/getperdayview", {
              method: 'POST',
              body: JSON.stringify({ 
                videoid:videoid,
              }),
              headers: {
                'Content-Type': 'application/json',                 
                'Accept': '*/*' 
              },
            }).then((res) => res.json())
              .then((data) => {
              
                setdata(data);
                console.log(data,2345);
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
    },[])
    const formattedLabels = data?.map(item => {
        const date = new Date(item.VIEWDATE);
        return date.toLocaleDateString('en-US'); // Format as "mm/dd/yyyy"
      });
    const chartData = {
        labels: formattedLabels, 
        datasets: [
          { 
            label: 'View Count',
            data: data?.map(item => item.VIEWC),
            backgroundColor: 'red',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 0,
          },
        ],
      };
   
      
      
   
      
      return (
        <div style={{width:'70%',height:'80vh',margin:'auto'}}>
          <h2>Video View Statistics</h2>
          <Bar data={chartData} />
        </div>
      );
    
    
}
export default Statistics;