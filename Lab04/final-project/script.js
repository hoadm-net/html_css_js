// Interactive functionality for Lab04 Final Project
document.addEventListener('DOMContentLoaded', function() {
    
    // Resource download functionality
    setupDownloadButtons();
    
    // Demo interactions
    setupDemoInteractions();
    
    // Navigation functionality
    setupNavigation();
    
    // Progress tracking
    setupProgressTracking();
});

// Download button functionality
function setupDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const resourceType = this.textContent.trim();
            
            // Simulate download process
            const originalText = this.textContent;
            this.textContent = 'Đang tải...';
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.textContent = '✅ Đã tải';
                this.style.background = '#28a745';
                
                // Show download modal or notification
                showDownloadNotification(resourceType);
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                    this.style.background = '';
                }, 2000);
            }, 1500);
        });
    });
}

// Show download notification
function showDownloadNotification(resourceType) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">📁</div>
            <div class="notification-text">
                <strong>${resourceType}</strong> đã được tải xuống!
                <p>Kiểm tra thư mục Downloads của bạn</p>
            </div>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            padding: 15px;
            gap: 15px;
        }
        .notification-icon {
            font-size: 2rem;
        }
        .notification-text strong {
            display: block;
            margin-bottom: 5px;
            color: #2d3436;
        }
        .notification-text p {
            margin: 0;
            font-size: 0.9rem;
            color: #636e72;
        }
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #636e72;
            margin-left: auto;
        }
        .notification-close:hover {
            color: #2d3436;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
            document.head.removeChild(style);
        }, 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                    document.head.removeChild(style);
                }
            }, 300);
        }
    }, 5000);
}

// Demo interactions
function setupDemoInteractions() {
    // Portfolio mockup interactions
    const mockupSections = document.querySelectorAll('.content-section');
    mockupSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // CTA button animation
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${rect.width / 2 - size / 2}px;
                top: ${rect.height / 2 - size / 2}px;
                width: ${size}px;
                height: ${size}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (this.contains(ripple)) {
                    this.removeChild(ripple);
                }
            }, 600);
        });
    }
    
    // Add ripple animation styles
    if (!document.querySelector('#ripple-styles')) {
        const rippleStyles = document.createElement('style');
        rippleStyles.id = 'ripple-styles';
        rippleStyles.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            .cta-btn {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(rippleStyles);
    }
}

// Navigation functionality
function setupNavigation() {
    const startButtons = document.querySelectorAll('.start-btn');
    
    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.toLowerCase();
            
            if (action.includes('template')) {
                showTemplateModal();
            } else if (action.includes('hướng dẫn')) {
                showGuideModal();
            }
        });
    });
}

// Show template selection modal
function showTemplateModal() {
    const modal = createModal('Chọn Template', `
        <div class="template-options">
            <div class="template-option" data-template="basic">
                <h4>🎯 Basic Template</h4>
                <p>Template cơ bản với layout đơn giản</p>
                <ul>
                    <li>HTML structure cơ bản</li>
                    <li>CSS Grid layout</li>
                    <li>Responsive design</li>
                </ul>
            </div>
            <div class="template-option" data-template="advanced">
                <h4>🚀 Advanced Template</h4>
                <p>Template nâng cao với animations</p>
                <ul>
                    <li>CSS animations</li>
                    <li>JavaScript interactions</li>
                    <li>Modern CSS features</li>
                </ul>
            </div>
            <div class="template-option" data-template="complete">
                <h4>💎 Complete Template</h4>
                <p>Template hoàn chỉnh với mọi tính năng</p>
                <ul>
                    <li>Full functionality</li>
                    <li>Best practices</li>
                    <li>Production ready</li>
                </ul>
            </div>
        </div>
        <div class="modal-actions">
            <button class="download-template-btn">Tải Template</button>
        </div>
    `);
    
    // Template selection functionality
    const templateOptions = modal.querySelectorAll('.template-option');
    let selectedTemplate = 'basic';
    
    templateOptions.forEach(option => {
        option.addEventListener('click', function() {
            templateOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedTemplate = this.dataset.template;
        });
    });
    
    // Set first option as selected
    templateOptions[0].classList.add('selected');
    
    // Download template functionality
    modal.querySelector('.download-template-btn').addEventListener('click', function() {
        showDownloadNotification(`${selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Template`);
        closeModal(modal);
    });
}

