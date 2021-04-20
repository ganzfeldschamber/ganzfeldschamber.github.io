// Deprecated methods to add gallery objects

const addPainting = function (url, placardText, wall) {
    let painting = createPainting( url );
    let placard;
    if (placardText) {
        placard = createPlacard( placardText );
    }
    else { placard = null; }

    wall.gallery.push(painting);
    wall.galleryText.push(placard);

}

const addMovie = function (url, placardText, wall) {
    let movie = createMovie( url );
    let placard;
    if (placardText) {
        placard = createPlacard( placardText );
    }
    else { placard = null; }

    wall.gallery.push(movie);
    wall.galleryText.push(placard);

}



// Room

const addRoom = function () {

    // Main Room //

    let wallpaperUrl = "https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/background1.jpg";
    let wallpaperUrlRotated = "https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/background1_rotated.jpg";
    let wallpaperUrl2 = "https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/background2.png";

    let wallpaperFloor = "https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/Floor.jpg";
    let wallpaperRoof = "https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/Roof.png";
    let wallpaperWalls = "https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/Walls.jpg";

    // Meshfloor
    let mainFloor = createFloor({width: mainRoom.dimensions.width, height: mainRoom.dimensions.depth-sculptureRoom.dimensions.depth, wallpaperUrl: wallpaperFloor});
    // meshFloor.receiveShadow = true;
    mainFloor.position.z += sculptureRoom.dimensions.depth/2;
    scene.add( mainFloor );

    // Mesh ceiling
    let mainCeiling = createFloor({width: mainRoom.dimensions.width, height: mainRoom.dimensions.depth, wallpaperUrl: wallpaperRoof});
    mainCeiling.rotation.x += Math.PI;
    mainCeiling.position.y += mainRoom.dimensions.height;
    scene.add( mainCeiling );
    
    // North wall - Front)
    let mainNorthWall = createWall({width: mainRoom.dimensions.width, height: mainRoom.dimensions.height, wallpaperUrl: wallpaperWalls});
    mainNorthWall.rotation.y -= Math.PI;
    mainNorthWall.position.z += mainRoom.dimensions.depth/2;
    scene.add( mainNorthWall );
    // South wall - Back)
    let mainSouthWall = createWall({width: mainRoom.dimensions.width, height: mainRoom.dimensions.height, wallpaperUrl: wallpaperWalls});
    mainSouthWall.position.z -= mainRoom.dimensions.depth/2;
    scene.add( mainSouthWall );
    // West wall - Left)
    let mainWestWall = createWall({width: mainRoom.dimensions.depth, height: mainRoom.dimensions.height, wallpaperUrl: wallpaperWalls});
    mainWestWall.rotation.y -= Math.PI/2;
    mainWestWall.position.x += mainRoom.dimensions.width/2;
    scene.add( mainWestWall );
    // East wall - Right)
    let mainEastWall = createWall({width: mainRoom.dimensions.depth, height: mainRoom.dimensions.height, wallpaperUrl: wallpaperWalls});
    mainEastWall.rotation.y += Math.PI/2;
    mainEastWall.position.x -= mainRoom.dimensions.width/2;
    scene.add( mainEastWall );


    // Sculpture room //
    // Floor
    let sFloor = createFloor({width: sculptureRoom.dimensions.width, height: sculptureRoom.dimensions.depth, wallpaperUrl: wallpaperUrl});
    sFloor.position.y -= sculptureRoom.dimensions.height;
    sFloor.position.z -= (mainRoom.dimensions.depth/2) - sculptureRoom.dimensions.depth/2;
    scene.add( sFloor );

    // North wall - Front)
    let sNorthWall = createWall({width: sculptureRoom.dimensions.width, height: sculptureRoom.dimensions.height, wallpaperUrl: wallpaperUrl});
    sNorthWall.rotation.y -= Math.PI;
    sNorthWall.position.y -= sculptureRoom.dimensions.height;
    sNorthWall.position.z -= (mainRoom.dimensions.depth/2) - sculptureRoom.dimensions.depth;
    scene.add( sNorthWall );
    // South wall - Back)
    let sSouthWall = createWall({width: sculptureRoom.dimensions.width, height: sculptureRoom.dimensions.height, wallpaperUrl: wallpaperUrl});
    sSouthWall.position.y -= sculptureRoom.dimensions.height;
    sSouthWall.position.z -= mainRoom.dimensions.depth/2;
    scene.add( sSouthWall );
    // West wall - Left)
    let sWestWall = createWall({width: sculptureRoom.dimensions.depth, height: sculptureRoom.dimensions.height, wallpaperUrl: wallpaperUrl});
    sWestWall.rotation.y -= Math.PI/2;
    sWestWall.position.x += sculptureRoom.dimensions.width/2;
    sWestWall.position.y -= sculptureRoom.dimensions.height;
    sWestWall.position.z -= (mainRoom.dimensions.depth/2) - sculptureRoom.dimensions.depth/2;
    scene.add( sWestWall );
    // East wall - Right)
    let sEastWall = createWall({width: sculptureRoom.dimensions.depth, height: sculptureRoom.dimensions.height, wallpaperUrl: wallpaperUrl});
    sEastWall.rotation.y += Math.PI/2;
    sEastWall.position.x -= sculptureRoom.dimensions.width/2;
    sEastWall.position.y -= sculptureRoom.dimensions.height;
    sEastWall.position.z -= (mainRoom.dimensions.depth/2) - sculptureRoom.dimensions.depth/2;
    scene.add( sEastWall );

}

