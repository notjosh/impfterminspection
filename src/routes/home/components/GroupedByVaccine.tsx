import { mean, round } from 'lodash';
import { FunctionalComponent } from 'preact';
import {
  ChartSourceDay,
  VaccinationType,
  vaccinationTypeNames,
  vaccinationTypes,
} from '../../../types';
import { notEmpty } from '../../../util/notEmpty';
import Chartable from './Chartable';

type Props = {
  chartData: ChartSourceDay[];
};

const calculateAverageFor = (
  day: ChartSourceDay,
  key: VaccinationType
): number | null => {
  const counts = day.vaccinations
    .filter((v) => v.type === key)
    .map((v) => v.days)
    .filter(notEmpty);

  if (counts.length === 0) {
    return null;
  }

  return round(mean(counts), 2);
};

const GroupedByVaccine: FunctionalComponent<Props> = ({ chartData }) => {
  const chartRows = vaccinationTypes.map((type) => ({
    label: vaccinationTypeNames[type],
    values: chartData.map((day) => calculateAverageFor(day, type)),
  }));

  const days = chartData.map((day) => day.date);

  // assume sorted:
  const today = chartData[chartData.length - 1];

  const averages = vaccinationTypes.reduce(
    (acc, v) => [
      ...acc,
      {
        type: v,
        name: vaccinationTypeNames[v],
        value: calculateAverageFor(today, v),
      },
    ],
    [] as {
      type: VaccinationType;
      name: string;
      value: ReturnType<typeof calculateAverageFor>;
    }[]
  );

  return (
    <>
      <Chartable
        title="Grouped by Vaccine"
        subtitle="The average wait time today for vaccinations:"
        summaryRows={averages.map(
          (average) =>
            `${average.name}: ${
              average.value != null ? `${average.value} days` : 'unavailable'
            }`
        )}
        chartRows={chartRows}
        days={days}
      />
    </>
  );
};

export default GroupedByVaccine;
