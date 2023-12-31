import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import LoadingSpinner from "../../LoadingSpinner";
import axios from "axios";
import { objectIsEmpty } from "../../../helper/objectIsEmpty";
import { FaRegQuestionCircle } from "react-icons/fa";
import SimpleTooltip from "../../SimpleTooltip";

const filterOptions = [
    "Accident Rate",
    "Adjusted Accident Rate (HDI)",
    "Human Developement Index"
];
const yearOptions = [
    "1999",
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021"
];

const pythonCode = `
def make_sparql_request(year):
    def query_wikidata(query):
        url = "https://query.wikidata.org/sparql"
        r = requests.get(url, params={"format": "json", "query": query})
        data = r.json()
        return data

    sparql_query = (
        """
    SELECT ?countryLabel ?hdiValue ?populationValue
    WHERE {
    ?country wdt:P31 wd:Q3624078;
            wdt:P30 wd:Q46;
            p:P1081 ?statement;
            wdt:P1082 ?populationValue.

    ?statement ps:P1081 ?hdiValue;
                pq:P585 ?dateHDI.

    FILTER (YEAR(?dateHDI) = """
        + str(year)
        + """)

    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    ORDER BY ?countryLabel
    """
    )

    wikidata_results = query_wikidata(sparql_query)

    # ---

    g = Graph()
    g.parse("data.ttl", format="turtle")

    sparql_query = (
        """
    PREFIX iut: <http://www.iut-orsay.fr/Wagner/>
    PREFIX wd: <http://www.wikidata.org/entity/>
    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?pays ?accident ?annee
    WHERE {
        ?individu iut:pays ?pays .
        ?individu iut:annee ?annee .
        ?individu iut:accident ?accident .

        FILTER (?annee = """
        + str(year)
        + """)
    }
    order by desc(?accident)
    """
    )

    data_results = g.query(sparql_query)

    # ---

    data_dict = {}
    max_rate = 0
    max_rate_adjusted = 0
    min_rate_hdi = 1
    max_rate_hdi = 0
    for row in wikidata_results["results"]["bindings"]:
        for result in data_results:
            if str(result[0]) == row["countryLabel"]["value"].replace(
                "Kingdom of Denmark", "Denmark"
            ).replace(
                "Kingdom of the Netherlands", "Netherlands"
            ).replace(
                "Czech Republic", "Czechia"
            ).replace(
                "Republic of Ireland", "Ireland"
            ):
                data_dict[row["countryLabel"]["value"]] = {
                    "country": row["countryLabel"]["value"].replace(
                "Kingdom of Denmark", "Denmark"
            ).replace(
                "Kingdom of the Netherlands", "Netherlands"
            ).replace(
                "Czech Republic", "Czechia"
            ).replace(
                "Republic of Ireland", "Ireland"
            ),
                    "hdi": float(row["hdiValue"]["value"]),
                    "accident": int(float(str(result[1]))),
                    "annee": int(str(result[2])),
                    "population": int(row["populationValue"]["value"]),
                }
                rate = (int(float(str(result[1]))) / int(row["populationValue"]["value"])) * 100000
                adjusted_rate = rate / float(row["hdiValue"]["value"])
                if rate > max_rate:
                    max_rate = rate
                if adjusted_rate > max_rate_adjusted:
                    max_rate_adjusted = adjusted_rate
                if float(row["hdiValue"]["value"]) < min_rate_hdi:
                    min_rate_hdi = float(row["hdiValue"]["value"])
                if float(row["hdiValue"]["value"]) > max_rate_hdi:
                    max_rate_hdi = float(row["hdiValue"]["value"])

    data_dict = sorted(
        data_dict.values(),
        key=lambda x: x["accident"] * x["hdi"] / x["population"],
        reverse=True,
    )
    new_data = {entry['country'].lower(): {
    'hdi': entry['hdi'],
    'hdiColor': get_color_for_accident_rate(entry['hdi'], min_rate_hdi, max_rate_hdi, True),
    'accident': entry['accident'],
    'population': entry['population'],
    'year': entry['annee'],
    'accidentRatePer100k': (entry['accident'] / entry['population']) * 100000,
    'colorAccidentRatePer100k': get_color_for_accident_rate((entry['accident'] / entry['population']) * 100000, 0, max_rate),
    'adjustedAccidentRate': ((entry['accident'] / entry['population']) * 100000) / entry['hdi'],
    'colorAdjustedAccidentRate': get_color_for_accident_rate(((entry['accident'] / entry['population']) * 100000) / entry['hdi'], 0, max_rate_adjusted)
    } for entry in data_dict}

    return new_data


def get_color_for_accident_rate(rate, min_rate, max_rate, isHdi=False):
    normalized_rate = (rate - min_rate) / (max_rate - min_rate)

    if not isHdi:
        green = (0, 128, 0)
        red = (255, 0, 0)
    else:
        green = (0, 128, 0)
        red = (255, 0, 0)
        normalized_rate = 1 - normalized_rate

    r = green[0] + (red[0] - green[0]) * normalized_rate
    g = green[1] + (red[1] - green[1]) * normalized_rate
    b = green[2] + (red[2] - green[2]) * normalized_rate

    return f'#{int(r):02x}{int(g):02x}{int(b):02x}'
`;

