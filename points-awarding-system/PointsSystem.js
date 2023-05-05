import React, { useState } from 'react';
function PointsSystem() {
  const [points, setPoints] = useState(0);
  function handleWasteDisposed() {
    const pointsPerWaste = 10; // Change this to adjust points awarded per waste
  setPoints(points + pointsPerWaste);
  // TODO: Increase points by some amount when waste is disposed
  }
  return (
    <div>
      <p>You have {points} points!</p>
      <button onClick={handleWasteDisposed}>Dispose Waste</button>
    </div>
  );
}
export default PointsSystem;