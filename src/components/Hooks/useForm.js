import { useState } from 'react';

const useForm = (initialState = {}) => {

    // Creo el estado para manipular la informacion del formulario 
    const [datosForm, setDatosForm] = useState(initialState)

    const handleInputChange = ({ target }) => {
        setDatosForm({
            ...datosForm,
            [target.name]: target.value

        })
    }

    return [datosForm, handleInputChange]
};

export default useForm;