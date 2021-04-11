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
  const updatedAt = new Date(chartData.updatedAt);

  var options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  const updatedAtString = updatedAt.toLocaleString('en', options);

  return (
    <div class={style.home}>
      <GroupedByVaccine chartData={chartData.overall} />
      <GroupedByLocation chartData={chartData.overall} />
      <CurrentStatus vaccinations={chartData.current} />

      <hr />

      <p>
        <time dateTime={chartData.updatedAt}>
          Last updated: {updatedAtString}
        </time>
      </p>

      <p class={style.icons}>
        <a href="https://www.netlify.com">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
            alt="Deploys by Netlify"
          />
        </a>{' '}
        <a href="https://github.com/notjosh/impfterminspection/">
          <img src="/assets/GitHub-Mark-32px.png" alt="GitHub logo" />
        </a>{' '}
        <a href="https://twitter.com/notjosh">
          <img src="/assets/Tweeter-Mark-32px.png" alt="Twitter logo" />
        </a>
      </p>
    </div>
  );
};

export default Home;
