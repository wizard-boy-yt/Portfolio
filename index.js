let delay = 1; // Screensaver time.
let positionSpeed = 1; // speed of position change.
let colorSpeed =0.2; // speed of color change
let amount = 40; // precentage of light objects derivited of window width.
let size = 20; // size of light objects.
let style = 1;

window.onload = function () {
	let css = ``;
	const bg = document.querySelector("#bg-hex");

	amount = Math.floor(window.innerWidth / amount);
	if (amount < 5) {
		amount = 5;
	}

	for (let a = 0; a < amount; a++) {
		bg.innerHTML += `<div id="light${a}" class="light"></div>`;
		css += `#light${a} {background: hsl(${parseInt((360 / amount) * a)}, 100%, 52%);
        ${a == 0 ? "display: block;width: 100px;height: 100px;" : ""}}`;
	}

	css += `.light {--size: ${window.innerWidth / size}px;}`;

	if (style == 1) {
		css += `#bg-hex { animation: animate ${3 / colorSpeed}s linear infinite;}`;
	} else if (style == 2) {
		css += `.light { animation: animate ${3 / colorSpeed}s linear infinite;}`;
	}

	const CSS = document.createElement("style");
	CSS.id = "colors";
	if (CSS.styleSheet) {
		CSS.styleSheet.cssText = css;
	} else {
		CSS.appendChild(document.createTextNode(css));
	}

	document.getElementsByTagName("head")[0].appendChild(CSS);

	for (let r = 0; r < window.innerHeight / 70 + 1; r++) {
		bg.innerHTML += `<div id="row-${r}" class="row"></div>`;
		let row = document.querySelector(`#row-${r}`);
		for (let i = 0; i < window.innerWidth / 70 + 1; i++) {
			row.innerHTML += '<div class="hexagon"></div>';
		}
	}

	window.addEventListener(
		"mouseover",
		function (event) {
			let x = event.clientX;
			let y = event.clientY;

			clearInterval(interval);
			clearTimeout(timeout);

			if (typeof x !== "undefined") {
				const light = document.querySelector(`#light0`);
				light.style.left = x + "px";
				light.style.top = y + "px";
				light.style.transition = `all 0s linear`;
				light.style.width = `200px`;
				light.style.height = `200px`;

				for (let a = 0; a < amount; a++) {
					const light = document.querySelector(`#light${a}`);
					if (a > 0) {
						light.style.display = "none";
					}
				}
			}

			startTimeout();
		},
		false
	);
};

function startTimeout() {
	timeout = setTimeout(() => {
		startInterval();
	}, delay * 1000);
}

startTimeout();

function startInterval() {
	const getRandom = (min, max) =>
		Math.floor(Math.random() * (max - min + 1) + min);

	interval = setInterval(() => {
		for (let a = 0; a < amount; a++) {
			const light = document.querySelector(`#light${a}`);
			light.style.left = getRandom(0, window.innerWidth) + "px";
			light.style.top = getRandom(0, window.innerHeight) + "px";
			light.style.transition = `all ${3 / positionSpeed}s linear`;
			if (a > 0) {
				light.style.display = "block";
			} else {
				light.style.width = `${window.innerWidth / size}px`;
				light.style.height = `${window.innerWidth / size}px`;
			}
		}
	}, 1000/ positionSpeed);
}






// home button to reload the page


document.addEventListener("DOMContentLoaded", function() {
    var home = document.getElementById("home");

    home.addEventListener("click", function() {
        window.location.reload();
    });
});