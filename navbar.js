const navbarTemplate = `
    <style>
        :root {
            --nav-height: 70px;
        }

        .navbar {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border);
            height: var(--nav-height);
            display: flex;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 2000;
        }

        .nav-container { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            width: 100%;
            max-width: 1440px; 
            margin: 0 auto; 
            padding: 0 24px; 
        }

        .brand { 
            display: flex; 
            align-items: center; 
            gap: 10px; 
            text-decoration: none; 
            z-index: 2001; 
        }

        .brand-icon { background: var(--primary); color: white; padding: 6px; border-radius: 10px; display: flex; }
        .brand-name { font-size: 18px; font-weight: 800; color: var(--text-main); font-family: 'Outfit', sans-serif; }
        
        .nav-links { display: flex; align-items: center; gap: 24px; }
        .nav-links a { 
            text-decoration: none; 
            color: var(--text-muted); 
            font-weight: 500; 
            font-size: 14px; 
            transition: all 0.2s; 
            font-family: 'Inter', sans-serif;
            position: relative;
        }

        .nav-links a:hover, .nav-links a.active { color: var(--primary); }

        .menu-toggle {
            display: none;
            background: #f1f5f9;
            border: none;
            cursor: pointer;
            color: var(--text-main);
            z-index: 2001;
            padding: 8px;
            border-radius: 8px;
            transition: 0.2s;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
            .menu-toggle { display: flex; align-items: center; justify-content: center; }
            
            .nav-links {
                position: fixed;
                top: var(--nav-height); /* Starts exactly where navbar ends */
                left: 0;
                width: 100%;
                height: 0; /* Hidden by default */
                background: white;
                flex-direction: column;
                overflow: hidden; /* Clips children when height is 0 */
                transition: height 0.3s ease-in-out;
                box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
                padding: 0;
                z-index: 1999;
            }

            .nav-links.show {
                height: calc(100vh - var(--nav-height)); /* Fills remaining screen */
                padding: 40px 0;
            }

            .nav-links a {
                font-size: 20px;
                width: 100%;
                text-align: center;
                padding: 15px 0;
                opacity: 0;
                transform: translateY(10px);
                transition: 0.3s ease;
            }

            .nav-links.show a {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
    <nav class="navbar">
        <div class="nav-container">
            <a href="index.html" class="brand">
                <div class="brand-icon"><i data-lucide="zap" fill="currentColor" size="20"></i></div>
                <span class="brand-name">VIBE-IDE</span>
            </a>
            
            <button class="menu-toggle" id="menu-btn" aria-label="Toggle Menu">
                <i data-lucide="menu" id="menu-icon"></i>
            </button>

            <div class="nav-links" id="nav-menu">
                <a href="index.html" id="nav-home">Home</a>
                <a href="download.html" id="nav-download">Download</a>
                <a href="docs.html" id="nav-docs">Docs</a>
                <a href="about.html" id="nav-about">About</a>
            </div>
        </div>
    </nav>
`;

function loadNavbar(activePageId) {
    // Inject the template
    document.body.insertAdjacentHTML('afterbegin', navbarTemplate);
    
    const navMenu = document.getElementById('nav-menu');
    const menuBtn = document.getElementById('menu-btn');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('show');
            
            // Re-render Lucide icon
            if (window.lucide) {
                menuBtn.innerHTML = isOpen 
                    ? '<i data-lucide="x"></i>' 
                    : '<i data-lucide="menu"></i>';
                lucide.createIcons();
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                if (window.lucide) {
                    menuBtn.innerHTML = '<i data-lucide="menu"></i>';
                    lucide.createIcons();
                }
            });
        });
    }

    // Set active link
    if (activePageId) {
        const activeEl = document.getElementById(activePageId);
        if (activeEl) activeEl.classList.add('active');
    }

    // Init icons
    if (window.lucide) lucide.createIcons();
}