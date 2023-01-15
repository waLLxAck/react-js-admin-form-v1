import React from 'react'
import Select from 'react-select'

export default function SelectReport(props) {
    return (
        <Select id="dropDownContracts" options={props.options} onChange={props.onChange} />
    )
}
