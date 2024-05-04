import React, { useState } from "react";


id = null;
email = null;

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
    console.log("Email:", email);
}

export const getEmail = () => {
    return email;
}

const User = () => {
  
}

export default User;