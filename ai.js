/**
 * RIALO ALL-IN-ONE ENGINE v5.0 (Global Edition)
 * High-Density Visuals + English Technical Oracle
 * Repository: sheingelzs
 */

// ==========================================
// 1. NEURAL GRID ENGINE (Interactive Visuals)
// ==========================================
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null, radius: 180 };

window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('resize', () => { initCanvas(); });

function initCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    let numberOfParticles = (canvas.width * canvas.height) / 4000; 
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
    }
    draw() {
        ctx.fillStyle = 'rgba(168, 85, 247, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 3;
            this.y -= (dy / distance) * force * 3;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 140) { 
                ctx.strokeStyle = `rgba(147, 51, 234, ${1 - (distance / 140)})`;
                ctx.lineWidth = 0.7;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

// ==========================================
// 2. RIALO ORACLE DATA (English Technical Specs)
// ==========================================
const RialoOracle = {
    "rialo": "<b>[DEFINITION: RIALO NETWORK]</b><br><br>RIALO is a <b>Supermodular Layer 1 Blockchain</b> designed to seamlessly bridge Real-World Finance (RWF) with the Web3 ecosystem.<br><br>• <b>Mission:</b> Eliminate reliance on slow, expensive third-party middleware and oracles.<br>• <b>Rialo Edge:</b> Enables dApps to communicate directly with the internet without intermediaries.<br>• <b>Programmatic Privacy:</b> Native encrypted messaging mapped to Email, Phone, or Device IDs.",

    "backed": "<b>[BACKING & LEADERSHIP]</b><br><br>Rialo is supported by top-tier institutional investors and led by elite cryptographers:<br><br>• <b>Funding:</b> Successfully raised a <b>$20 Million Seed Round</b> led by <span class='text-white'>Pantera Capital</span>.<br>• <b>Builder:</b> Developed by <span class='text-white'>Subzero Labs</span>.<br>• <b>Key Figure:</b> Led by <b>Jan Camenisch</b> (Former Head of Research at IBM & DFINITY).<br>• <b>Elite Team:</b> Engineers from Google, Apple, Microsoft, Amazon, Solana, and Near.",

    "arch": "<b>[CORE ARCHITECTURE - TECHNICAL]</b><br><br>• <b>Rialo VM:</b> Built on <b>RISC-V</b>. Fully compatible with SVM (Solana), EVM (Ethereum), and MoveVM.<br>• <b>Consensus:</b> Parallel multi-concurrent proposer mechanism achieving <b>50ms Block Times</b>.<br>• <b>Execution Engine:</b> Event-driven with <i>Conditional Transactions</i> for nanosecond latency.",

    "feat": "<b>[NATIVE CAPABILITIES]</b><br><br>• <b>Rialo Stream:</b> Native data feeds (Oracles) operating 40x faster than legacy solutions.<br>• <b>Rialo Interop:</b> Native interoperability protocol 10x faster than traditional bridges.<br>• <b>Rialo Cruise:</b> Native <b>Gas-less Transactions</b> for seamless user onboarding.<br>• <b>Rialo Read Path:</b> Direct validator data access (100ms) reducing operational overhead.",

    "roadmap": "<b>[ROADMAP 2025-2026]</b><br><br>• <b>Q1-Q2 2025:</b> Seed Round Completion | Private Devnet.<br>• <b>Q3 2025:</b> Stealth Mode Exit | 20+ Data Providers Integrated.<br>• <b>Q4 2025:</b> Public Testnet v1 Launch | Global Builder Programs.<br>• <b>2026:</b> <b>OFFICIAL MAINNET GENESIS.</b>"
};

// ==========================================
// 3. CHAT SYSTEM LOGIC
// ==========================================
window.handleSend = function() {
    const input = document.getElementById('user-input');
    const text = input.value.toLowerCase().trim();
    if (text === "") return;

    addBubble(input.value, 'user');
    input.value = "";

    setTimeout(() => {
        let responses = [];
        // Enhanced keyword matching
        if (text.includes("rialo") || text.includes("what is") || text.includes("definition")) responses.push(RialoOracle.rialo);
        if (text.includes("back") || text.includes("pantera") || text.includes("who") || text.includes("investor") || text.includes("fund")) responses.push(RialoOracle.backed);
        if (text.includes("arch") || text.includes("tech") || text.includes("vm") || text.includes("stack")) responses.push(RialoOracle.arch);
        if (text.includes("feat") || text.includes("feature") || text.includes("cruise") || text.includes("stream") || text.includes("capabilities")) responses.push(RialoOracle.feat);
        if (text.includes("road") || text.includes("plan") || text.includes("2026") || text.includes("when")) responses.push(RialoOracle.roadmap);

        let finalMsg = responses.length > 0 
            ? responses.join("<br><br>") 
            : "<b>[ERROR]</b>: Query outside technical parameters. Try keywords: <i>RIALO, BACKED, ARCHITECTURE, FEATURES,</i> or <i>ROADMAP.</i>";
        
        addBubble(finalMsg, 'bot');
    }, 600);
};

function addBubble(msg, sender) {
    const container = document.getElementById('chat-container');
    if (!container) return;

    const bubble = document.createElement('div');
    if (sender === 'user') {
        bubble.className = 'text-xs text-white uppercase font-bold text-right border-r-2 border-white pr-4 mb-6 relative z-20';
        bubble.innerText = "QUERY: " + msg;
    } else {
        bubble.className = 'bg-[#0a0a0a]/80 border border-white/5 p-6 chat-bubble text-[11px] font-mono leading-relaxed text-purple-200 mb-8 shadow-2xl backdrop-blur-md relative z-20';
        bubble.innerHTML = "<div class='text-purple-600 font-black mb-3 border-b border-purple-900/20 pb-1 flex justify-between uppercase tracking-widest text-[9px]'><span>[RIALO_DEEP_SCAN]</span><span>Mainnet_v2.4_Oracle</span></div>";
        typeEffect(bubble, msg);
    }
    
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
}

function typeEffect(el, text) {
    let i = 0;
    const content = document.createElement('span');
    el.appendChild(content);
    function type() {
        if (i < text.length) {
            if (text.substr(i, 4) === "<br>") { content.innerHTML += "<br>"; i += 4; }
            else if (text.startsWith("<b>", i)) { content.innerHTML += "<b>"; i += 3; }
            else if (text.startsWith("</b>", i)) { content.innerHTML += "</b>"; i += 4; }
            else if (text.startsWith("<i>", i)) { content.innerHTML += "<i>"; i += 3; }
            else if (text.startsWith("</i>", i)) { content.innerHTML += "</i>"; i += 4; }
            else if (text.startsWith("<span class='text-white'>", i)) { content.innerHTML += "<span class='text-white'>"; i += 25; }
            else if (text.startsWith("</span>", i)) { content.innerHTML += "</span>"; i += 7; }
            else { content.innerHTML += text.charAt(i); i++; }
            setTimeout(type, 1);
            document.getElementById('chat-container').scrollTop = document.getElementById('chat-container').scrollHeight;
        } else { el.innerHTML += '<span class="cursor"></span>'; }
    }
    type();
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    animate();
    const input = document.getElementById('user-input');
    if (input) {
        input.addEventListener("keypress", (e) => { if (e.key === "Enter") handleSend(); });
    }
});
