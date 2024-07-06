import React from 'react';
import VariantButtonGroup from '../libs/buttonGroup';
import { Typography } from '@mui/material';


function Home() {
    return (
        <>
            <Typography sx={{ fontFamily: 'Georgia', marginLeft: '33%' }} variant="h3" >Inventory Management</Typography>
            <VariantButtonGroup />
        </>
    );
}

export default Home;
