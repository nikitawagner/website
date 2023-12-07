import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Tooltip from "react-simple-tooltip";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const SemanticWeb = () => {
    const [countryData, setCountryData] = useState({
        germany: {
            color: "#FF0000",
            value: "120"
        },
        poland: {
            color: "#0000FF",
            value: "99"
        }
    });
    return (
        <div className="container flex justify-center bg-white">
            <div className="container-map w-full md:w-2/4">
                <ComposableMap
                    width={3000}
                    height={3000}
                    projectionConfig={{ scale: 5000, center: [10, 50] }}
                    style={{
                        scale: "1"
                    }}>
                    <Geographies geography="https://unpkg.com/world-atlas@2.0.2/countries-110m.json">
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const countryName =
                                    geo.properties.name.toLowerCase();
                                console.log(
                                    countryData[countryName]
                                        ? countryData[countryName].value
                                        : "No Content :("
                                );
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

export default SemanticWeb;
