"""Generates favicons, the Open Graph share image and the schema portrait.

Requires: pip install pillow   (Poppins fonts are used if present, else DejaVu)
Re-run after changing the name/role text below.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
GOLD = (214, 161, 31)
GOLD_LIGHT = (224, 174, 43)
BLACK = (5, 5, 5)
WHITE = (245, 243, 238)
GREY = (168, 168, 168)


def font(bold: bool, size: int):
    for p in (
        f"/usr/share/fonts/truetype/google-fonts/Poppins-{'Bold' if bold else 'Medium'}.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ):
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


# ---------- favicons (from the gold "K" logo) ----------
logo = Image.open(ROOT / "scripts" / "assets" / "favicon-source.png").convert("RGB")   # 1024px gold "K" logo


def square(size, name):
    im = logo.resize((size, size), Image.LANCZOS)
    im.save(PUBLIC / name, optimize=True)
    return im


square(96, "favicon-96.png")        # Google wants a multiple of 48px
square(192, "icon-192.png")
square(512, "icon-512.png")
square(180, "apple-touch-icon.png")
square(192, "favicon.png")          # keep the old path working, now ~30 KB instead of 356 KB
logo.resize((48, 48), Image.LANCZOS).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

# ---------- portrait (cut-out on dark background) ----------
cut = Image.open(ROOT / "scripts" / "assets" / "originals" / "portrait-transparent.png").convert("RGBA")
bg = Image.new("RGBA", cut.size, BLACK + (255,))
bg.alpha_composite(cut)
bg.convert("RGB").save(PUBLIC / "kaushal-banginwar.jpg", quality=84, optimize=True, progressive=True)

# ---------- Open Graph / Twitter card 1200x630 ----------
W, H = 1200, 630
og = Image.new("RGB", (W, H), BLACK)

# soft gold glow behind the portrait
glow = Image.new("RGB", (W, H), BLACK)
gd = ImageDraw.Draw(glow)
gd.ellipse((600, 20, 1240, 700), fill=(70, 50, 8))
glow = glow.filter(ImageFilter.GaussianBlur(110))
og = Image.blend(og, glow, 0.9)

# portrait, bottom-aligned on the right
p = cut.copy()
ph = 600
p = p.resize((round(p.width * ph / p.height), ph), Image.LANCZOS)
og_rgba = og.convert("RGBA")
og_rgba.alpha_composite(p, (W - p.width - 40, H - ph + 10))
og = og_rgba.convert("RGB")
d = ImageDraw.Draw(og)

# logo mark
og.paste(logo.resize((84, 84), Image.LANCZOS), (64, 56))

# gold rule
d.rectangle((64, 190, 64 + 96, 194), fill=GOLD)

d.text((64, 222), "KAUSHAL", font=font(True, 108), fill=WHITE)
d.text((64, 336), "BANGINWAR", font=font(True, 108), fill=WHITE)
d.text((66, 482), "Founder & CEO, Bizleap", font=font(True, 38), fill=GOLD_LIGHT)
d.text((66, 534), "Digital Marketing & Technology Agency  |  Nagpur, India", font=font(False, 24), fill=GREY)

og.save(PUBLIC / "og-image.jpg", quality=86, optimize=True, progressive=True)
for n in ["og-image.jpg", "kaushal-banginwar.jpg", "favicon.png", "favicon.ico", "favicon-96.png", "icon-192.png", "icon-512.png", "apple-touch-icon.png"]:
    print(f"{n:24s} {(PUBLIC / n).stat().st_size / 1024:7.1f} KB")
