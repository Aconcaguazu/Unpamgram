// ==========================================================
// UNPAMGRAM COMBINED SCRIPTS & NOTIFICATIONS POPUP CONTROLLER
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Popup Notifications Flyout Controller
    const notifTrigger = document.getElementById('openNotifBtn');
    const notifPopup = document.getElementById('notifPopupPanel');
    const notifBackdrop = document.getElementById('notifBackdrop');
    const closeNotifBtn = document.getElementById('closeNotifBtn');

    if (notifTrigger && notifPopup && notifBackdrop) {
        notifTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            notifPopup.classList.add('active');
            notifBackdrop.classList.add('active');
        });

        const closeNotif = () => {
            notifPopup.classList.remove('active');
            notifBackdrop.classList.remove('active');
        };

        if (closeNotifBtn) closeNotifBtn.addEventListener('click', closeNotif);
        notifBackdrop.addEventListener('click', closeNotif);
    }

    // 2. Filter Chips Interaction pada Popup Notifications
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            filterChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 3. Toggle Like Post & Reels Button
    const initLikeButtons = () => {
        const likeBtns = document.querySelectorAll('.like-btn');
        likeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                const postCard = this.closest('.post-card') || this.closest('.reel-card');
                if (!postCard) return;
                
                const likesSpan = postCard.querySelector('.likes-number') || this.querySelector('span');
                
                if (this.classList.contains('liked')) {
                    this.classList.remove('liked');
                    icon.classList.replace('fa-solid', 'fa-regular');
                } else {
                    this.classList.add('liked');
                    icon.classList.replace('fa-regular', 'fa-solid');
                }
            });
        });
    };

    // 4. Add New Comment (Post Feed)
    const initCommentSubmit = () => {
        const sendBtns = document.querySelectorAll('.send-comment-btn');
        sendBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const addBox = this.closest('.add-comment-box');
                const input = addBox.querySelector('.comment-input');
                const text = input.value.trim();

                if (text !== '') {
                    const postDetails = this.closest('.post-details');
                    const newComment = document.createElement('div');
                    newComment.className = 'caption';
                    newComment.style.marginTop = '4px';
                    newComment.innerHTML = `<span class="caption-username">dimasafzal_</span> ${text}`;
                    
                    postDetails.insertBefore(newComment, addBox);
                    input.value = '';
                }
            });
        });
    };

    // 5. Modal Upload Create Post
    const uploadModal = document.getElementById('uploadModal');
    const openUploadBtn = document.getElementById('openUploadBtn');
    const closeUploadBtn = document.getElementById('closeUploadBtn');
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const submitPostBtn = document.getElementById('submitPostBtn');
    const captionInput = document.getElementById('captionInput');
    const postsStream = document.getElementById('postsStream');

    let selectedImageSrc = '';

    if (openUploadBtn && uploadModal) {
        openUploadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            uploadModal.classList.add('active');
        });
    }

    if (closeUploadBtn && uploadModal) {
        closeUploadBtn.addEventListener('click', () => {
            uploadModal.classList.remove('active');
        });
    }

    if (imagePreview) {
        imagePreview.addEventListener('click', () => imageInput.click());
    }

    if (imageInput) {
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    selectedImageSrc = evt.target.result;
                    imagePreview.style.backgroundImage = `url('${selectedImageSrc}')`;
                    imagePreview.innerHTML = '';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (submitPostBtn && postsStream) {
        submitPostBtn.addEventListener('click', () => {
            const captionText = captionInput.value.trim();
            const imageToPost = selectedImageSrc || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80';

            if (!captionText) {
                alert('Silakan tuliskan caption!');
                return;
            }

            const newPost = document.createElement('article');
            newPost.className = 'post-card';
            newPost.innerHTML = `
                <div class="post-header">
                    <div class="post-author">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Author" class="author-avatar">
                        <div class="author-info">
                            <span class="author-username">dimasafzal_</span>
                            <span class="post-dot">•</span>
                            <span class="post-time">Just now</span>
                        </div>
                    </div>
                    <button class="more-btn"><i class="fa-solid fa-ellipsis"></i></button>
                </div>
                <div class="post-media">
                    <img src="${imageToPost}" alt="Post content" class="post-img">
                </div>
                <div class="post-actions">
                    <div class="actions-left">
                        <button class="action-btn like-btn"><i class="fa-regular fa-heart"></i></button>
                        <button class="action-btn"><i class="fa-regular fa-comment"></i></button>
                        <button class="action-btn"><i class="fa-regular fa-paper-plane"></i></button>
                    </div>
                    <button class="action-btn"><i class="fa-regular fa-bookmark"></i></button>
                </div>
                <div class="post-details">
                    <p class="likes-text">Liked by <strong><span class="likes-number">1</span> person</strong></p>
                    <div class="caption">
                        <span class="caption-username">dimasafzal_</span> ${captionText}
                    </div>
                    <div class="add-comment-box">
                        <input type="text" placeholder="Add a comment..." class="comment-input">
                        <button class="send-comment-btn">Post</button>
                    </div>
                </div>
            `;

            postsStream.prepend(newPost);
            initLikeButtons();
            initCommentSubmit();

            captionInput.value = '';
            selectedImageSrc = '';
            imagePreview.style.backgroundImage = 'none';
            imagePreview.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i><span>Pilih foto dari komputer</span>';
            uploadModal.classList.remove('active');
        });
    }

    // 6. Search Filter di Halaman Explore
    const searchInput = document.getElementById('searchInput');
    const exploreItems = document.querySelectorAll('.explore-item');

    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const query = e.target.value.toLowerCase().trim();
            exploreItems.forEach(item => {
                if (query === '') {
                    item.style.display = 'block';
                } else {
                    item.style.display = Math.random() > 0.4 ? 'block' : 'none';
                }
            });
        });
    }

    // 7. Navigasi Panah Up/Down Reels
    const prevReelBtn = document.getElementById('prevReelBtn');
    const nextReelBtn = document.getElementById('nextReelBtn');
    const reelsFeed = document.getElementById('reelsFeed');

    if (reelsFeed && nextReelBtn && prevReelBtn) {
        nextReelBtn.addEventListener('click', () => {
            reelsFeed.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        });

        prevReelBtn.addEventListener('click', () => {
            reelsFeed.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        });
    }

    initLikeButtons();
    initCommentSubmit();
});

