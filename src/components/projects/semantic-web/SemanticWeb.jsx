import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import LoadingSpinner from "../../LoadingSpinner";
import axios from "axios";

const filterOptions = ["Population", "Humand Developement Index"];
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

const SemanticWeb = () => {
    const [requestIsLoading, setRequestIsLoading] = useState(false);
    const [requestResult, setRequestResult] = useState("");
    const [requestOptions, setRequestOptions] = useState(0);
    const [requestYear, setRequestYear] = useState(yearOptions.length - 1);
    const [countryData, setCountryData] = useState({});
    const makeSparqlRequest = async () => {
        setRequestIsLoading(true);
        let result;
        try {
            result = await axios.post("http://localhost:8080/api", {
                year: yearOptions[requestYear]
            });
            // TODO: change structure of result data in backend
            setCountryData(result.data);
        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status;
                if (statusCode === 400) {
                    setRequestResult("ERROR 400: Bad Request");
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
            } else {
                setRequestResult(
                    "ERROR: Setting up the request failed. Contact the admin."
                );
            }
        }
        console.log(result);
        setRequestIsLoading(false);
    };
    return (
        <div className="container flex justify-center bg-white">
            <div className="container-map w-full md:w-2/4">
                <div className="flex flex-wrap justify-end gap-2">
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
                <ComposableMap
                    width={3000}
                    height={3000}
                    projectionConfig={{ scale: 5000, center: [10, 50] }}
                    className={`${
                        requestIsLoading ? "animate-pulse opacity-5" : null
                    }}`}>
                    <Geographies geography="https://unpkg.com/world-atlas@2.0.2/countries-110m.json">
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const countryName =
                                    geo.properties.name.toLowerCase();
                                // console.log(
                                //     countryData[countryName]
                                //         ? countryData[countryName].value
                                //         : "No Content :("
                                // );
                                return (
                                    <Geography
                                        key={`${geo.rsmKey}-${geo.id}`}
                                        geography={geo}
                                        fill={
                                            countryData[countryName]
                                                ? countryData[countryName].color
                                                : "#EAEAEC"
                                        }
                                        stroke="#000"
                                        strokeWidth={3}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ComposableMap>
            </div>
        </div>
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

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default SemanticWeb;
