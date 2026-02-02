import type { Dispatch, SetStateAction } from 'react';

export interface AuthProps {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}
