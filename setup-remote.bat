@echo off
echo Please enter your PERSONAL GitHub Token:
set /p personal_token="> "
git remote add origin "https://x-access-token:%personal_token%@github.com/vieitas/arn-api-hotel.git"

echo.
echo Please enter your COMPANY GitHub Token (with SSO):
set /p company_token="> "
git remote add empresa "https://x-access-token:%company_token%@github.com/Digital-Travel/ARN-Docs.git"

echo Remote repositories added successfully!
pause
