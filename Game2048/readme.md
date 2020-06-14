#2020-06-14 Version1.0

#2020-06-14 Version1.1
1. fix one bug in Mobile: [Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive.
Solution: add string "{ passive: false }" in file main2048.js line 179 "document.addEventListener("touchmove",func(),...)"
2. reduce font-size
3. change title & header