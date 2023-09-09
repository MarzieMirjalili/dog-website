import { FC } from "react";
import { Breed } from "./components/Breed";

export const DogsList: FC = () => {
  return (
    <>
      <h3>Dogs Website</h3>
      <div>
        <Breed image="" title="First Dog" />
      </div>
    </>
  );
};
