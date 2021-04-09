import { flatten, isEqual, mean, round, uniqWith } from 'lodash';
import { FunctionalComponent } from 'preact';
import {
  ChartSourceDay,
  VaccinationLocation,
  vaccinationLocationNames,
  VaccinationType,
  vaccinationTypeNames,
} from '../../../types';
import { notEmpty } from '../../../util/notEmpty';
import Chartable from './Chartable';

type Props = {
  chartData: ChartSourceDay[];
};

const calculateAverageFor = (
  day: ChartSourceDay,
  type: VaccinationType,
  location: VaccinationLocation
): number | null => {
  const counts = day.vaccinations
    .filter((v) => v.type === type && v.location === location)
    .map((v) => v.days)
    .filter(notEmpty);

  if (counts.length === 0) {
    return null;
  }

  return round(mean(counts), 2);
};

const GroupedByLocation: FunctionalComponent<Props> = ({ chartData }) => {
  // assume sorted:
  const today = chartData[chartData.length - 1];

  const makeCombination = (d: typeof chartData[0]['vaccinations'][0]) => ({
    key: `${d.location}-${d.type}`,
    label: `${vaccinationLocationNames[d.location]}: ${
      vaccinationTypeNames[d.type]
    }`,
    type: d.type,
    location: d.location,
  });

  const combinationForToday = uniqWith(
    today.vaccinations.map((d) => makeCombination(d)),
    isEqual
  );

  const combinationsForAllDays = chartData.map((day) =>
    day.vaccinations.map((v) => makeCombination(v))
  );

  const cominationsCombined = flatten(combinationsForAllDays);

  const combinations = uniqWith(cominationsCombined, isEqual);

  const chartRows = combinations.map((combination) => ({
    label: combination.label,
    values: chartData.map((day) =>
      calculateAverageFor(day, combination.type, combination.location)
    ),
  }));

  const days = chartData.map((day) => day.date);

  const groupForToday = combinationForToday.reduce(
    (acc, v) => [
      ...acc,
      {
        ...v,
        value: calculateAverageFor(today, v.type, v.location),
      },
    ],
    [] as {
      key: string;
      label: string;
      type: VaccinationType;
      location: VaccinationLocation;
      value: ReturnType<typeof calculateAverageFor>;
    }[]
  );

  return (
    <>
      <Chartable
        title="Grouped by Location"
        subtitle="The average wait time today for vaccinations:"
        summaryRows={groupForToday.map(
          (gft) =>
            `${gft.label}: ${
              gft.value != null ? `${gft.value} days` : 'unavailable'
            }`
        )}
        chartRows={chartRows}
        days={days}
      />
    </>
  );
};

export default GroupedByLocation;
