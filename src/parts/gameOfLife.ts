interface Cell {
  x: number;
  y: number;
}

class GameOfLifeWorld {
  private allCells: Map<string, Cell> = new Map();

  constructor() {
    this.allCells = new Map();
  }

  getCell(x: number, y: number): Cell {
    const key = x + ',' + y;
    if (!this.allCells.has(key)) {
      this.allCells.set(key, {x, y});
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.allCells.get(key)!;
  }
}

const world = new GameOfLifeWorld();

export function neighbourCells(c: Cell): Cell[] {
  return [
    world.getCell(c.x - 1, c.y - 1),
    world.getCell(c.x - 1, c.y),
    world.getCell(c.x - 1, c.y + 1),
    world.getCell(c.x,     c.y - 1),
    world.getCell(c.x,     c.y + 1),
    world.getCell(c.x + 1, c.y - 1),
    world.getCell(c.x + 1, c.y),
    world.getCell(c.x + 1, c.y + 1),
  ];
}

function gameOfLifeSurvivors(aliveCells: Cell[]): Cell[] {
  const aliveCellsSet = new Set(aliveCells.map(cell => world.getCell(cell.x, cell.y)));
  return gameOfLifeSurvivors1(aliveCellsSet);
}

function gameOfLifeSurvivors1(aliveCells: Set<Cell>): Cell[] {
  const neighbourCounts: Map<Cell, number> = new Map;

  for (const cell of aliveCells) {
    for (const neighbour of neighbourCells(cell)) {
      neighbourCounts.set(neighbour, (neighbourCounts.get(neighbour) ?? 0) + 1);
    }
  }

  const newAliveCells: Cell[] = [];

  neighbourCounts.forEach((count, cell) => {
    const isAlive = aliveCells.has(cell);

    if ((isAlive && (count === 2 || count === 3)) || (!isAlive && count === 3)) {
      newAliveCells.push(cell);
    }
  });

  return newAliveCells;
}

export { GameOfLifeWorld, Cell, gameOfLifeSurvivors };
