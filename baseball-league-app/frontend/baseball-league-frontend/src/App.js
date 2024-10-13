// src/components/Games.js
import axios from 'axios';
import { useEffect, useState } from 'react';

const Games = () => {
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/schedule');
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div>
      <h1>Game Schedule</h1>
      <ul>
        {games.map((game, index) => (
          <li key={index}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Games;

