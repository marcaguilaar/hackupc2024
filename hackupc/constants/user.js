import React, { useState } from "react";


id = null;
email = "177.traveller@gmail.com";


export const TIPUS_IDIOMA = ["Español", "Català", "English"];

export const setUserId = (idd) => {
    id = idd;
    console.log("Id:", id);
} 

export const userId = () => {
    console.log("Id:", id);
    return id;
}

export const setEmail = (mail) => {
    email = mail;
}

export const getEmail = () => {
    return email;
}

const User = () => {
  
}

export default User;