document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".carousel-container");

    containers.forEach(container => {
        const track = container.querySelector(".carousel-track");

        if (!track) return;

        let position = 0;

        // Pixels per second
        let speed = 40;

        // How quickly the carousel slows down.
        // Higher = stops faster.
        const deceleration = 6;

        let lastTime = performance.now();
        let animationFrame;

        let paused = false;
        let stopped = false;

        function animate(currentTime) {
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            if (!paused && !stopped) {
                // Move the carousel
                position -= speed * deltaTime;

                // Gradually reduce speed
                speed = Math.max(0, speed - deceleration * deltaTime);

                track.style.transform = `translate3d(${position}px, 0, 0)`;

                // Stop once the speed reaches zero
                if (speed <= 0) {
                    speed = 0;
                    stopped = true;
                }
            }

            animationFrame = requestAnimationFrame(animate);
        }

        // Pause while hovering
        container.addEventListener("mouseenter", () => {
            paused = true;
        });

        container.addEventListener("mouseleave", () => {
            paused = false;
            lastTime = performance.now();
        });

        animationFrame = requestAnimationFrame(animate);
    });
});