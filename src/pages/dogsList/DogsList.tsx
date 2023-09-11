import { FC, useMemo } from "react";
import { Breed } from "./components/breed/Breed";
import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";
import { Search } from "../../components/Search";
import { useSearchParams } from "react-router-dom";

const BreedList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
`;

export type BreedsType = {
  message: Record<string, string[]>;
  status: string;
};

export const DogsList: FC = () => {
  // advantages of react query:
  // 1-cache data
  // 2-we dont need state for isLoading & data ,...
  const [searchParams] = useSearchParams();
  const { isLoading, isError, data, error } = useQuery<BreedsType, Error>(
    "breeds",
    () =>
      axios.get("https://dog.ceo/api/breeds/list/all").then((res) => res.data)
  );

  const breedsList = useMemo(() => {
    if (data) {
      return Object.keys(data?.message);
    }
    return [];
  }, [data]);
  const serachResult = useMemo(() => {
    const searchBreedText = searchParams.get("search") ?? "";
    return breedsList.filter((breed) => breed.includes(searchBreedText));
  }, [breedsList, searchParams]);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (!data) {
    return <div>data not found</div>;
  }
  return (
    <>
      <Search />
      <h3>Dogs Website</h3>

      <BreedList>
        {serachResult.map((breed) => {
          return <Breed key={breed} title={breed} />;
        })}
      </BreedList>
    </>
  );
};
