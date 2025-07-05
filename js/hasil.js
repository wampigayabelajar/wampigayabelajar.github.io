document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const scores = {
        v: parseInt(params.get('v')) || 0,
        a: parseInt(params.get('a')) || 0,
        k: parseInt(params.get('k')) || 0,
    };

    const total = scores.v + scores.a + scores.k;
    
    const percentages = {
        v: total > 0 ? ((scores.v / total) * 100).toFixed(1) : 0,
        a: total > 0 ? ((scores.a / total) * 100).toFixed(1) : 0,
        k: total > 0 ? ((scores.k / total) * 100).toFixed(1) : 0,
    };

    const learningStyles = {
        v: { name: 'Visual', score: scores.v, percentage: percentages.v, description: "Sebagai pembelajar visual, Anda cenderung memahami informasi dengan baik melalui gambar, diagram, dan warna. Anda suka melihat apa yang sedang dipelajari." },
        a: { name: 'Auditori', score: scores.a, percentage: percentages.a, description: "Sebagai pembelajar auditori, Anda belajar paling efektif melalui pendengaran. Diskusi, penjelasan lisan, dan mendengarkan rekaman adalah teman terbaik Anda." },
        k: { name: 'Kinestetik', score: scores.k, percentage: percentages.k, description: "Sebagai pembelajar kinestetik, Anda belajar dengan cara melakukan. Pengalaman langsung, praktik, dan aktivitas fisik membantu Anda memahami konsep secara mendalam." }
    };

    // Find all dominant styles
    let maxScore = 0;
    Object.keys(learningStyles).forEach(key => {
        if (learningStyles[key].score > maxScore) {
            maxScore = learningStyles[key].score;
        }
    });

    const dominantStyles = Object.keys(learningStyles).filter(key => learningStyles[key].score === maxScore);

    let summaryText = "";
    let descriptionHtml = "";

    if (dominantStyles.length === 1) {
        // Single dominant style
        const dominantStyle = learningStyles[dominantStyles[0]];
        summaryText = `Selamat! Gaya belajar dominan Anda adalah ${dominantStyle.name}.`;
        descriptionHtml = `
            <h3 class="h4 mb-3 text-dark"><i class="fas fa-info-circle text-primary me-2"></i>Deskripsi Gaya Belajar Anda</h3>
            <p class="mb-3 text-dark">${dominantStyle.description}</p>
            <p class="text-dark">Ini adalah cerminan dari preferensi belajar Anda, yang dapat membantu Anda memilih metode belajar yang paling efektif.</p>
        `;
    } else {
        // Combination of dominant styles
        const dominantNames = dominantStyles.map(key => learningStyles[key].name);
        const lastDominantName = dominantNames.pop();
        const combinedNames = dominantNames.length > 0 ? `${dominantNames.join(', ')} dan ${lastDominantName}` : lastDominantName;
        
        summaryText = `Selamat! Gaya belajar kombinasi Anda adalah ${combinedNames}.`;
        
        let combinedDescriptions = "";
        dominantStyles.forEach(key => {
            combinedDescriptions += `
                <h4 class="h5 mb-2 text-dark">${learningStyles[key].name}</h4>
                <p class="mb-3 text-dark">${learningStyles[key].description}</p>
            `;
        });

        descriptionHtml = `
            <h3 class="h4 mb-3 text-dark"><i class="fas fa-info-circle text-primary me-2"></i>Deskripsi Gaya Belajar Anda</h3>
            <p class="mb-3 text-dark">Anda menunjukkan kecenderungan yang kuat pada beberapa gaya belajar. Ini berarti Anda dapat memanfaatkan berbagai metode untuk belajar lebih efektif.</p>
            ${combinedDescriptions}
            <p class="text-dark">Ini adalah cerminan dari preferensi belajar Anda, yang dapat membantu Anda memilih metode belajar yang paling efektif.</p>
        `;
    }

    // Display Summary
    const resultSummary = document.getElementById('result-summary');
    resultSummary.textContent = summaryText;

    // Set recommendation button link
    const recommendationBtn = document.getElementById('view-recommendations-btn');
    recommendationBtn.href = `rekomendasi.html?v=${scores.v}&a=${scores.a}&k=${scores.k}`;

    // Display Description
    const resultDescription = document.getElementById('result-description');
    resultDescription.innerHTML = descriptionHtml;

    // Function to update chart font sizes based on screen width
    function getResponsiveFontSize() {
        return window.innerWidth < 768 ? {
            fontSize: 12,
            titleFontSize: 14
        } : {
            fontSize: 14,
            titleFontSize: 16
        };
    }

    // Get initial font sizes
    const fontSizes = getResponsiveFontSize();

    // Render Chart
    const ctx = document.getElementById('resultChart').getContext('2d');
    const resultChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                `Visual (${percentages.v}%)`, 
                `Auditori (${percentages.a}%)`, 
                `Kinestetik (${percentages.k}%)`
            ],
            datasets: [{
                label: 'Persentase Gaya Belajar',
                data: [scores.v, scores.a, scores.k],
                backgroundColor: [
                    'rgba(64, 192, 255, 0.9)', // Bright blue for Visual
                    'rgba(255, 216, 96, 0.9)', // Bright yellow for Auditory
                    'rgba(255, 109, 142, 0.9)'  // Bright red for Kinesthetic
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#FFFFFF', // White text for legend
                        font: {
                            size: fontSizes.fontSize,
                            weight: 'bold'
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Distribusi Gaya Belajar Anda',
                    color: '#FFFFFF', // White text for title
                    font: {
                        size: fontSizes.titleFontSize,
                        weight: 'bold'
                    }
                }
            }
        }
    });

    // Update chart on window resize
    window.addEventListener('resize', () => {
        const newFontSizes = getResponsiveFontSize();
        resultChart.options.plugins.legend.labels.font.size = newFontSizes.fontSize;
        resultChart.options.plugins.title.font.size = newFontSizes.titleFontSize;
        resultChart.update();
    });
}); 