const SemanticWeb = () => {
    const [requestIsLoading, setRequestIsLoading] = useState(false);
    const [requestResult, setRequestResult] = useState("");
    const [requestOptions, setRequestOptions] = useState(0);
    const [currentHoveredCountry, setCurrentHoveredCountry] = useState("");
    const [requestYear, setRequestYear] = useState(yearOptions.length - 1);
    const [countryData, setCountryData] = useState({});

    const makeSparqlRequest = async () => {
        setRequestIsLoading(true);
        let result;
        try {
            result = await axios.post("http://195.90.212.134:8080/api", {
                year: yearOptions[requestYear]
            });
            setRequestResult("Fetched Data Successfully!");
            setCountryData(result.data.data);
        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status;
                if (statusCode === 400) {
                    setRequestResult("ERROR 400: Bad Request");
                    console.log(error);
                } else if (statusCode === 500) {
                    setRequestResult(
                        `ERROR 500: Something is wrong with the server. Contact the admin.`
                    );
                } else {
                    setRequestResult(
                        `Error ${statusCode}: Other error occurred`
                    );
                }
            } else if (error.request) {
                setRequestResult(
                    "ERROR: Something is wrong with the Server. Contact the admin."
                );
            }
        }
        setRequestIsLoading(false);
    };
    return (
        <>
            <div className="container flex flex-col items-center justify-center bg-white">
                <h1 className="m-3 text-center text-primary md:text-2xl md:font-bold">
                    How does the number of people killed in road accidents vary
                    depending on the human developement index and the population
                    of countries over the years in Europe?
                </h1>
                <div className="container-map w-full md:w-2/4">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                        <SimpleTooltip
                            text={
                                requestOptions === 0
                                    ? "How many road accidents happen per 100.000 people ((Accidents / Population) * 100.000)"
                                    : requestOptions === 1
                                      ? "How many road accidents happen per 100.000 people adjusted by the Human Development Index (((Accidents / Population) * 100.000) / HDI)"
                                      : ""
                            }>
                            <FaRegQuestionCircle className="text-gray-500 hover:text-gray-700" />
                        </SimpleTooltip>

                        <YearDropdown
                            title="Option"
                            data={filterOptions}
                            selectedObject={requestOptions}
                            selectObject={setRequestOptions}
                        />
                        <YearDropdown
                            title="Year"
                            data={yearOptions}
                            selectedObject={requestYear}
                            selectObject={setRequestYear}
                        />
                        {requestIsLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <div
                                className="rounded-md bg-primary px-3 py-2 text-sm 
                            font-semibold text-white shadow-sm
                            hover:cursor-pointer hover:bg-secondary"
                                onClick={() => makeSparqlRequest()}>
                                GO
                            </div>
                        )}
                    </div>
                    <div className="flex gap-1">
                        <ComposableMap
                            width={3000}
                            height={3000}
                            projectionConfig={{ scale: 5000, center: [10, 50] }}
                            className={`${
                                requestIsLoading
                                    ? "animate-pulse opacity-5"
                                    : null
                            }}`}>
                            <Geographies geography="https://unpkg.com/world-atlas@2.0.2/countries-110m.json">
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        const countryName =
                                            geo.properties.name.toLowerCase();
                                        return (
                                            <Geography
                                                key={`${geo.rsmKey}-${geo.id}`}
                                                geography={geo}
                                                fill={
                                                    countryData[countryName]
                                                        ? requestOptions === 0
                                                            ? countryData[
                                                                  countryName
                                                              ]
                                                                  .colorAccidentRatePer100k
                                                            : requestOptions ===
                                                                1
                                                              ? countryData[
                                                                    countryName
                                                                ]
                                                                    .colorAdjustedAccidentRate
                                                              : countryData[
                                                                    countryName
                                                                ].hdiColor
                                                        : "#EAEAEC"
                                                }
                                                stroke="#000"
                                                strokeWidth={3}
                                                onMouseEnter={() => {
                                                    setCurrentHoveredCountry(
                                                        countryName
                                                    );
                                                }}
                                                onMouseLeave={() => {
                                                    setCurrentHoveredCountry(
                                                        ""
                                                    );
                                                }}
                                            />
                                        );
                                    })
                                }
                            </Geographies>
                        </ComposableMap>
                        {!objectIsEmpty(countryData) ? (
                            <Legend
                                countryData={countryData}
                                option={requestOptions}
                            />
                        ) : null}
                    </div>
                    <div
                        className={`mt-1 inline-flex w-full justify-center 
                    gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold 
                    text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                        currentHoveredCountry !== "" &&
                        countryData[currentHoveredCountry]?.accidentRatePer100k
                            ? "shadow shadow-primary"
                            : null
                    }`}>{`${
                        currentHoveredCountry
                            ? `${currentHoveredCountry.toLocaleUpperCase()}: `
                            : ""
                    } ${
                        !objectIsEmpty(countryData)
                            ? currentHoveredCountry !== ""
                                ? requestOptions === 0
                                    ? `${
                                          Math.floor(
                                              countryData[currentHoveredCountry]
                                                  ?.accidentRatePer100k * 100
                                          ) / 100
                                      } accidents per 100k`
                                    : requestOptions === 1
                                      ? `Adjusted Accident Rate ${
                                            Math.floor(
                                                countryData[
                                                    currentHoveredCountry
                                                ]?.adjustedAccidentRate * 100
                                            ) / 100
                                        }`
                                      : `${countryData[currentHoveredCountry]?.hdi}`
                                : `Hover to see ${
                                      requestOptions === 0
                                          ? "Accident Rate"
                                          : requestOptions === 1
                                            ? "Adjusted Accident Rate (HDI)"
                                            : "Human Developement Index"
                                  }`
                            : "Press go to fetch data"
                    }`}</div>
                </div>
            </div>
            <div className="container bg-white">
                <p className="p-3">
                    In this university project our goal was to create an
                    ontology from a local database and connect it to the
                    wikidata endpoint. With this connection we wrote a SPARQL
                    query to find out the population and Humand Developement
                    Index of the countries that were mentioned in our local
                    database.{" "}
                </p>
                <CodeBlock code={pythonCode} />
            </div>
        </>
    );
};

