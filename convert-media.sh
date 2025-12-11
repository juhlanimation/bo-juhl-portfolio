#!/bin/bash

# Video conversion script - MP4 to WebM
# Image conversion script - PNG to WebP

echo "Starting media conversion..."
echo "Converting videos to WebM and images to WebP"

# Create directory structure
mkdir -p public/videos/frontpage
mkdir -p public/videos/01-elements-of-time
mkdir -p public/videos/02-tower-reveal
mkdir -p public/videos/03-clashmas
mkdir -p public/videos/04-return-to-valoran-city
mkdir -p public/videos/05-the-princess-and-the-green-knight
mkdir -p public/videos/06-donate-your-data
mkdir -p public/videos/other-projects

mkdir -p public/images/01-elements-of-time
mkdir -p public/images/02-tower-reveal
mkdir -p public/images/03-clashmas
mkdir -p public/images/04-return-to-valoran-city
mkdir -p public/images/05-the-princess-and-the-green-knight
mkdir -p public/images/06-donate-your-data
mkdir -p public/images/other-projects

# Function to convert video
convert_video() {
    input="$1"
    output="$2"
    echo "Converting: $input -> $output"
    ffmpeg -i "$input" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" -y "$output" 2>&1 | grep -E "(Duration|time=|error)" || true
}

# Function to convert image
convert_image() {
    input="$1"
    output="$2"
    echo "Converting: $input -> $output"
    ffmpeg -i "$input" -c:v libwebp -quality 85 -y "$output" 2>&1 | grep -E "(error)" || true
}

# Convert Frontpage Reel
convert_video "material/MEDIA FOR WEB/FRONTPAGE_REEL/frontpage.mp4" "public/videos/frontpage/frontpage.webm"

# Convert Elements of Time
convert_video "material/MEDIA FOR WEB/01_ELEMENTS OF TIME/Eot_FullLength.mp4" "public/videos/01-elements-of-time/full-length.webm"
convert_video "material/MEDIA FOR WEB/01_ELEMENTS OF TIME/EoT_Hover.mp4" "public/videos/01-elements-of-time/hover.webm"
convert_image "material/MEDIA FOR WEB/01_ELEMENTS OF TIME/EoT_Thumbnail0.png" "public/images/01-elements-of-time/thumbnail.webp"

# Convert Tower Reveal
convert_video "material/MEDIA FOR WEB/02_TOWER REVEAL/TR_FullLength.mp4" "public/videos/02-tower-reveal/full-length.webm"
convert_video "material/MEDIA FOR WEB/02_TOWER REVEAL/TR_Hover.mp4" "public/videos/02-tower-reveal/hover.webm"
convert_image "material/MEDIA FOR WEB/02_TOWER REVEAL/TR_Thumbnail00.png" "public/images/02-tower-reveal/thumbnail.webp"

# Convert Clashmas
convert_video "material/MEDIA FOR WEB/03_CLASHMAS/CM_FullLength.mp4" "public/videos/03-clashmas/full-length.webm"
convert_image "material/MEDIA FOR WEB/03_CLASHMAS/CM_Thumbnail0.png" "public/images/03-clashmas/thumbnail.webp"
convert_image "material/MEDIA FOR WEB/03_CLASHMAS/SS_Thumbnail0.png" "public/images/03-clashmas/thumbnail-alt.webp"

# Convert Return to Valoran City
convert_video "material/MEDIA FOR WEB/04_RETURN TO VALORAN CITY/RtVC_FullLength.mp4" "public/videos/04-return-to-valoran-city/full-length.webm"
convert_video "material/MEDIA FOR WEB/04_RETURN TO VALORAN CITY/RtVC_Hover.mp4" "public/videos/04-return-to-valoran-city/hover.webm"
convert_image "material/MEDIA FOR WEB/04_RETURN TO VALORAN CITY/RtVC_Thumbnail0.png" "public/images/04-return-to-valoran-city/thumbnail.webp"

# Convert The Princess and the Green Knight
convert_video "material/MEDIA FOR WEB/05_THE PRINCESS AND THE GREEN KNIGHT/PaGK_FullLength.mp4" "public/videos/05-the-princess-and-the-green-knight/full-length.webm"
convert_video "material/MEDIA FOR WEB/05_THE PRINCESS AND THE GREEN KNIGHT/PaGK_Hover.mp4" "public/videos/05-the-princess-and-the-green-knight/hover.webm"
convert_image "material/MEDIA FOR WEB/05_THE PRINCESS AND THE GREEN KNIGHT/PaGK_Thumbnail0.png" "public/images/05-the-princess-and-the-green-knight/thumbnail.webp"

