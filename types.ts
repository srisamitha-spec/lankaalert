
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  ALERTS = 'ALERTS',
  EMERGENCY = 'EMERGENCY'
}

export interface DisasterAlert {
  id: string;
  type: 'Flood' | 'Landslide' | 'Weather' | 'Traffic' | 'Earthquake';
  severity: 'Low' | 'Medium' | 'High';
  title: string;
  description: string;
  location: string;
  timestamp: string;
}

export interface UserSubscription {
  isActive: boolean;
  cost: number;
  currency: string;
  billingType: string;
}
