import React, { Component } from 'react';


const validateForm = (errors) => {
	let valid = true;
	Object.values(errors).forEach(
		// if we have an error string set valid to false
		(val) => val.length > 0 && (valid = false)
	);
	return valid;
}

class BookForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			goodreadsSearch: '',
			coverImage: '',
			bookTitle: '',
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
			longonCopies: '',
			chicagoCopies: '',
			torontoCopies: '',
			errors: {
				goodreadsSearch: '',
				coverImage: '',
				bookTitle: '',
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
				longonCopies: '',
				chicagoCopies: '',
				torontoCopies: '',
            }
		}
	}

	handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = this.state.errors;

		for (var error in errors) {
			// skip loop if the property is from prototype
			if (!errors.hasOwnProperty(error)) continue;

			if (error.match(name)) {
				if (value.length < 5 || value.length > 1000) {
					errors[name] = value.length < 5 || value.length > 1000
						? 'field must be filled and can not take more than 1000 characters'
						: '';
                }
            }
		}

		this.setState({ errors, [name]: value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if (validateForm(this.state.errors)) {
			console.info('Valid Form')
		} else {
			console.error('Invalid Form')
		}
	}


	render() {
		const { errors } = this.state;
		return (
			<div className="form-wrapper">
				<h1 className="form-title">
					Register Book
					</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="input-wrapper">
						<label htmlFor="goodreadsSearch">FIND IN GOODREADS</label><br />
						<input type="text" name="goodreadsSearch" />
					</div>

					<div className="input-wrapper">
						<label htmlFor="coverImage">COVER</label><br />
						<input type="file" name="coverImage" accept="image/*" />
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookTitle">TITLE</label><br />
						<input type="text" name="bookTitle" onChange={this.handleChange} formNoValidate/>
						{errors.bookTitle.length > 0 && <span className='error'>{errors.bookTitle}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookAuthor">AUTHOR(S)</label><br />
						<input type="text" name="bookAuthor" onChange={this.handleChange} id="book-author" />
						{errors.bookTitle.length > 0 && <span className='error'>{errors.bookTitle}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookDescription">DESCRIPTION</label><br />
						<textarea name="bookDescription" cols="30" rows="10"></textarea>
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookIsbn">ISBN</label><br />
						<input type="text" name="bookIsbn" />
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookFormat">FORMAT</label><br />
						<select name="bookFormat">
							<option value="paperback">Paperback</option>
							<option value="e-book">E-book</option>
							<option value="audiobook">Audiobook</option>
						</select>
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookPages">NUMBER OF PAGES</label><br />
						<input type="text" name="bookPages" />
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookDate">PUBLICATION DATE</label><br />
						<input type="date" name="bookDate" />
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookPublisher">PUBLISHER</label><br />
						<input type="text" name="bookPublisher" />
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookLanguage">EDITION LANGUAGE</label><br />
						<input type="text" name="bookLanguage" />
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookSeries">SERIES</label><br />
						<input type="text" name="bookSeries" />
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookCategory">CATEGORY</label><br />
						<select name="bookCategory" >
							<option value="drama">Drama</option>
							<option value="sci-fi">Sci-fi</option>
						</select>
					</div>

					<div className="copies-wrapper">
						<h2>
							NUMBER OF COPIES
							</h2>
						<label htmlFor="kaunasCopies">Kaunas:</label>
						<input type="text" name="kaunasCopies" /><br />

						<label htmlFor="vilniusCopies">Vilnius:</label>
						<input type="text" name="vilniusCopies" /><br />

						<label htmlFor="londonCopies">London:</label>
						<input type="text" name="londonCopies" /><br />

						<label htmlFor="chicagoCopies">Chicago:</label>
						<input type="text" name="chicagoCopies" /><br />

						<label htmlFor="torontoCopies">Toronto:</label>
						<input type="text" name="torontoCopies" /><br />
					</div>

					<input type="submit" value="Register" disabled={!validateForm(errors)}/>
				</form>
			</div>
		);
	}
}

export default BookForm;
