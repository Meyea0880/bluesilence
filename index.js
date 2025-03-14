document.addEventListener('DOMContentLoaded', function() {
    const menu = document.querySelector('.menu');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    // ハンバーガーメニューの開閉
				menu.addEventListener('click', () => {
								menu.classList.toggle('toggle');
								navMenu.classList.toggle('nav-active');
				});


    // メニューのリンクをクリックしたら閉じる & スムーズスクロール
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // ハンバーガーメニューが開いている場合は閉じる
            if (navMenu.classList.contains('nav-active')) {
                menu.classList.remove('toggle');
                navMenu.classList.remove('nav-active');
            }

            // リンク先へスムーズにスクロール
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const headerHeight = document.querySelector('header').offsetHeight;

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // TOPボタンの作成
    const backToTopButton = document.createElement("div");
    backToTopButton.id = "backToTop";

    // 画像要素を追加
    const img = document.createElement("img");
    img.src = "img/icon_sub.png"; // 画像パスを指定
    img.alt = "トップへ戻る";
    img.width = 80;
    img.height = 80;

    // ボタンに画像を追加
    backToTopButton.appendChild(img);
    document.body.appendChild(backToTopButton);

    // スクロールイベント
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    // クリックでトップへ戻る
    backToTopButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});


//ヒーローテキスト
document.addEventListener('DOMContentLoaded', function () {
    const heroText = document.getElementById('hero-text');
    if (!heroText) return;

    // **テキストをビューポートの最下端 -200px に配置**
    function setHeroTextPosition() {
        const viewportHeight = window.innerHeight; // **ビューポートの高さ**
        heroText.style.top = `${viewportHeight - 300}px`;
    }

    setHeroTextPosition(); // **ページ読み込み時に適用**

    // **フェードインアニメーション**
    const text = heroText.textContent.trim();
    heroText.textContent = "";
    text.split("").forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        span.style.animation = `fadeInText 1.5s forwards ${index * 0.05}s`;
        heroText.appendChild(span);
    });

});

document.addEventListener('DOMContentLoaded', function () {
    const heroText = document.getElementById('hero-text');
    if (!heroText) return;

    // **ページ読み込み時に一度だけ位置を設定**
    const viewportHeight = window.innerHeight; // ビューポートの高さ
    heroText.style.top = `${viewportHeight - 300}px`; // 計算した位置を固定
});



//フェードインとslick

document.addEventListener("DOMContentLoaded", function () {
    const sectionsToFadeIn = ["story", "message", "cast", "ticket"]; // `#ticket` を追加
    let isSlickInitialized = false; // slick 初期化管理

    function initializeSlick() {
        if (!isSlickInitialized) {
            $('.full-screen').slick({
                centerMode: true,
                centerPadding: '5%',
                dots: true,
                autoplay: true,
                autoplaySpeed: 5000,
                speed: 1000,
                infinite: true,
                slidesToShow: 1,
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }],
                prevArrow: '<button type="button" class="slick-prev">⟨</button>',
                nextArrow: '<button type="button" class="slick-next">⟩</button>',
            });

            isSlickInitialized = true;

            // slick の適用が終わったらフェードイン
            setTimeout(() => {
                document.getElementById("cast").style.visibility = "visible"; // Safari対策
                document.getElementById("cast").style.opacity = "1";
            }, 300);
        }
    }

    function onScroll() {
        sectionsToFadeIn.forEach(id => {
            const section = document.getElementById(id);
            if (!section) return;
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                section.classList.add("show");

                if (id === "cast") {
                    initializeSlick(); // キャストセクションの場合は slick を初期化
                }
            }
        });
    }

    window.addEventListener("scroll", onScroll);
    onScroll(); // 初回チェック
});
