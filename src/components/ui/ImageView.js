import React, {useRef, useState} from "react";
import LoaderImage from "../../assets/loading-image.gif"
import $ from "jquery";
import {isFunction} from "lodash";
import useWindowSize from "../../hooks/useWindowSize";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";

function ImageView(props) {
    const {
        src,
        alt,
        className,
        imageClass,
        style,
        imageStyle,
        onLoad,
        onError,
        onClick,
        errorView,
        hideOnError,
        isRounded,
        children,
        ...rest
    } = props;

    const {width: windowWidth, height: windowHeight} = useWindowSize();
    const [loaderSize, setLoaderSize] = useState(0)

    const [isLoaded, setLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const container = useRef(null);

    useComponentDidUpdate(isCurrent => {
        if (!!container.current) {
            const element = container.current;
            const newSize = (element.offsetWidth < element.offsetHeight ? element.offsetWidth : element.offsetHeight) * (isRounded ? 1 : 0.5);

            setTimeout(() => {
                if (isCurrent()) setLoaderSize(newSize);
            }, 100)
        }
    }, [windowWidth, windowHeight]);

    function handleLoad(e) {
        setLoaded(true);
        setHasError(false);
        e.currentTarget.style.visibility = 'visible';

        if (isFunction(onLoad)) onLoad(e);
    }

    function handleError(e) {
        setHasError(true);

        if (isFunction(onError)) onError(e);
    }

    return (
        <React.Fragment>
            <div
                className={`${className?`${className} `:''}image-view position-relative`}
                style={{borderRadius: isRounded ? '100%':'0',...style}}
                ref={container}>
                {
                    !hasError &&
                    <img
                        src={src}
                        alt={alt}
                        className={`${imageClass?`${imageClass} `:''}d-block position-absolute right-left-top-bottom-0`}
                        style={{
                            ...imageStyle,
                            borderRadius: isRounded ? '100%':'0',
                            width: '100%',
                            height:'100%',
                            visibility: 'hidden',
                        }}
                        onLoad={handleLoad}
                        onError={handleError}
                        onClick={onClick}
                        {...rest}
                    />
                }
                {
                    !isLoaded && !hasError &&
                    <img
                        src={LoaderImage}
                        alt={alt}
                        className={`d-block position-absolute center-relative`}
                        style={{
                            width: `${loaderSize}px`,
                            height: `${loaderSize}px`,
                            borderRadius: '100%',
                        }}
                        onLoad={({currentTarget}) => {
                            const p = $(currentTarget).parent()[0];

                            if (p) {
                                const size = (p.offsetWidth < p.offsetHeight ? p.offsetWidth : p.offsetHeight) * (isRounded ? 1 : 0.5)
                                currentTarget.style.width = `${size}px`;
                                currentTarget.style.height = `${size}px`;
                            }
                        }}
                        onError={handleError}
                    />
                }
                {
                    hasError && !hideOnError &&
                    <React.Fragment>
                        {
                            errorView
                                ? errorView
                                : (
                                    <div
                                        className='h-100 w-100 bg-secondary text-light position-relative'
                                        style={{borderRadius: isRounded ? '100%':'0'}}
                                        onClick={onClick}>
                                        <div className='position-absolute center-relative font-weight-bold'>Offline</div>
                                    </div>
                                )
                        }
                    </React.Fragment>
                }
                {
                    (isLoaded || (hasError && !hideOnError)) && children
                }
            </div>
        </React.Fragment>
    );
}

export default ImageView;