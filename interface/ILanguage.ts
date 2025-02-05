import { ReactNode } from "react";
import { LanguageType } from "../types";

export interface LanguageContextProps {
  activeLanguage: LanguageType;
  setActiveLanguage: (language: LanguageType) => void;
}


export interface LanguageProviderProps {
    children: ReactNode;
  }