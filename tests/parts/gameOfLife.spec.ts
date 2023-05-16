class Cell {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gameOfLifeSurvivors(aliveCells: Cell[]): Cell[] {
  return [];
}

describe('An alive cell in Game Of Life', () => {
  const subject = new Cell();

  it('dies with no alive neighbours', () => {
    expect(gameOfLifeSurvivors([subject])).not.toContain(subject);
  });
});
