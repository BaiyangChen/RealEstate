import axios from 'axios'
import dayjs from 'dayjs'
import {toast} from 'react-toastify'

 const api = axios.create({
    baseURL: "http://localhost:8000/api"
})

export const getAllProperties = async()=>{
    try{
        const response = await api.get('/residency/allresd',{
            timeout:10*1000,
        });
        if(response.status === 400 || response === 500){
            throw response.data
        }
        return response.data
    }catch(error){
        toast.error("Something went wrong while getting all property");
        throw error;
    }
}

export const createUser = async (email, token)=>{
    try{
        await api.post(`/user/register`, {email}, {headers:{Authorization: `Bearer ${token}`}});
    }catch(error){
        toast.error("Something went wrong, Please try again");
        throw error;
    }
}

export const bookVisit = async(date, propertyId, email, token)=>{
    
    try {
        await api.post(
            `/user/bookVisit/${propertyId}`,
            {
                email,
                id: propertyId,
                date: dayjs(date).format("DD/MM/YYYY")
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
        )
    } catch (error) {
        toast.error("Something went wrong, please try again");
        throw error
    }
}

export const removeBooking = async (id, email, token) => {
    console.log("Booking with URL:", `/user/removeBooking/${id}`);
    try {
      await api.post(
        `/user/removeBooking/${id}`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong, Please try again");
  
      throw error;
    }
  };

  export const toFav = async(id, email, token) =>{
    try {
        await api.post(
            `/user/toFav/${id}`,
            {
                email,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            }
        )
    } catch (error) {
        throw error
    }
  }

export const getAllFav = async(email,token)=>{
    if(!token) {console.error("No Token"); return[];}

    try {
        const res = await api.post(
            `/user/allFav`,
            {email},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return res.data["favResidenciesID"]
    } catch (error) {
        toast.error("Something went wrong while fetching fav");
        throw error
    }
}

export const getAllBookings = async (email, token) =>{
    if(!token) {console.error("No Token"); return[];}
    try {
        const res = await api.post(
            `/user/allBookings`,
            {
                email,
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                },
            }
        );
        return res.data["bookedVisits"];

    } catch (error) {
        toast.error("Something went wrong while fetching Bookings")
        throw error
    }
}

export const createResidency = async(data, token)=>{
    try {
        const res = await api.post(
            `/residency/create`,
            {
                data
            }
            ,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                },
            }
        )
        return res.data
    } catch (error) {
        console.log("error from server:", error)
        throw error
    }
};
  