const CodeBlock = ({ code }) => {
    return (
        <pre className="w-full overflow-x-auto rounded-md border border-gray-300 bg-gray-100 p-4 font-mono text-sm text-gray-900">
            <code>{code}</code>
        </pre>
    );
};

const YearDropdown = ({ title, data, selectedObject, selectObject }) => {
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button
                        className="inline-flex w-full justify-center gap-x-1.5 
                        rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                        ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {data[selectedObject]}
                        <ChevronDownIcon
                            className="-mr-1 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right 
                    rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="max-h-[200px] overflow-auto py-1">
                            {data.map((object, index) => {
                                return (
                                    <Menu.Item key={object}>
                                        {({ active }) => (
                                            <a
                                                onClick={() => {
                                                    selectObject(index);
                                                }}
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                    "block px-4 py-2 text-sm hover:cursor-pointer"
                                                )}>
                                                {object}
                                            </a>
                                        )}
                                    </Menu.Item>
                                );
                            })}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
};

export const Legend = ({ countryData, option }) => {
    const [lowerPart, setLowerPart] = useState({});
    const [upperPart, setUpperPart] = useState({});
    const [lowerColor, setLowerColor] = useState("");
    const [upperColor, setUpperColor] = useState("");

    const findExtremesInAccidentRates = (data) => {
        let maxRateCountry = null;
        let minRateCountry = null;
        let maxAdjustedRateCountry = null;
        let minAdjustedRateCountry = null;
        let maxAdjustedRate = -Infinity;
        let minAdjustedRate = Infinity;
        let maxRate = -Infinity;
        let minRate = Infinity;

        for (const country in data) {
            const rate = data[country].accidentRatePer100k;
            const adjustedRate = data[country].adjustedAccidentRate;
            if (rate > maxRate) {
                maxRate = rate;
                maxRateCountry = country;
            }
            if (rate < minRate) {
                minRate = rate;
                minRateCountry = country;
            }
            if (adjustedRate > maxAdjustedRate) {
                maxAdjustedRate = adjustedRate;
                maxAdjustedRateCountry = country;
            }
            if (adjustedRate < minAdjustedRate) {
                minAdjustedRate = adjustedRate;
                minAdjustedRateCountry = country;
            }
        }

        return {
            maxRateCountry,
            minRateCountry,
            maxAdjustedRateCountry,
            minAdjustedRateCountry
        };
    };

    useEffect(() => {
        const {
            maxRateCountry,
            minRateCountry,
            maxAdjustedRateCountry,
            minAdjustedRateCountry
        } = findExtremesInAccidentRates(countryData);
        if (!objectIsEmpty(countryData)) {
            if (option === 0) {
                const lowerColor =
                    countryData[minRateCountry].colorAccidentRatePer100k;
                const upperColor =
                    countryData[maxRateCountry].colorAccidentRatePer100k;
                const lowerValue =
                    countryData[minRateCountry].accidentRatePer100k;
                const upperValue =
                    countryData[maxRateCountry].accidentRatePer100k;
                setLowerPart({
                    color: lowerColor,
                    value: (Math.round(lowerValue * 100) / 100).toFixed(2)
                });
                setLowerColor(lowerColor.toLowerCase());
                setUpperPart({
                    color: upperColor,
                    value: (Math.round(upperValue * 100) / 100).toFixed(2)
                });
                setUpperColor(upperColor.toLowerCase());
            } else if (option === 1) {
                const lowerColor =
                    countryData[minAdjustedRateCountry]
                        .colorAdjustedAccidentRate;
                const upperColor =
                    countryData[maxRateCountry].colorAdjustedAccidentRate;
                const lowerValue =
                    countryData[minAdjustedRateCountry].adjustedAccidentRate;
                const upperValue =
                    countryData[maxAdjustedRateCountry].adjustedAccidentRate;
                setLowerPart({
                    color: lowerColor,
                    value: (Math.round(lowerValue * 100) / 100).toFixed(2)
                });
                setLowerColor(lowerColor.toLowerCase());
                setUpperPart({
                    color: upperColor,
                    value: (Math.round(upperValue * 100) / 100).toFixed(2)
                });
                setUpperColor(upperColor.toLowerCase());
            } else {
                const lowerColor = countryData[minAdjustedRateCountry].hdiColor;
                const upperColor = countryData[maxRateCountry].hdiColor;
                const lowerValue = countryData[minAdjustedRateCountry].hdi;
                const upperValue = countryData[maxAdjustedRateCountry].hdi;
                setLowerPart({
                    color: lowerColor,
                    value: (Math.round(lowerValue * 100) / 100).toFixed(2)
                });
                setLowerColor(lowerColor.toLowerCase());
                setUpperPart({
                    color: upperColor,
                    value: (Math.round(upperValue * 100) / 100).toFixed(2)
                });
                setUpperColor(upperColor.toLowerCase());
            }
        }
    }, [countryData, option]);

    return (
        <div className="flex gap-1 py-2">
            <div
                style={{
                    background: `linear-gradient(${
                        option !== 2 ? "to top" : "to bottom"
                    }, ${lowerColor}, ${upperColor})`,
                    height: "100%",
                    width: "10px",
                    borderRadius: "10px"
                }}
            />
            <div
                className={`flex ${
                    option === 2 ? "flex-col" : "flex-col-reverse"
                } justify-between text-xs font-medium`}>
                <div>{lowerPart?.value}</div>
                <div>
                    {(
                        (Number(lowerPart?.value) + Number(upperPart?.value)) /
                        2
                    ).toFixed(2)}
                </div>
                <div>{upperPart?.value}</div>
            </div>
        </div>
    );
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default SemanticWeb;
