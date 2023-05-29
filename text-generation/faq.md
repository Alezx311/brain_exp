# Examples

```bash

#!/bin/zsh

#? <----- Settings ----->
TITLE=ukrainian_poetry # <--- name of file without .txt
LAYERS=512
EPOCHS=300
SIZE_SMALL=100 # <--- Generate data with custom temperature size
SIZE_LARGE=1000 # <--- Generate data with default temperature size
INPUT_FILE=./inputs/$TITLE.txt # <--- File with training text
OUTPUT_DIR=./output/$TITLE
OUTPUT_MODEL=$OUTPUT_DIR/model.json
OUTPUT_FILE=$OUTPUT_DIR/$LAYERS_$EPOCHS.txt # <--- Output file

#? <----- Recreate folder ----->
rm -rf $OUTPUT_DIR
mkdir $OUTPUT_DIR
#? <----- Recreate file ----->
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

#? <----- Training network ----->
cowsay "Training..."
yarn train $INPUT_FILE --lstmLayerSize $LAYERS --epochs $EPOCHS --savePath $OUTPUT_DIR

#? <----- Generating ------>
cowsay "Generating..."
echo "Generating data with default temperature..." | cowsay >>$OUTPUT_FILE
yarn gen $INPUT_FILE $OUTPUT_MODEL --genLength $SIZE_LARGE >>$OUTPUT_FILE
cowsay "Generating finished!"
```
