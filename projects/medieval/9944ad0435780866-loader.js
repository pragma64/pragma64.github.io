const megabytes = (bytes) => (bytes / 1e6).toFixed(1);

export default function () {
  const loader = document.getElementById("loader");
  const fill = loader.querySelector(".fill");
  const note = loader.querySelector(".note");
  const count = loader.querySelector(".count");
  const bytes = Number(loader.dataset.bytes);

  return {
    onProgress: ({ current, total }) => {
      const whole = bytes || total;
      if (!whole) {
        count.textContent = `${megabytes(current)} MB`;
        return;
      }
      fill.style.width = `${Math.min(100, (100 * current) / whole)}%`;
      count.textContent = `${megabytes(current)} / ${megabytes(whole)} MB`;
    },
    onComplete: () => {
      fill.style.width = "100%";
      note.textContent = "Waking the world";
      count.innerHTML = "&nbsp;";
    },
    onSuccess: () => {
      requestAnimationFrame(() => requestAnimationFrame(() => loader.classList.add("gone")));
    },
    onFailure: (error) => {
      loader.classList.add("failed");
      note.textContent = `The realm failed to load.\n${error}`;
    },
  };
}
