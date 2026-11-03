const photoInput = document.getElementById('photoInput');
const chooseBtn = document.getElementById('chooseBtn');
const clearBtn = document.getElementById('clearBtn');
const gallery = document.getElementById('gallery');
const albumTitle = document.getElementById('albumTitle');
const previewTitle = document.getElementById('previewTitle');
const photoCount = document.getElementById('photoCount');

let photos = [];

chooseBtn.addEventListener('click', () => photoInput.click());

photoInput.addEventListener('change', (event) => {
  const selected = Array.from(event.target.files);
  selected.forEach(file => {
    if (file.type.startsWith('image/')) {
      photos.push({ id: crypto.randomUUID(), url: URL.createObjectURL(file) });
    }
  });
  photoInput.value = '';
  renderGallery();
});

albumTitle.addEventListener('input', () => {
  previewTitle.textContent = albumTitle.value.trim() || 'Albumul meu';
});

clearBtn.addEventListener('click', () => {
  photos.forEach(photo => URL.revokeObjectURL(photo.url));
  photos = [];
  renderGallery();
});

function renderGallery() {
  photoCount.textContent = photos.length === 1
    ? '1 fotografie adăugată'
    : `${photos.length} fotografii adăugate`;

  if (photos.length === 0) {
    gallery.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">▧</div>
        <p>Fotografiile tale vor apărea aici.</p>
        <small>Începe prin a adăuga câteva imagini.</small>
      </div>`;
    return;
  }

  gallery.innerHTML = '';
  photos.forEach(photo => {
    const card = document.createElement('div');
    card.className = 'photo-card';

    const image = document.createElement('img');
    image.src = photo.url;
    image.alt = 'Fotografie din album';

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-photo';
    removeButton.type = 'button';
    removeButton.textContent = '×';
    removeButton.setAttribute('aria-label', 'Șterge fotografia');
    removeButton.addEventListener('click', () => {
      URL.revokeObjectURL(photo.url);
      photos = photos.filter(item => item.id !== photo.id);
      renderGallery();
    });

    card.append(image, removeButton);
    gallery.appendChild(card);
  });
}
