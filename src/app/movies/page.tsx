"use client";
import Image from "next/image";
import Card from "../components/card";
import { useCallback, useEffect, useMemo, useState } from "react";
import TabButton from "../components/TabButton";

export type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

type MoviesResponse = {
  Search: Movie[];
};
const debounce = <F extends (...args: any[]) => void>(
  func: F,
  wait: number
) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const MoviesList = () => {
  const [searchText, setSearchText] = useState<string>("thor");
  const [debouncedText, setDebouncedText] = useState("");
  const [moviesListData, setMoviesListData] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState("movie");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const debouncedSearchTerm = debounce((value: string) => {
    setDebouncedText(value);
  }, 500);
  const fetchMovies = async () => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}?s=${searchText}&type=${activeTab}&apikey=fc1fef96`
      );
      const response = await result.json();
      setMoviesListData(response?.Search);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [debouncedText, activeTab]);

  const onSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value !== "") {
      setSearchText(value);
    } else {
      setSearchText("thor");
    }
    debouncedSearchTerm(value);
  };
  return (
    <main>
      <section className="my-10">
        <h2 className="text-2xl mb-5">
          List of movies and TV Shows I, Pramod Poudel have watched till date.
        </h2>
        <div className="flex items-center relative w-full md:w-auto">
          <svg
            className="h-8 w-8 text-gray-400 absolute pl-3 pt-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="search"
            onChange={(event) => onSearchHandler(event)}
            className="focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-500 pl-10 pr-4 py-2 w-full md:w-80 border border-gray-300"
            placeholder="Search..."
          />
        </div>
        <div className="pe-2">
          <TabButton
            label="All"
            active={activeTab === ""}
            onClick={() => handleTabClick("")}
          />
          <TabButton
            label="Movies"
            active={activeTab === "movie"}
            onClick={() => handleTabClick("movie")}
          />
          <TabButton
            label="TV Shows"
            active={activeTab === "series"}
            onClick={() => handleTabClick("series")}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {moviesListData?.map((item, index) => (
            <Card key={index} moviesListData={item} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default MoviesList;
