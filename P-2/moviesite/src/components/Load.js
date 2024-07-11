import React from "react";
import * as Loader from "react-loader-spinner";
const LoaderComp = () => {
 
    return (
        <Loader
            type="TailSpin"
            color="rgb(155, 236, 34)"
            height={70}
            width={70}
            timeout={2000}
        />
 
    );
}
export default LoaderComp;