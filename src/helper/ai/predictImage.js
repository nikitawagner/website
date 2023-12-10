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
        .resizeNearestNeighbor([128, 128]) // Resize the image to 128x128
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims();

    let predictions = await model.predict(tensor).data();
    let topPrediction = Array.from(predictions);

    // La somme les probabilités des 14 premières classes
    let probAutre = topPrediction
        .filter((p, i) => i != 6 && i != 13)
        .reduce((a, b) => a + b, 0);
    let labelAutre = "something else";

    let probChouFleur = topPrediction[6];
    let labelChouFleur = "a Cauliflower";

    let probTournesol = topPrediction[13];
    let labelTournesol = "a Sunflower";

    let probMax = Math.max(probAutre, probChouFleur, probTournesol);
    let labelMax =
        probMax == probAutre
            ? labelAutre
            : probMax == probChouFleur
              ? labelChouFleur
              : labelTournesol;

    return {
        name: labelMax,
        percentage: Math.floor(probMax * 100) / 100
    };
};

const loadModel = async () => {
    if (!model) {
        model = await tf.loadLayersModel(modelPath);
    }
};
