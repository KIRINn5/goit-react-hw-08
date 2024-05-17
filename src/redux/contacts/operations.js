import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/contacts");
      return response.data;
    } catch (e) {
      Notify.error("Oops. Something is wrong. Please try again!");
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await axios.post("/api/contacts", { name, number });
      Notify.success(`${name} is added to the contact list!`);
      return response.data;
    } catch (e) {
      Notify.error("Oops. Something is wrong. Please try again!");
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (credentials, thunkAPI) => {
    const contactId = credentials.id;
    try {
      const response = await axios.patch(`/api/contacts/${contactId}`, {
        name: credentials.name,
        number: credentials.number,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    await axios.post("/api/auth/logout");
    Notify.success("You have been logged out!");
    return;
  } catch (e) {
    Notify.error("Oops. Something is wrong. Please try again!");
    return thunkAPI.rejectWithValue(e.message);
  }
});
