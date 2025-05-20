@echo off
echo Please enter your GitHub Token:
set /p token="> "
git remote add empresa "https://x-access-token:%token%@github.com/Digital-Travel/ARN-Docs.git"
echo Remote added successfully!
pause
