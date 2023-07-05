import { useState, useEffect } from "react";
import { Country } from "./components/Country";
import Gauge from "./components/Gauge";
import Questions from "./components/Questions";


function App() {

  const [quarterYear, setQuarterYear] = useState([]);
  const [improvements, setImprovements] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryNps, setCountryNps] = useState([]);
  const [quarterlyNps, setQuarterlyNps] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    
    var urlApi = process.env.REACT_APP_API_KEY;

    const fetchData = async () => {
      const fetchQuestions = async () => {
        try {
          const response = await fetch(urlApi + "/getAllQuestions");
          const questionsData = await response.json();
          setQuestions(questionsData);
        } catch (error) {
          console.log("Error fetching Questions:", error);
        }
      };

      const fetchQuarterlyNps = async () => {
        try {
          const response = await fetch(urlApi + "/getAllQuarterlyNps");
          const quarterlyNpsData = await response.json();
          setQuarterlyNps(quarterlyNpsData);
        } catch (error) {
          console.log("Error fetching QuarterlyNps:", error);
        }
      };

      const fetchImprovements = async () => {
        try {
          const response = await fetch(urlApi + "/getAllImprovements");
          const improvementsData = await response.json();
          setImprovements(improvementsData);
        } catch (error) {
          console.log("Error fetching Improvements:", error);
        }
      };

      const fetchCountries = async () => {
        try {
          const response = await fetch(urlApi + "/getAllCountries");
          const countriesData = await response.json();
          setCountries(countriesData);
        } catch (error) {
          console.log("Error fetching Countries:", error);
        }
      };

      const fetchCountryNps = async () => {
        try {
          const response = await fetch(urlApi + "/getAllCountryQuarterly");
          const countryNpsData = await response.json();
          setCountryNps(countryNpsData);
        } catch (error) {
          console.log("Error fetching CountryNps:", error);
        }
      };

      const fetchQuarterYear = async () => {
        try {
          const response = await fetch(urlApi + "/getAllQuarterYear");
          const quarterYearData = await response.json();
          const sortedData = quarterYearData.sort((a, b) => b.id - a.id);
          const firstFour = sortedData.slice(0, 4);
          setQuarterYear(firstFour);
        } catch (error) {
          console.log("Error fetching QuarterYear", error);
        }
      };

      await Promise.all([
        fetchQuestions(),
        fetchQuarterlyNps(),
        fetchImprovements(),
        fetchCountries(),
        fetchCountryNps(),
        fetchQuarterYear(),
      ]).then(
        setTimeout(() => {
          setLoading(false)
      }, 1000)
      );
    };

    fetchData();
  }, []);

  return (
    <div className=" flex flex-col w-full h-full items-center justify-start bg-gray-50 pb-32">
      <div className="flex flex-col items-center justify-center m-8 mt-16">
        <h1 className="text-3xl font-semibold">
          Nps Statistics
        </h1>
        <p>(Net promoter score)</p>

      </div>
      <div id="menu" className={`fixed z-90 w-screen h-screen flex justify-center items-center bg-gray-900 opacity-${loading ? `100` : `0`} duration-700`}>
        <div className="flex flex-col items-center justify-center gap-10">
          <div className=" text-4xl text-white"> NPS Statistics</div>
        <div
          className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>

        </div>
        </div>

      </div>


      <Gauge quarterYear={quarterYear} quarterlyNps={quarterlyNps} />
      <h1 className="text-3xl font-semibold m-8 mt-16">
        How Can We Improve?
      </h1>
      <Questions quarterYear={quarterYear} questions={questions} improvements={improvements} />
      <h1 className="text-3xl font-semibold m-8 mt-16">
        NPS scores by country
      </h1>
      <div className="flex flex-row items-center w-11/12 justify-center gap-2 h-96">
        <Country countries={countries} countryNps={countryNps} quarterYear={quarterYear} />
      </div>
    </div>

  );
}

export default App;
