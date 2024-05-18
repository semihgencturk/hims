import React, {useId} from "react";
import styled from "styled-components";

const GetAppointmentDropdownSelect = styled.select`
    margin: 0;
    border: none;
    border-radius: 10px;
`;

const GetAppointmentDropdown = ({name, options, type, setState}) => {

    let type_id;
    let type_name;

    switch(type){
        case "hospitals":
            type_id = "hospital_id";
            type_name = "hospital_name";
            break;
        case "hospitalClinics":
            type_id = "clinic_id";
            type_name = "clinic_name";
            break;
        case "clinicDoctors":
            type_id = "doctor_id";
            type_name = "last_name";
            break;
        case "doctorAvailabilityDateTime":
            type_id = "aval";
            type_name = "availability_date_time";
            break;
    };

    return (
        <GetAppointmentDropdownSelect 
            class="form-select form-select-lg mb-3" 
            aria-label={name}
            onChange={e => {setState(e.target.value)}}>
                <option selected>{name}</option>
                {options.map(option => (
                    <option 
                        key={option[type_name]} 
                        value={option[type_name]}>
                            {option[type_name]}
                    </option>
            ))}
        </GetAppointmentDropdownSelect>
)};

export default GetAppointmentDropdown;