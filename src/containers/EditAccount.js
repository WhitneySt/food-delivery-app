import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material'
import { StylesH1 } from '../styles/GlobalStyled'
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Put from '../helpers/put';

const apiUrl = 'https://crudhook.herokuapp.com/usuarios';
const EditAccount = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};
        setUser(user);
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
    }, []);

    const onSubmit = async (event) => {
        try {
            event.preventDefault();
            const newUserData = {
                ...user,
                name,
                email,
                phone
            }

            await Put(`${apiUrl}/${user.id}`, newUserData);
            localStorage.setItem("user", JSON.stringify({ ...newUserData, isLogged: true }));
            alert('Felicitaciones, su información ha sido actualizada con exito!');
        } catch (error) {
            alert(error);
        }
    }

    const onNameChanged = (event) => {
        setName(event.target.value);
    }

    const onEmailChanged = (event) => {
        setEmail(event.target.value);
    }

    const onPhoneChanged = (event) => {
        setPhone(event.target.value);
    }

    return (

        <div sx={{
            width: '25ch',
            display: 'flex'
        }}>
             <IconButton onClick={() => navigate(-1)} aria-label="delete" sx={{ position: 'absolute', zIndex: '20', width: '30', height: '30', top: 0, left: 0 }}>
              <ArrowBackIosIcon sx={{ width: '25', height: '25', marginLeft: 'auto' }} />
            </IconButton>
            <StylesH1>Profile</StylesH1>
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
                    value={name}
                    onChange={onNameChanged}
                    fullWidth
                    color="warning"
                    id="filled-name"
                    label="Name"
                    name="name"
                    type="text"
                    variant="standard"
                />
                <TextField
                    value={email}
                    onChange={onEmailChanged}
                    fullWidth
                    color="warning"
                    id="filled-email"
                    label="Email"
                    type="email"
                    name="email"
                    variant="standard"
                />
                <TextField
                    value={phone}
                    onChange={onPhoneChanged}
                    fullWidth
                    color="warning"
                    id="filled-phone"
                    label="Phone"
                    type="text"
                    name="phone"
                    variant="standard"
                />
                <Button color="warning" type='button' onClick={() => navigate('/payments')} variant="contained" sx={{ width: '25ch', marginTop: '25px' }}>Payment</Button>
                <Button color="warning" type='submit' variant="contained" sx={{ width: '25ch', marginTop: '10px' }}>Save</Button>
            </Box>
        </div >

    )
}

export default EditAccount