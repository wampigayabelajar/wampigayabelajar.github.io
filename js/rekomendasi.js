document.addEventListener('DOMContentLoaded', () => {
    const recommendationListContainer = document.getElementById('recommendation-list');
    
    // Get scores from URL parameters
    const params = new URLSearchParams(window.location.search);
    const scores = {
        v: parseInt(params.get('v')) || 0,
        a: parseInt(params.get('a')) || 0,
        k: parseInt(params.get('k')) || 0
    };

    // Check if we have valid scores
    const total = scores.v + scores.a + scores.k;
    if (total === 0) {
        recommendationListContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning" role="alert">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Maaf, sepertinya Anda belum mengisi kuesioner gaya belajar.
                    <hr>
                    <a href="kuesioner.html" class="btn btn-primary">
                        <i class="fas fa-tasks me-2"></i>Isi Kuesioner Sekarang
                    </a>
                </div>
            </div>
        `;
        return;
    }

    const allRecommendations = {
        V: [
            {
                title: 'Mind Mapping',
                icon: 'fas fa-project-diagram',
                description: 'Buat peta konsep dengan cabang-cabang untuk menghubungkan ide-ide utama dan detail. Gunakan warna dan gambar untuk memperkuat ingatan.',
                benefit: 'Sangat efektif untuk melihat gambaran besar dan hubungan antar konsep secara visual.'
            },
            {
                title: 'Kartu Flash (Flashcards) dengan Gambar',
                icon: 'far fa-clone',
                description: 'Gunakan kartu dengan istilah di satu sisi dan gambar atau diagram yang relevan di sisi lain. Ini memperkuat hubungan visual dengan informasi.',
                benefit: 'Membantu menghafal istilah dan definisi dengan isyarat visual yang kuat.'
            },
            {
                title: 'Menonton Video Pembelajaran',
                icon: 'fas fa-video',
                description: 'Platform seperti YouTube atau Khan Academy menyajikan informasi melalui demonstrasi visual dan animasi yang mudah dipahami.',
                benefit: 'Memungkinkan Anda untuk "melihat" konsep beraksi, yang sangat membantu pemahaman.'
            },
            {
                title: 'Kode Warna pada Catatan',
                icon: 'fas fa-palette',
                description: 'Gunakan stabilo atau pulpen warna-warni untuk mengkategorikan informasi. Misalnya, kuning untuk definisi, hijau untuk contoh.',
                benefit: 'Warna membantu otak Anda mengelompokkan dan memprioritaskan informasi dengan cepat.'
            }
        ],
        A: [
            {
                title: 'Diskusi Kelompok atau Debat',
                icon: 'fas fa-users',
                description: 'Bicarakan materi pelajaran dengan teman. Menjelaskan konsep kepada orang lain adalah cara yang bagus untuk memperkuat pemahaman Anda.',
                benefit: 'Memungkinkan Anda mendengar berbagai perspektif dan memproses informasi melalui percakapan.'
            },
            {
                title: 'Mendengarkan Rekaman (Podcast/Audiobook)',
                icon: 'fas fa-podcast',
                description: 'Rekam penjelasan guru atau cari podcast edukatif yang relevan. Dengarkan saat bepergian atau berolahraga.',
                benefit: 'Memungkinkan Anda belajar secara fleksibel sambil menyerap informasi melalui pendengaran.'
            },
            {
                title: 'Membaca dengan Suara Keras',
                icon: 'fas fa-bullhorn',
                description: 'Bacalah materi pelajaran Anda dengan suara keras. Mendengar suara Anda sendiri dapat meningkatkan retensi informasi.',
                benefit: 'Menggabungkan proses membaca visual dengan penguatan auditori.'
            },
            {
                title: 'Menggunakan Jembatan Keledai (Mnemonics)',
                icon: 'fas fa-lightbulb',
                description: 'Buat akronim atau lagu singkat untuk menghafal daftar atau urutan. Contoh: "Mejikuhibiniu" untuk warna pelangi.',
                benefit: 'Ritme dan rima memudahkan otak auditori Anda untuk mengingat informasi.'
            }
        ],
        K: [
            {
                title: 'Belajar Sambil Beraktivitas Fisik',
                icon: 'fas fa-walking',
                description: 'Cobalah berjalan bolak-balik atau menggunakan bola stres saat menghafal. Gerakan fisik dapat membantu menjaga fokus Anda.',
                benefit: 'Menyalurkan kebutuhan Anda untuk bergerak menjadi energi untuk belajar.'
            },
            {
                title: 'Simulasi atau Permainan Peran (Role-Playing)',
                icon: 'fas fa-gamepad',
                description: 'Peragakan sebuah skenario sejarah atau proses ilmiah. Bertindak sebagai "pelaku" membuat materi menjadi nyata dan mudah diingat.',
                benefit: 'Belajar dengan melakukan adalah inti dari gaya kinestetik. Ini menciptakan ingatan otot.'
            },
            {
                title: 'Membangun Model atau Diorama',
                icon: 'fas fa-cubes',
                description: 'Buat model 3D dari sel, bangunan bersejarah, atau konsep abstrak lainnya. Gunakan tangan Anda untuk membentuk pemahaman.',
                benefit: 'Proses fisik membangun sesuatu menciptakan hubungan yang kuat dengan materi pelajaran.'
            },
            {
                title: 'Eksperimen atau Praktik Langsung',
                icon: 'fas fa-flask',
                description: 'Jika mempelajari sains, lakukan eksperimennya. Jika belajar coding, tulis kodenya. Jangan hanya membaca, tapi lakukan.',
                benefit: 'Pengalaman nyata memberikan konteks dan pemahaman yang tidak bisa ditandingi oleh teori.'
            }
        ]
    };

    function calculateDominantStyle() {
        const total = scores.v + scores.a + scores.k;
        return {
            V: Math.round((scores.v / total) * 100),
            A: Math.round((scores.a / total) * 100),
            K: Math.round((scores.k / total) * 100)
        };
    }

    function getDominantStyles(scores) {
        let maxScore = 0;
        const styleKeys = Object.keys(scores).map(key => key.toUpperCase());
        // Create an uppercase version of scores for consistent lookup
        const upperCaseScores = {};
        Object.keys(scores).forEach(key => {
            upperCaseScores[key.toUpperCase()] = scores[key];
        });

        styleKeys.forEach(key => {
            if (upperCaseScores[key] > maxScore) {
                maxScore = upperCaseScores[key];
            }
        });

        return styleKeys.filter(key => upperCaseScores[key] === maxScore);
    }

    function getRecommendationsForStyles(styles, percentages) {
        let recommendations = [];
        styles.forEach(styleKey => {
            const styleRecs = allRecommendations[styleKey.toUpperCase()];
            if (styleRecs) {
                recommendations = recommendations.concat(styleRecs.map(rec => ({
                    ...rec,
                    styleLabel: styleKey.toUpperCase(),
                    percentage: percentages[styleKey.toUpperCase()],
                    cardClass: getStyleClass(styleKey.toUpperCase()),
                    styleIcon: getStyleIcon(styleKey.toUpperCase())
                })));
            }
        });
        return recommendations;
    }

    function getStyleClass(style) {
        const classes = {
            'V': 'visual-rec',
            'A': 'auditory-rec',
            'K': 'kinesthetic-rec'
        };
        return classes[style] || '';
    }

    function getStyleIcon(style) {
        const icons = {
            'V': 'fas fa-eye',
            'A': 'fas fa-ear',
            'K': 'fas fa-hand-paper'
        };
        return icons[style] || '';
    }

    function displayRecommendations() {
        const percentages = calculateDominantStyle();
        const recommendations = getRecommendationsForStyles(getDominantStyles(scores), percentages);
        
        const dominantStyles = getDominantStyles(scores);
        
        const styleNames = {
            'V': 'Visual',
            'A': 'Auditori',
            'K': 'Kinestetik'
        };

        let summaryMessage = "";
        let sourcesLinkParam = "";

        if (dominantStyles.length === 1) {
            const dominantStyleKey = dominantStyles[0];
            const dominantStyleName = styleNames[dominantStyleKey];
            summaryMessage = `Selamat! Gaya belajar dominan kamu adalah <strong>${dominantStyleName}</strong>. Ini adalah kekuatanmu dalam belajar. Gunakan dan kembangkan terus kemampuan ini!`;
            sourcesLinkParam = `style=${dominantStyleKey}`;
        } else {
            const dominantNames = dominantStyles.map(key => styleNames[key]);
            const lastDominantName = dominantNames.pop();
            const combinedNames = dominantNames.length > 0 ? `${dominantNames.join(', ')} dan ${lastDominantName}` : lastDominantName;
            summaryMessage = `Selamat! Gaya belajar kombinasi kamu adalah <strong>${combinedNames}</strong>. Ini adalah kekuatanmu dalam belajar. Gunakan dan kembangkan terus kemampuan ini!`;
            sourcesLinkParam = `styles=${dominantStyles.join(',')}`;
        }

        // Display learning style percentages with colored backgrounds
        const stylePercentagesHtml = `
            <div class="col-12 mb-4 mx-auto">
                <h3 class="h4 mb-3 text-white text-center">Hasil Analisis Gaya Belajar:</h3>
                <div class="d-flex justify-content-center">
                    <div class="text-center p-3 rounded" style="background-color: rgba(64, 192, 255, ${percentages.V > 10 ? '0.9' : '0.3'}); color: white; width: 30%">
                        <i class="fas fa-eye fa-2x mb-2"></i>
                        <p class="h5 mb-0">Visual: ${percentages.V}%</p>
                    </div>
                    <div class="text-center p-3 rounded" style="background-color: rgba(255, 216, 96, ${percentages.A > 10 ? '0.9' : '0.3'}); color: white; width: 30%">
                        <i class="fas fa-ear fa-2x mb-2"></i>
                        <p class="h5 mb-0">Auditori: ${percentages.A}%</p>
                    </div>
                    <div class="text-center p-3 rounded" style="background-color: rgba(255, 109, 142, ${percentages.K > 10 ? '0.9' : '0.3'}); color: white; width: 30%">
                        <i class="fas fa-hand-paper fa-2x mb-2"></i>
                        <p class="h5 mb-0">Kinestetik: ${percentages.K}%</p>
                    </div>
                </div>
                <div class="alert alert-info mt-3">
                    <i class="fas fa-star me-2"></i>
                    ${summaryMessage}
                </div>
            </div>
        `;

        // Display recommendations with improved styling
        const recommendationsHtml = recommendations.map(rec => `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100 shadow-sm ${rec.cardClass}">
                    <div class="card-body">
                        <div class="text-center mb-3">
                            <i class="${rec.icon} fa-2x"></i>
                            <span class="badge bg-primary ms-2">${styleNames[rec.styleLabel]} ${rec.percentage}%</span>
                        </div>
                        <h5 class="card-title text-center">${rec.title}</h5>
                        <p class="card-text">${rec.description}</p>
                        <p class="card-text"><small class="text-muted"><i class="fas fa-star me-1"></i>${rec.benefit}</small></p>
                    </div>
                </div>
            </div>
        `).join('');

        // Add sources button with improved styling
        const sourcesButtonHtml = `
            <div class="col-12 text-center mt-4">
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading mb-3"><i class="fas fa-lightbulb me-2"></i>Tips Pengembangan Diri</h4>
                    <p class="mb-3">Kamu sudah mengetahui gaya belajarmu! Sekarang saatnya mengembangkan potensimu dengan sumber-sumber belajar yang sesuai.</p>
                    <p class="mb-3">Ingat, setiap orang itu unik dan memiliki cara belajar yang berbeda. Jangan pernah membandingkan dirimu dengan orang lain!</p>
                    <hr>
                    <p class="mb-0">Mari kita eksplorasi sumber belajar yang cocok dengan gaya belajarmu!</p>
                </div>
                <a href="sumber.html?${sourcesLinkParam}" class="btn btn-lg btn-primary">
                    <i class="fas fa-book-open me-2"></i>Lihat Sumber Belajar yang Sesuai
                </a>
            </div>
        `;

        recommendationListContainer.innerHTML = stylePercentagesHtml + recommendationsHtml + sourcesButtonHtml;
    }

    // Call displayRecommendations immediately
    displayRecommendations();
}); 