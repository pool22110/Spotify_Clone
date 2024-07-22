import { useEffect } from 'react'
import React from 'react'
import Login from './componants/Login'
import { reducerCases } from './utlis/Constants'
import Spotify from './componants/Spotify'
import { useStateProvider } from './utlis/stateProvider'

export default function App() {
  const [{token},dispatch]= useStateProvider()
  useEffect(()=>{
    const hash = window.location.hash
    if(hash){
      const token =hash.substring(1).split("&")[0].split("=")[1]
      
      dispatch({ type: reducerCases.SET_TOKEN,token})
    }
  },[token,dispatch])
  return (
    <div>{token ? <Spotify /> : <Login />}</div>
  )
}
