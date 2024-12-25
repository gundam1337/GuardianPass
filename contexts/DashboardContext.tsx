// contexts/DashboardContext.tsx
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface DashboardContextType {
  activeContent: string;
  setActiveContent: Dispatch<SetStateAction<string>>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activeContent, setActiveContent] = useState('passwords');

  return (
    <DashboardContext.Provider value={{ activeContent, setActiveContent }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};