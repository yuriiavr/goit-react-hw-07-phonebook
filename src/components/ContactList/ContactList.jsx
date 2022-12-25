import PropTypes from 'prop-types';
import Contact from 'components/Contact/Contact';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { useFetchContactsQuery } from 'redux/phonebookSlice';
import Loader from 'components/Loader';

const ContactList = () => {
  const { data, isLoading } = useFetchContactsQuery();
  const filter = useSelector(state => state.contacts.filter);

  const checkedContacts = () => {
    return (
      data &&
      data.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <ul className={css.contact__list}>
        {data && !isLoading && checkedContacts().length > 0 ? (
          checkedContacts().map(({ id, name, phone }) => (
            <li key={id} className={css.contact__list__item}>
              <Contact id={id} name={name} number={phone} />
            </li>
          ))
        ) : (
          <p className={css.contacts__message}>No contacts are found</p>
        )}
      </ul>
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;