# Convert Donate Your Data
convert_video "material/MEDIA FOR WEB/06_DONATE YOUR DATA/DyD_FullLength.mp4" "public/videos/06-donate-your-data/full-length.webm"
convert_video "material/MEDIA FOR WEB/06_DONATE YOUR DATA/DyD_Hover.mp4" "public/videos/06-donate-your-data/hover.webm"
convert_image "material/MEDIA FOR WEB/06_DONATE YOUR DATA/DyD_Thumbnail0.png" "public/images/06-donate-your-data/thumbnail.webp"

# Convert Other Projects - Genshin Impact
convert_video "material/MEDIA FOR WEB/OTHER PROJECTS/GenshinImpact_FullLength.mp4" "public/videos/other-projects/genshin-impact-full-length.webm"
convert_video "material/MEDIA FOR WEB/OTHER PROJECTS/GenshinImpact_Hover.mp4" "public/videos/other-projects/genshin-impact-hover.webm"
convert_image "material/MEDIA FOR WEB/OTHER PROJECTS/GenshinImpact_Thumbnail0.png" "public/images/other-projects/genshin-impact-thumbnail.webp"

# Convert Other Projects - It's On
convert_video "material/MEDIA FOR WEB/OTHER PROJECTS/ItsOn_FullLength.mp4" "public/videos/other-projects/its-on-full-length.webm"
convert_video "material/MEDIA FOR WEB/OTHER PROJECTS/ItsOn_Hover.mp4" "public/videos/other-projects/its-on-hover.webm"
convert_image "material/MEDIA FOR WEB/OTHER PROJECTS/ItsOn_Thumbnail0.png" "public/images/other-projects/its-on-thumbnail.webp"

# Convert Other Projects - Marvel
convert_video "material/MEDIA FOR WEB/OTHER PROJECTS/Marvel_FullLength.mp4" "public/videos/other-projects/marvel-full-length.webm"
convert_video "material/MEDIA FOR WEB/OTHER PROJECTS/Marvel_Hover.mp4" "public/videos/other-projects/marvel-hover.webm"
convert_image "material/MEDIA FOR WEB/OTHER PROJECTS/Marvel_Thumbnail00.png" "public/images/other-projects/marvel-thumbnail.webp"

# Convert Other Projects - Ninjago
convert_video "material/MEDIA FOR WEB/OTHER PROJECTS/Ninjago_FullLength.mp4" "public/videos/other-projects/ninjago-full-length.webm"
convert_video "material/MEDIA FOR WEB/OTHER PROJECTS/Ninjago_Hover.mp4" "public/videos/other-projects/ninjago-hover.webm"
convert_image "material/MEDIA FOR WEB/OTHER PROJECTS/Ninjago_Thumbnail0.png" "public/images/other-projects/ninjago-thumbnail.webp"

# Convert Other Projects - The Goblin Queen
convert_video "material/MEDIA FOR WEB/OTHER PROJECTS/TheGoblinQueen_FullLength.mp4" "public/videos/other-projects/the-goblin-queen-full-length.webm"
convert_video "material/MEDIA FOR WEB/OTHER PROJECTS/TheGoblinQueen_Hover.mp4" "public/videos/other-projects/the-goblin-queen-hover.webm"
convert_image "material/MEDIA FOR WEB/OTHER PROJECTS/TheGoblinQueen_Thumbnail0.png" "public/images/other-projects/the-goblin-queen-thumbnail.webp"

# Convert Other Projects - The Path
convert_video "material/MEDIA FOR WEB/OTHER PROJECTS/ThePath_FullLength.mp4" "public/videos/other-projects/the-path-full-length.webm"
convert_video "material/MEDIA FOR WEB/OTHER PROJECTS/ThePath_Hover.mp4" "public/videos/other-projects/the-path-hover.webm"
convert_image "material/MEDIA FOR WEB/OTHER PROJECTS/ThePath_Thumbnail0.png" "public/images/other-projects/the-path-thumbnail.webp"

# Convert Other Projects - Travel Oregon
convert_video "material/MEDIA FOR WEB/OTHER PROJECTS/TravelOregon_FullLength.mp4" "public/videos/other-projects/travel-oregon-full-length.webm"
convert_video "material/MEDIA FOR WEB/OTHER PROJECTS/TravelOregon_Hover.mp4" "public/videos/other-projects/travel-oregon-hover.webm"
convert_image "material/MEDIA FOR WEB/OTHER PROJECTS/TravelOregon_Thumbnail0.png" "public/images/other-projects/travel-oregon-thumbnail.webp"

echo ""
echo "Conversion complete!"
echo "Videos saved to: public/videos/"
echo "Images saved to: public/images/"
