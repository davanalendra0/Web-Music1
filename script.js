const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = -200, my = -200, rx = -200, ry = -200;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
});

(function loop() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.transform = `translate(${rx - 17}px, ${ry - 17}px)`;
    requestAnimationFrame(loop);
})();

document.querySelectorAll('a, button, .artist-card, .session-option').forEach(el => {
    el.addEventListener('mouseenter', () => {
        ring.style.width = '54px'; ring.style.height = '54px'; ring.style.opacity = '1';
    });
    el.addEventListener('mouseleave', () => {
        ring.style.width = '34px'; ring.style.height = '34px'; ring.style.opacity = '0.6';
    });
});

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

const words = ['Independent','Urban','Authentic','New York','Hip-Hop','Rap','Real Sound','Est. 2018','Book Now'];
const track = document.getElementById('marqueeTrack');
const build = () => {
    let html = '';
    for (let i = 0; i < 2; i++) {
        words.forEach(w => {
            html += `<span class="marquee-item"><span class="marquee-dot"></span>${w}</span>`;
        });
    }
    return html;
};
track.innerHTML = build();

const wf = document.getElementById('waveform');
const heights = [20,45,70,55,90,65,40,80,50,35,75,60,30,85,45,70,55,40,65,80,35,50,90,45,60];
wf.innerHTML = heights.map((h,i) =>
    `<div class="wf-bar" style="height:${h}%;animation-delay:${(i*0.06).toFixed(2)}s"></div>`
).join('');

const reveals = document.querySelectorAll('.reveal');
reveals.forEach(r => r.classList.add('hidden'));
const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.remove('hidden');
            e.target.classList.add('visible');
            obs.unobserve(e.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(r => obs.observe(r));

function selectSession(el) {
    document.querySelectorAll('.session-option').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
}

function toggleNav() {
    const links = document.querySelector('.nav-links');
    const burger = document.getElementById('hamburger');
    links.classList.toggle('open');
    burger.classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('open');
        document.getElementById('hamburger').classList.remove('open');
    });
});