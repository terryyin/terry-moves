import React, { useMemo } from "react";
import { useAnimationContext } from "../hooks/useAnimationContext";
import { GameOfLife3D } from "./GameOfLife3D";
import { Cell, gameOfLifeSurvivors } from "./gameOfLife";

export const GameOfLifeAnimated: React.FC<{actor: string, startLives: Cell[]}> = ({actor, startLives}) => {
  const progress = useAnimationContext().getGeneralValue(actor) ?? 0;
  const round = Math.floor(progress);
  
  const survivors = useMemo(() => {
    const cache = new Map();

    const calculateSurvivors = (r: number) => {
      if (r === 0) {
        return startLives;
      }

      if (!cache.has(r)) {
        cache.set(r, gameOfLifeSurvivors(calculateSurvivors(r - 1)));
      }

      return cache.get(r);
    };

    return calculateSurvivors;
  }, [startLives]);

  const currentLives = survivors(round);

  return (
    <GameOfLife3D lives={currentLives} />
  );
};
