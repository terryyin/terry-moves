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
  return aliveCells.filter((cell) => {
    const aliveNeighbours = _.intersectionWith(aliveCells, cell.neighbourCells(), _.isEqual);
    console.log(aliveNeighbours)
    return aliveNeighbours.length === 2 || aliveNeighbours.length === 3;
  }
  );
}

describe('An alive cell in Game Of Life', () => {
  const subject = new Cell(2, 3);
  const aliveNeighbours = (n: number): Cell[] => subject.neighbourCells().slice(0, n);

  it('dies with no alive neighbours', () => {
    expect(gameOfLifeSurvivors([subject])).not.toContain(subject);
  });

  it('dies if there are only remote neighbours', () => {
    const remoteNeighbour1 = subject.neighbourCells()[0].neighbourCells()[0];
    const remoteNeighbour2 = subject.neighbourCells()[1].neighbourCells()[1];
    expect(gameOfLifeSurvivors([subject, remoteNeighbour1, remoteNeighbour2])).not.toContain(subject);
  });

  it('survives with 2 alive neighbours', () => {
    expect(gameOfLifeSurvivors([subject, ...aliveNeighbours(2)])).toContain(subject);
  });

  it('survives with 3 alive neighbours', () => {
    expect(gameOfLifeSurvivors([subject, ...aliveNeighbours(3)])).toContain(subject);
  });

});
