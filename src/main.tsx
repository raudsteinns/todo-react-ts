import React from 'react'
import ReactDOM from 'react-dom/client'
import Todo from './Todo.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <div className='c-container'>
        <Todo />
      </div>
    </>
  </React.StrictMode>,
)