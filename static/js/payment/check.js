// 문의하기 버튼
let test = document.getElementById("Btn");
test.addEventListener(
    "mouseover",
    function (event) {
        event.target.style.backgroundColor = "#e5e7eb";
    },
    false,
);
test.addEventListener(
    "mouseout",
    function (event) {
        event.target.style.backgroundColor = "";
    },
    false,
);

// qr코드 확인 버튼
const qrBtn = document.querySelector(".QRcode");
const qrBox = document.getElementById("qrBox");
qrBtn.addEventListener("click", () => {
    if (qrBox.style.display === "none") {
        qrBox.style.display = "block";
    } else {
        qrBox.style.display = "none";
    }
});
