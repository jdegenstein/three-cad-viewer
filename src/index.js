import { Display } from './display.js';
import { Viewer } from './viewer.js';

// BEGIN loading and temp conversion

import { example as box } from './examples/box.js';
import { example as box1 } from './examples/box1.js';
import { example as boxes } from './examples/boxes.js';
import { example as hexapod } from './examples/hexapod.js';

function load(assembly) {

    function convertAssembly(assembly) {
        const delim = "/";
        var states = {};

        function _convertAssembly(subAssembly, path) {
            const newPath = `${path}${delim}${subAssembly.name}`;
            var result = {
                name: subAssembly.name,
                id: newPath
            };
            if (subAssembly.parts) {
                result.parts = [];
                result.loc = subAssembly.loc;
                for (var part of subAssembly.parts) {
                    result.parts.push(_convertAssembly(part, newPath));
                }
            } else {
                result.type = subAssembly.type;
                result.shape = subAssembly.shape;
                result.color = subAssembly.color;
                states[newPath] = [1, 1];
            }
            return result;
        }
        return [_convertAssembly(assembly, ""), states];
    }
    return convertAssembly(assembly.shapes)
}
//END loading and temp conversion

const [shapes, states] = load(hexapod);

const options = {
    ortho: false,
    normalLen: 0,
    cadWidth: 640,
    height: 480,
    treeWidth: 250,
};

const container = document.getElementById("cad_view_001")
const display = new Display(container);
const viewer = new Viewer(display, options);
viewer.render(shapes, states);

// DEBUG stuff
global.viewer = viewer
global.states = states
