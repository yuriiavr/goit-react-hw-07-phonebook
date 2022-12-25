import PropTypes from 'prop-types';
import css from './Contact.module.css';
import { useDeleteContactMutation } from 'redux/phonebookSlice';

const Contact = ({ id, name, number }) => {
  const [
    deleteContact, 
    { isLoading: isDeleting }, 
  ] = useDeleteContactMutation();

  return (
    <>
      <p className={css.contact__info}>
        {name}: {number}
      </p>
      <button
        type="button"
        onClick={() => deleteContact(id)}
        disabled={isDeleting}
        className={css.contact__delete__btn}
      >
        Delete
      </button>
    </>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Contact;