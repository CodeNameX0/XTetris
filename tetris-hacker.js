/**
 * 테트리스 해킹 도구
 * 스코어, 라인, 레벨을 모두 99999로 설정하는 도구
 * 사용법: 테트리스 게임 페이지에서 브라우저 콘솔에 이 코드를 붙여넣고 실행
 */

(function() {
    'use strict';
    
    console.log('🎮 테트리스 해커 시작!');
    
    // 게임 상태를 찾는 함수들
    function findAndModifyGameState() {
        let modified = false;
        
        // 방법 1: 전역 변수로 게임 상태 찾기
        const possibleVariables = [
            'score', 'lines', 'level',
            'gameScore', 'gameLines', 'gameLevel',
            'currentScore', 'currentLines', 'currentLevel',
            'tetris', 'game', 'tetrisGame'
        ];
        
        for (let varName of possibleVariables) {
            if (window[varName] !== undefined) {
                console.log(`발견된 변수: ${varName} = ${window[varName]}`);
                if (typeof window[varName] === 'number') {
                    window[varName] = 99999;
                    modified = true;
                }
                if (typeof window[varName] === 'object' && window[varName] !== null) {
                    // 객체 내부에서 score, lines, level 찾기
                    for (let prop in window[varName]) {
                        if (['score', 'lines', 'level'].includes(prop.toLowerCase())) {
                            console.log(`객체 속성 수정: ${varName}.${prop} = 99999`);
                            window[varName][prop] = 99999;
                            modified = true;
                        }
                    }
                }
            }
        }
        
        return modified;
    }
    
    // 방법 2: DOM 요소 직접 수정
    function modifyDOM() {
        let modified = false;
        
        // 텍스트 기반으로 score, lines, level 찾기
        const elements = document.querySelectorAll('*');
        
        for (let element of elements) {
            const text = element.textContent || element.innerText || '';
            
            // SCORE: 숫자 패턴 찾기
            if (text.match(/SCORE[:\s]*\d+/i)) {
                element.innerHTML = element.innerHTML.replace(/(\d+)(?=(?:[^<]*<[^>]*>)*[^<]*$)/, '99999');
                console.log('스코어 DOM 수정됨');
                modified = true;
            }
            
            // LINES: 숫자 패턴 찾기
            if (text.match(/LINES[:\s]*\d+/i)) {
                element.innerHTML = element.innerHTML.replace(/(\d+)(?=(?:[^<]*<[^>]*>)*[^<]*$)/, '99999');
                console.log('라인 DOM 수정됨');
                modified = true;
            }
            
            // LEVEL: 숫자 패턴 찾기
            if (text.match(/LEVEL[:\s]*\d+/i)) {
                element.innerHTML = element.innerHTML.replace(/(\d+)(?=(?:[^<]*<[^>]*>)*[^<]*$)/, '99999');
                console.log('레벨 DOM 수정됨');
                modified = true;
            }
        }
        
        return modified;
    }
    
    // 방법 3: localStorage/sessionStorage 수정
    function modifyStorage() {
        let modified = false;
        
        // localStorage 확인
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            
            if (key && (key.includes('score') || key.includes('lines') || key.includes('level'))) {
                console.log(`localStorage 수정: ${key} = 99999`);
                localStorage.setItem(key, '99999');
                modified = true;
            }
            
            // JSON 형태로 저장된 게임 상태 확인
            try {
                const parsed = JSON.parse(value);
                if (typeof parsed === 'object' && parsed !== null) {
                    let changed = false;
                    if (parsed.score !== undefined) { parsed.score = 99999; changed = true; }
                    if (parsed.lines !== undefined) { parsed.lines = 99999; changed = true; }
                    if (parsed.level !== undefined) { parsed.level = 99999; changed = true; }
                    
                    if (changed) {
                        localStorage.setItem(key, JSON.stringify(parsed));
                        console.log(`localStorage JSON 수정: ${key}`);
                        modified = true;
                    }
                }
            } catch (e) {
                // JSON이 아닌 경우 무시
            }
        }
        
        // sessionStorage도 동일하게 처리
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            const value = sessionStorage.getItem(key);
            
            if (key && (key.includes('score') || key.includes('lines') || key.includes('level'))) {
                console.log(`sessionStorage 수정: ${key} = 99999`);
                sessionStorage.setItem(key, '99999');
                modified = true;
            }
        }
        
        return modified;
    }
    
    // 방법 4: 특정 게임 엔진 패턴 감지
    function detectGameEngine() {
        // Phaser.js 감지
        if (window.Phaser || window.PIXI) {
            console.log('Phaser/PIXI 게임 엔진 감지됨');
            // Phaser 게임 오브젝트 찾기
            if (window.game && window.game.state && window.game.state.current) {
                const currentState = window.game.state.current;
                if (currentState.score !== undefined) currentState.score = 99999;
                if (currentState.lines !== undefined) currentState.lines = 99999;
                if (currentState.level !== undefined) currentState.level = 99999;
                return true;
            }
        }
        
        // React 앱 감지
        if (window.React || document.querySelector('[data-reactroot]')) {
            console.log('React 앱 감지됨');
            // React DevTools가 있다면 컴포넌트 state 수정 시도
        }
        
        return false;
    }
    
    // 실행 함수
    function executeHack() {
        console.log('🔍 게임 상태 분석 중...');
        
        let success = false;
        
        // 각 방법을 순차적으로 시도
        success |= findAndModifyGameState();
        success |= modifyDOM();
        success |= modifyStorage();
        success |= detectGameEngine();
        
        if (success) {
            console.log('✅ 해킹 완료! 스코어, 라인, 레벨이 99999로 설정되었습니다.');
            
            // 게임 화면 강제 업데이트 시도
            setTimeout(() => {
                // 일반적인 게임 이벤트 트리거
                const events = ['resize', 'focus', 'click'];
                events.forEach(eventType => {
                    window.dispatchEvent(new Event(eventType));
                });
            }, 100);
            
        } else {
            console.log('⚠️ 자동 해킹 실패. 수동 방법을 시도해보세요.');
            showManualInstructions();
        }
    }
    
    // 수동 방법 안내
    function showManualInstructions() {
        console.log(`
🔧 수동 해킹 방법:

1. 콘솔에서 다음 명령어들을 시도해보세요:
   - score = 99999
   - lines = 99999  
   - level = 99999
   - game.score = 99999 (game 객체가 있는 경우)

2. DOM 요소 직접 수정:
   document.querySelector('요소선택자').textContent = 'SCORE: 99999'

3. 개발자 도구의 Elements 탭에서 HTML을 직접 수정

4. 새로고침 후 다시 시도
        `);
    }
    
    // 지속적인 감시 및 수정
    function setupContinuousHack() {
        // DOM 변화 감지
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    // 스코어가 변경되면 다시 99999로 설정
                    setTimeout(modifyDOM, 10);
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
        
        // 주기적으로 변수 체크
        setInterval(() => {
            findAndModifyGameState();
        }, 1000);
        
        console.log('🔄 지속적인 해킹 모드 활성화됨');
    }
    
    // 메인 실행
    executeHack();
    
    // 지속적인 해킹 모드 (옵션)
    if (confirm('지속적인 해킹 모드를 활성화하시겠습니까? (게임 중에도 계속 99999를 유지)')) {
        setupContinuousHack();
    }
    
    // 전역에 해킹 함수 노출
    window.tetrisHack = executeHack;
    console.log('💡 언제든지 tetrisHack() 함수를 호출하여 다시 실행할 수 있습니다.');
    
})();
