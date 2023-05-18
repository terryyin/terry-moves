import React, { useMemo } from "react";
import { useAnimationContext } from "../hooks/useAnimationContext";
import { GameOfLife3D } from "./GameOfLife3D";
import { Cell, GameOfLifeWorld } from "./gameOfLife";

const world = new GameOfLifeWorld();

export const GameOfLifeAnimated: React.FC<{actor: string, startLives: Cell[]}> = ({actor, startLives}) => {
  const progress = useAnimationContext().getGeneralValue(actor) ?? 0;
  const round = Math.floor(progress);
  const startSet = world.getCells(startLives);
  
  const survivors = useMemo(() => {
    const cache = new Map();

    const calculateSurvivors = (r: number) => {
      if (r === 0) {
        return startSet;
      }

      if (!cache.has(r)) {
        cache.set(r, world.survivors(calculateSurvivors(r - 1)));
      }

      return cache.get(r);
    };

    return calculateSurvivors;
  }, [startSet]);

  const currentLives = survivors(round);

  return (
    <GameOfLife3D lives={currentLives} world={world}/>
  );
};
