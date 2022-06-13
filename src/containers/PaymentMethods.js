import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material'
import { StylesH1 } from '../styles/GlobalStyled'
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Post from '../helpers/post';

const apiUrl = 'https://crudhook.herokuapp.com/payments';
const EditAccount = () => {
    const navigate = useNavigate();
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expires, setExpires] = useState("");
    const [cvv, setCvv] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        setUser(user);
    }, []);

    const onSubmit = async (event) => {
        try {
            event.preventDefault();
            await Post(apiUrl, {
                userId: user.id,
                cardName,
                cardNumber,
                expires,
                cvv
            });

            alert('Felicitaciones, su información ha sido actualizada con exito!');
            setCardName("");
            setCardNumber("");
            setExpires("");
            setCvv("");
            navigate(-1);
        } catch (error) {
            alert(error);
        }
    }

    const onCardNameChanged = (event) => {
        setCardName(event.target.value);
    }

    const onCardNumberChanged = (event) => {
        setCardNumber(event.target.value);
    }

    const onExpiresChanged = (event) => {
        setExpires(event.target.value);
    }

    const onCvvChanged = (event) => {
        setCvv(event.target.value);
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
                    value={cardName}
                    onChange={onCardNameChanged}
                    fullWidth
                    color="warning"
                    label="Card Name"
                    name="cardName"
                    type="text"
                    variant="standard"
                />
                <TextField
                    value={cardNumber}
                    onChange={onCardNumberChanged}
                    fullWidth
                    color="warning"
                    label="Card number"
                    type="password"
                    name="cardNumber"
                    variant="standard"
                />
                <TextField
                    value={expires}
                    onChange={onExpiresChanged}
                    fullWidth
                    color="warning"
                    label="Expires"
                    type="text"
                    name="expires"
                    variant="standard"
                />
                <TextField
                    value={cvv}
                    onChange={onCvvChanged}
                    fullWidth
                    color="warning"
                    label="CVV"
                    type="text"
                    name="cvv"
                    variant="standard"
                />
                <Button color="warning" type='submit' variant="contained" sx={{ width: '25ch', marginTop: '10px' }}>Save</Button>
            </Box>
        </div >

    )
}

export default EditAccount