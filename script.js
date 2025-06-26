// Global variables
let staffData = [];
let editingIndex = -1;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Load sample data or from localStorage
    loadSampleData();
    renderStaffGrid();
});

// Load sample data
function loadSampleData() {
    const sampleData = [
        {
            "id": "yuwaldi-away",
            "name": "Prof. Dr. Ir. Yuwaldi Away, M.Sc.",
            "title": "Profesor",
            "category": ["professor", "engineering"],
            "photo": "https://mte.usk.ac.id/wp-content/uploads/2023/02/image.png",
            "research": ["Microprocessor System", "Embedded System"]
        },
        {
            "id": "nasaruddin",
            "name": "Prof. Dr. Ir. Nasaruddin, S.T., M.Eng., IPU., ASEAN Eng.",
            "title": "Profesor",
            "category": ["professor", "computer"],
            "photo": "https://mte.usk.ac.id/wp-content/uploads/2023/02/image-3.png",
            "research": ["Digital Communications", "Information Theory", "Computer and Communication Networks"]
        }
    ];
    
    // Load from localStorage if available, otherwise use sample data
    const savedData = localStorage.getItem('mte-staff-data');
    if (savedData) {
        try {
            staffData = JSON.parse(savedData);
        } catch (e) {
            staffData = sampleData;
        }
    } else {
        staffData = sampleData;
    }
}

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('mte-staff-data', JSON.stringify(staffData));
}

// Generate ID from name
function generateId(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
}

