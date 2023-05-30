#!/bin/zsh

# yarn gen inputs/ukrainian_poetry.txt --genLength 10000 > output/ukrainian_poetry/300.txt

#? <----- Settings ------------>
# TITLE=lorem
TITLE=ukrainian_poetry
LAYERS=512
EPOCHS=300
SIZE_SMALL=100
SIZE_LARGE=1000
INPUT_FILE=./inputs/$TITLE.txt
OUTPUT_DIR=./output/$TITLE
OUTPUT_MODEL=$OUTPUT_DIR/model.json
OUTPUT_FILE=$OUTPUT_DIR/$LAYERS_$EPOCHS.txt

#? Recreate folder and files
rm -rf $OUTPUT_DIR
mkdir $OUTPUT_DIR
echo "
########## Stats ##########
  TITLE: $TITLE
  LAYERS: $LAYERS
  EPOCHS: $EPOCHS
  INPUT_FILE: $INPUT_FILE
  OUTPUT_DIR: $OUTPUT_DIR
  OUTPUT_MODEL: $OUTPUT_MODEL
  OUTPUT_FILE: $OUTPUT_FILE
  GENERATE_SIZE_SMALL: $GENERATE_SIZE_SMALL
  GENERATE_SIZE_LARGE: $GENERATE_SIZE_LARGE
###########################
" >$OUTPUT_FILE

#? <----- Training ----->
cowsay "Training..."
yarn train $INPUT_FILE \
  --lstmLayerSize $LAYERS \
  --epochs $EPOCHS \
  --savePath $OUTPUT_DIR

#? <----- Generating ------>
cowsay "Generating data with default temperature..."
echo "Generating data with default temperature..." | cowsay >>$OUTPUT_FILE
yarn gen $INPUT_FILE $OUTPUT_MODEL \
  --genLength $SIZE_LARGE >>$OUTPUT_FILE

cowsay "Generating data with temperature 0.1..."
echo "Generating data with temperature 0.1..." | cowsay >>$OUTPUT_FILE
yarn gen $INPUT_FILE $OUTPUT_MODEL \
  --genLength $SIZE_SMALL \
  --temperature 0.1 >>$OUTPUT_FILE

cowsay "Generating data with temperature 0.3..."
echo "Generating data with temperature 0.3..." | cowsay >>$OUTPUT_FILE
yarn gen $INPUT_FILE $OUTPUT_MODEL \
  --genLength $SIZE_SMALL \
  --temperature 0.3 >>$OUTPUT_FILE

cowsay "Generating data with temperature 0.6..."
echo "Generating data with temperature 0.6..." | cowsay >>$OUTPUT_FILE
yarn gen $INPUT_FILE $OUTPUT_MODEL \
  --genLength $SIZE_SMALL \
  --temperature 0.6 >>$OUTPUT_FILE

cowsay "Generating data with temperature 0.9..."
echo "Generating data with temperature 0.9..." | cowsay >>$OUTPUT_FILE
yarn gen $INPUT_FILE $OUTPUT_MODEL \
  --genLength $SIZE_SMALL \
  --temperature 0.9 >>$OUTPUT_FILE

cowsay "Generating finished!"
