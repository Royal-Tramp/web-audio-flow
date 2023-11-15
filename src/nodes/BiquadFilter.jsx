import React from 'react';
import { Handle } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { tw } from 'twind';
import { useStore } from '../store';

const selector = (id) => (store) => ({
    setType: (e) => store.updateNode(id, { type: e.target.value }),
    setFrequency: (e) => store.updateNode(id, { frequency: e.target.value }),
    setGain: (e) => store.updateNode(id, { gain: e.target.value }),
});

export default function BiquadFilter({ id, data }) {
    const { setType, setFrequency, setGain } = useStore(selector(id), shallow);

    return (
        <div className={tw('rounded-md bg-white shadow-xl')}>
            <Handle className={tw('w-2 h-2')} type="target" position="top" />

            <p className={tw('rounded-t-md px-2 py-1 bg-pink-500 text-white text-sm')}>BiquadFilter</p>

            <label className={tw('flex flex-col px-2 pt-1 pb-4')}>
                <p className={tw('text-xs font-bold mb-2')}>Type</p>
                <select className="nodrag" value={data.type} onChange={setType}>
                    <option value="lowpass">lowpass</option>
                    <option value="highpass">highpass</option>
                    <option value="bandpass">bandpass</option>
                    <option value="lowshelf">lowshelf</option>
                    <option value="highshelf">highshelf</option>
                    <option value="peaking">peaking</option>
                    <option value="notch">notch</option>
                    <option value="allpass">allpass</option>
                </select>
            </label>

            <hr className={tw('border-gray-200 mx-2')} />

            <label className={tw('flex flex-col px-2 py-1')}>
                <p className={tw('text-xs font-bold mb-2')}>Frequency</p>
                <input
                    className="nodrag"
                    type="range"
                    min="0"
                    max="1000"
                    step="1"
                    value={data.frequency}
                    onChange={setFrequency}
                />
                <p className={tw('text-right text-xs')}>{data.frequency}</p>
            </label>

            <hr className={tw('border-gray-200 mx-2')} />

            <label className={tw('flex flex-col px-2 py-1')}>
                <p className={tw('text-xs font-bold mb-2')}>Gain</p>
                <input
                    className="nodrag"
                    type="range"
                    min="-100"
                    max="100"
                    step="1"
                    value={data.gain}
                    onChange={setGain}
                />
                <p className={tw('text-right text-xs')}>{data.gain}</p>
            </label>

            <Handle className={tw('w-2 h-2')} type="source" position="bottom" />
        </div>
    );
}
