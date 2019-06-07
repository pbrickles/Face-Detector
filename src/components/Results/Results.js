import React, {useState, useEffect} from "react";

const Results = ({results}) => {
  const [processedResults, setProcessedResults] = useState([]);
  const processResults = () => {
    const expressionResults = [];
    results.forEach(result => {
      const expressions = result.expressions.asSortedArray();
      expressionResults.push(expressions[1]);
    });
    setProcessedResults(expressionResults);
  };

  useEffect(() => {
    processResults();
  });
  if (processedResults.length > 0) {
    return (
      <div>
        {processedResults.length > 1 ?
          processedResults.map((result, i) => (
            <p key={i}>One of you is looking {result.expression}</p>
          )) : (
            <p>You are looking {processedResults[0].expression}</p>
          )}
      </div>
    );
  }
  return null;
};

export default Results;
