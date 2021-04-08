import bb, { line } from 'billboard.js';
import { mean } from 'lodash';
import { createRef, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import {
  ChartSourceDay,
  VaccinationType,
  vaccinationTypeNames,
  vaccinationTypes,
} from '../../../types';
import { notEmpty } from '../../../util/notEmpty';

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

  return Math.floor(mean(counts));
};
const GroupedByVaccine: FunctionalComponent<Props> = ({ chartData }) => {
  const chartRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (chartRef.current == null) {
      return;
    }

    bb.generate({
      bindto: chartRef.current,
      data: {
        columns: vaccinationTypes.map((type) => [
          vaccinationTypeNames[type],
          ...chartData.map((day) => calculateAverageFor(day, type)),
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
      <h1>Grouped by Vaccine</h1>
      <p>The average wait time today for vaccinations:</p>
      <ul>
        {averages.map((average) => (
          <li key={average.type}>
            {average.name}:{' '}
            {average.value != null ? `${average.value} days` : 'unavailable'}
          </li>
        ))}
      </ul>

      <div ref={chartRef} />
    </>
  );
};

export default GroupedByVaccine;
