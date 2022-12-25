import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css';

const Spinner = () => {
  return (
    <div className={css.loader}>
      <InfinitySpin width="200" color="rgba(169,169,169)" />
    </div>
  );
};

export default Spinner;