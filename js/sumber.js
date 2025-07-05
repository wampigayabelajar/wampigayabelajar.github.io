document.addEventListener('DOMContentLoaded', () => {
    const sourcesList = document.getElementById('sources-list');
    const searchBar = document.getElementById('search-bar');
    const params = new URLSearchParams(window.location.search);
    let activeStyles = [];

    const stylesParam = params.get('styles');
    const styleParam = params.get('style');

    if (stylesParam) {
        activeStyles = stylesParam.split(',').map(s => s.trim().toUpperCase());
    } else if (styleParam) {
        activeStyles = [styleParam.trim().toUpperCase()];
    } else {
        activeStyles = ['ALL']; // Default to all if no specific style is provided
    }

    const learningResources = {
        V: {
            title: "Sumber Belajar untuk Gaya Visual",
            description: "Kamu adalah pembelajar visual yang hebat! Kamu memiliki kemampuan istimewa untuk belajar melalui gambar, diagram, dan visualisasi.",
            tips: [
                "Buatlah mind mapping untuk setiap topik baru yang kamu pelajari",
                "Gunakan highlighter warna-warni untuk menandai poin penting",
                "Tempel poster atau infografis di dinding kamarmu",
                "Rekam penjelasan guru dalam bentuk sketsa atau diagram",
                "Buat flashcard dengan gambar dan warna menarik"
            ],
            resources: [
                {
                    title: "YouTube Educational Channels",
                    description: "Channel pendidikan dengan visualisasi menarik",
                    links: ["Crash Course", "Khan Academy", "TED-Ed", "Kurzgesagt"],
                    icon: "fab fa-youtube"
                },
                {
                    title: "Mind Mapping Tools",
                    description: "Aplikasi untuk membuat peta pikiran digital",
                    links: ["MindMeister", "XMind", "Coggle", "MindMup"],
                    icon: "fas fa-project-diagram"
                },
                {
                    title: "Visual Learning Platforms",
                    description: "Platform belajar berbasis visual",
                    links: ["Canva Education", "Prezi", "Piktochart", "Adobe Creative Cloud Express"],
                    icon: "fas fa-palette"
                }
            ]
        },
        A: {
            title: "Sumber Belajar untuk Gaya Auditori",
            description: "Kamu adalah pembelajar auditori yang luar biasa! Kamu memiliki bakat alami untuk belajar melalui suara dan diskusi.",
            tips: [
                "Rekam dirimu membaca materi pelajaran",
                "Ikuti atau buat kelompok diskusi",
                "Jelaskan konsep yang kamu pelajari kepada orang lain",
                "Gunakan musik atau ritme untuk mengingat informasi",
                "Buat jingle atau lagu dari materi yang dipelajari"
            ],
            resources: [
                {
                    title: "Podcast Edukatif",
                    description: "Podcast yang membahas berbagai topik pembelajaran",
                    links: ["Spotify Education", "Apple Education Podcasts", "NPR Learning", "Educational Podcasts"],
                    icon: "fas fa-podcast"
                },
                {
                    title: "Audiobook Platforms",
                    description: "Platform buku audio untuk pembelajaran",
                    links: ["Audible Education", "Storytel", "Google Audiobooks", "Scribd"],
                    icon: "fas fa-headphones"
                },
                {
                    title: "Discussion Forums",
                    description: "Forum diskusi online untuk berbagai mata pelajaran",
                    links: ["Reddit Education", "Brainly", "Stack Exchange", "Quora Education"],
                    icon: "fas fa-comments"
                }
            ]
        },
        K: {
            title: "Sumber Belajar untuk Gaya Kinestetik",
            description: "Kamu adalah pembelajar kinestetik yang dinamis! Kamu memiliki keunggulan dalam belajar melalui gerakan dan pengalaman langsung.",
            tips: [
                "Lakukan eksperimen dan proyek praktis",
                "Gunakan gerakan tubuh saat menghafal",
                "Ambil jeda aktif di antara sesi belajar",
                "Buat model atau diorama untuk topik yang dipelajari",
                "Ikuti workshop atau kelas praktek"
            ],
            resources: [
                {
                    title: "Interactive Learning Apps",
                    description: "Aplikasi pembelajaran interaktif",
                    links: ["Duolingo", "Kahoot!", "Quizlet", "Minecraft Education"],
                    icon: "fas fa-mobile-alt"
                },
                {
                    title: "DIY Project Platforms",
                    description: "Platform untuk proyek pembelajaran hands-on",
                    links: ["Instructables", "DIY.org", "Maker Kids", "Science Buddies"],
                    icon: "fas fa-tools"
                },
                {
                    title: "Virtual Labs",
                    description: "Laboratorium virtual untuk eksperimen",
                    links: ["PhET Interactive Simulations", "Labster", "Virtual Biology Lab", "ChemCollective"],
                    icon: "fas fa-flask"
                }
            ]
        }
    };

    function displayMotivationalHeader(styles) {
        const styleNames = {
            'V': 'Visual',
            'A': 'Auditori',
            'K': 'Kinestetik',
            'ALL': 'Semua Gaya'
        };

        const motivationalMessages = {
            'V': "🌟 Dengan kekuatan visualmu, kamu bisa mengubah setiap informasi menjadi gambar yang bermakna!",
            'A': "🎵 Dengan kemampuan mendengarmu yang hebat, setiap suara adalah kesempatan untuk belajar!",
            'K': "💪 Dengan energi dan semangat bergerakmu, kamu bisa mengubah setiap aktivitas menjadi pembelajaran!",
            'ALL': "✨ Setiap orang memiliki cara belajar unik. Temukan dan kembangkan potensimu!"
        };

        let headerText = "";
        let messageText = "";

        if (styles.includes('ALL') || styles.length === 0) {
            headerText = `Selamat Datang di ${styleNames['ALL']} Learning Hub!`;
            messageText = motivationalMessages['ALL'];
        } else if (styles.length === 1) {
            const styleKey = styles[0];
            headerText = `Selamat Datang di ${styleNames[styleKey]} Learning Hub!`;
            messageText = motivationalMessages[styleKey];
        } else {
            const dominantNames = styles.map(key => styleNames[key]);
            const lastDominantName = dominantNames.pop();
            const combinedNames = dominantNames.length > 0 ? `${dominantNames.join(', ')} dan ${lastDominantName}` : lastDominantName;
            headerText = `Selamat Datang di Kombinasi Gaya Belajar ${combinedNames} Learning Hub!`;
            messageText = `✨ Dengan kombinasi gaya belajarmu, kamu memiliki pendekatan yang kaya untuk memahami dunia. Manfaatkan kekuatan gabunganmu!`;
        }

        return `
            <div class="col-12 mb-4">
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading"><i class="fas fa-star me-2"></i>${headerText}</h4>
                    <p class="mb-0">${messageText}</p>
                </div>
            </div>
        `;
    }

    function displayResources(styles) {
        let resourcesToShow = [];
        if (styles.includes('ALL')) {
            resourcesToShow = [...Object.keys(learningResources)];
        } else {
            resourcesToShow = styles;
        }

        const resourceHtml = resourcesToShow.map(styleKey => {
            const styleData = learningResources[styleKey];
            const resourceClass = {
                'V': 'visual-resource',
                'A': 'auditory-resource',
                'K': 'kinesthetic-resource'
            }[styleKey];

            return `
                <div class="col-12 mb-4">
                    ${(() => {
                        const styleColors = {
                            'V': 'primary',
                            'A': 'warning',
                            'K': 'danger'
                        };
                        const bgColors = {
                            'V': '#007bff',
                            'A': '#ffc107',
                            'K': '#dc3545'
                        };
                        const textColors = {
                            'V': 'white',
                            'A': 'dark',
                            'K': 'white'
                        };
                        return `
                            <div class="rounded p-4 mb-4" style="background-color: ${bgColors[styleKey]};">
                                <div class="border rounded p-4 mb-4" style="border-width: 3px !important; border-color: #FF8C00 !important;">
                                    <h3 class="mb-3 text-${textColors[styleKey]} fw-bold">${styleData.title}</h3>
                                    <p class="lead text-${textColors[styleKey]} mb-4">${styleData.description}</p>
                                    
                                    <div class="tips-section">
                                        <h4 class="text-${textColors[styleKey]} mb-3">Tips Belajar:</h4>
                                        <ul class="list-unstyled mb-0">
                                            ${styleData.tips.map(tip => `
                                                <li class="mb-2 text-${textColors[styleKey]}">
                                                    <i class="fas fa-check-circle me-2"></i>${tip}
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                </div>

                                <div class="resources-section">
                                    ${styleData.resources.map((resource, index) => {
                                        let backgroundColor, textColor;
                                        
                                        if (resource.title === "YouTube Educational Channels") {
                                            backgroundColor = '#90EE90'; // Light green
                                            textColor = 'dark';
                                        } else if (resource.title === "Podcast Edukatif") {
                                            backgroundColor = '#FFB6C1'; // Light pink
                                            textColor = 'dark';
                                        } else if (resource.title === "Audiobook Platforms") {
                                            backgroundColor = '#DEB887'; // Light brown (BurlyWood)
                                            textColor = 'dark';
                                        } else if (resource.title === "Interactive Learning Apps") {
                                            backgroundColor = '#E6E6FA'; // Lavender
                                            textColor = 'dark';
                                        } else if (resource.title === "Virtual Labs") {
                                            backgroundColor = '#E0FFFF'; // Light Cyan
                                            textColor = 'dark';
                                        } else if (resource.title === "Sumber Belajar untuk Gaya Kinestetik") {
                                            backgroundColor = '#FFD580'; // Light Orange
                                            textColor = 'dark';
                                        } else {
                                            const sectionColors = [
                                                { bg: '#ffc107', text: 'dark' },   // Yellow
                                                { bg: '#dc3545', text: 'white' }   // Red
                                            ];
                                            const colorIndex = index > 0 ? (index - 1) % sectionColors.length : 0;
                                            backgroundColor = sectionColors[colorIndex].bg;
                                            textColor = sectionColors[colorIndex].text;
                                        }
                                        
                                        return `
                                            <div class="resource-card mb-4 rounded p-4" style="background-color: ${backgroundColor};">
                                                <div class="text-center mb-3">
                                                    <i class="${resource.icon} fa-2x text-${textColor}"></i>
                                                    <h5 class="card-title mt-2 text-${textColor} fw-bold">${resource.title}</h5>
                                                    <p class="text-${textColor}">${resource.description}</p>
                                                </div>
                                                <div class="platform-list">
                                                    <h6 class="text-${textColor} mb-2 fw-bold">Tips Belajar:</h6>
                                                    <ul class="list-unstyled mb-0">
                                                        ${resource.links.map(link => `
                                                            <li class="mb-2">
                                                                <i class="fas fa-check me-2 text-${textColor}"></i>
                                                                <span class="text-${textColor}">${link}</span>
                                                            </li>
                                                        `).join('')}
                                                    </ul>
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        `;
                    })()}
                </div>
            `;
        }).join('');

        // Tambahkan tombol menuju halaman feedback
        const feedbackButtonHtml = `
            <div class="col-12 text-center mt-4">
                <div class="alert alert-info bg-light" role="alert">
                    <h4 class="alert-heading mb-3 text-dark"><i class="fas fa-comment-dots me-2"></i>Bagikan Pengalamanmu!</h4>
                    <p class="mb-3 text-dark">Bantu kami meningkatkan layanan dengan memberikan saran dan kritik.</p>
                    <hr>
                    <p class="mb-0 text-dark">Suaramu sangat berarti untuk perkembangan aplikasi ini!</p>
                </div>
                <a href="log.html" class="btn btn-lg btn-primary">
                    <i class="fas fa-paper-plane me-2"></i>Berikan Feedback
                </a>
            </div>
        `;

        return resourceHtml + feedbackButtonHtml;
    }

    // Implementasi pencarian
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const allElements = sourcesList.getElementsByClassName('source-card');
        
        Array.from(allElements).forEach(card => {
            const cardText = card.textContent.toLowerCase();
            card.closest('.col-md-6').style.display = 
                cardText.includes(searchTerm) ? 'block' : 'none';
        });
    });

    // Tampilkan konten saat halaman dimuat
    sourcesList.innerHTML = `
        ${displayMotivationalHeader(activeStyles)}
        ${displayResources(activeStyles)}
    `;
}); 