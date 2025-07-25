# 테트리스 해커 도구 - PowerShell 버전
# 스코어, 라인, 레벨을 99999로 만드는 도구

Write-Host @"
 ████████╗███████╗████████╗██████╗ ██╗███████╗    ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ 
 ╚══██╔══╝██╔════╝╚══██╔══╝██╔══██╗██║██╔════╝    ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
    ██║   █████╗     ██║   ██████╔╝██║███████╗    ███████║███████║██║     █████╔╝ █████╗  ██████╔╝
    ██║   ██╔══╝     ██║   ██╔══██╗██║╚════██║    ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
    ██║   ███████╗   ██║   ██║  ██║██║███████║    ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
    ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
"@ -ForegroundColor Green

Write-Host "`n스코어, 라인, 레벨을 99999로 만드는 도구" -ForegroundColor Yellow
Write-Host "=====================================`n" -ForegroundColor Yellow

# 현재 스크립트 위치 확인
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$indexPath = Join-Path $scriptPath "index.html"

Write-Host "[INFO] 웹 인터페이스를 시작합니다..." -ForegroundColor Cyan

# index.html 파일 존재 확인
if (Test-Path $indexPath) {
    Write-Host "[INFO] index.html 파일을 찾았습니다." -ForegroundColor Green
    Write-Host "[INFO] 기본 브라우저에서 파일을 열고 있습니다..." -ForegroundColor Cyan
    
    # 기본 브라우저로 index.html 열기
    Start-Process $indexPath
    
    Write-Host "[SUCCESS] 브라우저에서 테트리스 해커 도구가 열렸습니다!" -ForegroundColor Green
} else {
    Write-Host "[ERROR] index.html 파일을 찾을 수 없습니다." -ForegroundColor Red
    Write-Host "[INFO] 현재 위치: $scriptPath" -ForegroundColor Yellow
}

Write-Host "`n사용법:" -ForegroundColor Yellow
Write-Host "1. 브라우저에서 열린 페이지의 안내를 따르세요" -ForegroundColor White
Write-Host "2. 테트리스 게임 페이지로 이동하세요" -ForegroundColor White
Write-Host "3. 해킹 스크립트를 실행하세요" -ForegroundColor White

Write-Host "`n추가 옵션:" -ForegroundColor Yellow
Write-Host "G - 게임 페이지 직접 열기" -ForegroundColor White
Write-Host "S - 스크립트 파일 보기" -ForegroundColor White
Write-Host "Q - 종료" -ForegroundColor White

do {
    Write-Host "`n선택하세요 (G/S/Q): " -ForegroundColor Cyan -NoNewline
    $choice = Read-Host
    
    switch ($choice.ToUpper()) {
        'G' {
            Write-Host "[INFO] 테트리스 게임 페이지를 열고 있습니다..." -ForegroundColor Cyan
            Start-Process "https://codenamex0.github.io/Tetris"
            Write-Host "[SUCCESS] 게임 페이지가 열렸습니다!" -ForegroundColor Green
        }
        'S' {
            $scriptFile = Join-Path $scriptPath "tetris-hacker.js"
            if (Test-Path $scriptFile) {
                Write-Host "[INFO] 스크립트 파일을 메모장에서 열고 있습니다..." -ForegroundColor Cyan
                notepad $scriptFile
            } else {
                Write-Host "[ERROR] tetris-hacker.js 파일을 찾을 수 없습니다." -ForegroundColor Red
            }
        }
        'Q' {
            Write-Host "[INFO] 프로그램을 종료합니다." -ForegroundColor Yellow
            break
        }
        default {
            Write-Host "[WARNING] 잘못된 선택입니다. G, S, 또는 Q를 입력하세요." -ForegroundColor Red
        }
    }
} while ($choice.ToUpper() -ne 'Q')

Write-Host "`n해킹을 즐기세요! 🎮" -ForegroundColor Green
