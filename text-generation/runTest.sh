#!/bin/zsh

PATH_INPUT=./input.txt
PATH_OUTPUT_DIR=./net_test/
PATH_OUTPUT_GENERATED=./net_test/generated.txt
PATH_MODEL=./net_test/model.json
GEN_SIZE=10

echo "PATH_INPUT" $PATH_INPUT
echo "PATH_OUTPUT_DIR" $PATH_OUTPUT_DIR
echo "PATH_OUTPUT_GENERATED" $PATH_OUTPUT_GENERATED
echo "PATH_MODEL" $PATH_MODEL
echo "GEN_SIZE" $GEN_SIZE

# echo "Training network"
# yarn train $PATH_INPUT --lstmLayerSize 10,10 --epochs 10 --savePath $PATH_OUTPUT_DIR --gpu

echo "Generating data with temperature 0.1" 
echo "Generating data with temperature 0.1" >> $PATH_OUTPUT_GENERATED
yarn gen $PATH_INPUT $PATH_MODEL --genLength $GEN_SIZE --temperature 0.1 >> $PATH_OUTPUT_GENERATED

echo "Generating data with temperature 0.3" 
echo "Generating data with temperature 0.3" >> $PATH_OUTPUT_GENERATED
yarn gen $PATH_INPUT $PATH_MODEL --genLength $GEN_SIZE --temperature 0.3 >> $PATH_OUTPUT_GENERATED

echo "Generating data with temperature 0.5" 
echo "Generating data with temperature 0.5" >> $PATH_OUTPUT_GENERATED
yarn gen $PATH_INPUT $PATH_MODEL --genLength $GEN_SIZE --temperature 0.5 >> $PATH_OUTPUT_GENERATED 

echo "Generating data with temperature 0.75" 
echo "Generating data with temperature 0.75" >> $PATH_OUTPUT_GENERATED
yarn gen $PATH_INPUT $PATH_MODEL --genLength $GEN_SIZE --temperature 0.75 >> $PATH_OUTPUT_GENERATED 

echo "Generating data with temperature 0.9" 
echo "Generating data with temperature 0.9" >> $PATH_OUTPUT_GENERATED
yarn gen $PATH_INPUT $PATH_MODEL --genLength $GEN_SIZE --temperature 0.9 >> $PATH_OUTPUT_GENERATED 