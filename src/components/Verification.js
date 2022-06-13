import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField } from '@mui/material'
import { StylesLogin } from '../styles/GlobalStyled'
import logo from './../images/Logo.png'
import Post from '../helpers/post';

const apiUrl = 'https://crudhook.herokuapp.com/usuarios';

const Verification = () => {
    const { phoneNumber } = useParams();
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState("");

    const handleVerificationCodeChange = (event) => {
        const code = event.target.value;
        setVerificationCode(code);

        if (code.length === 6) {
            const confirmationResult = window.confirmationResult;
            confirmationResult.confirm(code).then((result) => {
                // User signed in successfully.
                const user = result.user;
                Post(apiUrl, {
                    id: user.uid,
                    accessToken: user.accessToken,
                    provider: user.providerId,
                    phone: phoneNumber
                }).then(() => {
                    navigate(`/createAccount/${user.uid}`);
                }).catch(error => {
                    console.log('Ha ocurrido un error creando el usuario');
                });
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
                console.log(error);
            });
        }
    };

    return (
        <StylesLogin>
            <img src={logo} alt='logo' />
            <h1>Sing in</h1>
            <p>Login or create an account with your
                phone number to start ordering</p>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '80' }

                }}
                noValidate
                autoComplete="off"
            >
                <div sx={{
                    display: 'flex',
                    marginTop: '2em'
                }}>
                    <TextField
                        value={verificationCode}
                        onChange={handleVerificationCodeChange}
                        id="standard-number"
                        type="text"
                        variant="standard"
                        color="warning"
                        sx={{ width: '4em' }}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: { textAlign: 'center' } }}
                    />
                </div>
            </Box>

        </StylesLogin>
    )
}

export default Verification