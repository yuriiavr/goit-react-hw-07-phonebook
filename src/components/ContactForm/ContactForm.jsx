import { useState } from 'react';
import css from './ContactForm.module.css';
import {
  useAddContactMutation,
  useFetchContactsQuery,
} from 'redux/phonebookSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { data } = useFetchContactsQuery();
  const [addContact] = useAddContactMutation();

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (
      data.some(contact => contact.name.toLowerCase() === name.toLowerCase())
    ) {
      reset();
      return toast.error(`${name} already exists!`);
    }
    if (data.some(contact => contact.phone === phone)) {
      reset();
      return toast.error(`${phone} already exists!`);
    }
    if (name && phone) {
      await addContact({ name: name, phone: phone });
      toast.success(`${name} is added to contacts!`);
      reset();
    }
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.form__label}>
          {'Name'}
          <input
            className={css.form__input}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label className={css.form__label}>
          {'Number'}
          <input
            className={css.form__input}
            type="tel"
            name="number"
            value={phone}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button className={css.submit__btn} type="submit">
          Add contact
        </button>
      </form>
      <ToastContainer />
    </>
  );
}