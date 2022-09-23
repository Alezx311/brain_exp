#!/bin/zsh

PATH_INPUT=./ukrainian_poetry.txt
PATH_OUTPUT_DIR=./ukrainian_poetry_512/
PATH_OUTPUT_GENERATED=./ukrainian_poetry_512/generated.txt
PATH_MODEL=./ukrainian_poetry_512/model.json
GEN_SIZE=1000
GEN_SIZE_LARGE=10000

echo "PATH_INPUT" $PATH_INPUT
echo "PATH_OUTPUT_DIR" $PATH_OUTPUT_DIR
echo "PATH_OUTPUT_GENERATED" $PATH_OUTPUT_GENERATED
echo "PATH_MODEL" $PATH_MODEL
echo "GEN_SIZE" $GEN_SIZE
echo "GEN_SIZE_LARGE" $GEN_SIZE_LARGE

echo "Training network"
yarn train $PATH_INPUT --lstmLayerSize 512,512 --epochs 300 --savePath $PATH_OUTPUT_DIR --gpu
echo "Training network success!"

echo "Generating data with default temperature" >> $PATH_OUTPUT_GENERATED
yarn gen $PATH_INPUT $PATH_MODEL --genLength $GEN_SIZE_LARGE >> $PATH_OUTPUT_GENERATED

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

echo "Generating data success!"
