@echo off
echo Enter your commit message in English:
set /p commit_msg="> "

echo.
echo Adding changes...
git add .

echo.
echo Creating commit...
git commit -m "%commit_msg%"

echo.
echo Pushing to personal repository...
git push origin main

echo.
echo Pushing to company repository...
git subtree push --prefix=. empresa hotel-api/main

echo.
echo Done!
