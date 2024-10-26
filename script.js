const wheel = document.getElementById("wheelSegments");
const inputText = document.getElementById("inputText");
let isSpinning = false;

function createWheel(items) {
    // Clear any existing segments
    wheel.innerHTML = "";
    
    // Calculate the angle for each segment
    const angle = 360 / items.length;
    
    items.forEach((item, index) => {
        const segment = document.createElement("div");
        segment.classList.add("segment");
        segment.style.transform = `rotate(${index * angle}deg) skewY(${90 - angle}deg)`;
        segment.textContent = item;
        wheel.appendChild(segment);
    });
}

function spinWheel() {
    if (isSpinning) return;

    // Get items from input, split by commas, and trim whitespace
    const items = inputText.value.split(",").map(item => item.trim()).filter(item => item);
    
    if (items.length < 2) {
        alert("Please enter at least two items.");
        return;
    }
    
    createWheel(items);
    isSpinning = true;
    
    // Random spin calculation for at least 5 full rotations
    const randomRotation = Math.floor(Math.random() * 360) + 1800;
    wheel.style.transition = "transform 4s ease-out";
    wheel.style.transform = `rotate(${randomRotation}deg)`;
    
    // Determine the selected item after the spin
    setTimeout(() => {
        isSpinning = false;
        
        // Calculate selected segment index based on rotation
        const selectedIndex = Math.floor(((randomRotation % 360) / 360) * items.length);
        alert(`Selected: ${items[selectedIndex]}`);
        
        // Reset wheel rotation to 0 for next spin
        wheel.style.transition = "none";
        wheel.style.transform = "rotate(0deg)";
    }, 4000);
}
