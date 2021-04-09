import 'billboard.js/dist/billboard.css';
import { FunctionalComponent } from 'preact';
import chartDataJson from '../../chartData.json';
import { ChartSource } from '../../types';
import CurrentStatus from './components/CurrentStatus';
import GroupedByLocation from './components/GroupedByLocation';
import GroupedByVaccine from './components/GroupedByVaccine';
import style from './style.css';

type Props = {};

const chartData = (chartDataJson as unknown) as ChartSource;

const Home: FunctionalComponent<Props> = () => {
  return (
    <div class={style.home}>
      <GroupedByVaccine chartData={chartData.overall} />
      <GroupedByLocation chartData={chartData.overall} />
      <CurrentStatus vaccinations={chartData.current} />
    </div>
  );
};

export default Home;
