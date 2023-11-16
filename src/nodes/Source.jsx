import React from 'react';
import { Handle } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { tw } from 'twind';
import { useStore } from '../store';

const selector = (id) => (store) => ({
    setPlaybackRate: (e) => store.updateNode(id, { playbackRate: e.target.value }),
    setMuisc: (e) => store.updateNode(id, { name: e.target.value }),
});

export default function Source({ id, data }) {
    const { setPlaybackRate, setMuisc } = useStore(selector(id), shallow);

    return (
        <div className={tw('rounded-md bg-white shadow-xl')}>
            <p className={tw('rounded-t-md px-2 py-1 bg-pink-500 text-white text-sm')}>Source</p>

            <label className={tw('flex flex-col px-2 py-1')}>
                <p className={tw('text-xs font-bold mb-2')}>PlaybackRate</p>
                <input
                    className="nodrag"
                    type="range"
                    min="0"
                    max="2"
                    step="0.01"
                    value={data.playbackRate}
                    onChange={setPlaybackRate}
                />
                <p className={tw('text-right text-xs')}>{data.playbackRate}</p>
            </label>

            <hr className={tw('border-gray-200 mx-2')} />

            <label className={tw('flex flex-col px-2 pt-1 pb-4')}>
                <p className={tw('text-xs font-bold mb-2')}>Music</p>
                <select className="nodrag" value={data.name} onChange={setMuisc}>
                    <option value="music1">海阔天空</option>
                </select>
            </label>

            <Handle className={tw('w-2 h-2')} type="source" position="bottom" />
        </div>
    );
}
