/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Button from './Button';
import Select from './Select';

const BookForm = ({ bookDetails, offices, onSubmit, buttonText }) => {
  const [officeData, setOffices] = useState(offices);

  const [requiredFields] = useState([
    'bookTitle',
    'bookAuthor',
    'bookIsbn',
    'bookFormat',
    'bookDate',
  ]);

  const [formState, setFormState] = useState({ errors: {} });

  useEffect(() => {
    setFormState({
      goodreadsSearch: '',
      coverImage: bookDetails ? bookDetails.coverPictureUrl || '' : '',
      bookTitle: bookDetails ? bookDetails.title || '' : '',
      bookAuthor: bookDetails ? bookDetails.author || '' : '',
      bookDescription: bookDetails ? bookDetails.description || '' : '',
      bookIsbn: bookDetails ? bookDetails.isbn || '' : '',
      bookFormat: bookDetails ? bookDetails.format || 'Paperback' : '',
      bookPages: bookDetails ? bookDetails.numberOfPages || 0 : 0,
      bookDate: bookDetails ? bookDetails.releaseDate || '' : '',
      bookPublisher: bookDetails ? bookDetails.publisher || 'Not Defined' : '',
      bookLanguage: bookDetails ? bookDetails.editionLanguage || '' : '',
      bookSeries: bookDetails ? bookDetails.series || '' : '',
      bookCategory: bookDetails ? bookDetails.category || '' : '',
      bookTag: bookDetails
        ? bookDetails.tag || 'tempTagPlaceholder'
        : 'tempTagPlaceholder',
      errors: {
        coverImage: '',
        bookTitle: '',
        bookIsbn: '',
        bookAuthor: '',
        bookDescription: '',
        bookCategory: '',
        bookTag: '',
        bookFormat: '',
        bookPages: '',
        bookDate: '',
        bookSeries: '',
        bookPublisher: '',
        bookLanguage: '',
      },
    });
  }, [bookDetails]);

  const classes = _.reduce(
    formState.errors,
    (result, error, key) => {
      // eslint-disable-next-line no-param-reassign
      result[key] = classNames('form__field', {
        'form__field--error': error && error.length,
      });

      return result;
    },
    {}
  );

  const validate = (key, value) => {
    if (requiredFields.includes(key)) {
      if (key === 'bookFormat' || key === 'bookDate') {
        return value.length > 0 ? '' : 'Please select';
      }
      return value.length < 1 || value.length > 1000
        ? 'field must be filled and can not exceed 1000 characters'
        : '';
    }
  };

  const validErrors = () => {
    const errors = {};
    Object.keys(formState.errors).forEach((key) => {
      errors[key] = validate(key, formState[key]);
    });
    setFormState({ ...formState, errors });
    let valid = true;
    Object.entries(formState.errors).forEach((key, val) => {
      key in requiredFields && val.length > 0 && (valid = false);
    });
    return valid;
  };

  const validInputs = () => {
    let valid = true;
    for (const key in formState) {
      if (formState.hasOwnProperty(key)) {
        if (requiredFields.includes(key) && formState[key].length < 1) {
          valid = false;
        }
      }
    }
    return valid;
  };

  useEffect(() => {
    setOffices(offices);
  }, [offices]);

  const handleChange = (name, value) => {
    setFormState({
      ...formState,
      [name]: value,
      errors: { ...formState.errors, [name]: validate(name, value) },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validErrors() && validInputs()) {
      const book = createBookObject();

      onSubmit && typeof onSubmit === 'function' && onSubmit(book);
    } else {
      alert('Invalid form');
    }
  };

  const handleNumberOfCopiesChange = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-shadow
    const { id, value } = event.target;
    const office = officeData.find((x) => x.id === +id);
    const temp = officeData;
    const index = temp.indexOf(office);
    temp[index].count = +value;
    setOffices([...temp]);
  };

  const createBookObject = () => {
    const library = [];
    officeData.forEach((o) => {
      library.push({ OfficeId: o.id, Count: o.count });
    });
    const book = {
      Title: formState.bookTitle,
      Isbn: formState.bookIsbn,
      Author: formState.bookAuthor,
      Description: formState.bookDescription,
      Category: formState.bookCategory,
      Tag: formState.bookTag,
      Format: formState.bookFormat,
      NumberOfPages: formState.bookPages,
      Series: formState.bookSeries,
      Publisher: formState.bookPublisher,
      EditionLanguage: formState.bookLanguage,
      CoverPictureUrl: formState.coverImage,
      GoodReadsUrl: formState.goodreadsSearch,
      DateAdded: new Date(),
      ReleaseDate: formState.bookDate,
      Library: library,
    };
    return book;
  };
  return (
    <form onSubmit={handleSubmit} noValidate className="form">
      <div className="form__field">
        <label htmlFor="goodreadsSearch">FIND IN GOODREADS</label>
        <input type="text" name="goodreadsSearch" />
      </div>
      <div className={classes.coverImage}>
        <label htmlFor="coverImage">COVER</label>
        {/* <input type="file" value={formInfo.coverImage} onChange={handleChange} name="coverImage" accept="image/*" /> */}
        <input
          type="text"
          value={formState.coverImage}
          onChange={handleChange}
          name="coverImage"
          accept="image/*"
        />
        <span className="error">{formState.errors.coverImage}</span>
      </div>
      <div className={classes.bookTitle}>
        <label htmlFor="bookTitle">TITLE</label>
        <input
          type="text"
          value={formState.bookTitle}
          name="bookTitle"
          onChange={handleChange}
        />
        <span className="error">{formState.errors.bookTitle}</span>
      </div>
      <div className={classes.bookAuthor}>
        <label htmlFor="bookAuthor">AUTHOR(S)</label>
        <input
          type="text"
          value={formState.bookAuthor}
          name="bookAuthor"
          onChange={handleChange}
        />
        <span className="error">{formState.errors.bookAuthor}</span>
      </div>
      <div className={classes.bookDescription}>
        <label htmlFor="bookDescription">DESCRIPTION</label>
        <textarea
          name="bookDescription"
          value={formState.bookDescription}
          cols="30"
          rows="10"
          onChange={handleChange}
        />
        <span className="error">{formState.errors.bookDescription}</span>
      </div>
      <div className={classes.bookIsbn}>
        <label htmlFor="bookIsbn">ISBN</label>
        <input
          type="text"
          name="bookIsbn"
          value={formState.bookIsbn}
          onChange={handleChange}
        />
        <span className="error">{formState.errors.bookIsbn}</span>
      </div>
      <div className={classes.bookFormat}>
        <label htmlFor="bookFormat">FORMAT</label>
        <Select placeholder="Select format" options={["Paperback", "E-book", "Audiobook"]} value={formState.bookFormat} onChange={(value) => handleChange("bookFormat", value)} />
        <span className="error">{formState.errors.bookFormat}</span>
      </div>
      <div className={classes.bookPages}>
        <label htmlFor="bookPages">NUMBER OF PAGES</label>
        <input
          min="0"
          type="number"
          name="bookPages"
          value={formState.bookPages}
          onChange={handleChange}
        />
        <span className="error">{formState.errors.bookPages}</span>
      </div>
      <div className={classes.bookDate}>
        <label htmlFor="bookDate">PUBLICATION DATE</label>
        <input
          type="date"
          name="bookDate"
          value={formState.bookDate}
          onChange={handleChange}
        />
        <span className="error">{formState.errors.bookDate}</span>
      </div>
      <div className={classes.bookPublisher}>
        <label htmlFor="bookPublisher">PUBLISHER</label>
        <input
          type="text"
          name="bookPublisher"
          value={formState.bookPublisher}
          onChange={handleChange}
        />
        <span className="error">{formState.errors.bookPublisher}</span>
      </div>
      <div className={classes.bookLanguage}>
        <label htmlFor="bookLanguage">EDITION LANGUAGE</label>
        <input
          type="text"
          name="bookLanguage"
          value={formState.bookLanguage}
          onChange={handleChange}
        />
        <span className="error">{formState.errors.bookLanguage}</span>
      </div>
      <div className={classes.bookSeries}>
        <label htmlFor="bookSeries">SERIES</label>
        <input
          type="text"
          name="bookSeries"
          value={formState.bookSeries}
          onChange={handleChange}
        />
        <span className="error">{formState.errors.bookSeries}</span>
      </div>
      <div className={classes.bookCategory}>
        <label htmlFor="bookCategory">CATEGORY</label>
        <input
          type="text"
          name="bookCategory"
          value={formState.bookCategory}
          onChange={handleChange}
        />
        <span className="error">{formState.errors.bookCategory}</span>
      </div>
      <div className="form__field">
        <label>Copies available at offices</label>
        {officeData.map((office) => (
          <div key={office.name} className="form__group-item">
            <label htmlFor="kaunasCopies">{`${office.name}:`}</label>
            <input
              min="0"
              type="number"
              id={office.id}
              value={office.count}
              defaultValue="0"
              onChange={(e) => handleNumberOfCopiesChange(e)}
            />
          </div>
        ))}
      </div>
      <Button type="submit">{buttonText || 'Save'}</Button>
    </form>
  );
};

export default BookForm;
