import React, { useState, useEffect, useRef, SyntheticEvent } from 'react'
import closeIcon from "../../assets/close-icon.png"
import { FaQuestionCircle } from "react-icons/fa"
import "./signup.scss"
import Button from '@mui/material/Button';

type SignUpProps = {
    show: boolean,
    setShow: (show: boolean) => void
}

const SignUp = (props: SignUpProps) => {
    const [firstName, setFirstName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dateDay, setDateDay] = useState<Array<number>>([])
    const [dateYear, setDateYear] = useState<Array<number>>([])
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [gender, setGender] = useState('')


    const currentYear = new Date().getFullYear();
    let dateOfBirth = ''

    const submit = async (e: SyntheticEvent) => {

        if (selectedDay && selectedMonth !== null && selectedYear) {

            const paddedDay = selectedDay < 10 ? `0${selectedDay}` : selectedDay;

            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const monthIndex = monthNames.indexOf(selectedMonth);

            if (monthIndex !== -1) {
                const paddedMonth = monthIndex < 9 ? `0${monthIndex + 1}` : monthIndex + 1;

                dateOfBirth = `${selectedYear}-${paddedMonth}-${paddedDay}`;
            }

            console.log(dateOfBirth);
            const content = await fetch("http://localhost:5112/api/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    surname,
                    email,
                    password,
                    dateOfBirth,
                    gender
                })
            });
        }
};

        const fnameRef = useRef<HTMLInputElement>(null)

        useEffect(() => {
            const dayRange = [];
            for (let i = 1; i <= 31; i++) {
                dayRange.push(i)
                setDateDay(dayRange)

            }

            const yearRange = [];
            for (let i = currentYear; i >= 1905; i--) {
                yearRange.push(i)
                setDateYear(yearRange)
                //setDateYear(prevY => [...prevY, i])
            }

            if (fnameRef.current) {
                fnameRef.current.focus();


                // You can do something with the ref here
                fnameRef.current.addEventListener("focusin", () => {

                });

                // like showing a dialog on focus out and check if input is still empty
                // you can use states to store all inputs variable
                fnameRef.current.addEventListener("focusout", () => {

                    if (fnameRef.current?.value === "") {
                        // do something!
                    }
                });


            }

        }, [])



        return (
            <div style={{
                display: props.show ? "flex" : "none"
            }}>
                <div className="overlay-signup"></div>
                <div className="signup">
                    <div className="signup-container">
                        <div className="signup-header">
                            <div>
                                <h1>Sign Up</h1>
                                <p>It's quick and easy.</p>
                            </div>
                            <img src={closeIcon} alt="close icon" id="close-icon"
                                onClick={() => props.setShow(false)}

                            />
                        </div>

                        <div className="signup-seperator"></div>

                        <form onSubmit={submit}>
                            <div className="signup-fields">

                                <div className="signup-inputs">
                                    <div>
                                        <input type="text" placeholder='First Name' required ref={fnameRef}
                                            onChange={e => setFirstName(e.target.value)}
                                        />
                                        <input type="text" placeholder='Surname' required
                                            onChange={e => setSurname(e.target.value)}
                                        />
                                    </div>
                                    <input className="default-input" type="text" placeholder='email address' required
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <input className="default-input" type="password" placeholder='Password' required
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>


                                <div className="signup-boxes">
                                    <div className="info-text">
                                        <p>Date of birth</p>
                                        <FaQuestionCircle />
                                    </div>


                                    <div className="signup-box">
                                        <select name="day" id="day-date" required onChange={(e) => setSelectedDay(parseInt(e.target.value))}>
                                            {dateDay.map((day, index) => (
                                                <option value={day} key={index}>
                                                    {day}
                                                </option>
                                            ))}
                                        </select>
                                        <select name="month" id="month-date" required onChange={(e) => setSelectedMonth(e.target.value)}>
                                            <option value="Jan">Jan</option>
                                            <option value="Feb">Feb</option>
                                            <option value="Mar">Mar</option>
                                            <option value="Apr">Apr</option>
                                            <option value="May">May</option>
                                            <option value="Jun">Jun</option>
                                            <option value="Jul">Jul</option>
                                            <option value="Aug">Aug</option>
                                            <option value="Sep">Sep</option>
                                            <option value="Oct">Oct</option>
                                            <option value="Nov">Nov</option>
                                            <option value="Dec">Dec</option>
                                        </select>

                                        <select name="year" id="year-date" required onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
                                            {
                                                dateYear.map((year, index) => (
                                                    <option value={year} key={index}>{year}</option>
                                                ))
                                            }

                                        </select>
                                    </div>


                                    <div className="info-text">
                                        <p>Gender</p>
                                        <FaQuestionCircle />
                                    </div>

                                    <div className="signup-box">
                                        <div className="checkbox-wrapper">
                                            <label htmlFor="female">Female</label>
                                            <input type="radio" name="gender" value="Female" id="female" onChange={e => setGender(e.target.value)}></input>
                                        </div>

                                        <div className="checkbox-wrapper">
                                            <label htmlFor="male">Male</label>
                                            <input type="radio" name="gender" value="Male" id="male" onChange={e => setGender(e.target.value)}></input>
                                        </div>

                                        <div className="checkbox-wrapper">
                                            <label htmlFor="notSpecified">Prefer not to say</label>
                                            <input type="radio" name="gender" value="NotSpecified" id="notSpecified" onChange={e => setGender(e.target.value)}></input>
                                        </div>

                                    </div>

                                </div>
                                <Button variant='outlined' className='signUp-btn' type='submit'>
                                    SIGN UP
                                </Button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    export default SignUp