// Show guide modal
function showGuideModal() {
    const modal = createModal('Hướng dẫn thực hiện', `
        <div class="guide-content">
            <div class="guide-step">
                <div class="step-number">1</div>
                <div class="step-content">
                    <h4>Chuẩn bị</h4>
                    <p>Tải template và mở trong VS Code</p>
                </div>
            </div>
            <div class="guide-step">
                <div class="step-number">2</div>
                <div class="step-content">
                    <h4>Tùy chỉnh nội dung</h4>
                    <p>Thay đổi thông tin cá nhân và portfolio</p>
                </div>
            </div>
            <div class="guide-step">
                <div class="step-number">3</div>
                <div class="step-content">
                    <h4>Styling</h4>
                    <p>Tùy chỉnh màu sắc và layout theo ý thích</p>
                </div>
            </div>
            <div class="guide-step">
                <div class="step-number">4</div>
                <div class="step-content">
                    <h4>Deploy</h4>
                    <p>Đưa website lên hosting để chia sẻ</p>
                </div>
            </div>
        </div>
    `);
}

// Modal creator utility
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .custom-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(5px);
        }
        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: modalSlideIn 0.3s ease;
        }
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: scale(0.8) translateY(-50px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 25px;
            border-bottom: 1px solid #e9ecef;
        }
        .modal-header h3 {
            margin: 0;
            color: #2d3436;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #636e72;
            padding: 5px;
        }
        .modal-close:hover {
            color: #2d3436;
        }
        .modal-body {
            padding: 25px;
        }
        .template-options {
            display: grid;
            gap: 15px;
            margin-bottom: 20px;
        }
        .template-option {
            border: 2px solid #e9ecef;
            border-radius: 10px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .template-option:hover,
        .template-option.selected {
            border-color: #667eea;
            background: #f8f9ff;
        }
        .template-option h4 {
            margin: 0 0 10px 0;
            color: #2d3436;
        }
        .template-option p {
            margin: 0 0 15px 0;
            color: #636e72;
        }
        .template-option ul {
            margin: 0;
            padding-left: 20px;
            color: #636e72;
        }
        .template-option li {
            margin: 5px 0;
        }
        .modal-actions {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
        }
        .download-template-btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            font-size: 1rem;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .download-template-btn:hover {
            transform: translateY(-2px);
        }
        .guide-content {
            display: grid;
            gap: 20px;
        }
        .guide-step {
            display: flex;
            align-items: flex-start;
            gap: 15px;
        }
        .step-number {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
        }
        .step-content h4 {
            margin: 0 0 8px 0;
            color: #2d3436;
        }
        .step-content p {
            margin: 0;
            color: #636e72;
        }
    `;
    
    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    const closeModal = () => {
        modal.style.animation = 'modalSlideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
                document.head.removeChild(modalStyles);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Add slide out animation
    modalStyles.textContent += `
        @keyframes modalSlideOut {
            from {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
            to {
                opacity: 0;
                transform: scale(0.8) translateY(-50px);
            }
        }
    `;
    
    return modal;
}

// Close modal utility
function closeModal(modal) {
    modal.style.animation = 'modalSlideOut 0.3s ease';
    setTimeout(() => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }, 300);
}

// Progress tracking
function setupProgressTracking() {
    // Track user interactions
    let userProgress = {
        viewedSections: new Set(),
        downloadedResources: new Set(),
        timeSpent: 0
    };
    
    // Track section views
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id || entry.target.className;
                userProgress.viewedSections.add(sectionId);
                updateProgressIndicator();
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
    
    // Track time spent
    let startTime = Date.now();
    setInterval(() => {
        userProgress.timeSpent = Math.floor((Date.now() - startTime) / 1000);
    }, 1000);
    
    // Update progress indicator
    function updateProgressIndicator() {
        const totalSections = sections.length;
        const viewedSections = userProgress.viewedSections.size;
        const progress = Math.round((viewedSections / totalSections) * 100);
        
        // Create or update progress indicator
        let indicator = document.querySelector('.progress-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'progress-indicator';
            indicator.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="progress-text">Tiến độ: <span class="progress-percent">0%</span></div>
            `;
            
            // Add progress styles
            const progressStyles = document.createElement('style');
            progressStyles.textContent = `
                .progress-indicator {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: white;
                    padding: 15px;
                    border-radius: 10px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                    z-index: 1000;
                    min-width: 200px;
                }
                .progress-bar {
                    height: 8px;
                    background: #e9ecef;
                    border-radius: 4px;
                    overflow: hidden;
                    margin-bottom: 10px;
                }
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    width: 0%;
                    transition: width 0.5s ease;
                }
                .progress-text {
                    font-size: 0.9rem;
                    color: #2d3436;
                    text-align: center;
                }
                .progress-percent {
                    font-weight: bold;
                    color: #667eea;
                }
            `;
            
            document.head.appendChild(progressStyles);
            document.body.appendChild(indicator);
        }
        
        // Update progress
        const progressFill = indicator.querySelector('.progress-fill');
        const progressPercent = indicator.querySelector('.progress-percent');
        
        progressFill.style.width = `${progress}%`;
        progressPercent.textContent = `${progress}%`;
    }
}

// Export functions for external use
window.LabFinalProject = {
    showDownloadNotification,
    createModal,
    closeModal
};
