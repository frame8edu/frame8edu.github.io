const menu = document.querySelector('.menu');
const links = document.querySelector('.links');

if (menu && links) {
  menu.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? '닫기' : '메뉴';
  });
  links.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      links.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.textContent = '메뉴';
    }
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('on'));
}

const inquiryForm = document.querySelector('[data-inquiry-form]');
if (inquiryForm) {
  const submitButton = inquiryForm.querySelector('[data-submit]');
  const formStatus = inquiryForm.querySelector('[data-form-status]');

  inquiryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!inquiryForm.reportValidity()) return;

    submitButton.disabled = true;
    submitButton.textContent = '전송 중…';
    formStatus.className = 'form-status';
    formStatus.textContent = '문의 내용을 전송하고 있습니다.';

    try {
      const response = await fetch(inquiryForm.dataset.endpoint, {
        method: 'POST',
        body: new FormData(inquiryForm),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json();
      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error('Submission failed');
      }
      inquiryForm.reset();
      formStatus.className = 'form-status success';
      formStatus.textContent = '문의가 전송되었습니다. 확인 후 이메일로 답변드리겠습니다.';
    } catch (error) {
      formStatus.className = 'form-status error';
      formStatus.textContent = '전송되지 않았습니다. 잠시 후 다시 시도하거나 이메일·전화로 문의해 주세요.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = '문의 보내기';
    }
  });
}