const addToGallery = function () {

    // Left wall
    let img1 = createMovie( 'https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/Video_1.mp4' );
    leftWall.pieces.push(img1)

    let img2 = createMovie( 'https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/Video_2.mp4' );
    leftWall.pieces.push(img2)

    let img3 = createMovie( 'https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/VIdeo_3.mp4' );
    leftWall.pieces.push(img3)
    
    let img4 = createMovie( 'https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/Video_4.mp4' );
    leftWall.pieces.push(img4)

    // Right wall
    
    let img5 = createMovie( 'https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/Video_5.mp4' );
    rightWall.pieces.push(img5)

    let img6 = createMovie( 'https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/Video_6.mp4' );
    rightWall.pieces.push(img6)

    let img7 = createMovie( 'https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/Video_7.mp4' );
    rightWall.pieces.push(img7)
    
    let img8 = createMovie( 'https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/Video_8.mp4' );
    rightWall.pieces.push(img8)

    // Image_6C.m4v

    
    // Centre wall (Movie)

    // Add alpha screen
    let blankScreen = createCustomPlane( {width: mainRoom.dimensions.width-1, height: mainRoom.dimensions.height-1} );
    blankScreen.position.y += (mainRoom.dimensions.height/2)-0.5;
    blankScreen.position.z += (mainRoom.dimensions.depth/2)-0.1;
    blankScreen.rotation.y += Math.PI;
    scene.add(blankScreen);
    
    // Test videos
    // let movie = createMovie( 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' );
    // let movie2 = createMovie( 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' );
    // let testMovie = createMovie( 'https://www.dropbox.com/s/oe9q4mnq0oiz5bs/small.mp4' );
    // let testMovie = createMovie( 'https://drive.google.com/uc?export=download&id=1_0qA7Y546eEc7gkCdGg7hP72GBcIVACo' );
    
    // Moving painting
    // let binMan = createMovingPainting("https://raw.githubusercontent.com/lmonteregge/resonation/main/media/Bin-man-horizontal.png",24)
    // leftWall.pieces.push(binMan)
    
}

const addToSculptureRoom = function () {

    // // Instructions on top
    // let qrInstructions = createCustomPainting( {x:2, y:2, z:0.2, url:'https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/instructions.PNG'} )
    // qrInstructions.rotation.x += Math.PI/2
    // qrInstructions.position.set(0,-podium.position.y,-podium.position.z+6);
    // scene.add(qrInstructions);

    // // QR left
    // let qrCode1 = createPainting( 'https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/a_QR_Code.png' )
    // qrCode1.rotation.x += Math.PI/2
    // qrCode1.position.set(4,-podium.position.y,-podium.position.z+3);
    // scene.add(qrCode1);

    // // QR right
    // let qrCode2 = createPainting( 'https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/i_QR_Code.png' )
    // qrCode2.rotation.x += Math.PI/2
    // qrCode2.position.set(-4,-podium.position.y,-podium.position.z+3);
    // scene.add(qrCode2);
    


}

const positionGalleryPieces = function () {
    const widthBetweenPieces = 4;
    // Left wall
    for (let i = 0; i < leftWall.pieces.length; i++) {
        let piece = leftWall.pieces[i];
        
        piece.position.y = player.height;
        piece.position.x = leftWall.position.x - 0.1;
        piece.position.z += (i * widthBetweenPieces) - widthBetweenPieces;
        
        
        piece.rotation.y += Math.PI/2;
        scene.add( piece );
    }
    // Right wall
    for (let i = 0; i < rightWall.pieces.length; i++) {
        let piece = rightWall.pieces[i];
        
        piece.position.y = player.height;
        piece.position.x = rightWall.position.x + 0.1;
        piece.position.z += (i * widthBetweenPieces) - widthBetweenPieces;
        
        piece.rotation.y += Math.PI/2;
        scene.add( piece );
    }
    // Front wall
    for (let i = 0; i < frontWall.pieces.length; i++) {
        let mov = frontWall.pieces[i];

        mov.position.y = player.height;
        mov.position.z = frontWall.position.z-0.1;
        mov.position.x = -((frontWall.dims.width+5)/2) + (((frontWall.dims.width+5)/(frontWall.pieces.length+1)) * (i+1));
        
        mov.rotation.y += Math.PI;
        scene.add( mov );
    }

}

const addToPodium = function () {
    const setPodiumPosition = (obj) => {
        obj.position.y -= podium.position.y;
        obj.position.z -= podium.position.z;
    }


    // Sculpture
    let sculptureOBJ = 'https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/sculpture_obj.obj';
    let sculptureMTL = 'https://raw.githubusercontent.com/ganzfeldschamber/ganzfeldschamber.github.io/main/ganzfelds/media/sculpture_mtl.mtl';
    createSculpture(sculptureOBJ, sculptureMTL);



    // let box1 = createBox(1,1,1, 'blue');
    // setPodiumPosition(box1)
    // podium.pieces.push(box1);
    // scene.add(box1);
    
    // let box2 = createBox(1,1,1, 'green');
    // setPodiumPosition(box2)
    // podium.pieces.push(box2);
    // scene.add(box2);
    
    // let box3 = createBox(1,1,1, 'red');
    // setPodiumPosition(box3)
    // podium.pieces.push(box3);
    // scene.add(box3);


}






// Lights

const addLights = function () {
    // Ambient light
    ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    // Light
    ceilingLight = createLight(0.8);
    ceilingLight.position.set(0, 3, 0);  // x,y,z
    scene.add(ceilingLight);
    
    // Sculpture room light
    sculptureLight = createLight(1);
    sculptureLight.position.set(0, 0, -8);  // x,y,z
    scene.add(sculptureLight);



}
