import _ from 'lodash';
class Cell {
  // eslint-disable-next-line no-useless-constructor
  constructor(private x: number, private y: number) { }

  neighbourCells(): Cell[] {
    return [
      new Cell(this.x - 1, this.y - 1),
      new Cell(this.x - 1, this.y),
      new Cell(this.x - 1, this.y + 1),
      new Cell(this.x, this.y - 1),
      new Cell(this.x, this.y + 1),
      new Cell(this.x + 1, this.y - 1),
      new Cell(this.x + 1, this.y),
      new Cell(this.x + 1, this.y + 1),
    ];
  }
}

function gameOfLifeSurvivors(aliveCells: Cell[]): Cell[] {
  const aliveNeighbours = (cell: Cell): Cell[] => _.intersectionWith(aliveCells, cell.neighbourCells(), _.isEqual);
  const nearbyCells = [...new Set(aliveCells.flatMap((cell) => cell.neighbourCells()))];
  const having3Neighbours = nearbyCells.filter((cell) => aliveNeighbours(cell).length === 3);
  const having2Neighbours = aliveCells.filter((cell) => aliveNeighbours(cell).length === 2);
  return [...new Set([...having3Neighbours, ...having2Neighbours])];
}

export { Cell, gameOfLifeSurvivors };
