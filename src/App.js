import React from 'react'
import "./App.css"
import {useFormik} from "formik"

const initialValues = {
  name:'',
  email:'',
  channel:''
}

const onSubmit = values =>{
  
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

const App = () => {

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  console.log(formik.errors)


  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-aontrol">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name}/>
            {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}
        </div>
        
        <div className="form-control">
            <label htmlFor="email">email</label>
            <input type="email" id="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
            {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : null}
        </div>
        
        <div className="form-control">
            <label htmlFor="channel">channel</label>
            <input type="text" id="channel" name="channel" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.channel}/>
            {formik.errors.channel && formik.touched.channel ? <div className="error">{formik.errors.channel}</div> : null}
        </div>
        
        
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App
