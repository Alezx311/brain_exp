#!/bin/zsh

DESC=Poetry
PATH_INPUT=./poetry.txt
PATH_OUTPUT_DIR=./poetry/
PATH_OUTPUT_GENERATED=./poetry/generated.txt
PATH_MODEL=./poetry/model.json
GEN_SIZE=1000
GEN_SIZE_LARGE=10000

echo "DESC" $DESC
echo "PATH_INPUT" $PATH_INPUT
echo "PATH_OUTPUT_DIR" $PATH_OUTPUT_DIR
echo "PATH_OUTPUT_GENERATED" $PATH_OUTPUT_GENERATED
echo "PATH_MODEL" $PATH_MODEL
echo "GEN_SIZE" $GEN_SIZE
echo "GEN_SIZE_LARGE" $GEN_SIZE_LARGE

# echo "Training network"
# yarn train $PATH_INPUT --lstmLayerSize 256,256 --epochs 200 --savePath $PATH_OUTPUT_DIR --gpu
# echo "Training network success!"


echo "Generating data with default temperature" >> $PATH_OUTPUT_GENERATED
yarn gen $PATH_INPUT $PATH_MODEL --genLength $GEN_SIZE >> $PATH_OUTPUT_GENERATED

echo "Generating data with temperature 0.1" >> $PATH_OUTPUT_GENERATED
yarn gen $PATH_INPUT $PATH_MODEL --genLength $GEN_SIZE --temperature 0.1 >> $PATH_OUTPUT_GENERATED
echo "Generating data with temperature 0.3" >> $PATH_OUTPUT_GENERATED
yarn gen $PATH_INPUT $PATH_MODEL --genLength $GEN_SIZE --temperature 0.3 >> $PATH_OUTPUT_GENERATED
echo "Generating data with temperature 0.5" >> $PATH_OUTPUT_GENERATED
yarn gen $PATH_INPUT $PATH_MODEL --genLength $GEN_SIZE --temperature 0.5 >> $PATH_OUTPUT_GENERATED 
echo "Generating data with temperature 0.75" >> $PATH_OUTPUT_GENERATED
yarn gen $PATH_INPUT $PATH_MODEL --genLength $GEN_SIZE --temperature 0.75 >> $PATH_OUTPUT_GENERATED 
echo "Generating data with temperature 0.9" >> $PATH_OUTPUT_GENERATED
yarn gen $PATH_INPUT $PATH_MODEL --genLength $GEN_SIZE --temperature 0.9 >> $PATH_OUTPUT_GENERATED 

echo "Generating large amount of data" >> $PATH_OUTPUT_GENERATED
yarn gen $PATH_INPUT $PATH_MODEL --genLength $GEN_SIZE_LARGE >> $PATH_OUTPUT_GENERATED

echo "Generating data success!"