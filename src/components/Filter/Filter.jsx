import css from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/phone-actions';

const Filter = () => {
  const dispatch = useDispatch();

  const checkedContacts = evt => {
    dispatch(changeFilter(evt.currentTarget.value));
  };

  return (
    <div>
      <label className={css.filter}>
        {'Find contacts by name'}
        <input
          className={css.filter__input}
          type="text"
          name="filter"
          onChange={checkedContacts}
        />
      </label>
    </div>
  );
};

export default Filter;