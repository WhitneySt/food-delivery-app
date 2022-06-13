import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import { StylesH1 } from '../styles/GlobalStyled'
import useForm from "../components/Hooks/useForm";
import Put from '../helpers/put';
import Get from '../helpers/get';

const apiUrl = 'https://crudhook.herokuapp.com/usuarios';
const CreateAccount = () => {
    const { uid } = useParams();
    const navigate = useNavigate();

    const initialState = {
        name: '',
        email: '',
        password: ''
    }

    const [datosForm, handleInputChange] = useForm(initialState);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser(uid);
    }, [uid]);

    const getUser = async (userId) => {
        const resp = await Get(`${apiUrl}/${userId}`);
        setUser(resp);
    }


    // const [values, setValues] = useState({
    //     password: '',
    //     showPassword: false,
    // });

    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };

    // const handleClickShowPassword = () => {
    //     setValues({
    //         ...values,
    //         showPassword: !values.showPassword,
    //     });
    // };

    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };

    const onSubmit = async (event) => {
        try {
            event.preventDefault();
            const newUser = {
                ...user,
                ...datosForm
            };

            await Put(`${apiUrl}/${uid}`, newUser);
            localStorage.setItem("user", JSON.stringify({ ...newUser, isLogged: true }));
            navigate('/food-delivery-app');
        } catch (error) {
            alert(error);
        }
    }

    return (

        <div sx={{
            width: '25ch',
            display: 'flex'
        }}>
            <StylesH1>Create account</StylesH1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '30px',
                    gap: '10px'
                }}
                onSubmit={onSubmit}
                // noValidate
                autoComplete="off"
            >
                <TextField
                    onChange={handleInputChange}
                    fullWidth
                    color="warning"
                    required
                    id="filled-name"
                    label="Name"
                    name="name"
                    type="text"
                    variant="standard"
                />
                <TextField
                    onChange={handleInputChange}
                    fullWidth
                    color="warning"
                    required
                    id="filled-email"
                    label="Email"
                    type="email"
                    name="email"
                    variant="standard"
                />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" color="warning">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        name="password"
                        type='password'
                        onChange={handleInputChange}
                        id="standard-adornment-password"
                        // type={values.showPassword ? 'text' : 'password'}
                        // value={values.password}
                        // onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    color="warning"
                                    aria-label="toggle password visibility"
                                // onClick={handleClickShowPassword}
                                // onMouseDown={handleMouseDownPassword}
                                >
                                    {/* {values.showPassword ? <VisibilityOff /> : <Visibility />} */}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button color="warning" type='submit' variant="contained" sx={{ width: '25ch', marginTop: '100px' }}>SIGN IN</Button>
            </Box>
        </div >

    )
}

export default CreateAccount