import React from 'react';
import { Form, Field } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css'

const App = () => {
  const handleSubmit = (dataItem) => {
    console.log(dataItem);
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit} render={(formRenderProps) => (
        <form onSubmit={formRenderProps.onSubmit}>
          <div className='form-row'>
            <div className='form-row-element'>
              <Field
                name="field1"
                component={Input}
                label="Field 1"
              />
            </div>
            <div className='form-row-element'>
              <Field
                name="field2"
                component={Input}
                label="Field 2"
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      )} />
    </div>
  );
};

export default App;