// ==========================================================
// TWO-STEP CREATE NEW POST MODAL CONTROLLER
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    const uploadModal = document.getElementById('uploadModal');
    const openUploadBtn = document.getElementById('openUploadBtn');
    const closeUploadBtn = document.getElementById('closeUploadBtn');
    const modalBoxCreate = document.getElementById('modalBoxCreate');
    const modalBackBtn = document.getElementById('modalBackBtn');
    
    const triggerSelectFile = document.getElementById('triggerSelectFile');
    const imageInput = document.getElementById('imageInput');
    const editorPreviewImg = document.getElementById('editorPreviewImg');
    
    const captionInput = document.getElementById('captionInput');
    const charCounter = document.getElementById('charCounter');
    const submitPostBtn = document.getElementById('submitPostBtn');
    const postsStream = document.getElementById('postsStream');

    let uploadedImageSrc = '';

    // Fungsi Reset Modal ke Tahap 1
    const resetCreateModal = () => {
        modalBoxCreate.classList.remove('step-2');
        imageInput.value = '';
        editorPreviewImg.src = '';
        captionInput.value = '';
        if (charCounter) charCounter.textContent = '0/2,200';
        uploadedImageSrc = '';
    };

    // Buka Modal ketika tombol Create di Sidebar diklik
    if (openUploadBtn && uploadModal) {
        openUploadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resetCreateModal();
            uploadModal.classList.add('active');
        });
    }

    // Tutup Modal
    const closeModal = () => {
        uploadModal.classList.remove('active');
        setTimeout(resetCreateModal, 300);
    };

    if (closeUploadBtn) closeUploadBtn.addEventListener('click', closeModal);
    
    // Tombol Kembali dari Tahap 2 ke Tahap 1
    if (modalBackBtn) {
        modalBackBtn.addEventListener('click', () => {
            modalBoxCreate.classList.remove('step-2');
        });
    }

    // Trigger Klik Input File
    if (triggerSelectFile && imageInput) {
        triggerSelectFile.addEventListener('click', () => {
            imageInput.click();
        });
    }

    // Ketika File Foto Dipilih -> Berpindah ke Tahap 2
    if (imageInput) {
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    uploadedImageSrc = evt.target.result;
                    editorPreviewImg.src = uploadedImageSrc;
                    modalBoxCreate.classList.add('step-2');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Live Counter Karakter Caption
    if (captionInput && charCounter) {
        captionInput.addEventListener('input', () => {
            const len = captionInput.value.length;
            charCounter.textContent = `${len.toLocaleString()}/2,200`;
        });
    }

    // Publish Postingan (Share)
    if (submitPostBtn) {
        submitPostBtn.addEventListener('click', () => {
            const captionText = captionInput.value.trim();
            
            if (!uploadedImageSrc) {
                alert('Silakan pilih foto terlebih dahulu!');
                return;
            }

            // Jika berada di index.html (ada postsStream), postingan ditambahkan di paling atas feed
            if (postsStream) {
                const newPost = document.createElement('article');
                newPost.className = 'post-card';
                newPost.innerHTML = `
                    <div class="post-header">
                        <div class="post-author">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Author" class="author-avatar">
                            <div class="author-info">
                                <span class="author-username">dimasafzal_</span>
                                <span class="post-dot">•</span>
                                <span class="post-time">Just now</span>
                            </div>
                        </div>
                        <button class="more-btn"><i class="fa-solid fa-ellipsis"></i></button>
                    </div>
                    <div class="post-media">
                        <img src="${uploadedImageSrc}" alt="Post content" class="post-img">
                    </div>
                    <div class="post-actions">
                        <div class="actions-left">
                            <button class="action-btn like-btn"><i class="fa-regular fa-heart"></i></button>
                            <button class="action-btn"><i class="fa-regular fa-comment"></i></button>
                            <button class="action-btn"><i class="fa-regular fa-paper-plane"></i></button>
                        </div>
                        <button class="action-btn"><i class="fa-regular fa-bookmark"></i></button>
                    </div>
                    <div class="post-details">
                        <p class="likes-text">Liked by <strong><span class="likes-number">1</span> person</strong></p>
                        <div class="caption">
                            <span class="caption-username">dimasafzal_</span> ${captionText}
                        </div>
                        <div class="add-comment-box">
                            <input type="text" placeholder="Add a comment..." class="comment-input">
                            <button class="send-comment-btn">Post</button>
                        </div>
                    </div>
                `;
                postsStream.prepend(newPost);
            }

            closeModal();
        });
    }
});