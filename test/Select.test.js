import React from 'react'
import { createSetup } from './setup'
import { Form, Select, Submit } from '../src'

const setup = createSetup(({ props, spy }) => (
  <Form>
    <Select name="value" options={['1', '2', '3']} {...props} />
    <Submit onClick={spy} />
  </Form>
))

test("initial values are set and can be changed", () => {
  const { submit, change, validateCalls } = setup({ value: '1' })

  submit()
  change('select', 'value', '2')
  submit()

  validateCalls({ value: '1' }, { value: '2' })
})

test("arbitrary props are passed to element", () => {
  const { element } = setup({ prop1: 'abc', prop2: 2 })
  expect(element('select', 'value').props())
    .toMatchObject({ prop1: 'abc', prop2: 2 })
})

// the initial value is currently set to the first in the list
// test("html validation attributes prevent onClick handler from firing if invalid", () => {
//   const { submit, change, validateCalls } = setup({ required: true })
//
//   submit()
//   change('select', 'value', '1')
//   submit()
//   change('select', 'value', '')
//   submit()
//
//   validateCalls({ value: '1' })
// })

test("validated class is appended to invalid element className", () => {
  const { change, element } = setup({ required: true })
  change('select', 'value')
  expect(element('select', 'value').props().className).toContain('validated')
})

test("classes are appended correctly", () => {
  const { element } = setup({ className: 'my-class my-other-class' })
  expect(element('select', 'value').props().className).toContain('my-class my-other-class')
})