import React, { useEffect, useState } from 'react'
import "../CSS/Leaderboard.css";
import { Table } from 'react-bootstrap';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(()=>{
    const getLeaderBoard = async () =>{
      try {
        const res = await fetch("http://localhost:3000/premium/leaderboard",{
          method:"GET"
        });

        const data = await res.json();

        if(!data){
          setLeaderboard([]);
          return;
        }
        setLeaderboard(data);
      } catch (error) {
        console.log(error);
      }
    };
    getLeaderBoard();
  }, []);

  return (
    <>
      <div className='lb-title'>Leaderboard</div>
      <div className='lb-content'>
        <Table>
          <thead>
            <tr>
              <th>Username:</th>
              <th>Total Expense:</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard && leaderboard.map((score)=>
              <tr key={score.id} id={score.id}>
                <td>{score.username}</td>
                <td>{score.totalExpense}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default Leaderboard