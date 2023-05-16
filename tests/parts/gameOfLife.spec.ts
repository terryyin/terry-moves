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
  if(aliveCells.length === 3) return aliveCells;
  return [];
}

describe('An alive cell in Game Of Life', () => {
  const subject = new Cell(2, 3);

  it('dies with no alive neighbours', () => {
    expect(gameOfLifeSurvivors([subject])).not.toContain(subject);
  });

  it('survives with 2 alive neighbours', () => {
    expect(gameOfLifeSurvivors([subject, ...subject.neighbourCells().slice(0, 2)])).toContain(subject);
  });

});
