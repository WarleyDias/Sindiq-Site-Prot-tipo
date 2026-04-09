const fs = require('fs');

try {
    let html = fs.readFileSync('index.html', 'utf8');

    // Extract body innerHTML
    let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<script>/i);
    if (!bodyMatch) bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyContent = bodyMatch ? bodyMatch[1] : '';

    // Convert HTML to JSX
    let jsx = bodyContent
        .replace(/class=/g, 'className=')
        .replace(/for=/g, 'htmlFor=')
        .replace(/onclick=\"([^\"]+)\"/g, 'onClick={() => $1}')
        .replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}')
        .replace(/style=\"([^\"]+)\"/g, (match, p1) => {
            let styleObj = {};
            p1.split(';').forEach(rule => {
                let parts = rule.split(':');
                if (parts.length === 2) {
                    let key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
                    styleObj[key] = parts[1].trim();
                }
            });
            return 'style={' + JSON.stringify(styleObj) + '}';
        })
        .replace(/<img([^>]+)>/g, (m, p1) => {
            if (!m.endsWith('/>')) return `<img${p1} />`;
            return m;
        })
        .replace(/<br>/g, '<br />')
        .replace(/<input([^>]+)>/g, (m, p1) => {
            if (!m.endsWith('/>')) return `<input${p1} />`;
            return m;
        })
        .replace(/<hr([^>]*)>/g, '<hr$1 />');

    // Remove global styles from HTML, Next uses globals.css
    let styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
    if (styleMatch) {
        let cssContent = styleMatch[1]
            .replace('@import url(https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap);', '')
            .replace('body {\\n            font-family: \\'Plus Jakarta Sans\\', sans-serif;\\n            background-color: var(--bg-light);\\n            color: #1e293b;\\n            overflow-x: hidden;\\n        }', '');

        fs.appendFileSync('src/app/globals.css', '\n' + cssContent);
    }

    // Replace Lucide tags
    jsx = jsx.replace(/<i data-lucide=\"([^\"]+)\"[^>]*><\/i>/g, (m, p1) => {
        let cmpName = p1.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
        return `<${cmpName} className="w-5 h-5" />`;
    });

    const pageTsx = `'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowDownRight, ArrowRight, ArrowUpRight, Calendar, Check, CheckCircle, 
  ChevronLeft, FileText, Instagram, Linkedin, MessageCircle, Play, 
  PlayCircle, RefreshCw, Send, Twitter, Users, Headphones, Database, CreditCard, ShieldCheck, MessageSquare
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Word Rotator
    const wordsList = ['Evoluiu', 'Simples', 'Completa', 'Conectada', 'Inteligente', 'em um toque.'];
    const rotatingNode = document.getElementById('word-rotator');
    let currentIndex = 0;

    if (rotatingNode) {
      gsap.set(rotatingNode, { y: 0, opacity: 1, filter: 'blur(0px)' });
      const playRotation = () => {
        gsap.to(rotatingNode, {
          y: -40, opacity: 0, filter: 'blur(6px)', duration: 0.4, delay: 2.2, ease: 'power2.in',
          onComplete: () => {
             currentIndex = (currentIndex + 1) % wordsList.length;
             rotatingNode.textContent = wordsList[currentIndex];
             gsap.fromTo(rotatingNode,
               { y: 40, filter: 'blur(6px)', opacity: 0 },
               { y: 0, filter: 'blur(0px)', opacity: 1, duration: 0.6, ease: 'power3.out', onComplete: playRotation }
             );
          }
        });
      };
      playRotation();
    }

    // Animations
    gsap.to('#curtain', { yPercent: -100, duration: 1.2, ease: 'power4.inOut', delay: 0.2 });
    gsap.from('.hero-content > *', { y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 1 });
    gsap.fromTo('.feature-card', { opacity: 0, y: 50 }, { scrollTrigger: { trigger: '#features', start: 'top 80%' }, opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out' });
    gsap.fromTo('.feature-master', { opacity: 0, scale: 0.95, y: 50 }, { scrollTrigger: { trigger: '.feature-master', start: 'top 75%' }, opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power4.out' });
    gsap.fromTo('.onboarding-step', { opacity: 0, x: 50 }, { scrollTrigger: { trigger: '#implantacao', start: 'top 75%' }, opacity: 1, x: 0, stagger: 0.3, duration: 1, ease: 'power3.out' });

  }, []);

  const startConsultoria = () => {
      document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden font-sans">
      ${jsx}
    </div>
  );
}
`;

    fs.writeFileSync('src/app/page.tsx', pageTsx);
    console.log('React conversion successful!');
} catch (e) {
    console.error('Error:', e);
}
