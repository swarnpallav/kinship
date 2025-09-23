import React, { ReactNode } from 'react'
import { View, ViewProps } from 'react-native'

type Props = ViewProps & { children: ReactNode }

export default function Card({ children, style, ...rest }: Props) {
  return (
    <View className='rounded-xl bg-white shadow-md p-4' style={style} {...rest}>
      {children}
    </View>
  )
}
