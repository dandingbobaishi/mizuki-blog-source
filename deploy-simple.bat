@echo off
echo ========================================
echo   Mizuki Blog - Simple Deploy
echo ========================================
echo.

cd /d "%~dp0"

if not exist "package.json" (
    echo [Error] Not in mizuki directory
    pause
    exit /b 1
)

echo [Step 1/3] Adding files...
git add .

echo.
echo [Step 2/3] Committing...
git commit -m "Update: %date% %time%"

echo.
echo [Step 3/3] Pushing to GitHub...
git push origin master

if errorlevel 1 (
    echo.
    echo [Info] Trying main branch...
    git push origin main
)

echo.
echo ========================================
echo   Done! Check: 
echo   https://github.com/dandingbobaishi
echo ========================================
pause
