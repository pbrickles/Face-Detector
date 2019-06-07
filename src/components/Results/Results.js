import React, {useState, useEffect} from "react";

const Results = ({results}) => {
  const [processedResults, setProcessedResults] = useState([]);

  useEffect(() => {
    // console.log(results[0].landmarks.getLeftEye())
    const expressionResults = [];
    results.forEach(result => {
      const expressions = result.expressions.asSortedArray();
      expressionResults.push(expressions[1]);
    });
    setProcessedResults(expressionResults);
  }, [results]);
  
  if (processedResults.length > 0) {
    return (
      <div>
        {processedResults.length > 1 ? (
          processedResults.map((result, i) => (
            <p key={i}>One of you is looking {result.expression}</p>
          ))
        ) : (
          <p>You are looking {processedResults[0].expression}</p>
        )}
      </div>
    );
  }
  return null;
};

export default Results;
