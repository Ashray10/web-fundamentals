// import { Form } from 'antd'
import React, { useState } from 'react'

export default function App() {
  const [inputField , setInputField] = useState("");
  const inputsHandler = (e) =>{
      setInputField( e.target.value )
  }

  return (
    <div>
      <form>
      <label>
          <input type="text" onChange={inputsHandler} value ={inputField}/>
        </label>
      </form>
      <h1>Hello {inputField}, Welcome to FarEye</h1>
    </div>
  )
}
