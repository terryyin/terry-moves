import _ from 'lodash';
interface Cell {
  x: number;
  y: number;
}

export function neighbourCells(c: Cell): Cell[] {
  return [
    {x: c.x - 1, y: c.y - 1},
    {x: c.x - 1, y: c.y},
    {x: c.x - 1, y: c.y + 1},
    {x: c.x,     y: c.y - 1},
    {x: c.x,     y: c.y + 1},
    {x: c.x + 1, y: c.y - 1},
    {x: c.x + 1, y: c.y},
    {x: c.x + 1, y: c.y + 1},
  ];
}

function gameOfLifeSurvivors(aliveCells: Cell[]): Cell[] {
  const aliveCellsSet = new Set(aliveCells.map(cell => cell.x + ',' + cell.y));
  const neighbourCounts: Record<string, number> = {};

  for (const cell of aliveCells) {
    for (const neighbour of neighbourCells(cell)) {
      const key = neighbour.x + ',' + neighbour.y;
      neighbourCounts[key] = (neighbourCounts[key] || 0) + 1;
    }
  }

  const newAliveCells = [];

  for (const [key, count] of Object.entries(neighbourCounts)) {
    const [x, y] = key.split(',').map(Number);
    const isAlive = aliveCellsSet.has(key);

    if ((isAlive && (count === 2 || count === 3)) || (!isAlive && count === 3)) {
      newAliveCells.push({ x, y });
    }
  }

  return newAliveCells;
}

export { Cell, gameOfLifeSurvivors };
