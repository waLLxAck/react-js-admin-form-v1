import React from 'react'
import Form from 'react-bootstrap/Form'

export default function FormGroup(props) {
  const textMuted =
    <Form.Text className="text-muted">
      {props.textMuted}
    </Form.Text>

  return (
    <Form.Group className="mb-3" controlId={props.controlId} hidden={props.hidden}>
      <Form.Label>{props.labelText}</Form.Label>
      <Form.Control type={props.formControlType} placeholder={props.formControlPlaceholder} max={props.formControlMax} />
      {props.textMuted ? textMuted : undefined}
    </Form.Group>
  )
}