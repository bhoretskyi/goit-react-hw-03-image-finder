import { Formik, Form, Field } from 'formik';
export const Searchbar = ({ onSubmit }) => {
  return (
    <header className="searchbar">
      <Formik
        initialValues={{ searchQuery: '' }}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values.searchQuery);
          resetForm(); 
        }}
      >
        <Form className="SearchForm">
          <Field
            type="text"
            name="searchQuery"
            className="SearchForm-input"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className="SearchForm-button">
            <span className="button-label">Search</span>
          </button>
        </Form>
      </Formik>
    </header>
  );
};