import bb, { bar, line } from 'billboard.js';
import { isEqual, mean, uniqWith } from 'lodash';
import { createRef, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import {
  ChartSourceDay,
  VaccinationLocation,
  vaccinationLocationNames,
  VaccinationType,
  vaccinationTypeNames,
} from '../../../types';
import { notEmpty } from '../../../util/notEmpty';

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

  return Math.floor(mean(counts));
};
const GroupedByLocation: FunctionalComponent<Props> = ({ chartData }) => {
  const chartRef = createRef<HTMLDivElement>();

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

  const cominationsCombined = ([] as typeof combinationsForAllDays[0]).concat.apply(
    [],
    combinationsForAllDays
  );

  const combinations = uniqWith(cominationsCombined, isEqual);

  useEffect(() => {
    if (chartRef.current == null) {
      return;
    }

    bb.generate({
      bindto: chartRef.current,
      data: {
        columns: combinations.map((combination) => [
          combination.label,
          ...chartData.map((day) =>
            calculateAverageFor(day, combination.type, combination.location)
          ),
        ]),
        type: line(),
      },
      axis: {
        x: {
          type: 'category',
          categories: chartData.map((day) => day.date),
        },
        y: {
          label: 'Days',
        },
      },
    });
  }, [chartData, chartRef]);

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
      <h1>Grouped by Location</h1>
      <p>The average wait time today for vaccinations:</p>
      <ul>
        {groupForToday.map((group) => (
          <li key={group.key}>
            {group.label}:{' '}
            {group.value != null ? `${group.value} days` : 'unavailable'}
          </li>
        ))}
      </ul>

      <div ref={chartRef} />
    </>
  );
};

export default GroupedByLocation;
