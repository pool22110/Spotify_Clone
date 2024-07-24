import { useEffect } from "react";
import React from "react";
import styled from "styled-components";
import { useStateProvider } from "../utlis/stateProvider";
import axios from "axios";
import { reducerCases } from "../utlis/Constants";

export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();
  useEffect(() => {
    const getPlayListData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    getPlayListData();
  }, [token, dispatch]);
  return (
    <Container>
      <ul>
        {playlists.map(({ name, id }) => {
          return <li key={id}>{name}</li>;
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow: hidden;

    ul{
    list-style-type:none;
    display: flex;
    flex-direction: column;
    padding: 1 rem;
    gap: 1rem;
    height:55vh;
    max-height:100%
    overflow:auto
    // &::-webkit-scrollbar {
    // width:0.7rem;
    // &-thumb{
    // background-color:rgba(255,255,255,0.5)}
    li{
    display: flex;
    gap: 1rem;
    cursor:pointer;
    transition: 0.4s ease-in-out;
    &:hover{
    color: white}`;
