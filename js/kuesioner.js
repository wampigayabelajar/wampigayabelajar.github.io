document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: "Ketika saya merakit sesuatu, saya lebih suka...",
            answers: [
                { text: "Mengikuti ilustrasi atau diagram.", type: 'V' },
                { text: "Mendengarkan instruksi lisan.", type: 'A' },
                { text: "Langsung mencoba merakitnya sendiri.", type: 'K' }
            ]
        },
        {
            question: "Saat belajar materi baru, saya paling ingat jika...",
            answers: [
                { text: "Melihatnya dalam bentuk tulisan, grafik, atau video.", type: 'V' },
                { text: "Mendengarkan penjelasan dari guru atau teman.", type: 'A' },
                { text: "Mencoba mempraktikkannya secara langsung.", type: 'K' }
            ]
        },
        {
            question: "Apa yang paling mungkin mengganggu saya di dalam kelas?",
            answers: [
                { text: "Pemandangan atau aktivitas di luar jendela.", type: 'V' },
                { text: "Suara bising atau orang berbicara.", type: 'A' },
                { text: "Harus duduk diam untuk waktu yang lama.", type: 'K' }
            ]
        },
        {
            question: "Ketika saya bertemu orang baru, saya paling mudah mengingat...",
            answers: [
                { text: "Wajah mereka.", type: 'V' },
                { text: "Nama mereka setelah mendengarnya.", type: 'A' },
                { text: "Sesuatu yang kami lakukan bersama.", type: 'K' }
            ]
        },
        {
            question: "Saya lebih suka membaca...",
            answers: [
                { text: "Buku dengan banyak gambar atau ilustrasi.", type: 'V' },
                { text: "Buku yang diceritakan dengan baik lewat audiobook.", type: 'A' },
                { text: "Buku cerita petualangan yang membuat saya ingin bergerak.", type: 'K' }
            ]
        },
        {
            question: "Saat memberikan petunjuk arah, saya cenderung...",
            answers: [
                { text: "Menggambar peta atau menggunakan gerakan tangan untuk menunjukkan.", type: 'V' },
                { text: "Memberikan penjelasan lisan yang detail.", type: 'A' },
                { text: "Berjalan bersama orang tersebut untuk menunjukkan jalannya.", type: 'K' }
            ]
        },
        {
            question: "Di waktu luang, saya lebih menikmati...",
            answers: [
                { text: "Menonton film atau pergi ke pameran seni.", type: 'V' },
                { text: "Mendengarkan musik atau podcast.", type: 'A' },
                { text: "Berolahraga atau melakukan aktivitas fisik.", type: 'K' }
            ]
        },
        {
            question: "Jika saya harus menghafal informasi, saya akan...",
            answers: [
                { text: "Menulisnya berulang kali atau membuat catatan visual (mind map).", type: 'V' },
                { text: "Mengucapkannya berulang kali dengan suara keras.", type: 'A' },
                { text: "Berjalan bolak-balik sambil menghafal.", type: 'K' }
            ]
        },
        {
            question: "Saat mengeja kata yang sulit, saya...",
            answers: [
                { text: "Mencoba membayangkan bagaimana kata itu terlihat tertulis.", type: 'V' },
                { text: "Mengucapkannya huruf per huruf.", type: 'A' },
                { text: "Menulisnya di kertas untuk merasakan bentuknya.", type: 'K' }
            ]
        },
        {
            question: "Saya paling mudah memahami ide-ide jika...",
            answers: [
                { text: "Disajikan dalam bentuk grafik atau diagram alur.", type: 'V' },
                { text: "Dijelaskan melalui diskusi atau debat.", type: 'A' },
                { text: "Didemonstrasikan atau melalui simulasi.", type: 'K' }
            ]
        },
        {
            question: "Ketika mengingat suatu peristiwa, saya paling sering teringat...",
            answers: [
                { text: "Seperti apa pemandangannya.", type: 'V' },
                { text: "Apa yang dikatakan orang-orang.", type: 'A' },
                { text: "Apa yang saya rasakan dan lakukan saat itu.", type: 'K' }
            ]
        },
        {
            question: "Saya lebih suka jika guru...",
            answers: [
                { text: "Menggunakan papan tulis atau proyektor untuk penjelasan visual.", type: 'V' },
                { text: "Memberikan ceramah dan mendorong diskusi.", type: 'A' },
                { text: "Mengadakan kegiatan kelompok atau eksperimen.", type: 'K' }
            ]
        },
        {
            question: "Saat berbelanja dan melihat barang baru, saya biasanya...",
            answers: [
                { text: "Memperhatikan kemasan dan penampilannya.", type: 'V' },
                { text: "Bertanya kepada penjual tentang fitur-fiturnya.", type: 'A' },
                { text: "Memegang atau mencobanya terlebih dahulu.", type: 'K' }
            ]
        },
        {
            question: "Ketika saya merasa bosan, saya kemungkinan besar akan...",
            answers: [
                { text: "Mencoret-coret atau menggambar.", type: 'V' },
                { text: "Berbicara dengan diri sendiri atau menyenandungkan lagu.", type: 'A' },
                { text: "Menggoyangkan kaki atau mengetukkan jari.", type: 'K' }
            ]
        },
        {
            question: "Saya belajar matematika paling baik dengan...",
            answers: [
                { text: "Melihat guru mengerjakan soal di papan tulis.", type: 'V' },
                { text: "Mendengarkan guru menjelaskan rumus dan logika.", type: 'A' },
                { text: "Menggunakan benda-benda (seperti balok) untuk membantu saya berhitung.", type: 'K' }
            ]
        }
    ];

    let currentQuestionIndex = 0;
    const userAnswers = new Array(questions.length).fill(null);

    const questionText = document.getElementById('question-text');
    const answerOptionsContainer = document.getElementById('answer-options');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');

    function loadQuestion(index) {
        const currentQuestion = questions[index];
        questionText.innerHTML = `<strong>${currentQuestion.question}</strong>`;
        answerOptionsContainer.innerHTML = '';

        currentQuestion.answers.forEach((answer, answerIndex) => {
            const option = document.createElement('button');
            option.className = 'btn btn-outline-dark option-btn';
            option.textContent = answer.text;
            option.onclick = () => selectAnswer(answerIndex, answer.type);
            answerOptionsContainer.appendChild(option);
        });

        if (userAnswers[index] !== null) {
            const selectedButton = answerOptionsContainer.children[userAnswers[index].index];
            if(selectedButton) selectedButton.classList.add('selected');
        }

        updateNavigation();
        updateProgressBar();
    }

    function selectAnswer(index, type) {
        userAnswers[currentQuestionIndex] = { index, type };
        
        const options = answerOptionsContainer.querySelectorAll('.option-btn');
        options.forEach(opt => opt.classList.remove('selected'));
        options[index].classList.add('selected');

        updateNavigation();
        updateProgressBar();
    }

    function updateNavigation() {
        prevBtn.disabled = currentQuestionIndex === 0;
        
        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.textContent = 'Lihat Hasil';
            nextBtn.disabled = userAnswers[currentQuestionIndex] === null;
        } else {
            nextBtn.textContent = 'Selanjutnya';
            nextBtn.disabled = userAnswers[currentQuestionIndex] === null;
        }
    }
    
    function updateProgressBar() {
        const answeredCount = userAnswers.filter(answer => answer !== null).length;
        const progressPercentage = (answeredCount / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.setAttribute('aria-valuenow', progressPercentage);
        progressBar.textContent = `${answeredCount}/${questions.length}`;
    }

    function calculateResults() {
        const scores = { V: 0, A: 0, K: 0 };
        userAnswers.forEach(answer => {
            if (answer) {
                scores[answer.type]++;
            }
        });
        window.location.href = `hasil.html?v=${scores.V}&a=${scores.A}&k=${scores.K}`;
    }

    nextBtn.addEventListener('click', () => {
        if (userAnswers[currentQuestionIndex] === null) return;

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        } else {
            calculateResults();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
    });

    loadQuestion(currentQuestionIndex);
}); 