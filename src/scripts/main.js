const btnMenu = document.querySelector('.burger');
const burgerMenu = document.querySelector(".burger__menu");
const burgerLine = document.querySelector(".burger__line");

btnMenu.addEventListener("click", (e) => {
	burgerLine.classList.toggle("_close");
	burgerMenu.classList.toggle("_active");
});

document.addEventListener("click", (e) => {
	if (!burgerLine.contains(e.target) && !burgerMenu.contains(e.target)) {
		burgerLine.classList.remove("_close");
		burgerMenu.classList.remove("_active");
	}
})