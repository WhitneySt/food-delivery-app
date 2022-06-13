import React, { forwardRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, Input, InputAdornment, InputLabel } from '@mui/material'
import logo from './../images/Logo.png'
import PropTypes from 'prop-types'
import { IMaskInput } from 'react-imask'
import PhoneIcon from '@mui/icons-material/Phone';
import { StylesLogin } from '../styles/GlobalStyled'
import { authentication } from '../firebase-config';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Get from "../helpers/get";

authentication.useDeviceLanguage();

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="(#00) 000-0000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

const apiUrl = 'https://crudhook.herokuapp.com/usuarios';
const LogIn = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [expandForm, setExpandForm] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);


    // const [values, setValues] = useState({
    //     textmask: '(100) 000-0000',
    //     numberformat: '1320',
    // });

    const getUsers = async () => {
        const resp = await Get(apiUrl);
        setUsers(resp);
    }

    const generateReCaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptch-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // onSignInSubmit();
                // console.log(response);
            }
        }, authentication);
    }

    const handleChange = (event) => {
        // setValues({
        //     ...values,
        //     [event.target.name]: event.target.value,
        // });
        setPhoneNumber(event.target.value);
    };

    const validatePhoneNumber = (str, validStringLength) => {
        if (!str) return false;
        const value = str.replace(/\D/g, '');
        const stringLenght = value.length;
        return { isValid: stringLenght === validStringLength, value };
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setExpandForm(true);

        const { isValid, value: validPhoneNumber } = validatePhoneNumber(phoneNumber, 10);

        if (!isValid) {
            alert('Por favor verifique el numero teléfonico.');
            return;
        }

        const dbUser = users.find(user => user.phone === validPhoneNumber);

        if (dbUser) {
            localStorage.setItem("user", JSON.stringify(dbUser));
            navigate('/food-delivery-app');
            return;
        }

        generateReCaptcha();
        const recaptchaVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(authentication, `+57${validPhoneNumber}`, recaptchaVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // console.log(confirmationResult);
                // ...
                navigate(`/verification/${validPhoneNumber}`);
            }).catch((error) => {
                console.log(error);
                // Error; SMS not sent
                // ...
            });
    }

    return (
        <StylesLogin>
            <img src={logo} alt='logo' />
            <h1>Sing in</h1>
            <p>Login or create an account with your
                phone number to start ordering</p>
            <Box
                sx={{
                    '& .MuiTextField-root': { width: '25ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '2em',
                    gap: '5em',
                    marginTop: '1em'
                }}
            >
                <form onSubmit={onSubmit}>
                    <FormControl sx={{ width: '25ch' }} variant="standard" color="warning">
                        <InputLabel htmlFor="formatted-text-mask-input">Phone number</InputLabel>
                        <Input
                            value={phoneNumber}
                            onChange={handleChange}
                            name="textmask"
                            id="formatted-text-mask-input"
                            // inputComponent={TextMaskCustom}
                            startAdornment={
                                <InputAdornment position="start">
                                    <PhoneIcon color="warning" />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {!expandForm && (
                        <p>
                            <Button type='submit' color="warning" variant="contained" sx={{ width: '25ch' }}>Login</Button>
                        </p>
                    )}
                    <div id='recaptch-container'></div>
                </form>
            </Box>
        </StylesLogin>
    )
}

export default LogIn