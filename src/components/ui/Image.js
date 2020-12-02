import React, {useRef, useState} from "react";
import LoaderImage from "../../assets/loading-image.gif"
import Spinner from "./Spinner";
import {useCurrentEffect} from "use-current-effect";
import $ from "jquery";

function Image(props) {
    const {
        src,
        alt,
        className,
        style,
        onLoad,
        onError,
        ...rest
    } = props;

    const [isLoaded, setLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const container = useRef(null);

    useCurrentEffect(isCurrent => {

    }, []);

    function handleLoad() {
        setLoaded(true);
        setHasError(false);
    }

    function handleError() {
        setHasError(false);
    }

    return (
        <React.Fragment>
            <div
                className={`${className?`${className} `:''}position-relative`}
                style={{border:'1px solid black', ...style}}
                
                ref={container}
                {...rest}>
                {
                    /*!hasError &&
                    <img
                        src={src}
                        alt={alt}
                        className={`position-absolute right-left-top-bottom-0`}
                        style={{width: '100%', height:'100%', ...style}}
                        onLoad={handleLoad}
                        onError={handleError}
                        {...rest}
                    />*/
                }
                {
                    !isLoaded &&
                    <img
                        src={LoaderImage}
                        alt={alt}
                        className={`position-absolute center-relative`}
                        style={{width: '0', height:'0',}}

                        onLoad={({currentTarget}) => {
                            const p = $(currentTarget).parent()[0];

                            if (p) {
                                const pStyle = getComputedStyle(p);
                                const  size = /(\d+).+/.exec(pStyle.width)[1] * (50/100)
                                currentTarget.style.width = `${size}px`;
                                currentTarget.style.height = `${size}px`;
                            }
                        }}
                        {...rest}
                    />
                }
            </div>
        </React.Fragment>
    );
}

export default Image;