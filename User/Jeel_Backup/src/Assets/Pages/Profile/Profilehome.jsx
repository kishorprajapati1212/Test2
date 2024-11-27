import React, { useEffect, useState } from 'react'
import { Grid, ListItemText, Paper, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { getuser } from '../../Component/Navbar';
import { GlobleVariable } from '../../../Theme';
import Profilesidebar from '../../Component/Profilesidebar';
import Theme from "../../../Theme"

const Profilehome = () => {
    const user = getuser();
    const [userdata, setUserData] = useState(null);

    useEffect(() => {
        const fetchdata = async () => {
            const userid = user.user._id

            console.log(userid);
            const response = await axios.get(`${GlobleVariable.Backend_url}/getdata/${userid}`);
            setUserData(response.data)

        }
        fetchdata();
    }, [])

    return (
        <div style={{ margin: '20px', }}>
            <Grid container spacing={2}>
                <Profilesidebar />
                {/* Content */}
                <Grid item xs={12} md={9} >
                    <Typography variant='h4' style={{ fontFamily: 'Georgia, serif', textAlign: "center",color:Theme.white[100] }}>
                        Personal Information
                    </Typography>
                    <Paper style={{ padding: '20px', backgroundColor: Theme.primary[10], color:Theme.white[100] }}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center" >
                            <Grid item xs={12} md={3} style={{ textAlign: 'center' }} >
                                <AccountCircleIcon sx={{ height: "200px", width: "auto", color: "grey" }} />
                            </Grid>
                            <Grid item xs={12} md={9} >
                                <Grid container spacing={2} sx={{ml:"2%"}}>
                                    <Grid item xs={12} md={8}>
                                        <ListItemText primary={`Name: ${userdata && userdata.user.username}`} />
                                        <ListItemText primary={`Email: ${userdata && userdata.user.email}`} />
                                        <ListItemText primary={`Credit: ${userdata && userdata.user.credit}`} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Profilehome