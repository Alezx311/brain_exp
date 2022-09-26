#!/bin/zsh

#? <----- Settings ------------>
TITLE=ukrainian_poetry_short
INPUT=./$TITLE.txt
OUTPUT_DIR=./$TITLE_$LAYERS/
MODEL=$OUTPUT_DIR/model.json
OUTPUT_FILE=$OUTPUT_DIR/$TITLE_generated_$LAYERS.txt
LAYERS=256
EPOCHS=100
GENERATE_SIZE_SMALL=1000
GENERATE_SIZE=10000

#? <----- Log Environment ----->
echo "TITLE" $TITLE
echo "INPUT" $INPUT
echo "OUTPUT_DIR" $OUTPUT_DIR
echo "OUTPUT_FILE" $OUTPUT_FILE
echo "MODEL" $MODEL
echo "LAYERS" $LAYERS
echo "EPOCHS" $EPOCHS
echo "GENERATE_SIZE_SMALL" $GENERATE_SIZE_SMALL
echo "GENERATE_SIZE" $GENERATE_SIZE

#? <----- Training Network ----->
echo "Training network..."
yarn train $INPUT --lstmLayerSize $LAYERS,$LAYERS --epochs $EPOCHS --savePath $OUTPUT_DIR
echo "Training network success!"

#? <----- Generating Data ------>
echo "Generating data with default temperature..."
yarn gen $INPUT $MODEL --genLength $GENERATE_SIZE >> $OUTPUT_FILE
echo "Generating data with default temperature success"

# echo "Generating data with temperature 0.1..."
# echo "Generating data with temperature 0.1..." >> $OUTPUT_FILE
# yarn gen $INPUT $MODEL --genLength $GENERATE_SIZE_SMALL --temperature 0.1 >> $OUTPUT_FILE
# echo "Generating data with temperature 0.1 success!"

# echo "Generating data with temperature 0.3..."
# echo "Generating data with temperature 0.3..." >> $OUTPUT_FILE
# yarn gen $INPUT $MODEL --genLength $GENERATE_SIZE_SMALL --temperature 0.3 >> $OUTPUT_FILE
# echo "Generating data with temperature 0.3 success!"

# echo "Generating data with temperature 0.5..."
# echo "Generating data with temperature 0.5..." >> $OUTPUT_FILE
# yarn gen $INPUT $MODEL --genLength $GENERATE_SIZE_SMALL --temperature 0.5 >> $OUTPUT_FILE 
# echo "Generating data with temperature 0.5 success!"

# echo "Generating data with temperature 0.7...5"
# echo "Generating data with temperature 0.7...5" >> $OUTPUT_FILE
# yarn gen $INPUT $MODEL --genLength $GENERATE_SIZE_SMALL --temperature 0.75 >> $OUTPUT_FILE 
# echo "Generating data with temperature 0.75 success!"

# echo "Generating data with temperature 0.9..."
# echo "Generating data with temperature 0.9..." >> $OUTPUT_FILE
# yarn gen $INPUT $MODEL --genLength $GENERATE_SIZE_SMALL --temperature 0.9 >> $OUTPUT_FILE 
# echo "Generating data with temperature 0.9 success!"

echo "Generating data finished!"


# --sampleLen SAMPLELEN
#   Sample length: Length of each input sequence to the model, in number of characters.
# --sampleStep SAMPLESTEP
#   Step length: how many characters to skip between one example extracted from the text
#   data to the next.
# --learningRate LEARNINGRATE
#   Learning rate to be used during training
# --epochs EPOCHS       Number of training epochs
# --examplesPerEpoch EXAMPLESPEREPOCH
#   Number of examples to sample from the text in each training epoch.
# --batchSize BATCHSIZE
#   Batch size for training.
# --validationSplit VALIDATIONSPLIT
#   Validation split for training.
# --displayLength DISPLAYLENGTH
#   Length of the sampled text to display after each epoch of training.
# --savePath SAVEPATH   Path to which the model will be saved (optional)
# --lstmLayerSize LSTMLAYERSIZE
#   LSTM layer size. Can be a single number or an array of numbers separated by commas
#   (E.g., "256", "256,128")