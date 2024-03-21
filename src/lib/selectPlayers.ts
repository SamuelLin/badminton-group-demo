import { Player } from '@/stores/players'

function calculateWeight(player: Player, maxGames: number, avgLevel: number, levelRange: number, w1: number, w2: number) {
  const { gamesPlayed, level } = player;
  const levelDifference = Math.abs(level - avgLevel);
  
  // Calculate weight based on games played and level difference
  const weight1 = w1 * (1 - gamesPlayed / (maxGames || 1));
  const weight2 = w2 * (1 - levelDifference / levelRange);

  // Combine the weights
  const weight = weight1 + weight2;

  return weight;
}

export function selectPlayers(players: Player[], numToSelect: number = 4) {
  const offCourtPlayers = players.filter(p => !p.onCourt)
            
  // Calculate max games, average level, and level range
  const maxGames = Math.max(...offCourtPlayers.map(player => player.gamesPlayed));
  const totalLevels = offCourtPlayers.reduce((sum, player) => sum + player.level, 0);
  const avgLevel = totalLevels / offCourtPlayers.length;
  const levelRange = Math.max(...offCourtPlayers.map(player => player.level)) - Math.min(...offCourtPlayers.map(player => player.level));
  

  // Example weights coefficients
  const w1 = 0.7;
  const w2 = 0.3;

  const sortWeightPlayers = offCourtPlayers.map(p => {
    return { ...p, weight: calculateWeight(p, maxGames, avgLevel, levelRange, w1, w2) }
  }).sort((a, b) => b.weight - a.weight)

  
  console.log(sortWeightPlayers);
  

  if (sortWeightPlayers.length < numToSelect) return []
  return sortWeightPlayers.slice().splice(0, numToSelect)
}
