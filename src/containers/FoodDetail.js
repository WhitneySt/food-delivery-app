import { Button, Checkbox, FormControlLabel, FormGroup, IconButton, Paper } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Get from '../helpers/get';
import Post from '../helpers/post';
import { StylesCheck, StylesDetailsFood, StylesForm, StylesTitleDetails } from "../styles/GlobalStyled";
import InputBase from '@mui/material/InputBase';
import AddIcon from '@mui/icons-material/Add';
import MinimizeIcon from '@mui/icons-material/Minimize';

const apiUrl = 'https://crudhook.herokuapp.com';
const FoodDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [food, setFood] = useState(null)
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(1);

    const calculatePrice = (checked, additional) => {
        if (checked) {
            const newPrice = price + (additional * amount);
            setPrice(newPrice);
        } else {
            const newPrice = price - (additional * amount);
            setPrice(newPrice);
        }
    }

    const handleChangeChecked1 = (event) => {
        const checked = event.target.checked;
        const additional = food.aditional[0].cost;
        calculatePrice(checked, additional);
        setChecked1(checked);
    };

    const handleChangeChecked2 = (event) => {
        const checked = event.target.checked;
        const additional = food.aditional[1].cost;
        calculatePrice(checked, additional);
        setChecked2(event.target.checked);
    };

    const handleChangeChecked3 = (event) => {
        const checked = event.target.checked;
        const additional = food.aditional[2].cost;
        calculatePrice(checked, additional);
        setChecked3(event.target.checked);
    };

    useEffect(() => {
        getFood(id);
    }, [id])


    const getFood = async (id) => {
        if (!id) return;

        const resp = await Get(`${apiUrl}/productos/${id}`);
        setPrice(resp.price);
        setFood(resp);
    }

    const onAdd = async () => {
        try {
            const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
            const aditional = [];

            if (!user) {
                alert("Para completar la orden debe estar previamente logueado, por favor acceda al sistema!.");
                return;
            }

            if (checked1) {
                aditional.push({
                    name: food.aditional[0].name,
                    cost: food.aditional[0].cost
                });
            }
            if (checked2) {
                aditional.push({
                    name: food.aditional[1].name,
                    cost: food.aditional[1].cost
                });
            }
            if (checked3) {
                aditional.push({
                    name: food.aditional[2].name,
                    cost: food.aditional[2].cost
                });
            }

            await Post(`${apiUrl}/order`, {
                userId: user.id,
                foodId: food.id,
                idRestaurante: food.idRestaurante,
                name: food.name,
                category: food.category,
                time: food.time,
                description: food.description,
                image: food.image,
                aditional,
                price,
                amount,
                status: 'Delivered'
            });
            alert('Pedido completado correctamente!');

            setPrice(food.price);
            setAmount(1);
            setChecked1(false);
            setChecked2(false);
            setChecked3(false);
            navigate('/order');
        } catch (error) {
            alert('Ha ocurrido un error al generar el pedido');
        }
    }

    return (
        <StylesDetailsFood>
            {food ? <div>
                <IconButton onClick={() => navigate(-1)} aria-label="delete" sx={{ position: 'absolute', zIndex: '20', width: '30', height: '30', top: 0, left: 0 }}>
                    <ArrowBackIosIcon sx={{ width: '25', height: '25', marginLeft: 'auto' }} />
                </IconButton>
                <img src={food.image} alt={food.name} />
                <StylesTitleDetails>
                    <h1>{food.name}</h1>
                    <span><AccessTimeIcon sx={{ position: 'relative', top: '5px' }} />{food.time}</span>
                </StylesTitleDetails>
                <p>{food.description}</p>
                <StylesCheck>
                    <h2>Additional Ingredients</h2>
                    <div>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={checked1} onChange={handleChangeChecked1} name={food.aditional[0].name} color="warning" />
                                }
                                label={food.aditional[0].name}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={checked2} onChange={handleChangeChecked2} name={food.aditional[1].name} color="warning" />
                                }
                                label={food.aditional[1].name}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={checked3} onChange={handleChangeChecked3} name={food.aditional[2].name} color="warning" />
                                }
                                label={food.aditional[2].name}
                            />
                        </FormGroup>
                        <section>
                            <span>{`$ ${food.aditional[0].cost.toLocaleString()}`}</span>
                            <span>{`$ ${food.aditional[1].cost.toLocaleString()}`}</span>
                            <span>{`$ ${food.aditional[2].cost.toLocaleString()}`}</span>
                        </section>
                    </div>
                    <StylesForm>
                        <Paper
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 140, height: 44 }}
                        >
                            <IconButton sx={{ p: '10px' }} aria-label="up" onClick={() => {
                                const newAmount = amount + 1
                                setAmount(newAmount);

                                let additional = 0;
                                if (checked1) additional += food.aditional[0].cost;
                                if (checked2) additional += food.aditional[1].cost;
                                if (checked3) additional += food.aditional[2].cost;


                                setPrice((food.price + additional) * newAmount);
                            }}>
                                <AddIcon />
                            </IconButton>
                            <InputBase
                                disabled
                                value={amount}
                                sx={{ ml: 1, flex: 1 }}
                                inputProps={{ 'aria-label': '' }}
                            />
                            <IconButton sx={{ p: '10px' }} aria-label="down" onClick={() => {
                                if (amount === 1) return;
                                const newAmount = amount - 1
                                setAmount(newAmount);
                                let additional = 0;
                                if (checked1) additional += food.aditional[0].cost;
                                if (checked2) additional += food.aditional[1].cost;
                                if (checked3) additional += food.aditional[2].cost;


                                setPrice((food.price + additional) * newAmount);
                            }}>
                                <MinimizeIcon sx={{ marginBottom: '15px' }} />
                            </IconButton>
                        </Paper>
                        <Button onClick={onAdd} variant="contained" color="warning" startIcon={<>Add  </>}>
                            {`$ ${price.toLocaleString()}`}
                        </Button>
                    </StylesForm>
                </StylesCheck>
            </div> : <>Loading...</>}

        </StylesDetailsFood>
    )
}

export default FoodDetail;