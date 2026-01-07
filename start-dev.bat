@echo off
echo ========================================
echo   Mizuki 博客开发服务器启动脚本
echo ========================================
echo.

REM 检查是否在 mizuki 目录
if not exist "package.json" (
    echo [错误] 请在 mizuki 目录下运行此脚本
    pause
    exit /b 1
)

echo [1/3] 检查依赖...
if not exist "node_modules" (
    echo [提示] 首次运行，正在安装依赖...
    echo.
    call npm install
    if errorlevel 1 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
) else (
    echo [提示] 依赖已安装
)

echo.
echo [2/3] 启动开发服务器...
echo.
echo ========================================
echo   服务器启动中，请稍候...
echo   访问地址: http://localhost:4321
echo   按 Ctrl+C 停止服务器
echo ========================================
echo.

REM 启动开发服务器
call npm run dev

pause
