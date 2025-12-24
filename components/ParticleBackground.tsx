import React, { useEffect } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        });
    }, []);

    return (
        <Particles
            id="tsparticles"
            className="absolute inset-0 z-0"
            options={{
                fullScreen: { enable: false }, // vivid requirement: we want it within the Hero section usually, or we can make it fixed. Let's start with false so it fits the container.
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "bubble",
                        },
                        resize: {
                            enable: true,
                        },
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        bubble: {
                            distance: 200,
                            duration: 2,
                            size: 0,
                            opacity: 0,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#cbd5e1", "#ffffff"],
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: false,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "bottom", // Snow falls down
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: false,
                        speed: 2, // Falling speed
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                        },
                        value: 100, // Number of snowflakes
                    },
                    opacity: {
                        value: 0.5,
                        animation: {
                            enable: true,
                            speed: 1,
                            sync: false,
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 4 },
                    },
                },
                detectRetina: true,
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
            }}
        />
    );
};

export default ParticleBackground;
