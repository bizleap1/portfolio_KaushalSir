"""Image optimisation used for the SEO / performance pass (re-runnable).

The heavy originals live in scripts/assets/originals/ (they are NOT deployed).
This script writes the optimised WebP files that the site actually uses into public/.

    pip install pillow
    python3 scripts/optimize-images.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "assets" / "originals"
PUBLIC = ROOT / "public"


def webp(src: str, dst: str, max_w: int, quality: int, keep_alpha=False):
    im = Image.open(SRC / src)
    im = im.convert("RGBA" if keep_alpha else "RGB")
    if im.width > max_w:
        h = round(im.height * max_w / im.width)
        im = im.resize((max_w, h), Image.LANCZOS)
    out = PUBLIC / dst
    im.save(out, "WEBP", quality=quality, method=6)
    print(f"{dst:34s} {im.size[0]}x{im.size[1]}  {out.stat().st_size / 1024:7.1f} KB")


# Hero portrait (needs transparency)
webp("portrait-transparent.png", "portrait-transparent.webp", 610, 88, keep_alpha=True)

# Case-study + venture card backgrounds (shown at 40-60% opacity)
for name in ["case_study_solar", "case_study_dental", "case_study_resort", "case_study_auto",
             "bizleap_bg", "banginwar_bg", "aai_bg", "asaawad_bg", "modicare_bg"]:
    webp(f"{name}.png", f"{name}.webp", 1024, 68)

# Public-speaking photo (5328x4000, 3.7 MB original)
webp("IMG_8071.JPEG", "kaushal-banginwar-speaking.webp", 1200, 74)

# Scroll-animation frames: 240 JPG (1920x1080, ~9.5 MB) -> 120 WebP (1280x720, ~2.4 MB)
frames_dir = PUBLIC / "frames"
frames_dir.mkdir(exist_ok=True)
frames = sorted((SRC / "frames-240").glob("ezgif-frame-*.jpg"))
total = 0
for i, f in enumerate(frames[::2], start=1):          # every 2nd frame
    im = Image.open(f).convert("RGB").resize((1280, 720), Image.LANCZOS)
    out = frames_dir / f"frame-{i:03d}.webp"
    im.save(out, "WEBP", quality=52, method=6)
    total += out.stat().st_size
print(f"frames: {len(frames[::2])} files, {total / 1024 / 1024:.2f} MB  (FRAME_COUNT in ScrollAnimationBackground.tsx must match)")
