import React, { useState } from 'react';

const validErrors = (errors) => {
	let valid = true;
	Object.values(errors).forEach(
		(val) => val.length > 0 && (valid = false)
	);
	return valid;
}

const validInputs = (inputs) => {
	let valid = true;
	for (let key in inputs) {
		if (inputs.hasOwnProperty(key)) {
			if (key !== 'goodreadsSearch' && key !== 'coverImage' && inputs[key].length < 1) {
				valid = false;
            }
		}
	}
	return valid;
}

const BookForm = ({ formTitle, bookDetails }) => {
	const [formInfo, setState] = useState({
		goodreadsSearch: '',
		coverImage: '',
		bookTitle: bookDetails.Title || '',
		bookAuthor: bookDetails.Author || '',
		bookDescription: bookDetails.Description || '',
		bookIsbn: bookDetails.Isbn || '',
		bookFormat: bookDetails.Format || '',
		bookPages: bookDetails.PageNumber || '',
		bookDate: bookDetails.ReleaseDate || '',
		bookPublisher: bookDetails.Publisher || '',
		bookLanguage: bookDetails.Language || '',
		bookSeries: bookDetails.Series || '',
		bookCategory: bookDetails.Category || '',
		kaunasCopies: bookDetails.KaunasCopies || '',
		vilniusCopies: bookDetails.VilniusCopies || '',
		londonCopies: bookDetails.LondonCopies || '',
		chicagoCopies: bookDetails.ChicagoCopies || '',
		torontoCopies: bookDetails.TorontoCopies || '',
		errors: {
			coverImage: '',
			bookTitle: '',
			bookAuthor: '',
			bookDescription: '',
			bookIsbn: '',
			bookFormat: '',
			bookPages: '',
			bookDate: '',
			bookPublisher: '',
			bookLanguage: '',
			bookSeries: '',
			bookCategory: '',
			kaunasCopies: '',
			vilniusCopies: '',
			londonCopies: '',
			chicagoCopies: '',
			torontoCopies: '',
		}
	});

	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = formInfo.errors;

		if (name !== 'goodreadsSearch') {
			errors[name] = value.length < 1 || value.length > 1000
				? 'field must be filled and can not exceed 1000 characters'
				: '';
		}
		setState({ ...formInfo, errors, [name]: value });
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (validErrors(formInfo.errors) && validInputs(formInfo)) {
			console.info('Valid Form')
		} else {
			console.error('Invalid Form')
		}
	}

	return(
		<div className="form-wrapper">
			<h1 className="form-title">
				{formTitle} Book
				</h1>
			<form onSubmit={handleSubmit} noValidate>
				<div className="input-wrapper">
					<label htmlFor="goodreadsSearch">FIND IN GOODREADS</label><br />
					<input type="text" name="goodreadsSearch" />
				</div>

				<div className="input-wrapper">
					<label htmlFor="coverImage">COVER</label><br />
					<input type="file" value={formInfo.coverImage} onChange={handleChange} name="coverImage" accept="image/*" />
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookTitle">TITLE</label><br />
					<input type="text" value={formInfo.bookTitle} name="bookTitle" onChange={handleChange} />
					{formInfo.errors.bookTitle.length > 0 && <span className='error'><br />{formInfo.errors.bookTitle}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookAuthor">AUTHOR(S)</label><br />
					<input type="text" value={formInfo.bookAuthor} name="bookAuthor" onChange={handleChange} />
					{formInfo.errors.bookAuthor.length > 0 && <span className='error'><br />{formInfo.errors.bookAuthor}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookDescription">DESCRIPTION</label><br />
					<textarea name="bookDescription" value={formInfo.bookDescription} cols="30" rows="10" onChange={handleChange} ></textarea>
					{formInfo.errors.bookDescription.length > 0 && <span className='error'><br />{formInfo.errors.bookDescription}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookIsbn">ISBN</label><br />
					<input type="text" name="bookIsbn" value={formInfo.bookIsbn} onChange={handleChange} />
					{formInfo.errors.bookIsbn.length > 0 && <span className='error'><br />{formInfo.errors.bookIsbn}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookFormat">FORMAT</label><br />
					<select name="bookFormat" value={formInfo.bookFormat} onChange={handleChange} >
						<option value="paperback">Paperback</option>
						<option value="e-book">E-book</option>
						<option value="audiobook">Audiobook</option>
					</select>
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookPages">NUMBER OF PAGES</label><br />
					<input type="text" name="bookPages" value={formInfo.bookPages} onChange={handleChange} />
					{formInfo.errors.bookPages.length > 0 && <span className='error'><br />{formInfo.errors.bookPages}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookDate">PUBLICATION DATE</label><br />
					<input type="date" name="bookDate" value={formInfo.bookDate} onChange={handleChange} />
					{formInfo.errors.bookPages.length > 0 && <span className='error'><br />{formInfo.errors.bookPages}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookPublisher">PUBLISHER</label><br />
					<input type="text" name="bookPublisher" value={formInfo.bookPublisher} onChange={handleChange} />
					{formInfo.errors.bookPublisher.length > 0 && <span className='error'><br />{formInfo.errors.bookPublisher}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookLanguage">EDITION LANGUAGE</label><br />
					<input type="text" name="bookLanguage" value={formInfo.bookLanguage} onChange={handleChange} />
					{formInfo.errors.bookLanguage.length > 0 && <span className='error'><br />{formInfo.errors.bookLanguage}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookSeries">SERIES</label><br />
					<input type="text" name="bookSeries" value={formInfo.bookSeries} onChange={handleChange} />
					{formInfo.errors.bookSeries.length > 0 && <span className='error'><br />{formInfo.errors.bookSeries}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookCategory">CATEGORY</label><br />
					<select name="bookCategory" value={formInfo.bookCategory} onChange={handleChange} >
						<option value="drama">Drama</option>
						<option value="sci-fi">Sci-fi</option>
					</select>
				</div>

				<div className="copies-wrapper">
					<h2>
						NUMBER OF COPIES
						</h2>
					<label htmlFor="kaunasCopies">Kaunas:</label>
					<input type="text" name="kaunasCopies" value={formInfo.kaunasCopies} onChange={handleChange} /><br />
					{formInfo.errors.kaunasCopies.length > 0 && <span className='error'>{formInfo.errors.kaunasCopies}<br /></span>}

					<label htmlFor="vilniusCopies">Vilnius:</label>
					<input type="text" name="vilniusCopies" value={formInfo.vilniusCopies} onChange={handleChange} /><br />
					{formInfo.errors.vilniusCopies.length > 0 && <span className='error'>{formInfo.errors.vilniusCopies}<br /></span>}

					<label htmlFor="londonCopies">London:</label>
					<input type="text" name="londonCopies" value={formInfo.londonCopies} onChange={handleChange} /><br />
					{formInfo.errors.londonCopies.length > 0 && <span className='error'>{formInfo.errors.londonCopies}<br /></span>}

					<label htmlFor="chicagoCopies">Chicago:</label>
					<input type="text" name="chicagoCopies" value={formInfo.chicagoCopies} onChange={handleChange} /><br />
					{formInfo.errors.chicagoCopies.length > 0 && <span className='error'>{formInfo.errors.chicagoCopies}<br /></span>}

					<label htmlFor="torontoCopies">Toronto:</label>
					<input type="text" name="torontoCopies" value={formInfo.torontoCopies} onChange={handleChange} /><br />
					{formInfo.errors.torontoCopies.length > 0 && <span className='error'>{formInfo.errors.torontoCopies}<br /></span>}
				</div>

				<input type="submit" value={formTitle } />
			</form>
		</div>
	)
}

export default BookForm;
