#!/bin/zsh

# [^а-яa-z0-9\S]{1,}
# [^А-ЯA-Zа-яa-z\d\SіІ]{1,}
# [^A-ZА-Яa-zа-я0-9іІ.,\n\r\t\s\?\.\\\/!-—]{1,}

# sh stats.sh

#Создаем массив из названий файлов
# files=("$@")
files=(plain.txt)

#Создаем пустой ассоциативный массив для подсчета частоты строк и хранения ключевых слов
declare -a stats=()

#Обходим все файлы и каждую строку в них
for file in "${files[@]}"; do
    while read -r line; do
        # Если строка не пустая, и нет ее в списке уникальных строк, то добавляем ее и начинаем ее считать
        if [[ ! -z $line && -z ${stats[$line]} ]]; then
            stats[$line]=1

            #Разбиваем строку на слова и сохраняем их в массив ключевых слов обрабатываемой строки
            IFS=' ' read -ra words <<<"$line"
            for word in "${words[@]}"; do
                [[ ! -z $word ]] && ((stats["$line:$word"]++))
            done
        #Если строка уже была встречена, то увеличиваем ее частоту и обновляем ключевые слова
        elif [[ ! -z $line ]]; then
            ((stats[$line]++))
        fi
    done <"$file"
done

#Создаем новый файл с расширением .json
output_file="output_$(date +%Y%m%d%H%M%S).json"

#Сохраняем в нем данные в формате JSON
echo "{" >>"$output_file"
first_line=1
for key in "${!stats[@]}"; do
    #Разбиваем ключ на строку и ключевое слово (если есть)
    IFS=':' read -ra parts <<<"$key"
    line="${parts[0]}"
    word="${parts[1]}"

    #Если ключ не содержит слов, то просто сохраняем частоту строки
    if [[ -z $word ]]; then
        if [[ $first_line -eq 0 ]]; then
            echo "," >>"$output_file"
        fi
        first_line=0
        echo "\"$line\":${stats[$line]}" >>"$output_file"
    #Если ключ содержит слово, то сохраняем частоту строки и ключевое слово
    else
        if [[ $first_line -eq 0 ]]; then
            echo "," >>"$output_file"
        fi
        first_line=0
        echo "\"$line\":{" >>"$output_file"
        echo "\"freq\":${stats[$key]}," >>"$output_file"
        echo "\"word\":\"$word\"" >>"$output_file"
        echo "}" >>"$output_file"
    fi
done
echo "}" >>"$output_file"
