// 수령 방식
const radios = document.querySelectorAll('input[name="paymentType"]');
const pickupWrapper = document.querySelector(
    ".FormLayout__Wrapper .SettingForm__Wrapper",
);
const deliveryWrappers = document.querySelectorAll(
    ".DeliveryCompany__Wrapper, .SettingForm__Wrapper.off2__Content",
);

function update() {
    const isQr = document.querySelector(
        'input[name="paymentType"][value="qr"]',
    ).checked;

    if (pickupWrapper) {
        pickupWrapper.classList.toggle("off", !isQr);
    }

    deliveryWrappers.forEach((wrapper) => {
        wrapper.classList.toggle("off2", isQr);
    });
}

update();

radios.forEach((radio) => {
    radio.addEventListener("change", update);
});

// 선택하기
const category = document.querySelectorAll(".category");
const inputs = document.querySelectorAll(".typing-input");

category.forEach((category) => {
    category.addEventListener("change", (e) => {
        const condition = e.target.value === "직접 입력";
        if (!condition) {
            return;
        }

        const index = Number(category.id !== "selected-domain");
        inputs[index].classList.toggle("active", condition);
    });
});

// 우편번호 찾기
function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            var roadAddr = data.roadAddress;
            var extraRoadAddr = "";

            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                extraRoadAddr += data.bname;
            }

            if (data.buildingName !== "" && data.apartment === "Y") {
                extraRoadAddr +=
                    extraRoadAddr !== ""
                        ? ", " + data.buildingName
                        : data.buildingName;
            }

            if (extraRoadAddr !== "") {
                extraRoadAddr = " (" + extraRoadAddr + ")";
            }

            document.getElementById("sample4_postcode").value = data.zonecode;
            document.getElementById("sample4_roadAddress").value = roadAddr;
            document.getElementById("sample4_jibunAddress").value =
                data.jibunAddress;

            if (roadAddr !== "") {
                document.getElementById("sample4_extraAddress").value =
                    extraRoadAddr;
            } else {
                document.getElementById("sample4_extraAddress").value = "";
            }

            var guideTextBox = document.getElementById("guide");

            if (data.autoRoadAddress) {
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML =
                    "(예상 도로명 주소 : " + expRoadAddr + ")";
                guideTextBox.style.display = "block";
            } else if (data.autoJibunAddress) {
                var expJibunAddr = data.autoJibunAddress;
                guideTextBox.innerHTML =
                    "(예상 지번 주소 : " + expJibunAddr + ")";
                guideTextBox.style.display = "block";
            } else {
                guideTextBox.innerHTML = "";
                guideTextBox.style.display = "none";
            }
        },
    }).open();
}
// 결제하기
const pay = async () => {
    try {
        const response = await Bootpay.requestPayment({
            application_id: "69604c28b6279cebf60ad157",
            price: 1000,
            order_name: "테스트결제",
            order_id: "TEST_ORDER_ID",
            pg: "다날",
            tax_free: 0,
            user: {
                id: "회원아이디",
                username: "회원이름",
                phone: "01000000000",
                email: "test@test.com",
            },
            items: [
                {
                    id: "item_id",
                    name: "테스트아이템",
                    qty: 1,
                    price: 1000,
                },
            ],
            extra: {
                open_type: "iframe",
                card_quota: "0,2,3",
                escrow: false,
            },
        });
        switch (response.event) {
            case "issued":
                break;
            case "done":
                console.log(response);
                break;
            case "confirm":
                console.log(response.receipt_id);

                const confirmedData = await Bootpay.confirm();
                if (confirmedData.event === "done") {
                }

                break;
        }
    } catch (e) {
        console.log(e.message);
        switch (e.event) {
            case "cancel":
                console.log(e.message);
                break;
            case "error":
                console.log(e.error_code);
                break;
        }
    }
};
