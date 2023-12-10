import React from "react";

const SimpleTooltip = ({ children, text, ...rest }) => {
    const [show, setShow] = React.useState(false);

    return (
        <div>
            {show && (
                <div
                    className="bg-opacity-85 invisible absolute left-20 top-36 z-50 rounded bg-gray-100 p-3"
                    style={show ? { visibility: "visible" } : {}}>
                    {text}
                    <span className="absolute left-1/2 top-full border-solid" />
                </div>
            )}
            <div
                {...rest}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}>
                {children}
            </div>
        </div>
    );
};

export default SimpleTooltip;
