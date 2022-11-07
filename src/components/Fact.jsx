import { useContext, useEffect, useState } from "react";
import axios from "axios";

function Fact() {
  const [fact, setFact] = useState(null);

  useEffect(() => {
    const fetchFact = async () => {
      const response = await axios.get(
        "https://uselessfacts.jsph.pl/random.json?language=en"
      );
      const data = response.data;
      setFact(data.text);
      console.log(data);
    };
    fetchFact();

    setInterval(() => {
      fetchFact();
    }, 20000);
  }, []);

  return (
    <div className="fact-outer-ctr">
      <div className="fact-ctr">
        <div className="fact">{fact}</div>
      </div>
    </div>
  );
}

export default Fact;
