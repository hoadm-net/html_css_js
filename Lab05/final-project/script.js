// Final Project JavaScript Utilities
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Final Project Responsive App - Initialized');
    
    // Initialize all components
    initializeAnimations();
    initializeDeviceShowcase();
    initializeQuickStart();
    initializeProgress();
    
    // Show welcome message
    showWelcomeMessage();
});

// Animation utilities
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Device showcase interactions
function initializeDeviceShowcase() {
    const devices = document.querySelectorAll('.device');
    
    devices.forEach(device => {
        device.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        });
        
        device.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        });
        
        // Click to highlight responsive features
        device.addEventListener('click', function() {
            highlightResponsiveFeatures(this);
        });
    });
}

function highlightResponsiveFeatures(device) {
    const deviceType = device.classList.contains('mobile') ? 'mobile' : 
                      device.classList.contains('tablet') ? 'tablet' : 'desktop';
    
    // Create popup with responsive features for this device
    const popup = document.createElement('div');
    popup.className = 'responsive-features-popup';
    popup.innerHTML = getResponsiveFeaturesContent(deviceType);
    
    document.body.appendChild(popup);
    
    // Position popup
    const rect = device.getBoundingClientRect();
    popup.style.position = 'fixed';
    popup.style.top = rect.bottom + 10 + 'px';
    popup.style.left = rect.left + 'px';
    popup.style.zIndex = '1000';
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
    }, 5000);
    
    // Close on click outside
    document.addEventListener('click', function closePopup(e) {
        if (!popup.contains(e.target) && !device.contains(e.target)) {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
            document.removeEventListener('click', closePopup);
        }
    });
}

function getResponsiveFeaturesContent(deviceType) {
    const features = {
        mobile: {
            title: '📱 Mobile Features',
            items: [
                'Touch-friendly navigation',
                'Single column layout',
                'Larger touch targets (44px+)',
                'Optimized for portrait mode',
                'Fast loading on 3G networks'
            ]
        },
        tablet: {
            title: '📱 Tablet Features', 
            items: [
                'Adaptive 2-column layout',
                'Touch + hover interactions',
                'Flexible navigation options',
                'Portrait/landscape support',
                'Enhanced typography scale'
            ]
        },
        desktop: {
            title: '🖥️ Desktop Features',
            items: [
                'Multi-column complex layouts',
                'Hover effects and animations',
                'Keyboard navigation support',
                'Large viewport optimizations',
                'Advanced interaction patterns'
            ]
        }
    };
    
    const feature = features[deviceType];
    return `
        <div class="popup-content">
            <h3>${feature.title}</h3>
            <ul>
                ${feature.items.map(item => `<li>✓ ${item}</li>`).join('')}
            </ul>
            <button onclick="this.parentNode.parentNode.remove()" class="close-btn">Close</button>
        </div>
    `;
}

