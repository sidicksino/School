import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  duration: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}
