import React from "react";

import "./Results.css";

const Results = ({results, processing}) => {
  if (processing && results) {
    return <p>Thinking...</p>;
  }
  if (!processing && results.length > 0) {
    return (
      <div className="results">
        {results.length > 1 ? (
          <div>
            <p>I think...</p>
            {results.map((result, i) => (
              <React.Fragment key={i}>
                <p>
                  One of you is probably {result.gender}, is looking{" "}
                  {result.expressions.asSortedArray()[0].expression} and looks
                  around {Math.round(result.age)}
                </p>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div>
            <p>I think...</p>
            <p>
              You are looking{" "}
              {results[0].expressions.asSortedArray()[0].expression}
            </p>
            <p>You look around {Math.round(results[0].age)} years old</p>
            <p>I think you are a {results[0].gender}</p>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="results">
        <p>Hmmm... not sure.</p>
        <p>Looking for a face...</p>
      </div>
    );
  }
};

export default Results;
