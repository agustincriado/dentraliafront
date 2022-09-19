import React, { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

export const oneContext = createContext()

// es un hook personalizado useAuth
export const useAux = () => {
  const context = useContext(oneContext)
  if (!context) throw new Error('There is no Auth provider')
  //console.log(context )
  return context
}

export function AuxProvider({ children }) {
  const [useId, setId] = useState('')
  const [usePayload, setPayload] = useState('')
  const [useMinutes, setMinutes] = useState('08')
    const [useSeconds, setSeconds] = useState('59')
  return (
    <oneContext.Provider value={{ 
      useId,
      setId,
      usePayload,
      setPayload,
      useMinutes,
      setMinutes,
      useSeconds, 
      setSeconds}}>
      {children}
    </oneContext.Provider>
  )
}

AuxProvider.propTypes = {
  //children: PropTypes.node,
  children: PropTypes.any,
}
