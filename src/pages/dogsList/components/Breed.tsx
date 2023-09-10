import axios from "axios";
import { FC } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

type BreedPropsType = {
  title: string;
};
type RandomImageResponseType = {
  message: string;
  status: string;
};
const StyledContainer = styled.div`
  border: 1px solid gray;
  border-radius: 15px;
  padding: 10px;
`;

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 250px;
  border-radius: 15px;
`;

export const Breed: FC<BreedPropsType> = ({ title }) => {
  const { isLoading, isError, data, error } = useQuery<
    RandomImageResponseType,
    Error
  >(["randomImageOfBreed", title], () =>
    axios
      .get(`https://dog.ceo/api/breed/${title}/images/random`)
      .then((res) => res.data)
  );
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
    <StyledContainer>
      <StyledImage src={data?.message} alt={title} />
      <p>{title}</p>
    </StyledContainer>
  );
};
