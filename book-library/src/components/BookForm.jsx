import React from 'react';
import { TextInputBlock } from './'

export default ({ formTitle }) => {
    return (
        <div className="form-wrapper">
            <h1 class="form-title">
                {formTitle} Book
            </h1>
            <form action="#" class="form-content">
                <TextInputBlock label="FIND IN GOODREADS" inputName="goodreads-search" />

                <div class="input-block">
                    <label for="cover-image" class="register-form-label">COVER</label><br/>
                    <input type="file" name="cover-image" id="cover-image" accept="image/*" /><br/>
                </div>

                <TextInputBlock label="TITLE" inputName="book-title"/>
                <TextInputBlock label="AUTHOR(S)" inputName="book-author" />

                <div class="input-block">
                    <label for="book-description" class="register-form-label">DESCRIPTION</label><br />
                    <textarea name="book-description" id="book-description" cols="30" rows="10"></textarea><br />
                </div>

                <TextInputBlock label="ISBN" inputName="book-isbn" />

                <div class="input-block">
                    <label for="book-format" class="register-form-label">FORMAT</label><br />
                    <select name="book-format" id="book-format"><br />
                        <option value="paperback">Paperback</option>
                        <option value="e-book">E-book</option>
                        <option value="audiobook">Audiobook</option>
                    </select><br />
                </div>

                <TextInputBlock label="NUMBER OF PAGES" inputName="book-pages" />

                <div class="input-block">
                    <label for="book-publication-date" class="register-form-label">PUBLICATION DATE</label><br/>
                    <input type="date" name="book-publication-date" id="book-publication-date" /><br/>
                </div>

                <TextInputBlock label="PUBLISHER" inputName="book-publisher" />
                <TextInputBlock label="EDITION LANGUAGE" inputName="book-language" />
                <TextInputBlock label="SERIES" inputName="book-series" />

                <div class="input-block">
                    <label for="book-category" class="register-form-label">CATEGORY</label><br />
                    <select name="book-category" id="book-category"><br />
                        <option value="drama">Drama</option>
                        <option value="sci-fi">Sci-fi</option>
                    </select>
                </div>

                <div class="copies-wrapper">
                    <h2 class="copies-number-title">
                        NUMBER OF COPIES
                    </h2>
                    <TextInputBlock label="Kaunas:" inputName="kaunas-copies" />
                    <TextInputBlock label="Vilnius:" inputName="vilnius-copies" />
                    <TextInputBlock label="London:" inputName="london-copies" />
                    <TextInputBlock label="Chicago:" inputName="chicago-copies" />
                    <TextInputBlock label="Toronto:" inputName="toronto-copies" />
                </div>

                <input type="submit" value={formTitle} class="submit-button" />
            </form>
            </div>
        )
}