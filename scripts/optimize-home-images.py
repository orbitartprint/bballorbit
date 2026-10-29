"""Rebuild website delivery variants; original artwork remains the source."""
from pathlib import Path
from PIL import Image

def optimize(repo):
    destination=repo/'public/optimized-home'
    destination.mkdir(parents=True,exist_ok=True)
    def variant(source,target,width,quality):
        with Image.open(repo/source) as image:
            height=round(image.height*width/image.width)
            resized=image.resize((width,height),Image.Resampling.LANCZOS)
            resized.save(repo/target,'WEBP',quality=quality,method=6)
        print(f'{target}: {(repo/target).stat().st_size} bytes, {width}x{height}')
    for width in (960,1920): variant('public/lovable-uploads/arena-1.webp',f'public/optimized-home/arena-{width}.webp',width,70)
    for width in (360,720,1280): variant('public/lovable-uploads/tagging-up-hero.webp',f'public/optimized-home/tagging-up-{width}.webp',width,78)
    variant('src/assets/basketball-orbit-logo.webp','src/assets/basketball-orbit-logo-display.webp',320,88)

if __name__=='__main__':
    # In the repository this script lives under scripts/.
    optimize(Path(__file__).resolve().parents[1])
