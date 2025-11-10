// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { serverUrl } from '../App'
// import { useDispatch, useSelector } from 'react-redux'
// import {  setShopsOfCity, setUserData } from '../redux/userSlice'

// function updateLocation() {
// const {userData,socket}=useSelector(state=>state.user)
// useEffect(()=>{
 
// async function updateMyLocation(lat, lng) {
//   // API call
//   axios.post(serverUrl+"/api/user/update-location", {
//     latitude: lat,
//     longitude: lng
//   }, { withCredentials: true });

//   // Socket emit
//   socket?.emit("user:location:update", {
//     latitude: lat,
//     longitude: lng
//   });
// }

// // Har thodi der me location bhejna
// navigator.geolocation.watchPosition(
//   (pos) => {
//     updateMyLocation(pos.coords.latitude, pos.coords.longitude);
//   },
//   (err) => console.error(err),
//   { enableHighAccuracy: false }
// );
// },[userData])
// }

// export default updateLocation




import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useSelector } from "react-redux";

function UpdateLocation() {
  const { userData, socket } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) return;

    async function updateMyLocation(lat, lng) {
      try {
        await axios.post(
          `${serverUrl}/api/user/update-location`,
          {
            latitude: Number(lat),
            longitude: Number(lng),
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${userData?.token}`, // 👈 Add this line
              "Content-Type": "application/json",
            },
          }
        );

        // Socket emit
        socket?.emit("user:location:update", {
          latitude: lat,
          longitude: lng,
        });
      } catch (error) {
        console.error("❌ Location update failed:", error.response?.data || error);
      }
    }

    navigator.geolocation.watchPosition(
      (pos) => {
        updateMyLocation(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => console.error("❌ Geolocation error:", err),
      { enableHighAccuracy: false }
    );
  }, [userData]);

  return null;
}

export default UpdateLocation;
