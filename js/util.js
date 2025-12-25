class Util {
    static async loadAssets(data) {
        const promises = [];
        for (const key in data) {
            const url = data[key].url;
            promises.push(fetch(url)
                .then(res => res.blob())
                .then(blob => {
                    data[key].objectURL = URL.createObjectURL(blob);
                    return key;
                }));
        }
        await Promise.all(promises);
    }

    static fadeInElement(element) {
        if (element && element.style) {
            element.style.opacity = 0;
            let timeout = 0;
            let max = 100;
            for (let i = 0; i <= max; i++) {
                timeout += 10;
                setTimeout(() => {
                    const currentOpacity = parseFloat(element.style.opacity);
                    let newOpacity = currentOpacity + 0.01 > 1 ? 1 : currentOpacity + 0.01;
                    if (i === max) {
                        newOpacity = 1;
                    }
                    element.style.opacity = newOpacity;
                }, timeout);
            }
        } else {
            console.error("element not found, cannot fade in");
        }
    }

    static fadeOutElement(element) {
        if (element && element.style) {
            element.style.opacity = 1;
            let timeout = 0;
            let max = 100;
            for (let i = 0; i <= max; i++) {
                timeout += 10;
                setTimeout(() => {
                    const currentOpacity = parseFloat(element.style.opacity);
                    let newOpacity = currentOpacity - 0.01 < 0 ? 0 : currentOpacity - 0.01;
                    if (i === max) {
                        newOpacity = 0;
                    }
                    element.style.opacity = newOpacity;
                }, timeout);
            }
        } else {
            console.error("element not found, cannot fade out");
        }
    }

    static createVideo(src, id, muted, loop, autoplay, arrayOfClassesToAdd) {
        const video = document.createElement("video");
        arrayOfClassesToAdd.forEach(classStr => {
            video.classList.add(classStr);
        });
        video.setAttribute("playsinline", "");
        video.src = src;
        video.id = id;
        video.muted = muted === true;
        video.loop = loop === true;
        video.autoplay = autoplay === true;
        return video;
    }

    static playVideo(video, fadeIn, arrayOfClassesToRemove) {
        video.currentTime = 0;
        arrayOfClassesToRemove.forEach(classStr => {
            video.classList.remove(classStr);
        });
        if (fadeIn === true) {
            Util.fadeInElement(video);
        }
        video.play().catch(error => {
            console.log("Video playback failed:", error);
        });
    }

    static stopVideo(video) {
        video.pause();
    }
}