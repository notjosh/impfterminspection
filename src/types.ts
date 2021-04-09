export enum VaccinationType {
  Astrazeneca = 'astrazeneca',
  BiontechPfizer = 'biontech_pfizer',
  Moderna = 'moderna',
}

export enum VaccinationLocation {
  Tegel = 'tegel',
  Arena = 'arena',
  Velodrom = 'velodrom',
  Tempelhof = 'tempelhof',
  Messe = 'messe',
}

export type Insurance = 'public' | 'private';

export type Vaccination = {
  days: number | null;
  type: VaccinationType;
  location: VaccinationLocation;
  insurance: Insurance;
};

export type ChartSource = {
  overall: ChartSourceDay[];
  current: Vaccination[];
};

export type ChartSourceDay = {
  date: string;
  vaccinations: Vaccination[];
};

export const vaccinationTypes = [
  VaccinationType.BiontechPfizer,
  VaccinationType.Astrazeneca,
  VaccinationType.Moderna,
];

export const vaccinationTypeNames = {
  [VaccinationType.BiontechPfizer]: 'BioNTech-Pfizer',
  [VaccinationType.Astrazeneca]: 'AstraZeneca',
  [VaccinationType.Moderna]: 'Moderna',
};

export const vaccinationLocations = [
  VaccinationLocation.Tegel,
  VaccinationLocation.Arena,
  VaccinationLocation.Velodrom,
  VaccinationLocation.Tempelhof,
  VaccinationLocation.Messe,
];

export const vaccinationLocationNames = {
  [VaccinationLocation.Tegel]: 'Tegel',
  [VaccinationLocation.Arena]: 'Arena',
  [VaccinationLocation.Velodrom]: 'Velodrom',
  [VaccinationLocation.Tempelhof]: 'Tempelhof',
  [VaccinationLocation.Messe]: 'Messe',
};
