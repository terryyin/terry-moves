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
  const aliveNeighbours = (cell: Cell): Cell[] => _.intersectionWith(aliveCells, neighbourCells(cell), _.isEqual);
  const nearbyCells = [...new Set(aliveCells.flatMap((cell) => neighbourCells(cell)))];
  const having3Neighbours = nearbyCells.filter((cell) => aliveNeighbours(cell).length === 3);
  const having2Neighbours = aliveCells.filter((cell) => aliveNeighbours(cell).length === 2);
  return [...new Set([...having3Neighbours, ...having2Neighbours])];
}

export { Cell, gameOfLifeSurvivors };