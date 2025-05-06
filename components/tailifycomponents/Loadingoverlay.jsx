import React from 'react';

const Loadingoverlay = ({
    visible,
    zIndex = 1000,
    overlayBg = 'rgb(227 227 227 / 60%)',
    position = 'absolute',
    loaderSize = '3rem',
    loaderColor = '#228be6',
}) => {
    if (!visible) return null;

    return (
        <div
            className="loading-overlay-root"
            style={{
                position,
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                zIndex,
            }}
            aria-busy="true"
            aria-live="polite"
        >
            <span
                className="loading-overlay-loader"
                style={{
                    width: loaderSize,
                    height: loaderSize,
                    border: `0.4rem solid ${loaderColor}`,
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                }}
            ></span>
            <div
                className="loading-overlay-background"
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: overlayBg,
                    filter: 'blur(2px)',
                    borderRadius: 'var(--mantine-radius-sm)',
                    zIndex: zIndex - 1,
                }}
            ></div>
            <style>
                {`
                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}
            </style>
        </div>
    );
};
export { Loadingoverlay };
