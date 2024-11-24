import Button from '@mui/material/Button'; 
import Menu from '../components/Menu';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import InformeColeccion from '../components/InformeColeccion';


const ReportsEVS = () => {

    const [dataColeccion,setDataColeccion]=useState([]);
    const [mostrarInforme, setMostrarInforme]=useState(false);

    const handleButtonClick=async()=>{
        const response = await fetch('http://localhost:3030/coleccion');
        const result = await response.json();
        setDataColeccion(result.data)
        setMostrarInforme(true)
    }
    return (
        <Grid container spacing={8}>
            <Grid item xs={12}>
                <Menu />
            </Grid>
            <Grid item xs={12}>
    <Button variant="contained" onClick={handleButtonClick}>
        Informes
    </Button>
</Grid>
{mostrarInforme && <InformeColeccion data={dataColeccion} />}

        </Grid>
    );
};

export default ReportsEVS;
