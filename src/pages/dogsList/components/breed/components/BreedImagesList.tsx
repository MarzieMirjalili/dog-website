import axios from "axios";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

type BreedImagesResponseType = {
  message: string[];
  status: string;
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100%;
`;

const BreedImage = styled.img`
  border-radius: 15px;
  object-fit: cover;
  object-position: center;
  width: 400px;
  height: 400px;
`;

export const BreedImagesList: FC<{ title: string }> = ({ title }) => {
  const [imageUrlIndex, setImageUrlIndex] = useState(0);
  const { isLoading, isError, data, error } = useQuery<
    BreedImagesResponseType,
    Error
  >("breedImages", () =>
    axios
      .get(`https://dog.ceo/api/breed/${title}/images`)
      .then((res) => res.data)
  );

  const previous = () => {
    if (imageUrlIndex > 0) {
      console.log("prev");
      setImageUrlIndex(imageUrlIndex - 1);
    }
  };
  const next = () => {
    if (!data) {
      return;
    }
    if (imageUrlIndex < data?.message.length - 2) {
      console.log("next");
      setImageUrlIndex(imageUrlIndex + 1);
    }
  };

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
      <button onClick={() => previous()}>{"<"}</button>
      <BreedImage src={data?.message[imageUrlIndex]} />
      <button onClick={() => next()}>{">"}</button>
    </StyledContainer>
  );
};
