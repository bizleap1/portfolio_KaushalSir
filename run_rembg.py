from rembg import remove
from PIL import Image

input_path = 'public/portrait.png'
output_path = 'public/portrait-transparent.png'

print("Starting background removal...")
input_img = Image.open(input_path)
output_img = remove(input_img)
output_img.save(output_path)
print("Finished background removal!")
