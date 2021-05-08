import React from 'react'
import "./App.css"
import {Formik, Form, Field, ErrorMessage, FieldArray} from "formik"
import * as Yup from "yup"
import TextError from './TextError'

const initialValues = {
  name:'',
  email:'',
  channel:'',
  comment: '',
  gender: '',
  address: '',
  social: {
      facebook: '',
      twitter: ''
  },
  phoneNumber: ['', ''],
  phNumbers: ['']
}

const onSubmit = values =>{
  console.log(values)
}

const validate = values =>{
  let errors = {}
  if(!values.name){
    errors.name = 'Required'
  }
  if(!values.email){
    errors.email = 'Required'
  } else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)){
    errors.email = 'Invalid email format'
  }
  if(!values.channel){
    errors.channel = 'Required'
  }

  return errors
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email type').required('Required'),
  channel: Yup.string().required('Required')
})


const ComponentWise = () => {

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <Form>
        <div className="form-aontrol">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name"/>
            <ErrorMessage name="name" component={TextError}/>
        </div>
        
        <div className="form-control">
            <label htmlFor="email">email</label>
            <Field type="email" id="email" name="email"/>
            <ErrorMessage name="email"/>
        </div>
        
        <div className="form-control">
            <label htmlFor="channel">channel</label>
            <Field type="text" id="channel" name="channel" placeholder="Youtube channel name"/>
            <ErrorMessage name="channel"/>
        </div>

        <div className="form-control">
            <label htmlFor="comment">Comments</label>
            <Field as="textarea" id="comment" name="comment"/>
        </div>

        <div className="form-control">
            <label htmlFor="gender">gender</label>
            <Field as="select" id="gender" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </Field>
        </div>

        <div className="form-control">
            <label htmlFor="address">Address</label>
            <Field name="address">
                {props => {
                    const {field, form, meta} = props
                    return(
                        <div>
                            <input type="text" id="address" {...field}/>
                            {meta.touched && meta.error ? <div>{meta.error}</div>:null}
                        </div>
                    )
                }}
            </Field>
        </div>

        <div className="form-control">
            <label htmlFor="facebook">Facebook</label>
            <Field name="social.facebook" as="input" id="facebook"/>
        </div>

        <div className="form-control">
            <label htmlFor="twitter">Twitter</label>
            <Field name="social.twitter" as="input" id="twitter"/>
        </div>

        <div className="form-control">
            <label htmlFor="primary-phone">Primary Phone Number</label>
            <Field name="phoneNumber[0]" as="input" id="primary-phone"/>
        </div>

        <div className="form-control">
            <label htmlFor="secondary-phone">Secondary Phone Number</label>
            <Field name="phoneNumber[1]" as="input" id="secondary-phone"/>
        </div>

        <div className="form-control">
            <label>List of Phone Numbers</label>
            <FieldArray name="phNumbers">
              {
                (fieldArrayProps)=>{
                  console.log('fieldarrayprops', fieldArrayProps)
                  const {push, remove, form} = fieldArrayProps
                  const {values} = form
                  const {phNumbers} = values
                  return(
                    <div>
                         {phNumbers.map((phNumber, idx)=>(
                            <div key={idx}>
                                <Field name={`phNumbers[${idx}]`}/>
                                <button onClick={()=>remove(idx)}>-</button>
                                <button onClick={()=>push('')}>+</button>
                            </div>
                         ))}
                    </div>
                  )
                }
              }
            </FieldArray>
        </div>
        
        
        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  )
}

export default ComponentWise
