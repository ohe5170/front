const wrappers = document.querySelectorAll(".Review__Wrapper");

wrappers.forEach((wrapper) => {
    wrapper.addEventListener("click", function () {
        const isOpen = this.style.maxHeight !== "34px";

        wrappers.forEach((w) => {
            w.style.maxHeight = "34px";
        });

        if (!isOpen) {
            this.style.maxHeight = this.scrollHeight + "px";
        }
    });
});
