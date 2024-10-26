const wheel = document.getElementById("wheel");
const inputText = document.getElementById("inputText");
const resultMessage = document.getElementById("result");
let isSpinning = false;

function createWheel(items) {
    wheel.innerHTML = ""; // Clear the wheel for new segments

    const anglePerSegment = 360 / items.length; // Angle for each segment
    items.forEach((item, index) => {
        const segment = document.createElement("div");
        segment.classList.add("segment");
        segment.style.transform = `rotate(${index * anglePerSegment}deg) skewY(${90 - anglePerSegment}deg)`;
        segment.textContent = item;
        wheel.appendChild(segment);
    });
}

function spinWheel() {
    if (isSpinning) return;

    const items = inputText.value.split(",").map(item => item.trim()).filter(item => item);
    
    if (items.length < 2) {
        alert("Please enter at least two items.");
        return;
    }

    createWheel(items);
    isSpinning = true;
    resultMessage.textContent = "";

    const randomRotation = Math.floor(Math.random() * 360) + 1800;
    wheel.style.transform = `rotate(${randomRotation}deg)`;

    setTimeout(() => {
        isSpinning = false;
        
        const selectedIndex = Math.floor(((randomRotation % 360) / 360) * items.length);
        resultMessage.textContent = `Selected: ${items[selectedIndex]}`;
        
        wheel.style.transition = "none";
        wheel.style.transform = "rotate(0deg)";
    }, 4000);
}
