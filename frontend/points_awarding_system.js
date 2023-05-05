import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader';

function PointsSystem() {
  const [points, setPoints] = useState(0);
  const [itemsDisposed, setItemsDisposed] = useState(0); // New state variable for items disposed
  const [dailyUsers, setDailyUsers] = useState([]);
  const [monthlyUsers, setMonthlyUsers] = useState([]);
  const [wasteType, setWasteType] = useState('');

  function handleWasteDisposed() {
    let pointsPerWaste = 0;
    switch (wasteType) {
      case 'Plastic Bottle':
        pointsPerWaste = 10;
        break;
      default:
        pointsPerWaste = 5;
        break;
    }
    setPoints(points + pointsPerWaste);
    setItemsDisposed(itemsDisposed + 1); // Increment items disposed by 1
  }

  useEffect(() => {
    // Fetch data from server or API for daily leaderboard and update dailyUsers state variable
  }, []);

  useEffect(() => {
    // Fetch data from server or API for monthly leaderboard and update monthlyUsers state variable
  }, []);

  function Leaderboard({ title, users }) {
    return (
      <div>
        <h2>{title}</h2>
        <ul>
          {users
            .sort((a, b) => b.itemsDisposed - a.itemsDisposed) // Sort users by itemsDisposed in descending order
            .map((user, index) => (
              <li key={user.id}>
                {index + 1}. {user.name} ({user.itemsDisposed} items disposed)
              </li>
            ))}
        </ul>
      </div>
    );
  }

  function handleScan(data) {
    if (data) {
      setWasteType(data);
    }
  }

  function handleError(err) {
    console.error(err);
  }

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>Scanned QR code: {wasteType}</p>
      <p>You have {points} points and have disposed {itemsDisposed} items of waste!</p>
      <button onClick={handleWasteDisposed} disabled={!wasteType}>
        Dispose Waste
      </button>
      <Leaderboard title="Daily Leaderboard" users={dailyUsers} />
      <Leaderboard title="Monthly Leaderboard" users={monthlyUsers} />
    </div>
  );
}

export default PointsSystem;