// Quick start functions
function initializeQuickStart() {
    // Add CSS for popup
    if (!document.getElementById('popup-styles')) {
        const style = document.createElement('style');
        style.id = 'popup-styles';
        style.textContent = `
            .responsive-features-popup {
                background: white;
                border: 2px solid #3498db;
                border-radius: 12px;
                padding: 1.5rem;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                max-width: 300px;
                animation: popupFadeIn 0.3s ease;
            }
            
            .responsive-features-popup h3 {
                color: #3498db;
                margin-bottom: 1rem;
                font-size: 1.2rem;
            }
            
            .responsive-features-popup ul {
                list-style: none;
                margin-bottom: 1rem;
            }
            
            .responsive-features-popup li {
                padding: 0.25rem 0;
                color: #2c3e50;
            }
            
            .close-btn {
                background: #e74c3c;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                float: right;
            }
            
            .close-btn:hover {
                background: #c0392b;
            }
            
            @keyframes popupFadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #2ecc71, #27ae60);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                z-index: 1000;
                animation: slideInRight 0.5s ease;
            }
            
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(100%); }
                to { opacity: 1; transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

function downloadStarter() {
    showNotification('🎉 Starter Kit sẽ được download soon! Đang chuẩn bị files...', 'success');
    
    // Simulate download preparation
    setTimeout(() => {
        showNotification('📦 Đang tạo starter kit với responsive framework...', 'info');
    }, 1000);
    
    setTimeout(() => {
        showNotification('✅ Starter Kit sẵn sàng! Check Downloads folder.', 'success');
        // In real implementation, trigger actual download
        console.log('📦 Download Starter Kit:', {
            files: [
                'responsive-framework.css',
                'components.html', 
                'responsive-utils.js',
                'assets-pack.zip',
                'implementation-guide.html'
            ],
            features: [
                'Mobile-first CSS architecture',
                'Responsive component library',
                'Touch interaction utilities',
                'Performance optimization tools',
                'Cross-device testing kit'
            ]
        });
    }, 2500);
}

function viewDemo() {
    showNotification('🔥 Mở live demo trong tab mới...', 'info');
    
    // In real implementation, open demo URL
    setTimeout(() => {
        window.open('#demo', '_blank');
        showNotification('👀 Live demo đã mở! Test trên multiple devices.', 'success');
    }, 500);
}

function openGuide() {
    showNotification('📖 Implementation Guide đang load...', 'info');
    
    // Navigate to guide page
    setTimeout(() => {
        window.location.href = 'guide.html';
    }, 500);
}

function openTesting() {
    showNotification('🧪 Testing Toolkit đang khởi tạo...', 'info');
    
    setTimeout(() => {
        showTestingToolkit();
    }, 1000);
}

function showTestingToolkit() {
    const toolkit = document.createElement('div');
    toolkit.className = 'testing-toolkit-modal';
    toolkit.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>🧪 Responsive Testing Toolkit</h2>
                <button onclick="this.closest('.testing-toolkit-modal').remove()" class="close-btn">×</button>
            </div>
            <div class="modal-body">
                <div class="testing-grid">
                    <div class="test-category">
                        <h3>📱 Device Testing</h3>
                        <button onclick="testViewport('mobile')" class="test-btn">Mobile Test</button>
                        <button onclick="testViewport('tablet')" class="test-btn">Tablet Test</button>
                        <button onclick="testViewport('desktop')" class="test-btn">Desktop Test</button>
                    </div>
                    
                    <div class="test-category">
                        <h3>🎯 Performance</h3>
                        <button onclick="runPerformanceTest()" class="test-btn">Speed Test</button>
                        <button onclick="checkWebVitals()" class="test-btn">Web Vitals</button>
                        <button onclick="testMobileNetwork()" class="test-btn">3G Simulation</button>
                    </div>
                    
                    <div class="test-category">
                        <h3>♿ Accessibility</h3>
                        <button onclick="testAccessibility()" class="test-btn">A11y Check</button>
                        <button onclick="testKeyboard()" class="test-btn">Keyboard Nav</button>
                        <button onclick="testScreenReader()" class="test-btn">Screen Reader</button>
                    </div>
                </div>
                
                <div class="current-viewport">
                    <h4>Current Viewport: <span id="viewport-size">${window.innerWidth}px × ${window.innerHeight}px</span></h4>
                    <div class="viewport-indicator">
                        <div class="breakpoint-markers">
                            <span class="${window.innerWidth <= 480 ? 'active' : ''}">📱 Mobile (≤480px)</span>
                            <span class="${window.innerWidth > 480 && window.innerWidth <= 768 ? 'active' : ''}">📱 Tablet (481-768px)</span>
                            <span class="${window.innerWidth > 768 && window.innerWidth <= 1024 ? 'active' : ''}">💻 Desktop (769-1024px)</span>
                            <span class="${window.innerWidth > 1024 ? 'active' : ''}">🖥️ Large (>1024px)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .testing-toolkit-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: modalFadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .modal-header {
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            padding: 1.5rem;
            border-radius: 12px 12px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h2 {
            margin: 0;
        }
        
        .modal-header .close-btn {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            font-size: 1.5rem;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .testing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .test-category h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
        }
        
        .test-btn {
            display: block;
            width: 100%;
            background: linear-gradient(135deg, #2ecc71, #27ae60);
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 6px;
            margin-bottom: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .test-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
        }
        
        .current-viewport {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            text-align: center;
        }
        
        .breakpoint-markers {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .breakpoint-markers span {
            padding: 0.5rem;
            border-radius: 6px;
            background: #e9ecef;
            font-size: 0.85rem;
        }
        
        .breakpoint-markers span.active {
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(modalStyle);
    document.body.appendChild(toolkit);
    
    // Update viewport size on resize
    window.addEventListener('resize', updateViewportDisplay);
    
    showNotification('🧪 Testing Toolkit activated! Test your responsive design.', 'success');
}

function updateViewportDisplay() {
    const sizeDisplay = document.getElementById('viewport-size');
    if (sizeDisplay) {
        sizeDisplay.textContent = `${window.innerWidth}px × ${window.innerHeight}px`;
    }
    
    // Update breakpoint indicators
    const markers = document.querySelectorAll('.breakpoint-markers span');
    markers.forEach(marker => marker.classList.remove('active'));
    
    const width = window.innerWidth;
    let activeIndex = 0;
    if (width <= 480) activeIndex = 0;
    else if (width <= 768) activeIndex = 1;
    else if (width <= 1024) activeIndex = 2;
    else activeIndex = 3;
    
    if (markers[activeIndex]) {
        markers[activeIndex].classList.add('active');
    }
}

// Testing functions
function testViewport(size) {
    const sizes = {
        mobile: { width: 375, height: 667 },
        tablet: { width: 768, height: 1024 },
        desktop: { width: 1200, height: 800 }
    };
    
    const targetSize = sizes[size];
    showNotification(`📱 Simulating ${size} viewport: ${targetSize.width}x${targetSize.height}`, 'info');
    
    // In a real implementation, you would resize the window or use browser dev tools
    console.log(`Testing ${size} viewport:`, targetSize);
}

function runPerformanceTest() {
    showNotification('⚡ Running performance analysis...', 'info');
    
    // Simulate performance measurement
    setTimeout(() => {
        const metrics = {
            loadTime: Math.random() * 2 + 1,
            firstPaint: Math.random() * 1 + 0.5,
            largestContentfulPaint: Math.random() * 2.5 + 1,
            cumulativeLayoutShift: Math.random() * 0.1
        };
        
        console.log('📊 Performance Metrics:', metrics);
        showNotification(`⚡ Performance: Load ${metrics.loadTime.toFixed(1)}s, LCP ${metrics.largestContentfulPaint.toFixed(1)}s`, 'success');
    }, 2000);
}

function checkWebVitals() {
    showNotification('🎯 Checking Core Web Vitals...', 'info');
    
    setTimeout(() => {
        const vitals = {
            lcp: Math.random() * 2.5 + 1,
            fid: Math.random() * 100 + 50,
            cls: Math.random() * 0.1
        };
        
        console.log('🎯 Core Web Vitals:', vitals);
        showNotification(`🎯 Vitals: LCP ${vitals.lcp.toFixed(1)}s, FID ${vitals.fid.toFixed(0)}ms`, 'success');
    }, 1500);
}

function testMobileNetwork() {
    showNotification('📶 Simulating 3G network conditions...', 'info');
    console.log('📶 Testing mobile network performance');
}

function testAccessibility() {
    showNotification('♿ Running accessibility audit...', 'info');
    
    setTimeout(() => {
        console.log('♿ Accessibility test completed');
        showNotification('♿ A11y: 95% compliance, minor contrast issues found', 'success');
    }, 2000);
}

function testKeyboard() {
    showNotification('⌨️ Testing keyboard navigation...', 'info');
    console.log('⌨️ Keyboard navigation test');
}

function testScreenReader() {
    showNotification('🔊 Testing screen reader compatibility...', 'info');
    console.log('🔊 Screen reader test');
}

// Progress tracking
function initializeProgress() {
    const progressKey = 'lab05-final-project-progress';
    const progress = localStorage.getItem(progressKey) || '0';
    
    // Create progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-indicator';
    progressBar.innerHTML = `
        <div class="progress-header">
            <span>🚀 Project Progress</span>
            <span class="progress-percent">${progress}%</span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
    `;
    
    // Add progress styles
    const progressStyle = document.createElement('style');
    progressStyle.textContent = `
        .progress-indicator {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            border-radius: 12px;
            padding: 1rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 1000;
            min-width: 200px;
        }
        
        .progress-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #2c3e50;
        }
        
        .progress-bar {
            height: 8px;
            background: #ecf0f1;
            border-radius: 4px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #3498db, #2ecc71);
            transition: width 0.3s ease;
        }
        
        @media (max-width: 768px) {
            .progress-indicator {
                bottom: 10px;
                right: 10px;
                left: 10px;
                min-width: auto;
            }
        }
    `;
    document.head.appendChild(progressStyle);
    document.body.appendChild(progressBar);
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.5s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }
    }, 4000);
}

function showWelcomeMessage() {
    setTimeout(() => {
        showNotification('🎉 Welcome to Final Project! Click devices to explore responsive features.', 'success');
    }, 1000);
}

// Add slide out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100%); }
    }
`;
document.head.appendChild(style);
