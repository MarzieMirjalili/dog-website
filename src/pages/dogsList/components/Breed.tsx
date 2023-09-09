import { FC } from "react";

type BreedPropsType = {
  image: string;
  title: string;
};

export const Breed: FC<BreedPropsType> = ({ image, title }) => {
  return (
    <div>
      <img src={image} alt={title} />
      <p>{title}</p>
    </div>
  );
};
