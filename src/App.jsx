import React, { useState, useRef } from 'react';
import { Form, Field } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { filterBy } from "@progress/kendo-data-query";
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import jsonData from './BackendData.json';

const App = () => {
  const formRef = useRef(null);
  const [participatingEmployees, setParticipatingEmployees] = useState([]);
  const initialFormData = {
    trainingName: '',
    educationSubject: '',
    trainingProvider: '',
    educationLocation: '',
    planDate: null,
    planDuration: '',
    educationDate: null, 
    educationDuration: '',
    status: '',
    employee: '',
  };

  const [formData, setFormData] = useState({
    trainingName: '',
    educationSubject: '',
    trainingProvider: '',
    educationLocation: '',
    planDate: '',
    planDuration: '',
    educationDate: '',
    educationDuration: '',
    status: '',
    employee: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = () => {

    const allFieldsFilled = Object.values(formData).every(field => field);

    if(allFieldsFilled)
    {
      setParticipatingEmployees(prevParticipatingEmployees => [...prevParticipatingEmployees, formData]);
      setFormData(initialFormData);
      formRef.current.resetForm();
    }
    else
    {
      alert('Please fill the form to continue.');
    }
  };

  const statusData = jsonData.WsInfo.Lists._PersonelDurum.ListRoot.Items.slice();
  const employeeData = jsonData.WsInfo.Lists._PersonelAdi.ListRoot.Items[0].Items.slice();
  const [filteredEmployeeData, setFilteredEmployeeData] = useState(employeeData);

  const filterData = (filter) => {
    if (!filter || !filter.filters || filter.filters.length === 0) {
      return employeeData;
    }
    return filterBy(employeeData, filter);
  };

  const filterChange = (event) => {
    setFilteredEmployeeData(filterData(event.filter));
  };

  return (
    <div className="container">
  <Form onSubmit={handleSubmit} ref={formRef} render={(formRenderProps) => (
    <form onSubmit={formRenderProps.onSubmit}>
      <div className='form-row'>
        <div className='form-row-element'>
          <h3>{jsonData.WsInfo.Title}</h3>
        </div>
        <div className='form-row-element'>
          <p>{new Date().toLocaleString()}</p>
        </div>
      </div>
      <div className='form-row'>
        <div className='form-row-element'>
          <Field
            name="trainingName"
            component={Input}
            label="Training Name:"
            className="full-width-input"
            value={formData.trainingName}
            onChange={handleChange}
          />
        </div>
        <div className='form-row-element'>
          <Field
            name="educationSubject"
            component={Input}
            label="Education Subject:"
            className="full-width-input"
            value={formData.educationSubject}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='form-row'>
        <div className='form-row-element'>
          <Field
            name="trainingProvider"
            component={Input}
            label="Training Provider:"
            className="full-width-input"
            value={formData.trainingProvider}
            onChange={handleChange}
          />
        </div>
        <div className='form-row-element'>
          <Field
            name="educationLocation"
            component={Input}
            label="Education Location:"
            className="full-width-input"
            value={formData.educationLocation}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='form-row'>
        <div className='form-row-element'>
          <DatePicker
            name="planDate"
            label="Plan Date:"
            className="full-width-input"
            value={formData.planDate}
            onChange={handleChange}
          />
        </div>
        <div className='form-row-element'>
          <Field
            name="planDuration"
            component={Input}
            label="Plan Duration:"
            className="full-width-input"
            value={formData.planDuration}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='form-row'>
        <div className='form-row-element'>
          <DatePicker
            name="educationDate"
            label="Education Date:"
            className="full-width-input"
            value={formData.educationDate}
            onChange={handleChange}
          />
        </div>
        <div className='form-row-element'>
          <Field
            name="educationDuration"
            component={Input}
            label="Education Duration:"
            className="full-width-input"
            value={formData.educationDuration}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='form-row'>
        <div className='form-row-element'>
          <DropDownList
            name="status"
            data={statusData}
            textField="Name"
            className="full-width-input"
            value={statusData.find(item => item.Name === formData.status) || null}
            onChange={(e) => handleChange({ target: { name: 'status', value: e.value.Name } })}
          />
        </div>
        <div className='form-row-element'>
          <DropDownList
            name="employee"
            data={filteredEmployeeData}
            textField="Name"
            filterable={true}
            className="full-width-input"
            value={filteredEmployeeData.find(item => item.Name === formData.employee) || null}
            onFilterChange={filterChange}
            onChange={(e) => handleChange({ target: { name: 'employee', value: e.value.Name } })}
          />
        </div>
      </div>
      <div className='form-row'>
        <div className='form-row-element'>
          <Button className='main-button'>Close</Button>
        </div>
        <div className='form-row-element'>
          <Button className='main-button' type="submit" disabled={!formRenderProps.allowSubmit}>Save</Button>
        </div>
      </div>
      <div className='form-row'>
        <div className='form-row-element'>
          <Grid data={participatingEmployees}>
            <Column field="trainingName" title="Training Name" />
            <Column field="educationSubject" title="Education Subject" />
            <Column field="trainingProvider" title="Training Provider" />
            <Column field="educationLocation" title="Education Location" />
            <Column field="planDate" title="Plan Date" />
            <Column field="planDuration" title="Plan Duration" />
            <Column field="educationDate" title="Education Date" />
            <Column field="educationDuration" title="Education Duration" />
            <Column field="status" title="Status" />
            <Column field="employee" title="Employee" />
          </Grid>
        </div>
      </div>
      <div className='form-row'>
        <div className='form-row-element'>
          <p>Current User: {jsonData.CurrentUsername}</p>
        </div>
      </div>
    </form>
  )} />
</div>

  );
};

export default App;
