import { AnimationContext } from '@/models/AnimationContext';
import { ReactNode, createContext, useContext } from 'react';
import AnimationContextWrapper from '../models/AnimationContextWrapper';

const AnimationContextContext = createContext<AnimationContext | undefined>(undefined);

interface AnimationContextProviderProps {
  children: ReactNode;
  value: AnimationContext;
}

export function AnimationContextProvider({ children, value }: AnimationContextProviderProps) {
  return <AnimationContextContext.Provider value={value}>{children}</AnimationContextContext.Provider>;
}

export function useAnimationContext(): AnimationContextWrapper {
  const context = useContext(AnimationContextContext);
  if (!context) {
    throw new Error('useAnimationContext must be used within an AnimationProvider');
  }
  return new AnimationContextWrapper(context);
}
