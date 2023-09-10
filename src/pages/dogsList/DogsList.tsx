import { FC, useMemo } from "react";
import { Breed } from "./components/Breed";
import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";

const BreedList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
`;

type BreedsType = {
  message: Record<string, string[]>;
  status: string;
};

export const DogsList: FC = () => {
  // advantages of react query:
  // 1-cache data
  // 2-we dont need state for isLoading & data ,...

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
      <h3>Dogs Website</h3>
      <BreedList>
        {breedsList.map((breed) => {
          // console.log(breed);
          return <Breed key={breed} title={breed} />;
        })}
      </BreedList>
    </>
  );
};
