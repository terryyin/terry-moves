import { Cell, gameOfLifeSurvivors } from "@/parts/gameOfLife";

describe('An alive cell in Game Of Life', () => {
  const subject = new Cell(2, 3);
  const aliveNeighbours = (n: number): Cell[] => subject.neighbourCells().slice(0, n);

  it('dies with no alive neighbours', () => {
    expect(gameOfLifeSurvivors([subject])).not.toContainEqual(subject);
  });

  it('dies if there are only remote neighbours', () => {
    const remoteNeighbour1 = subject.neighbourCells()[0].neighbourCells()[0];
    const remoteNeighbour2 = subject.neighbourCells()[1].neighbourCells()[1];
    expect(gameOfLifeSurvivors([subject, remoteNeighbour1, remoteNeighbour2])).not.toContainEqual(subject);
  });

  it('survives with 2 alive neighbours', () => {
    expect(gameOfLifeSurvivors([subject, ...aliveNeighbours(2)])).toContainEqual(subject);
  });

  it('survives with 3 alive neighbours', () => {
    expect(gameOfLifeSurvivors([subject, ...aliveNeighbours(3)])).toContainEqual(subject);
  });

  it('revives with 3 alive neighbours', () => {
    expect(gameOfLifeSurvivors([...aliveNeighbours(3)])).toContainEqual(subject);
  });

});
