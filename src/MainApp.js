import StandardFormGroup from './form_groups/FormGroup';
import ButtonGroupEmploymentStatus from './button_groups/ButtonGroupEmploymentStatus.js'
import SelectReport from './components/SelectReport.js'

import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'

export default function MainApp() {
    const [salaryFormInvisible, setSalaryFormInvisible] = useState(false);
    const [age, setAge] = useState(0);
    const [contracts, setContracts] = useState([]);
    useEffect(setOptions, [age])

    function setOptions() {
        function filterContracts(contract) {
            const august2020Age = document.getElementById("txtAgeAugust").value
            switch (contract) {
                case "NEET":
                    if (age >= 16 && age <= 24) {
                        return true
                    }
                    break
                case "AEB":
                    if (august2020Age >= 19) {
                        return true
                    }
                    break
                case "Traineeship":
                    if (august2020Age >= 16 && august2020Age <= 25) {
                        return true
                    }
                    break
                case "SSU":
                    if (age >= 16) {
                        return true
                    }
                    break
                case "Best West London":
                    if (age >= 25) {
                        return true
                    }
                    break
                default: return false
            }
        }
        const contractA = ["NEET", "AEB", "Traineeship", "SSU", "Best West London"]
        let options = contractA.filter(filterContracts).map((contract) => {
            return { value: contract, label: contract }
        })
        setContracts(options)
    }


    const fetchAsync = async (url) => await (await fetch(url)).json()

    const getAddressFromPostCode = async (url) => await fetchAsync(url).then(json => {
        const txtPostCode = document.getElementById("txtPostCode")
        const borough = json["result"]["admin_district"]
        txtPostCode.value = borough
    })

    const getAge = (fromDate, toDate) => {
        var today = toDate;
        var birthDate = new Date(fromDate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age
    }

    function setTxtAges() {
        const dob = document.getElementById("txtDOB").value
        document.getElementById("ageTag").value = getAge(dob, new Date())
        const age = getAge(dob, new Date(2020, 8, 31, 23, 59))
        document.getElementById("txtAgeAugust").value = age
        setAge(age)
    }

    const x1 =
        <div id={"app"}>
            <Form>
                <Form.Group className="mb-3" controlId="btnEmploymentStatus">
                    <ButtonGroupEmploymentStatus setSalaryFormInvisible={setSalaryFormInvisible} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="txtDOB">
                    <Form.Label>Date of birth (DOB)</Form.Label>
                    <Form.Control type="date" onChange={setTxtAges} />
                    <Form.Text className="text-muted">
                        Enter a date of birth to find out the age.
                    </Form.Text>
                </Form.Group>
                <div className='mb-3' style={{ display: "flex", justifyContent: "center" }}>
                    <div className='w-50'>
                        <Form.Group controlId="ageTag">
                            <Form.Control type="number" placeholder="0" />
                            <Form.Text className="text-muted">
                                Current age.
                            </Form.Text>
                        </Form.Group>
                    </div>
                    <div className='m-1' />
                    <div className='w-50'>
                        <Form.Group controlId="txtAgeAugust">
                            <Form.Control type="number" placeholder="0" />
                            <Form.Text className="text-muted">
                                Age on August 31st 2020.
                            </Form.Text>
                        </Form.Group>
                    </div>
                </div>


                <Form.Group className="mb-3" >
                    <Form.Label >Available contracts</Form.Label>
                    <SelectReport options={contracts} />
                </Form.Group>

                <StandardFormGroup hidden={salaryFormInvisible} labelText="Salary" formControlType="number" formControlPlaceholder="12500" formControlMax="21000" textMuted="Salary shouldn't exceed £21,000." />
                <Form.Group className="mb-3" controlId="txtPostCode">
                    <Form.Label>Borough</Form.Label>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className='w-75'>
                            <Form.Control type="text" placeholder="N22 5JH" />
                            <Form.Text className="text-muted">
                                Enter a UK postcode to convert it into a borough.
                            </Form.Text>
                        </div>
                        <div className='m-1' />
                        <div className='w-25'>
                            <Button className='w-100' variant="primary" type="button" onClick={() => getAddressFromPostCode("https://api.postcodes.io/postcodes/" + document.getElementById("txtPostCode").value)}>
                                Convert
                            </Button>
                        </div>
                    </div>
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="No worries" />
                </Form.Group> */}

            </Form>
        </div>
    return (
        x1
    );
}
