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

  return (
    <oneContext.Provider value={{ useId, setId, usePayload, setPayload }}>
      {children}
    </oneContext.Provider>
  )
}

AuxProvider.propTypes = {
  //children: PropTypes.node,
  children: PropTypes.any,
}
