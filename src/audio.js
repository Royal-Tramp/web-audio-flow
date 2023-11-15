const context = new AudioContext();
const nodes = new Map();
const MUSIC_MAP = {
    'music1': '/obj_wo3DlMOGwrbDjj7DisKw_31146534910_3169_1031_756f_e801284743c4cd4667f180a3265dd7e5.mp3',
    'music2': '/obj_wo3DlMOGwrbDjj7DisKw_31392207488_5a80_7ec9_917b_0a8eb3012e629435dcdf6db9810ee929.mp3',
};
const IMPULSE_MAP = {
    'impulse1': '/filter-telephone.wav',
}

context.suspend();
nodes.set('output', context.destination);

export function isRunning() {
    return context.state === 'running';
}

export function toggleAudio() {
    return isRunning() ? context.suspend() : context.resume();
}

export async function createAudioNode(id, type, data) {
    switch (type) {
        case 'osc': {
            const node = context.createOscillator();
            node.frequency.value = data.frequency;
            node.type = data.type;
            node.start();

            nodes.set(id, node);
            break;
        }

        case 'amp': {
            const node = context.createGain();
            node.gain.value = data.gain;

            nodes.set(id, node);
            break;
        }

        case 'source': {
            const url = MUSIC_MAP[data.name];
            const musicArrayBuffer = await fetch(url).then(res => res.arrayBuffer());
            const decodedAudioData = await context.decodeAudioData(musicArrayBuffer);
            const node = context.createBufferSource();
            node.buffer = decodedAudioData;
            node.playbackRate.value = 1;
            node.start();

            nodes.set(id, node);
            break;
        }

        case 'biquadFilter': {
            const node = context.createBiquadFilter();
            node.type = data.type;
            node.frequency.value = data.frequency;
            node.Q.value = data.Q;
            node.gain.value = data.gain;

            nodes.set(id, node);
            break;
        }

        case 'convolver': {
            const url = IMPULSE_MAP[data.name];
            const impulseArrayBuffer = await fetch(url).then(res => res.arrayBuffer());
            const decodedAudioData = await context.decodeAudioData(impulseArrayBuffer);
            const node = context.createConvolver();
            node.buffer = decodedAudioData;

            nodes.set(id, node);
            break;
        }
    }
}

export async function updateAudioNode(id, data) {
    const node = nodes.get(id);
    for (const [key, val] of Object.entries(data)) {
        if (node[key] instanceof AudioParam) {
            node[key].value = val;
        } else {
            node[key] = val;
        }
    }
}

export function removeAudioNode(id) {
    const node = nodes.get(id);

    node.disconnect();
    node.stop?.();

    nodes.delete(id);
}

export function connect(sourceId, targetId) {
    const source = nodes.get(sourceId);
    const target = nodes.get(targetId);

    source.connect(target);
}

export function disconnect(sourceId, targetId) {
    const source = nodes.get(sourceId);
    const target = nodes.get(targetId);

    source.disconnect(target);
}
