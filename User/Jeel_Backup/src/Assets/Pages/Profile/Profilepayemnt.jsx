import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios'
import { getuser } from '../../Component/Navbar'
import Sidebar from '../../Component/Profilesidebar'
import Theme,{ GlobleVariable } from "../../../Theme"

const Profilepayemnt = () => {
    const [ruppe, setruppe] = useState("1")
    const [credit, setcredit] = useState("")
    const user = getuser();

    const userid = user.user._id
    const Backend_url = GlobleVariable.Backend_url

    const handleRupeesChange = (e) => {
        let amount = e.target.value
        // Remove non-numeric characters
        amount = amount.replace(/\D/g, '');
        setruppe(amount)
    };

    const handlePayment = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Make API request to backend to initiate payment
        try {
            const response = await axios.post(`${Backend_url}/checkout`, {
                amount: ruppe, userid
            });

            const { sessionId } = response.data;
            console.log(sessionId)
            // Redirect to Stripe checkout page
            const stripe = await loadStripe("pk_test_51P8h7jSDGOWUAXLsRdTR8F8Gk7FedhP8idXcIZIBgtUB7AtBsfjH2hmi9YCthmsfD2P6tmAkdCk90U48jELjhrei00ozfSuae4");
            const { error } = await stripe.redirectToCheckout({
                sessionId: sessionId
            });

            if (error) {
                console.error('Error redirecting to checkout:', error);
                // Handle error
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            // Handle error
        }
    };

    // Calculate credit when rupee value changes
    React.useEffect(() => {
        const convertaratio = 2
        setcredit(ruppe * convertaratio)
    }, [ruppe]);

    return (
        <div style={{ margin: "20px" }}>
        <Grid container spacing={2}>
            {/* Sidebar */}
           
                <Sidebar /> {/* Use the Sidebar component here */}
            
            <Grid item xs={12} sm={9}>
                <Typography variant='h4' style={{ fontFamily: 'Georgia, serif', textAlign: "Center", color:Theme.white[100] }}>
                    BILLING
                </Typography>
                <Paper style={{ padding: '20px', backgroundColor:Theme.primary[10], color:Theme.white[100] }}>
                    <form onSubmit={handlePayment}>
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    label="Enter your Amount Here"
                                    variant="outlined"
                                    fullWidth
                                    value={ruppe}
                                    onChange={handleRupeesChange}
                                    inputMode="numeric"  // Allow only numeric input
                                    pattern="[0-9]*"  // Only allow digits
                                    InputProps={{ style:{color:Theme.white[100], backgroundColor:Theme.primary[100]} }}
                                    InputLabelProps={{ style:{color:Theme.white[100]} }}
                                />

                                {credit !== 0 ? (  // Render credit if it's not equal to 0
                                    <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
                                        Credits: {credit}
                                    </Typography>
                                ) : (
                                    <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
                                        Credits: 0
                                    </Typography>
                                )}
                            </Grid>

                            <Grid item xs={12} sm={6} md={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" color="primary" type="submit" style={{ marginTop: '10px', maxHeight:"50px", width:"auto" }}>
                                    Pay via Stripe
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    </div>
    )
}

export default Profilepayemnt
