import React from 'react'
import { useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap'

export default function ButtonGroupEmploymentStatus(props) {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Employed', value: '1' },
    { name: 'Unemployed', value: '2' },
    { name: 'Economically Inactive', value: '3' }
  ];
  return (
    <ButtonGroup>
      {radios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`radio-${idx}`}
          type="radio"
          variant={radio.value == '1' ? 'outline-success' : 'outline-danger'}
          name="radio"
          value={radio.value}
          checked={radioValue === radio.value}
          onChange={(e) => {
            setRadioValue(e.currentTarget.value);
            if (e.target.value == '1') {
              props.setSalaryFormInvisible(false)
            } else {
              props.setSalaryFormInvisible(true)
            }
          }}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  )
}
