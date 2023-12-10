import * as tf from "@tensorflow/tfjs";

const modelPath = "/projects/ai/model/model.json";
let model;

export const predictImage = async (image) => {
    await loadModel();

    if (!model) {
        console.error("Model not loaded.");
        return;
    }

    const tensor = tf.browser
        .fromPixels(image)
        .resizeNearestNeighbor([128, 128])
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims();

    const predictions = await model.predict(tensor).data();
    let topPrediction = Array.from(predictions);

    topPrediction = topPrediction.map((p) => Math.max(p, 0));
    const sum = topPrediction.reduce((a, b) => a + b, 0);
    topPrediction = topPrediction.map((p) => p / sum);

    const PredictedProb = Math.max(...topPrediction);
    const PredictedLabel = ["Autre", "Chou-Fleur", "Tournesols"][
        topPrediction.indexOf(PredictedProb)
    ];

    return {
        name: PredictedLabel,
        percentage: Math.floor(PredictedProb * 100) / 100
    };
};

const loadModel = async () => {
    if (!model) {
        model = await tf.loadLayersModel(modelPath);
    }
};
