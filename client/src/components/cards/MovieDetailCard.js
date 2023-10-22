import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

export default function MovieDetailCard({ m }) {
  const [selected, setSelected] = useState(m);
  const [actorNames, setActorNames] = useState([]);

  useEffect(() => {
    const fetchActorNames = async () => {
      if (selected?.actors) {
        const actorIds = selected.actors.map((a) => a);
        try {
          const responses = await Promise.all(
            actorIds.map(async (actorId) => axios.get(`/actor/${actorId}`))
          );
          const actorNames = responses.map((response) => response.data.name);
          setActorNames(actorNames);
        } catch (error) {
          console.error(`Error fetching actor names: ${error}`);
        }
      }
    };

    fetchActorNames();
  }, [selected?.actors]);

  return (
    <div className="p-3">
      <h2>{selected?.title}</h2>
      <p>Synopsis: {selected?.description}</p>
      <p>Release Date: {moment(selected?.releaseDate).format("MMM Do YYYY")}</p>
      <p>Language: {selected?.language}</p>
      <p>Director: {selected?.director}</p>
      <p>Actors: {actorNames.join(", ")}</p>
      <p>Genres: {selected?.genre.name}</p>
      <p>Status: {selected?.status}</p>
    </div>
  );
}
