import React from 'react';
import ReactFlow, { ReactFlowProvider, Background, Panel, MiniMap, Controls } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from './store';
import { tw } from 'twind';
import Analyser1 from './nodes/Analyser1';
import Analyser2 from './nodes/Analyser2';
import Convolver from './nodes/Convolver';
import BiquadFilter from './nodes/BiquadFilter';
import Source from './nodes/Source';
import Osc from './nodes/Osc';
import Gain from './nodes/Gain';
import Out from './nodes/Out';

import 'reactflow/dist/style.css';

const nodeTypes = {
  analyser2: Analyser2,
  analyser1: Analyser1,
  convolver: Convolver,
  biquadFilter: BiquadFilter,
  source: Source,
  osc: Osc,
  gain: Gain,
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
  addGain: () => store.createNode('gain'),
  addSource: () => store.createNode('source'),
  addBiquadFilter: () => store.createNode('biquadFilter'),
  addConvolver: () => store.createNode('convolver'),
  addAnalyser1: () => store.createNode('analyser1'),
  addAnalyser2: () => store.createNode('analyser2'),
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
            <button className={tw('px-2 py-1 rounded bg-white shadow')} onClick={store.addSource}>
              Add Source
            </button>
            <button className={tw('px-2 py-1 rounded bg-white shadow')} onClick={store.addOsc}>
              Add Osc
            </button>
            <button className={tw('px-2 py-1 rounded bg-white shadow')} onClick={store.addGain}>
              Add Gain
            </button>
            <button className={tw('px-2 py-1 rounded bg-white shadow')} onClick={store.addBiquadFilter}>
              Add BiquadFilter
            </button>
            <button className={tw('px-2 py-1 rounded bg-white shadow')} onClick={store.addConvolver}>
              Add Convolver
            </button>
            <button className={tw('px-2 py-1 rounded bg-white shadow')} onClick={store.addAnalyser1}>
              Add Analyser1
            </button>
            <button className={tw('px-2 py-1 rounded bg-white shadow')} onClick={store.addAnalyser2}>
              Add Analyser2
            </button>
          </Panel>
          <MiniMap />
          <Controls />
          <Background variant="cross" />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
