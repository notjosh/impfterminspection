export type VaccinationType = 'astrazeneca' | 'biontech_pfizer' | 'moderna';
export type VaccinationLocation =
  | 'tegel'
  | 'arena'
  | 'velodrom'
  | 'tempelhof'
  | 'messe';
export type Insurance = 'public' | 'private';

export type Vaccination = {
  days: number | null;
  type: VaccinationType;
  location: VaccinationLocation;
  insurance: Insurance;
};

export type ChartSourceDay = {
  date: string;
  vaccinations: Vaccination[];
};
