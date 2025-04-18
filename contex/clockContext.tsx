import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FormatType = '12' | '24';

interface ClockContextType {
  format: FormatType;
  setFormat: (format: FormatType) => void;
}

const ClockContext = createContext<ClockContextType | undefined>(undefined);

export const ClockProvider = ({ children }: { children: ReactNode }) => {
  const [format, setFormatState] = useState<FormatType>('24');

  useEffect(() => {
    const loadFormat = async () => {
      try {
        const savedFormat = await AsyncStorage.getItem('@clock_format');
        if (savedFormat === '12' || savedFormat === '24') {
            setFormatState(savedFormat);
        }
      } catch (error) {
        console.error('Format yüklenemedi:', error);
      }
    };

    loadFormat();
  }, []);

  const setFormat = async (newFormat: FormatType) => {
    try {
      await AsyncStorage.setItem('@clock_format', newFormat);
      setFormatState(newFormat);
    } catch (error) {
      console.error('Format kaydedilemedi:', error);
    }
  };


  return (
    <ClockContext.Provider value={{ format, setFormat }}>
      {children}
    </ClockContext.Provider>
  );
};

export const useClock = () => {
  const context = useContext(ClockContext);
  if (!context) throw new Error('useClock must be used within ClockProvider');
  return context;
};
