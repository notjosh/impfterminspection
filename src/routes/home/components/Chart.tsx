import bb, { bar, line } from 'billboard.js';
import { createRef, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';

export type LineChartData = {
  label: string;
  values: (number | null)[];
};

type Props = {
  chartRows: LineChartData[];
  days: string[];
  type?: 'line' | 'bar';
};

const Chart: FunctionalComponent<Props> = ({
  chartRows,
  days,
  type = 'line',
}) => {
  const chartRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (chartRef.current == null) {
      return;
    }

    bb.generate({
      bindto: chartRef.current,
      data: {
        columns: chartRows.map((chartRow) => [
          chartRow.label,
          ...chartRow.values,
        ]),
        type: type === 'line' ? line() : bar(),
      },
      axis: {
        x: {
          type: 'category',
          categories: days,
        },
        y: {
          label: 'Days',
        },
      },
    });
  }, [chartRef, days, chartRows]);

  return <div ref={chartRef} />;
};

export default Chart;
