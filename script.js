// DOM Elements
const modal = document.getElementById('hiHelpModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalTextarea = document.getElementById('modalTextarea');
const modalSendBtn = document.getElementById('modalSendBtn');
const menuBtn = document.getElementById('menuBtn');
const notificationBtn = document.getElementById('notificationBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  addEventListeners();
  animateOnLoad();
});

// Initialize app functionality
function initializeApp() {
  // Add loading animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
}

// Add all event listeners
function addEventListeners() {
  // Hi Help button
  document.querySelector('.hi-help').addEventListener('click', () => {
    openModal('Hi Help', 'How can I assist you today?');
  });

  // Dashboard grid items
  document.querySelectorAll('[data-action]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const action = item.getAttribute('data-action');
      handleGridAction(action, item);
    });
  });

  // Modal functionality
  closeModal.addEventListener('click', closeModalHandler);
  modalSendBtn.addEventListener('click', sendMessage);
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModalHandler();
    }
  });

  // Header buttons
  menuBtn.addEventListener('click', toggleMenu);
  notificationBtn.addEventListener('click', showNotifications);
  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });

  // Bottom navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      handleNavigation(item);
    });
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Handle grid item actions
function handleGridAction(action, element) {
  // Add click animation
  element.style.transform = 'scale(0.95)';
  setTimeout(() => {
    element.style.transform = '';
  }, 150);

  switch (action) {
    case 'test':
      openModal('Give Test', 'Start a practice test or quiz. Choose your subject and difficulty level.');
      break;
    case 'progress':
      openModal('Track Progress', 'View your performance statistics and learning analytics.');
      break;
    case 'virtual-class':
      openModal('Private Virtual Class', 'Create or join a private study group with your friends.');
      break;
    case 'notes':
      openModal('Notes & Resources', 'Browse class notes, study materials, and educational resources.');
      break;
    case 'events':
      openModal('Events & Announcements', 'See upcoming events, deadlines, and important announcements.');
      break;
    case 'study-groups':
      openModal('Study Groups', 'Join or create study groups to collaborate with classmates.');
      break;
    default:
      console.log('Unknown action:', action);
  }
}

// Enhanced modal functionality
function openModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modalTextarea.style.display = 'block';
  modalSendBtn.style.display = 'inline-block';
  modalTextarea.value = '';
  modal.style.display = 'flex';
  
  // Focus on textarea
  setTimeout(() => {
    modalTextarea.focus();
  }, 300);
}

function closeModalHandler() {
  modal.style.display = 'none';
  modalTextarea.value = '';
}

function sendMessage() {
  const message = modalTextarea.value.trim();
  if (message) {
    // Simulate sending message
    showNotification('Message sent!', 'success');
    closeModalHandler();
  } else {
    showNotification('Please enter a message', 'error');
  }
}

// Menu functionality
function toggleMenu() {
  showNotification('Menu functionality coming soon!', 'info');
}

// Search functionality
function handleSearch() {
  const query = searchInput.value.trim();
  if (query) {
    showNotification(`Searching for "${query}"...`, 'info');
    // Simulate search functionality
    setTimeout(() => {
      showNotification(`Found 5 results for "${query}"`, 'success');
    }, 1000);
  } else {
    showNotification('Please enter a search term', 'error');
  }
}

// Notification system
function showNotifications() {
  showNotification('You have 3 new notifications', 'info');
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: type === 'error' ? '#ff6b6b' : type === 'success' ? '#51cf66' : '#667eea',
    color: 'white',
    padding: '16px 24px',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    zIndex: '10000',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    fontWeight: '500',
    maxWidth: '300px'
  });
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Navigation handling
function handleNavigation(item) {
  // Remove active class from all items
  document.querySelectorAll('.nav-item').forEach(nav => {
    nav.classList.remove('active');
  });
  
  // Add active class to clicked item
  item.classList.add('active');
  
  // Handle navigation actions
  const text = item.textContent.trim();
  switch (text) {
    case 'Home':
      showNotification('Welcome to Campus Connect!', 'success');
      break;
    case 'Dashboard':
      showNotification('You are already on the dashboard', 'info');
      break;
    case 'Hi Help':
      openModal('Hi Help', 'How can I assist you today?');
      break;
    case 'Notes':
      openModal('Notes & Resources', 'Browse your study materials and notes.');
      break;
    case 'Profile':
      openModal('Profile', 'Manage your account settings and preferences.');
      break;
  }
}

// Keyboard shortcuts
function handleKeyboardShortcuts(e) {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case 'h':
        e.preventDefault();
        openModal('Hi Help', 'How can I assist you today?');
        break;
      case 'n':
        e.preventDefault();
        showNotifications();
        break;
    }
  }
  
  if (e.key === 'Escape') {
    closeModalHandler();
  }
}

// Loading animations
function animateOnLoad() {
  // Animate grid items
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      item.style.transition = 'all 0.5s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 100);
  });
  
  // Animate welcome section
  const welcomeSection = document.querySelector('.welcome-section');
  if (welcomeSection) {
    welcomeSection.style.opacity = '0';
    welcomeSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      welcomeSection.style.transition = 'all 0.6s ease';
      welcomeSection.style.opacity = '1';
      welcomeSection.style.transform = 'translateY(0)';
    }, 200);
  }
}

