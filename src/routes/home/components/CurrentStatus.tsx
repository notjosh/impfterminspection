import { FunctionalComponent } from 'preact';
import {
  Vaccination,
  vaccinationLocationNames,
  vaccinationTypeNames,
} from '../../../types';
import { LineChartData } from './Chart';
import Chartable from './Chartable';

type Props = {
  vaccinations: Vaccination[];
};

const CurrentStatus: FunctionalComponent<Props> = ({ vaccinations }) => {
  const labelFor = (vaccination: Vaccination) =>
    `${vaccinationLocationNames[vaccination.location]}: ${
      vaccinationTypeNames[vaccination.type]
    }`;

  const rows: LineChartData[] = vaccinations.map((vaccination) => ({
    label: labelFor(vaccination),
    values: [vaccination.days],
  }));

  const summaryRows = vaccinations.map(
    (vaccination) => `
  ${labelFor(vaccination)}: ${
      vaccination.days != null ? `${vaccination.days} days` : 'unavailable'
    }`
  );

  return (
    <>
      <Chartable
        title="Current Situation"
        subtitle="The average wait time for bookings within the last hour:"
        summaryRows={summaryRows}
        chartRows={rows}
        days={['Today']}
        type="bar"
      />
    </>
  );
};

export default CurrentStatus;
