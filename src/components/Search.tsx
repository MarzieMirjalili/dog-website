import { FC } from "react";
import { useSearchParams } from "react-router-dom";

export const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <input
      defaultValue={searchParams.get("search") ?? ""}
      onChange={(e) =>
        e.target.value
          ? setSearchParams({ search: e.target.value })
          : setSearchParams({})
      }
    />
  );
};
