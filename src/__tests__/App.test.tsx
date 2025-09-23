import React from 'react'
import { render } from '@testing-library/react-native'
import App from '../../App'

describe('App', () => {
  it('renders navigation root', () => {
    const { getByText } = render(<App />)
    expect(getByText('Kinship')).toBeTruthy()
  })
})
