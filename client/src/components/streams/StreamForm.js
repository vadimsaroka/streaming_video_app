import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError(props) {
    if (props.touched && props.error) {
      return (
        <div className="ui error message">
          <div className="header">{props.error}</div>
        </div>
      );
    }
  }

  renderInput = props => {
    const className = `field ${
      props.meta.error && props.meta.touched ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label>{props.label}</label>
        <input {...props.input} />
        <div>{this.renderError(props.meta)}</div>
      </div>
    );
  };

  onSubmit = event => {
    this.props.onSubmit(event);
  }

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = props => {
  const errors = {};

  if (!props.title) {
    errors.title = "You must enter a title";
  }
  if (!props.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate
})(StreamForm);
