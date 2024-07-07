import React from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const CustomButtonGroup = styled(ButtonGroup)(({ theme }) => ({
    '& .MuiButton-root': {
        fontSize: '3.5rem', // Custom font size
        padding: theme.spacing(2), // Custom padding
    },
}));

export default function VariantButtonGroup() {
    const navigate = useNavigate();
    console.log('navigate', navigate);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '15%', // Add margin top
                '& > *': {
                    m: 1,
                },
            }}
        >
            <CustomButtonGroup variant="text" aria-label="large button group" >
                <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/dashboard')}>
                    Dashboard
                </Button>        
                <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/fieldInput')}>FieldsInput</Button>
                <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/peInput')}>PEInput</Button>
            </CustomButtonGroup>
        </Box>
    );
}
