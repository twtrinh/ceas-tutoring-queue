import React from 'react';
import { useForm } from "react-hook-form";
import { courseGroups } from '../constants';
import { useHistory } from 'react-router';

export default function RequestForm() {
    const { register, errors, handleSubmit } = useForm();
    const history = useHistory();
    
    const onSubmitHandler = async data => {
        const response = await fetch("/api/requests", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          history.push('/');
        
    };

    return (
        <form className="App" onSubmit={handleSubmit(onSubmitHandler)}>
            <h1>Sign Up</h1>
            <label>First Name:</label>
            <input name="firstName" ref={register({ required: true, minLength: 2 })} />
            {errors.firstName && errors.firstName.type === "required" && (<p>This is required</p>)}
            {errors.firstName && errors.firstName.type === "minLength" && (<p>This is field requires minimum length of 2</p>)}
            
            <br/>

            <label>Last Name:</label>
            <input name="lastName" ref={register({ required: true, minLength: 2 })} />
            {errors.lastName && errors.lastName.type === "required" && (<p>This is required</p>)}
            {errors.lastName && errors.lastName.type === "minLength" && (<p>This is field requires minimum length of 2</p>)}
            
            <br/>

            <label>PantherID</label>
            <input name="pantherID" ref={register({ required: true })} />
            {errors.username && (<p>This is required</p>)}

            <br/>

            <label>What course do you need tutoring in?</label>
            <select name="course" ref={register({ required: true })} >
                {
                    courseGroups.map(group =>
                        <optgroup label={group.name}>
                            {
                                group.courses.map(course =>
                                    <option>{course}</option>
                                )
                            }
                        </optgroup>
                    )
                }
            </select>

            {errors.course && (<p>This is required</p>)}

            <input type="submit" />
        </form>
    );
}