// Get initials from name
function getInitials(name) {
    return name.split(' ')
        .map(word => word.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase();
}

// Render staff grid
function renderStaffGrid() {
    const grid = document.getElementById('staffGrid');
    
    if (staffData.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <h3>Belum ada data dosen</h3>
                <p>Mulai dengan menambah dosen baru atau memuat file JSONL yang sudah ada</p>
                <button class="btn btn-primary" onclick="addNewStaff()">
                    ➕ Tambah Dosen Pertama
                </button>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = '';
    
    staffData.forEach((staff, index) => {
        const card = createStaffCard(staff, index);
        grid.appendChild(card);
    });
}

// Create staff card
function createStaffCard(staff, index) {
    const card = document.createElement('div');
    card.className = 'staff-card';
    card.dataset.index = index;
    
    const photoElement = staff.photo ? 
        `<img src="${staff.photo}" alt="${staff.name}" class="photo-preview" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
         <div class="photo-preview" style="display: none;">${getInitials(staff.name)}</div>` :
        `<div class="photo-preview">${getInitials(staff.name)}</div>`;
    
    card.innerHTML = `
        <div class="card-actions">
            <button class="btn btn-primary btn-small" onclick="editStaff(${index})">
                ✏️ Edit
            </button>
            <button class="btn btn-danger btn-small" onclick="deleteStaff(${index})">
                🗑️ Hapus
            </button>
        </div>
        
        <div class="card-header">
            ${photoElement}
            <div class="card-info">
                <h3 style="margin-bottom: 5px; color: #2d3748;">${staff.name}</h3>
                <p style="color: #667eea; font-weight: 600; margin-bottom: 5px;">${staff.title}</p>
                <p style="color: #666; font-size: 0.9rem;">
                    ${staff.category.map(cat => {
                        const labels = {
                            'professor': 'Profesor',
                            'doctor': 'Doktor', 
                            'engineering': 'Teknik',
                            'computer': 'Komputer'
                        };
                        return labels[cat] || cat;
                    }).join(', ')}
                </p>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Bidang Penelitian:</label>
            <ul style="list-style: none; padding: 0;">
                ${staff.research.map(item => `
                    <li style="background: #f0f4f8; padding: 6px 10px; margin: 3px 0; border-radius: 6px; font-size: 0.9rem; border-left: 3px solid #667eea;">
                        ${item}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    return card;
}

// Add new staff
function addNewStaff() {
    editingIndex = -1;
    document.getElementById('modalTitle').textContent = 'Tambah Dosen Baru';
    clearForm();
    document.getElementById('staffModal').style.display = 'block';
}

// Edit staff
function editStaff(index) {
    editingIndex = index;
    const staff = staffData[index];
    
    document.getElementById('modalTitle').textContent = 'Edit Data Dosen';
    
    // Fill form with existing data
    document.getElementById('staffName').value = staff.name;
    document.getElementById('staffTitle').value = staff.title;
    document.getElementById('staffPhoto').value = staff.photo || '';
    
    // Set categories
    const checkboxes = document.querySelectorAll('.category-checkbox');
    checkboxes.forEach(cb => {
        cb.checked = staff.category.includes(cb.value);
    });
    
    // Set research fields
    const researchList = document.getElementById('researchList');
    researchList.innerHTML = '';
    staff.research.forEach(item => {
        addResearchField(item);
    });
    
    document.getElementById('staffModal').style.display = 'block';
}

// Delete staff
function deleteStaff(index) {
    if (confirm('Apakah Anda yakin ingin menghapus data dosen ini?')) {
        staffData.splice(index, 1);
        saveToLocalStorage();
        renderStaffGrid();
        showMessage('Data dosen berhasil dihapus!', 'success');
    }
}

// Clear form
function clearForm() {
    document.getElementById('staffForm').reset();
    document.getElementById('researchList').innerHTML = '';
    
    // Add one empty research field
    addResearchField();
}

// Add research field
function addResearchField(value = '') {
    const researchList = document.getElementById('researchList');
    const li = document.createElement('li');
    li.className = 'research-item';
    
    li.innerHTML = `
        <input type="text" class="research-input" value="${value}" placeholder="Masukkan bidang penelitian">
        <button type="button" class="btn-remove" onclick="removeResearchField(this)">✕</button>
    `;
    
    researchList.appendChild(li);
}

// Remove research field
function removeResearchField(button) {
    button.parentElement.remove();
}

// Close modal
function closeModal() {
    document.getElementById('staffModal').style.display = 'none';
}

// Handle form submission
document.getElementById('staffForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('staffName').value.trim();
    const title = document.getElementById('staffTitle').value;
    const photo = document.getElementById('staffPhoto').value.trim();
    
    // Get selected categories
    const categories = Array.from(document.querySelectorAll('.category-checkbox:checked'))
        .map(cb => cb.value);
    
    // Get research fields
    const researchInputs = document.querySelectorAll('.research-input');
    const research = Array.from(researchInputs)
        .map(input => input.value.trim())
        .filter(value => value !== '');
    
    // Validation
    if (!name || !title || categories.length === 0) {
        showMessage('Mohon lengkapi semua field yang wajib diisi!', 'error');
        return;
    }
    
    const staffObject = {
        id: generateId(name),
        name: name,
        title: title,
        category: categories,
        photo: photo || null,
        research: research
    };
    
    if (editingIndex >= 0) {
        // Update existing staff
        staffData[editingIndex] = staffObject;
        showMessage('Data dosen berhasil diperbarui!', 'success');
    } else {
        // Add new staff
        staffData.push(staffObject);
        showMessage('Dosen baru berhasil ditambahkan!', 'success');
    }
    
    saveToLocalStorage();
    renderStaffGrid();
    closeModal();
});

// Load file
function loadFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const content = e.target.result;
            const lines = content.trim().split('\n');
            const newData = lines
                .filter(line => line.trim())
                .map(line => JSON.parse(line));
            
            if (confirm(`File berisi ${newData.length} data dosen. Apakah Anda ingin mengganti semua data yang ada?`)) {
                staffData = newData;
                saveToLocalStorage();
                renderStaffGrid();
                showMessage(`Berhasil memuat ${newData.length} data dosen!`, 'success');
            }
        } catch (error) {
            showMessage('Error: File JSONL tidak valid!', 'error');
        }
    };
    reader.readAsText(file);
}

// Download JSONL
function downloadJSONL() {
    if (staffData.length === 0) {
        showMessage('Tidak ada data untuk diunduh!', 'error');
        return;
    }
    
    const jsonlContent = staffData.map(staff => JSON.stringify(staff)).join('\n');
    const blob = new Blob([jsonlContent], { type: 'application/jsonl' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data-dosen.jsonl';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage('File JSONL berhasil diunduh!', 'success');
}

// Clear all data
function clearAllData() {
    if (confirm('Apakah Anda yakin ingin menghapus SEMUA data dosen? Tindakan ini tidak dapat dibatalkan!')) {
        staffData = [];
        saveToLocalStorage();
        renderStaffGrid();
        showMessage('Semua data berhasil dihapus!', 'success');
    }
}

// Filter staff
function filterStaff() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    const cards = document.querySelectorAll('.staff-card');
    
    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const research = Array.from(card.querySelectorAll('li'))
            .map(li => li.textContent.toLowerCase())
            .join(' ');
        
        if (name.includes(searchTerm) || research.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Show message
function showMessage(message, type) {
    const messageEl = document.getElementById('statusMessage');
    messageEl.textContent = message;
    messageEl.className = `status-message status-${type}`;
    messageEl.style.display = 'block';
    
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 5000);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('staffModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Ctrl+N to add new staff
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        addNewStaff();
    }
    
    // Ctrl+S to download
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        downloadJSONL();
    }
});
