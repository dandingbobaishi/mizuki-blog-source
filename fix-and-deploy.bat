@echo off
echo ========================================
echo   Fix and Deploy Script
echo ========================================
echo.

cd /d "%~dp0"

echo [Step 1/4] Backup old workflow...
if exist ".github\workflows\deploy.yml" (
    ren ".github\workflows\deploy.yml" "deploy.yml.backup"
    echo Old workflow backed up
)

echo.
echo [Step 2/4] Use simple workflow...
if exist ".github\workflows\deploy-simple.yml" (
    echo Simple workflow is ready
) else (
    echo ERROR: deploy-simple.yml not found
    pause
    exit /b 1
)

echo.
echo [Step 3/4] Commit changes...
git add .
git commit -m "Fix: Use simple deployment workflow"

echo.
echo [Step 4/4] Push to GitHub...
git push origin master

echo.
echo ========================================
echo   Done!
echo ========================================
echo.
echo Next steps:
echo 1. Go to your repo Settings - Pages
echo 2. Set Source to: Deploy from a branch
echo 3. Set Branch to: gh-pages
echo 4. Wait 2-5 minutes
echo 5. Visit: https://username.github.io/repo-name/
echo.
pause
