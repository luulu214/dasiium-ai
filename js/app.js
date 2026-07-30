/**
 * 다시이음 AI - 메인 웹 애플리케이션 싱글 페이지 인터랙션 엔진
 */

document.addEventListener("DOMContentLoaded", () => {
  // App State
  const state = {
    currentStep: 1,
    persona: JSON.parse(JSON.stringify(DEMO_PERSONA)),
    chatHistory: [],
    interviewStepIndex: 0,
    theme: localStorage.getItem("theme") || "dark",
    selectedJobTitle: "사무 지원 & 행정",
    selectedRegion: "전주 / 광주"
  };

  // DOM Elements
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const demoModeBtn = document.getElementById("demoModeBtn");
  const stepItems = document.querySelectorAll(".step-item");
  const screenViews = document.querySelectorAll(".screen-view");

  // Initialize Theme
  document.documentElement.setAttribute("data-theme", state.theme);
  updateThemeIcon();

  // Event Listeners
  themeToggleBtn.addEventListener("click", toggleTheme);
  demoModeBtn.addEventListener("click", runDemoMode);

  stepItems.forEach(item => {
    item.addEventListener("click", () => {
      const step = parseInt(item.getAttribute("data-step"));
      goToStep(step);
    });
  });

  // Theme Toggle Function
  function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem("theme", state.theme);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    themeToggleBtn.innerHTML = state.theme === "dark" 
      ? `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
      : `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
  }

  // Step Navigation
  window.goToStep = function(stepNum) {
    if (stepNum < 1 || stepNum > 8) return;
    state.currentStep = stepNum;

    // Update Stepper Nav
    stepItems.forEach(item => {
      const s = parseInt(item.getAttribute("data-step"));
      item.classList.remove("active", "completed");
      if (s === stepNum) {
        item.classList.add("active");
      } else if (s < stepNum) {
        item.classList.add("completed");
      }
    });

    // Update Views
    screenViews.forEach(view => {
      view.classList.remove("active");
      if (parseInt(view.getAttribute("data-screen")) === stepNum) {
        view.classList.add("active");
      }
    });

    // Render screen specific logic
    renderScreen(stepNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Screen Rendering Router
  function renderScreen(stepNum) {
    switch (stepNum) {
      case 2:
        renderGoalSetup();
        break;
      case 3:
        renderExperienceCapture();
        break;
      case 4:
        renderInterviewChat();
        break;
      case 5:
        renderFactLockScreen();
        break;
      case 6:
        renderDashboardScreen();
        break;
      case 7:
        renderJobMatchingScreen();
        break;
      case 8:
        renderActionPlanScreen();
        break;
    }
  }

  // 30-Second Demo Mode Preset Generator
  function runDemoMode() {
    alert("✨ [공모전 시연 모드] 8년 경력 단절 '김다시(42세)' 페르소나 데이터가 자동으로 로드되었습니다!\n\nAI 인터뷰, Fact-Lock 검증, 역량 대시보드, 7일 액션플랜까지 한눈에 체험하실 수 있습니다.");
    state.persona = JSON.parse(JSON.stringify(DEMO_PERSONA));
    goToStep(5); // Jump straight to Fact-Lock or Dashboard to amaze judges
  }

  /* ----------------------------------------------------
     Screen 2: Goal Setup
  ---------------------------------------------------- */
  function renderGoalSetup() {
    const selectors = document.querySelectorAll(".grid-selector");
    if(selectors.length < 2) return;

    const jobCards = selectors[0].querySelectorAll(".select-card");
    jobCards.forEach(card => {
      // Remove old listener if any (simplest way is replacing node, but attaching is fine for demo)
      card.onclick = () => {
        jobCards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        const titleEl = card.querySelector(".s-title");
        if(titleEl) state.selectedJobTitle = titleEl.innerText;
      };
    });

    const regionCards = selectors[1].querySelectorAll(".select-card");
    regionCards.forEach(card => {
      card.onclick = () => {
        regionCards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        const titleEl = card.querySelector(".s-title");
        if(titleEl) state.selectedRegion = titleEl.innerText;
      };
    });
  }

  /* ----------------------------------------------------
     Screen 3: Experience Capture
  ---------------------------------------------------- */
  function renderExperienceCapture() {
    const tagBtns = document.querySelectorAll(".tag-btn");
    tagBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("active");
      });
    });

    const expTextarea = document.getElementById("expTextarea");
    if (expTextarea && state.persona.experiences.length > 0) {
      expTextarea.value = state.persona.experiences[0].rawText;
    }
  }

  /* ----------------------------------------------------
     Screen 4: AI Interview Engine Simulation
  ---------------------------------------------------- */
  function renderInterviewChat() {
    const chatContainer = document.getElementById("interviewChatBox");
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("sendChatBtn");

    if (!chatContainer) return;

    // Reset Chat if empty
    if (state.chatHistory.length === 0) {
      const q1 = state.persona.interviewQuestions[0];
      state.chatHistory.push({
        sender: "ai",
        text: `안녕하세요 ${state.persona.name}님! 반가워요. ${q1.question}`
      });
    }

    renderChatHistory();

    sendBtn.onclick = () => {
      const text = chatInput.value.trim();
      if (!text) return;

      // Add user message
      state.chatHistory.push({ sender: "user", text: text });
      chatInput.value = "";
      renderChatHistory();

      // AI response simulation
      setTimeout(() => {
        state.interviewStepIndex++;
        if (state.interviewStepIndex < state.persona.interviewQuestions.length) {
          const nextQ = state.persona.interviewQuestions[state.interviewStepIndex];
          state.chatHistory.push({
            sender: "ai",
            text: `감사합니다! [Fact-Lock 수집 완료] 다음으로, ${nextQ.question}`
          });
        } else {
          state.chatHistory.push({
            sender: "ai",
            text: `🎉 모든 정밀 인터뷰 답변이 수집되었습니다! 입력하신 원문 데이터와 직무 변환 문장을 매핑하는 [Fact-Lock 검토] 단계로 이동합니다.`
          });
        }
        renderChatHistory();
      }, 700);
    };
  }

  function renderChatHistory() {
    const chatContainer = document.getElementById("interviewChatBox");
    if (!chatContainer) return;

    chatContainer.innerHTML = "";
    state.chatHistory.forEach(msg => {
      const bubble = document.createElement("div");
      bubble.className = `chat-bubble ${msg.sender}`;
      bubble.innerHTML = `
        <div class="chat-bubble-label">${msg.sender === 'ai' ? '🤖 다시이음 정밀 AI' : '👤 ' + state.persona.name}</div>
        <div>${msg.text}</div>
      `;
      chatContainer.appendChild(bubble);
    });
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  /* ----------------------------------------------------
     Screen 5: Fact-Lock Verification Screen
  ---------------------------------------------------- */
  function renderFactLockScreen() {
    const container = document.getElementById("factLockContainer");
    if (!container) return;

    container.innerHTML = "";
    state.persona.factLockStatements.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "factlock-row";
      
      const badgeClass = item.status === "verified" ? "badge-verified" : (item.status === "partial" ? "badge-partial" : "badge-unverified");
      
      row.innerHTML = `
        <div class="evidence-box">
          <div class="evidence-title">📌 원문 경험 근거 #${index + 1}</div>
          <div class="evidence-text">"${item.evidenceText}"</div>
        </div>
        <div class="statement-box">
          <div class="statement-text" contenteditable="true" id="stmt_${item.id}">${item.generatedStatement}</div>
          <div class="factlock-controls">
            <span class="status-badge ${badgeClass}" id="badge_${item.id}">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
              ${item.badgeText}
            </span>
            <button class="btn-secondary" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;" onclick="toggleFactLockStatus('${item.id}')">
              승인 상태 변경
            </button>
          </div>
        </div>
      `;
      container.appendChild(row);
    });
  }

  window.toggleFactLockStatus = function(id) {
    const item = state.persona.factLockStatements.find(s => s.id === id);
    if (!item) return;

    if (item.status === "verified") {
      item.status = "partial";
      item.badgeText = "일부 확인 (검토 권장)";
    } else if (item.status === "partial") {
      item.status = "unverified";
      item.badgeText = "미확인 상태";
    } else {
      item.status = "verified";
      item.badgeText = "근거 확인됨 (100%)";
    }
    renderFactLockScreen();
  };

  /* ----------------------------------------------------
     Screen 6: Dashboard Screen (Domino Competencies & STAR)
  ---------------------------------------------------- */
  function renderDashboardScreen() {
    const compGrid = document.getElementById("competencyGrid");
    if (compGrid) {
      compGrid.innerHTML = "";
      state.persona.competencies.forEach(comp => {
        const card = document.createElement("div");
        card.className = "competency-card";
        card.innerHTML = `
          <div class="competency-number">${comp.num}</div>
          <div class="competency-name">${comp.name}</div>
          <div class="competency-desc">${comp.desc}</div>
        `;
        compGrid.appendChild(card);
      });
    }

    const starContainer = document.getElementById("starAnswersContainer");
    if (starContainer) {
      starContainer.innerHTML = "";
      state.persona.starAnswers.forEach(star => {
        const card = document.createElement("div");
        card.className = "star-card";
        card.innerHTML = `
          <div class="star-question">${star.question}</div>
          <div class="star-grid">
            <div class="star-item"><div class="star-item-label">S (SITUATION)</div><div class="star-item-text">${star.situation}</div></div>
            <div class="star-item"><div class="star-item-label">T (TASK)</div><div class="star-item-text">${star.task}</div></div>
            <div class="star-item"><div class="star-item-label">A (ACTION)</div><div class="star-item-text">${star.action}</div></div>
            <div class="star-item"><div class="star-item-label">R (RESULT)</div><div class="star-item-text">${star.result}</div></div>
          </div>
        `;
        starContainer.appendChild(card);
      });
    }
  }

  /* ----------------------------------------------------
     Screen 7: Job Matching Screen
  ---------------------------------------------------- */
  function renderJobMatchingScreen() {
    const container = document.getElementById("jobMatchContainer");
    if (!container) return;

    // 2단계에서 선택한 내용을 첫 번째 공고에 동적으로 반영
    if (state.persona.jobs.length > 0) {
      state.persona.jobs[0].location = state.selectedRegion;
      state.persona.jobs[0].title = state.selectedJobTitle + " 파트너 모집";
      state.persona.jobs[0].company = state.selectedRegion + " 지역 선도 기업";
    }

    container.innerHTML = "";
    state.persona.jobs.forEach(job => {
      const card = document.createElement("div");
      card.className = "glass-card";
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
          <div>
            <div style="font-size: 0.85rem; color: var(--accent-primary); font-weight: 700;">${job.company}</div>
            <h3 style="font-size: 1.2rem; font-weight: 800; margin: 0.2rem 0;">${job.title}</h3>
            <div style="font-size: 0.85rem; color: var(--text-muted);">${job.location}</div>
          </div>
          <div style="background: var(--accent-gradient); color: #fff; padding: 0.5rem 1rem; border-radius: var(--radius-full); font-weight: 800; font-size: 1.1rem;">
            적합도 ${job.matchRate}%
          </div>
        </div>
        <div style="margin-bottom: 1rem;">
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--success-text); margin-bottom: 0.3rem;">✅ 나의 검증된 일치 역량:</div>
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
            ${job.matchedSkills.map(s => `<span class="status-badge badge-verified">${s}</span>`).join("")}
          </div>
        </div>
        <div>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--warning-text); margin-bottom: 0.3rem;">💡 7일 보완 필요 요소:</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">${job.missingSkills.join(", ")}</div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  /* ----------------------------------------------------
     Screen 8: 7-Day Action Plan Screen
  ---------------------------------------------------- */
  function renderActionPlanScreen() {
    const container = document.getElementById("actionPlanContainer");
    const progressFill = document.getElementById("actionProgressFill");
    const progressText = document.getElementById("actionProgressText");

    if (!container) return;

    // 2단계 내용을 액션 플랜 3번째 미션에 동적으로 반영
    if (state.persona.actionPlan.length >= 3) {
      state.persona.actionPlan[2].task = `[목표 지역: ${state.selectedRegion}] ${state.selectedJobTitle} 관련 맞춤 공고에 첫 지원하기`;
    }

    container.innerHTML = "";
    let doneCount = 0;

    state.persona.actionPlan.forEach(act => {
      if (act.done) doneCount++;
      const item = document.createElement("div");
      item.className = `checklist-item ${act.done ? 'done' : ''}`;
      item.innerHTML = `
        <div class="custom-checkbox">${act.done ? '✓' : ''}</div>
        <div style="flex: 1;">
          <span style="font-weight: 800; color: var(--accent-primary); font-size: 0.85rem; margin-right: 0.5rem;">[${act.day}]</span>
          <span style="font-size: 0.95rem; font-weight: 600;">${act.task}</span>
        </div>
      `;
      item.onclick = () => {
        act.done = !act.done;
        renderActionPlanScreen();
      };
      container.appendChild(item);
    });

    const percent = Math.round((doneCount / state.persona.actionPlan.length) * 100);
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressText) progressText.innerText = `7일 미션 달성률: ${percent}% (${doneCount}/${state.persona.actionPlan.length} 완료)`;
  }

  // Initial render
  goToStep(1);
});
