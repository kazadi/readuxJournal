import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';


class PostNew extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.displayLabel}</label>
                <input
                    className="form-control"
                    type="text"
                    //obj that contains onChange, onFocus, the value, etc. L-134@9min
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        // console.log(values);
        this.props.createPost(values, () => {
            this.props.history.push('/');
        })

    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        displayLabel="Title"
                        name="title"
                        component={this.renderField}
                    />
                    <Field
                        displayLabel="Categories"
                        name="categories"
                        component={this.renderField}
                    />
                    <Field
                        displayLabel="Post Content"
                        name="content"
                        component={this.renderField}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    //Validate the inputs from 'values'
    if (!values.title) {
        errors.title = "Enter a title!";
    }
    if (!values.categories) {
        errors.categories = "Enter some categories!";
    }
    if (!values.content) {
        errors.content = "Enter some content please!";
    }
    //if errors is empty, the form is fine to submit
    //if errors has *any* props reduxFurm in invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostNew)
);