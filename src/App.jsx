import React from 'react';
import ReactFlow, { ReactFlowProvider, Background, Panel, useReactFlow } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from './store';
import { tw } from 'twind';
import Convolver from './nodes/Convolver';
import BiquadFilter from './nodes/BiquadFilter';
import Source from './nodes/Source';
import Osc from './nodes/Osc';
import Amp from './nodes/Amp';
import Out from './nodes/Out';

import 'reactflow/dist/style.css';

const nodeTypes = {
  convolver: Convolver,
  biquadFilter: BiquadFilter,
  source: Source,
  osc: Osc,
  amp: Amp,
  out: Out,
};

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onNodesDelete: store.onNodesDelete,
  onEdgesChange: store.onEdgesChange,
  onEdgesDelete: store.onEdgesDelete,
  addEdge: store.addEdge,
  addOsc: () => store.createNode('osc'),
  addAmp: () => store.createNode('amp'),
  addSource: () => store.createNode('source'),
  addBiquadFilter: () => store.createNode('biquadFilter'),
  addConvolver: () => store.createNode('convolver'),
});

export default function App() {
  const store = useStore(selector, shallow);
  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={store.nodes}
          edges={store.edges}
          onNodesChange={store.onNodesChange}
          onNodesDelete={store.onNodesDelete}
          onEdgesChange={store.onEdgesChange}
          onEdgesDelete={store.onEdgesDelete}
          onConnect={store.addEdge}
          fitView
        >
          <Panel className={tw('space-x-4')} position="top-right">
            <button className={tw('px-2 py-1 rounded bg-white shadow')} onClick={store.addOsc}>
              Add Osc
            </button>
            <button className={tw('px-2 py-1 rounded bg-white shadow')} onClick={store.addAmp}>
              Add Amp
            </button>
            <button className={tw('px-2 py-1 rounded bg-white shadow')} onClick={store.addSource}>
              Add Source
            </button>
            <button className={tw('px-2 py-1 rounded bg-white shadow')} onClick={store.addBiquadFilter}>
              Add BiquadFilter
            </button>
            <button className={tw('px-2 py-1 rounded bg-white shadow')} onClick={store.addConvolver}>
              Add Convolver
            </button>
          </Panel>
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
