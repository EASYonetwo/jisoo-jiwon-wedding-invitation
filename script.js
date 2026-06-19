// 결혼식 날짜 설정 (년, 월-1, 일)
const weddingDate = new Date(2026, 11, 26);
const weddingDay = 26;

function renderCalendar() {
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const grid = document.getElementById('calendarGrid');
  let html = '';

  for (let i = 0; i < firstDay; i++) {
    html += '<div class="day empty"></div>';
  }

  for (let d = 1; d <= lastDate; d++) {
    if (d === weddingDay) {
      html += `<div class="day wedding-day">${d}</div>`;
    } else {
      html += `<div class="day">${d}</div>`;
    }
  }

  grid.innerHTML = html;
}

function renderDday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil((weddingDate - today) / (1000 * 60 * 60 * 24));

  const ddayEl = document.getElementById('dday');
  if (diff > 0) {
    ddayEl.textContent = `결혼식까지 D- ${diff}`;
  } else if (diff === 0) {
    ddayEl.textContent = '오늘 결혼식입니다';
  } else {
    ddayEl.textContent = '결혼했습니다~';
  }
}

renderCalendar();
renderDday();

// 계좌 정보 토글 및 복사 기능
function toggleAccount(side) {
  const list = document.getElementById(side + '-accounts');
  const btn = list.previousElementSibling;
  list.classList.toggle('open');
  btn.classList.toggle('open');
}

function copyAccount(number, btn) {
  navigator.clipboard.writeText(number).then(() => {
    const originalText = btn.textContent;
    btn.textContent = '복사됨';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 1500);
  });
}

// 갤러리 썸네일 클릭 시 메인 이미지 변경 및 활성화 표시
function changeMain(thumbEl) {
  document.getElementById('mainImage').src = thumbEl.dataset.full;

  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
}

// 페이지 로드 시 팝업 표시
window.onload = function() {
  document.getElementsByClassName('popup-overlay')[0].style.display = 'flex';
  document.body.classList.add('popup-open');
};

  // 팝업 닫기
function closePopup() {
  document.getElementsByClassName('popup-overlay')[0].style.display = 'none';
  document.body.classList.remove('popup-open');
}