import React from 'react'
import { Pressable, Text, PressableProps } from 'react-native'

type Props = PressableProps & { title: string }

export default function Button({ title, style, ...rest }: Props) {
  return (
    <Pressable
      className='px-4 py-2 rounded-md bg-blue-600 active:bg-blue-700'
      style={style}
      {...rest}
    >
      <Text className='text-white text-base font-medium'>{title}</Text>
    </Pressable>
  )
}
