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

export default function Analyser1({ id, data }) {
    const { getNode } = useStore(selector(id), shallow);
    const canvasRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext("2d");
        const WIDTH = canvas.width = 200;
        const HEIGHT = canvas.height = 60;

        const analyserNode = getNode();
        const bufferLength = analyserNode.fftSize;
        const dataArray = new Uint8Array(bufferLength);

        canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

        const draw = function () {
            requestAnimationFrame(draw);

            analyserNode.getByteTimeDomainData(dataArray);

            canvasContext.fillStyle = "rgb(255, 255, 255)";
            canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

            canvasContext.lineWidth = 2;
            canvasContext.strokeStyle = "rgb(0, 0, 0)";

            canvasContext.beginPath();

            const sliceWidth = (WIDTH * 1.0) / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
            let v = dataArray[i] / 128.0;
            let y = (v * HEIGHT) / 2;

            if (i === 0) {
                canvasContext.moveTo(x, y);
            } else {
                canvasContext.lineTo(x, y);
            }

            x += sliceWidth;
            }

            canvasContext.lineTo(canvas.width, canvas.height / 2);
            canvasContext.stroke();
        };

        draw();
    }, []);

    return (
        <div className={tw('rounded-md bg-white shadow-xl')}>
            <Handle className={tw('w-2 h-2')} type="target" position="top" />

            <p className={tw('rounded-t-md px-2 py-1 bg-blue-500 text-white text-sm')}>Analyser</p>

            <label className={tw('flex flex-col px-2 py-1')}>
                <p className={tw('text-xs font-bold mb-2')}>TimeDomain</p>
                <canvas className={tw('border border-blue-500')} ref={canvasRef} />
            </label>

            <Handle className={tw('w-2 h-2')} type="source" position="bottom" />
        </div>
    );
}
