import { FunctionalComponent } from 'preact';
import chartDataJson from '../../chartData.json';
import { ChartSourceDay } from '../../types';
import GroupedByLocation from './components/GroupedByLocation';
import GroupedByVaccine from './components/GroupedByVaccine';
import style from './style.css';
import 'billboard.js/dist/billboard.css';

type Props = {};

const chartData = (chartDataJson as unknown) as ChartSourceDay[];

const Home: FunctionalComponent<Props> = () => {
  return (
    <div class={style.home}>
      <GroupedByVaccine chartData={chartData} />
      <GroupedByLocation chartData={chartData} />
    </div>
  );
};

export default Home;
