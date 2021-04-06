import c3 from 'c3';
import { createRef, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { ChartSourceDay, VaccinationType } from '../../types';
import style from './style.css';
import chartDataJson from '../../chartData.json';

type Props = {};

const chartData = (chartDataJson as unknown) as ChartSourceDay[];

const calculateAverageFor = (
  day: ChartSourceDay,
  key: VaccinationType
): number | null =>
  day.vaccinations
    .filter((v) => v.type === key)
    .map((v) => v.days)
    .reduce((average, value, _, { length }) => {
      if (value == null) {
        return average;
      }

      return (average ?? 0) + value / length;
    }, null);

const Home: FunctionalComponent<Props> = () => {
  const chartRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (chartRef.current == null) {
      return;
    }

    c3.generate({
      bindto: chartRef.current,
      data: {
        columns: [
          [
            'biontech_pfizer',
            ...chartData.map((day) =>
              calculateAverageFor(day, 'biontech_pfizer')
            ),
          ],
          [
            'astrazeneca',
            ...chartData.map((day) => calculateAverageFor(day, 'astrazeneca')),
          ],
          [
            'moderna',
            ...chartData.map((day) => calculateAverageFor(day, 'moderna')),
          ],
        ],
        type: 'bar',
      },
      axis: {
        x: {
          type: 'category',
          categories: chartData.map((day) => day.date),
        },
      },
    });
  }, [chartRef]);

  // assume sorted:
  const today = chartData[chartData.length - 1];

  const averages = {
    biontechPfizer: calculateAverageFor(today, 'biontech_pfizer'),
    astraZeneca: calculateAverageFor(today, 'astrazeneca'),
    moderna: calculateAverageFor(today, 'moderna'),
  };

  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>The average wait time today for vaccinations:</p>
      <ul>
        <li>
          BioNTech-Pfizer:{' '}
          {averages.biontechPfizer != null
            ? `${averages.biontechPfizer} days`
            : 'unavailable'}
        </li>
        <li>
          AstraZeneca:{' '}
          {averages.astraZeneca != null
            ? `${averages.astraZeneca} days`
            : 'unavailable'}
        </li>
        <li>
          Moderna:{' '}
          {averages.moderna != null
            ? `${averages.moderna} days`
            : 'unavailable'}
        </li>
      </ul>

      <div ref={chartRef} />
    </div>
  );
};

export default Home;
