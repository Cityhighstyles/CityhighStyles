from PIL import Image, ImageDraw, ImageFont
import os

# Create image
width, height = 1200, 630
image = Image.new('RGB', (width, height))
draw = ImageDraw.Draw(image, 'RGBA')

# Create vibrant gradient background - blue/purple to pink/orange
for y in range(height):
    # Gradient from blue/purple to pink/orange
    r = int(25 + (255 - 25) * (y / height))
    g = int(50 + (100 - 50) * (y / height))
    b = int(100 + (0 - 100) * (y / height))
    draw.rectangle([(0, y), (width, y+1)], fill=(r, g, b))

# Add subtle gradient circles for depth
circles = [
    (200, 150, 200, (255, 100, 150, 40)),
    (1000, 400, 250, (100, 200, 255, 35)),
    (600, 550, 180, (200, 100, 255, 30)),
]

for x, y, size, color in circles:
    draw.ellipse([x-size//2, y-size//2, x+size//2, y+size//2], fill=color)

# Add text
try:
    title_font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 100)
    subtitle_font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 45)
except:
    title_font = ImageFont.load_default()
    subtitle_font = ImageFont.load_default()

# Title
title = 'City High Styles'
bbox = draw.textbbox((0, 0), title, font=title_font)
title_width = bbox[2] - bbox[0]
title_x = (width - title_width) // 2
draw.text((title_x, 120), title, font=title_font, fill=(255, 255, 255, 255))

# Subtitle
subtitle = 'Premium Men\'s Fashion'
bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
subtitle_width = bbox[2] - bbox[0]
subtitle_x = (width - subtitle_width) // 2
draw.text((subtitle_x, 280), subtitle, font=subtitle_font, fill=(200, 255, 100, 255))

# Bottom tagline
tagline = 'Quality Clothing at Affordable Prices'
bbox = draw.textbbox((0, 0), tagline, font=subtitle_font)
tagline_width = bbox[2] - bbox[0]
tagline_x = (width - tagline_width) // 2
draw.text((tagline_x, 430), tagline, font=subtitle_font, fill=(100, 255, 200, 255))

# Ensure public directory exists
os.makedirs('public', exist_ok=True)

# Save image
image.save('public/og-image.png')
print('✓ og-image.png created successfully!')
