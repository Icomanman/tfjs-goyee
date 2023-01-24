
const src = 'https://storage.googleapis.com/jmstore/TensorFlowJS/Edx/SavedModels/sqftToPropertyPrice/model.json';
let model = undefined;

async function loadModel(){
    model=await tf.loadLayerModel(src);
}