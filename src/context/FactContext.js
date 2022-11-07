// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// const FactContext = createContext();

// export const FactProvider = ({ children }) => {
//   const [joke, setJoke] = useState(null);

//   const fetchJoke = async () => {
//     const response = await axios.get(
//       "https://uselessfacts.jsph.pl/random.json?language=en"
//     );
//     const data = response.data;
//     setJoke(data.text);
//     console.log(data);
//   };

//   useEffect(() => {
//     fetchJoke();
//   }, []);

//   return (
//     <FactContext.Provider
//       value={{
//         joke,
//         setJoke,
//         fetchJoke
//       }}
//     >
//       {children}
//     </FactContext.Provider>
//   );
// };

// export default FactContext;
