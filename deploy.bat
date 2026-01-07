@echo off
echo ========================================
echo   Mizuki Blog Deployment Script
echo ========================================
echo.

REM Check if in mizuki directory
if not exist "package.json" (
    echo [Error] Please run this script in mizuki directory
    pause
    exit /b 1
)

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [Error] Git not detected, please install Git first
    echo Download: https://git-scm.com/download/win
    pause
    exit /b 1
)

REM Check for uncommitted changes
git status --short >nul 2>&1
if errorlevel 1 (
    echo [Info] Git repository not initialized
    echo.
    set /p init="Initialize Git repository? (Y/N): "
    if /i "%init%"=="Y" (
        git init
        echo [Done] Git repository initialized
    ) else (
        echo [Cancel] Deployment cancelled
        pause
        exit /b 0
    )
)

echo [1/5] Checking dependencies...
if not exist "node_modules" (
    echo [Info] First run, installing dependencies...
    echo.
    call pnpm install
    if errorlevel 1 (
        echo [Error] Dependency installation failed, trying npm...
        call npm install
        if errorlevel 1 (
            echo [Error] Dependency installation failed
            pause
            exit /b 1
        )
    )
) else (
    echo [Info] Dependencies already installed
)

echo.
echo [2/5] Building project...
echo [Info] This may take a few minutes...
echo.
call pnpm run build
if errorlevel 1 (
    echo [Error] Build failed, please check error messages
    pause
    exit /b 1
)

echo.
echo [3/5] Adding files to Git...
git add .
if errorlevel 1 (
    echo [Error] Git add failed
    pause
    exit /b 1
)

echo.
echo [4/5] Committing changes...
set commit_msg=Update blog: %date% %time%
git commit -m "%commit_msg%"
if errorlevel 1 (
    echo [Info] No changes to commit
)

echo.
echo [5/5] Pushing to GitHub...
echo [Info] Pushing to remote repository...
echo.

REM Check if remote repository is configured
git remote -v | findstr "origin" >nul
if errorlevel 1 (
    echo [Error] Remote repository not configured
    echo.
    echo Please configure remote repository first:
    echo git remote add origin https://github.com/username/repository.git
    pause
    exit /b 1
)

git push origin master
if errorlevel 1 (
    echo.
    echo [Error] Push failed, possible reasons:
    echo 1. Network connection issue
    echo 2. No push permission
    echo 3. Branch name mismatch (try main branch)
    echo.
    set /p retry="Try pushing to main branch? (Y/N): "
    if /i "%retry%"=="Y" (
        git push origin main
        if errorlevel 1 (
            echo [Error] Push to main branch also failed
            pause
            exit /b 1
        )
    ) else (
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo What happens next:
echo.
echo 1. GitHub Actions will start building automatically
echo 2. Build process takes about 2-5 minutes
echo 3. Your website will update automatically after completion
echo.
echo Related Links:
echo.
echo - Check build status: https://github.com/username/repository/actions
echo - Visit your blog: https://dandingbobaishi.github.io/
echo.
echo Tips:
echo.
echo - If website doesn't update after 5 minutes, check Actions logs
echo - Press Ctrl+Shift+R to force refresh browser cache
echo.
echo ========================================
pause
