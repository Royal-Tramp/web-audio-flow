import React, { useRef, useState, useEffect } from 'react';
import { Handle } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { tw } from 'twind';
import { useStore } from '../store';

import {
    getAudioNode,
} from '../audio';

const selector = (id) => (store) => ({
    getNode: () => {
        return getAudioNode(id)
    },
});

export default function Analyser2({ id, data }) {
    const { getNode } = useStore(selector(id), shallow);
    const canvasRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext("2d");
        const WIDTH = canvas.width = 300;
        const HEIGHT = canvas.height = 60;

        const analyserNode = getNode();
        const bufferLengthAlt = analyserNode.frequencyBinCount;
        const dataArrayAlt = new Uint8Array(bufferLengthAlt);

        canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

        const drawAlt = function () {
            requestAnimationFrame(drawAlt);

            analyserNode.getByteFrequencyData(dataArrayAlt);

            canvasContext.fillStyle = "rgb(255,255,255)";
            canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

            const barWidth = (WIDTH / bufferLengthAlt) * 10;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLengthAlt; i++) {
                barHeight = dataArrayAlt[i] / 2;

                canvasContext.fillStyle = "rgb(" + (barHeight + 200) + ",50,50)";
                canvasContext.fillRect(
                    x,
                    HEIGHT - barHeight / 2,
                    barWidth,
                    barHeight / 2
                );

                x += barWidth + 1;
            }
        };

        drawAlt();
    }, []);

    return (
        <div className={tw('rounded-md bg-white shadow-xl')}>
            <Handle className={tw('w-2 h-2')} type="target" position="top" />

            <p className={tw('rounded-t-md px-2 py-1 bg-blue-500 text-white text-sm')}>Analyser2</p>

            <label className={tw('flex flex-col px-2 py-1')}>
                <p className={tw('text-xs font-bold mb-2')}>Frequency</p>
                <canvas className={tw('border border-blue-500')} ref={canvasRef} />
            </label>

            <Handle className={tw('w-2 h-2')} type="source" position="bottom" />
        </div>
    );
}
