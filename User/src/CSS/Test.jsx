import { Box } from "@mui/material"
import React, { useState } from 'react';

export const Test = () => {
    const [diwalidata, setdiwalidata] = useState([]);
    const [entry, setentry] = useState({ name: "", gift: "" });
    const gifts = ["heelo", "dihfvu", "ciedufv", "iufhdfh"]; 
    let isvalue = true;

    const handleChange = (e) => {
        setentry({ ...entry, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setdiwalidata([...diwalidata, entry])
        setentry({name:"", gift:""})
    }

    const handleGift = () =>{
        
            const updatedata = diwalidata.map((el) =>({
                ...el,gift : el.gift ? el.gift : gifts[Math.floor(Math.random() * gifts.length)]
            }))

            setdiwalidata(updatedata)
            isvalue = false;
        
    }
    const handleShuffle = () =>{
        const updatedata = diwalidata.map((el) =>({
            ...el,gift : gifts[Math.floor(Math.random() * gifts.length)]
        }))

        setdiwalidata(updatedata)
    }

    const handlereset = () =>{
        const updatedata = diwalidata.map((el) =>({
            ...el,gift :""
        }))
        setdiwalidata(updatedata)
    }
    return (
        <>
            <Box height="100vh">
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="please eneter name" onChange={handleChange} value={entry.name} />
                    <button name="submit" type="submit" value="submit" style={{ width: "10%", height: "10%" }} > submit</button>
                </form>
                {diwalidata.map((el) => (
                    <li style={{ color: "red" }}>
                        {el.name}:{el.gift ? el.gift: "not gift yet"}
                    </li>
                ))}
                <button type="submit" onClick={handleGift}>Give the Gift</button>
                <button type="submit" onClick={handleShuffle}>shuffel the Gift</button>
                <button type="submit" onClick={handlereset}>reset the Gift</button>
            </Box>
        </>
    )
}