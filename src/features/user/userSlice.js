import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { verifyCustomerAPI } from "../../utils/verifyCustomerAPI";

// Server URL
const API = "http://localhost:3000";

// initialState value
const initialState = {
    userInfo: {
        mail: "",
        name: "",
        store_id: ""
    },
    status: "idle",
    loggedIn: false,
}

export const fetchUserByMail = createAsyncThunk(
    'user/fetchUserByMail',
    async (userMail, {rejectWithValue}) => {
        const payload = {
            email: userMail
        }
        
        try{
        //the function to fetch user on sakila
        const [customer] = await verifyCustomerAPI(API, "POST", payload)
        console.log("fetch userbyemail 2")
        if (!customer){
            console.log("fetch userbyemail 3")
            return rejectWithValue("User no Found")
            
        }
            console.log("fetch userbyemail 4", customer)
            return customer;
            
        }catch(err){
            console.log("fetch userbyemail 5")
            return rejectWithValue(err.message || "Request Failed")
            
        }
        // and if it exists make it loggedIn to true
        //return {mail: "example@gmail.com", name:"John Doe", store_id: "1"}
    }
)


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        testUser(state) {
            console.log("test user")
            //state.loggedIn = true
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUserByMail.pending, (state) =>{
            state.status = "loading";
        }).addCase(fetchUserByMail.fulfilled, (state, action)=>{
            state.status = "succeeded";
            state.userInfo = action.payload;
            state.loggedIn = true;
        }).addCase(fetchUserByMail.rejected, (state)=>{
            state.status = "failed";
            state.loggedIn = false;
        });
    }
})

export const { testUser} = userSlice.actions
export default userSlice.reducer;