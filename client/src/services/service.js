// service.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;



export async function getAllItems(token) {
  try {
    const response = await axios.get(`${BASE_URL}/items/getall`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch items');
  }
}

export async function updateItem(token, itemId, data) {
  try {
    await axios.put(`${BASE_URL}/items/update/${itemId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error('Failed to update item');
  }
}

export async function deleteItem(token, itemId) {
  try {
    await axios.delete(`${BASE_URL}/items/delete/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error('Failed to delete item');
  }
}

export async function addItem(token, newItem) {
  try {
    await axios.post(`${BASE_URL}/items/add`, newItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error('Failed to add item');
  }
}


export async function loginUser(username, password) {
  try {
    console.log(process.env.REACT_APP_BASE_URL);

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Login failed');
  }
}

export async function registerUser(name, username, password) {
  try {
    console.log(process.env.REACT_APP_BASE_URL);
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Sign-up failed');
  }
}
