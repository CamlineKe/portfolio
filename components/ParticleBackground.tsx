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
            className="absolute inset-0"
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
                            mode: "grab",
                        },
                        resize: {
                            enable: true,
                        },
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        grab: {
                            distance: 200,
                            links: {
                                opacity: 0.5,
                            },
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#94a3b8", "#64748b"],
                    },
                    links: {
                        color: "#94a3b8",
                        distance: 150,
                        enable: true,
                        opacity: 0.3,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.6,
                        animation: {
                            enable: true,
                            speed: 0.5,
                            sync: false,
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 2, max: 5 },
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
