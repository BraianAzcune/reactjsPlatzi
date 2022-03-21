import React from 'react'
import { UseState } from './UseState.js'
import { ClassState } from './ClassState.js'
import { UseReducer } from './UseReducer.js'
import './App.css'
export default function App() {
  return (
    <div className='App'>
      <UseState name='braian' />
      <ClassState name='maria' />
      <UseReducer name='pedro' />
    </div>
  )
}