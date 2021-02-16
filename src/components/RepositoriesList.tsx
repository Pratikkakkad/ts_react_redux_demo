import React, { useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");

  const { searchRepositories } = useActions();

  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );

  const onsubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchRepositories(term);
  };

  return (
    <div>
      <form onSubmit={onsubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <div>
        {loading && <h3>Loading</h3>}
        {error && <h3>{error}</h3>}
        {!loading && !error && (
          <div>
            <h3>Packages</h3>
            {data.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepositoriesList;
