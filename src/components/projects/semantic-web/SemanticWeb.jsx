import React, { useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const SemanticWeb = () => {
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
                            geographies.map((geo) => (
                                <Geography
                                    key={`${geo.rsmKey}-${geo.id}`}
                                    geography={geo}
                                    fill="#06F"
                                    stroke="#000"
                                    strokeWidth={3}
                                />
                            ))
                        }
                    </Geographies>
                </ComposableMap>
            </div>
        </div>
    );
};

export default SemanticWeb;
