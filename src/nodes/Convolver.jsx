import React from 'react';
import { Handle } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { tw } from 'twind';
import { useStore } from '../store';

const selector = (id) => (store) => ({
    setName: (e) => store.updateNode(id, { name: e.target.value }),
});

export default function Convolver({ id, data }) {
    const { setName } = useStore(selector(id), shallow);

    return (
        <div className={tw('rounded-md bg-white shadow-xl')}>
            <Handle className={tw('w-2 h-2')} type="target" position="top" />

            <p className={tw('rounded-t-md px-2 py-1 bg-pink-500 text-white text-sm')}>Convolver</p>

            <label className={tw('flex flex-col px-2 pt-1 pb-4')}>
                <p className={tw('text-xs font-bold mb-2')}>Buffer</p>
                <select className="nodrag" value={data.name} onChange={setName}>
                    <option value="impulse1">电话</option>
                    <option value="impulse2">厨房</option>
                </select>
            </label>

            <Handle className={tw('w-2 h-2')} type="source" position="bottom" />
        </div>
    );
}
