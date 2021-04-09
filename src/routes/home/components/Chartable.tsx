import { FunctionalComponent } from 'preact';
import Chart, { LineChartData } from './Chart';

type Props = {
  chartRows: LineChartData[];
  days: string[];
  title: string;
  subtitle?: string;
  summaryRows?: string[];
  type?: 'line' | 'bar';
};

const Chartable: FunctionalComponent<Props> = ({
  chartRows,
  days,
  title,
  subtitle,
  summaryRows,
  type,
}) => {
  return (
    <>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {summaryRows && summaryRows.length > 0 && (
        <ul>
          {summaryRows.map((summaryRow, idx) => (
            <li key={idx}>{summaryRow}</li>
          ))}
        </ul>
      )}
      <Chart days={days} chartRows={chartRows} type={type} />
    </>
  );
};

export default Chartable;
