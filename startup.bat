@echo off
rem Start the server
start cmd /k "cd /d E:\Learning\5th-Course\Prog\Meetr\event-app\server && node index.js"

rem Start the client
start cmd /k "cd /d E:\Learning\5th-Course\Prog\Meetr\event-app\client && npm start"

rem Exit this batch script
exit
