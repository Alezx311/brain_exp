#!/bin/bash

# проверяем, что передан параметр в скрипт
if [ -z "$1" ]; then
  echo "Файл не указан. Использование: ./script.sh /path/to/file.txt"
  exit 1
fi

# проверяем, что указанный файл существует
if [ ! -f "$1" ]; then
  echo "Файл не найден. Использование: ./script.sh /path/to/file.txt"
  exit 1
fi

# создаем пустой файл статистики и массив для хранения данных
stats_file="stats.json"
echo '{}' >"$stats_file"
declare -a stats_data=()

# читаем текстовый файл, обрабатываем каждое слово
while IFS= read -r word; do
  echo $word
  # удаляем знаки препинания с начала и конца слова
  word=$(echo "${word#"${word%%[![:punct:]]*}"}")
  word=$(echo "${word%"${word##*[![:punct:]]}"}")

  # пропускаем пустые слова и числа
  if [[ -z $word || $word =~ ^[0-9]+$ ]]; then
    continue
  fi

  # word="${word,,}"
  # конвертируем слово в нижний регистр для унификации
  word=$(echo "$word" | tr '[:upper:]' '[:lower:]')
  # обновляем данные статистики
  if [[ -z stats_data[$word] ]]; then
    stats_data[$word]=$((stats_data[$word] + 1))
  else
    stats_data[$word]=1
  fi
done <"$1"

# записываем данные статистики в файл
json_data="{"
is_first=true
for key in "${!stats_data[@]}"; do
  if [ $is_first = true ]; then
    json_data+="\"$key\":${stats_data[$key]}"
    is_first=false
  else
    json_data+=",\"$key\":${stats_data[$key]}"
  fi

done

json_data+="}"

echo "$json_data" >"$stats_file"
echo "Статистика сохранена в файл: $stats_file"
