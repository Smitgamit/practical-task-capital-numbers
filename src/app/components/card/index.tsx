"use client";
import { Movie } from "@/app/movies/page";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FunctionComponent } from "react";
import placeholderImg from "../../assets/placeholder.png";
// Define the prop types for the Card component
type CardProps = {
  moviesListData: Movie;
};

const Card: FunctionComponent<CardProps> = ({ moviesListData }) => {
  const router = useRouter();
  console.log("card :>> ", moviesListData);
  const onClickMovieDetailsHandler = (id: string) => {
    router.push(`movies/${id}`);
  };
  return (
    <div
      onClick={() => onClickMovieDetailsHandler(moviesListData?.imdbID)}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <Image
        src={moviesListData?.Poster || placeholderImg}
        alt={moviesListData?.Title || "no title"}
        width={500}
        height={750}
        className="w-full"
      />
      <div className="p-4">
        <h3 className="text-xl mb-2">{moviesListData?.Title}</h3>
        <p className="text-yellow-400">{moviesListData?.Year}</p>
      </div>
    </div>
  );
};

export default Card;
