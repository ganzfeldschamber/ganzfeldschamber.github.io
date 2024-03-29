var scene, camera, mesh, renderer;
var cube;
var container;

var gameSize = { height: window.innerHeight, width: window.innerWidth };
// var gameSize = { height: 480, width: 1200 };
// var gameSize = { height: 800, width: 1200 };

var keyboard = new THREEx.KeyboardState();
// var keyboard = {};
var player = { height: 2, speed: 0.3, turnSpeed: Math.PI*0.01 };
var cameraDirection = "left";

var youtubeVideo;
var videos = [];
var currentVideoIndex = 0;
var currentVideoPiece;

var delays = { keyboardWait: true, sculptureWait: true};
var keyboardWaitDelay = true
// var sculptureWaitDelay = true

var clock = new THREE.Clock();
var animators = [];     // For gif moving images


// Rooms
var mainRoom = {
    dimensions: { width: 10, height: 6, depth: 14},
    walls: { north: null, south: null, west: null, east: null}
}
var sculptureRoom = {
    dimensions: { width: mainRoom.dimensions.width, height: mainRoom.dimensions.depth/3, depth: mainRoom.dimensions.height},  //mainRoom.dimensions.depth/2
    walls: { north: null, south: null, west: null, east: null}
}

var leftWall = {
    name: "left",
    pieces: [], 
    position: {x: mainRoom.dimensions.width/2},
    dims: {length: mainRoom.dimensions.depth}
};
var rightWall = {
    name: "right",
    pieces: [], 
    position: {x: -mainRoom.dimensions.width/2},
    dims: {length: mainRoom.dimensions.depth}
};
var frontWall = {
    pieces: [], 
    position: {z: mainRoom.dimensions.depth/2},
    dims: {width: mainRoom.dimensions.width}
};

var podium = {
    base: null,
    pieces: [],
    index: 0,
    stage: 1,
    position: {
        x: 0,
        y: (sculptureRoom.dimensions.height/2),
        z: (mainRoom.dimensions.depth/2)
    }

}

// Resources for embedded Youtube Video in an iframe loaded as a texture in WebGL renderer

    // WebGL+CSS3D renderer webpage
    // Source: https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/CSS3D.html
    // Link: https://stemkoski.github.io/Three.js/CSS3D.html

    // CSS3D renderer youtube videos
    // Source: https://github.com/rollup/three-jsnext/blob/master/examples/css3d_youtube.html
    // Link: https://threejs.org/examples/css3d_youtube.html
    
    // WegGL+CSS3D renderer video
    // Source: https://github.com/jeromeetienne/videobrowser4learningthreejs/blob/master/index.html
    // Link: http://jeromeetienne.github.io/videobrowser4learningthreejs/ 


const init = function () {
    // Camera and scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( baseZoom, gameSize.width / gameSize.height, 0.1, 1000 );
    
    // Renderer
    renderer = new THREE.WebGLRenderer( { alpha: true } );
    renderer.domElement.id = 'main-canvas';
    renderer.setSize( gameSize.width, gameSize.height );
    renderer.domElement.style.border = "solid 3px blue"
    container = document.getElementById('main-canvas-container');
    container.appendChild( renderer.domElement );

    THREEx.WindowResize(renderer, camera);



    // Add rooms (gallery.js)
    addRoom();

    // Add paintings and movies
    addToGallery();
    positionGalleryPieces();

    // Add sculpture
    addToPodium();
    addToSculptureRoom();

    // Lights
    addLights();
    
    
    // Set camera position
    cameraStartPosition();
    
    
    // Animate
    animate();
}

const cameraStartPosition = () => {
    camera.position.set(0, player.height, -((mainRoom.dimensions.depth/2)-(sculptureRoom.dimensions.depth/2)));  // Set position
    camera.lookAt(new THREE.Vector3(0, player.height, 0));  // Look at

}



// Animate
const animate = function () {
    requestAnimationFrame( animate );

    animation();
    render();
    update();
};

const render = function () {

    // Renderer
    renderer.render( scene, camera );

    // Update camera direction
    updateCameraDirection();
    // Update painting that's within viewing angle
    updateCurrentPieceViewing()


}

const animation = function () {
    // Animation
    var delta = clock.getDelta(); 
    
    for (let i=0; i<animators.length; i++) {
        let annie = animators[i];
        annie.update(1000 * delta);
    }

    
    
    // Sculptures
    if ( podium.pieces.length != 0 ) {
        let sculpture = podium.pieces[podium.index];
        let rotationSpeed = 0.005, moveSpeed = 0.05;
        let timeOnShow = 5000;  // Time in milliseconds
    
        // Rotate sculpture
        sculpture.rotation.z -= rotationSpeed;
    
        // Rising
        if ( podium.stage == 1 ) {
            if (sculpture.position.z < -podium.position.z + (sculptureRoom.dimensions.depth/2)) {
                sculpture.position.z += moveSpeed;
            }
            else { podium.stage = 2; }
        }
        else if ( podium.stage == 2 ) {
            // Delay for x seconds to show
            if (delays.sculptureWait) {
                setTimeout(function() {
                    if ( podium.pieces.length > 1 ) {  // If only 1 piece, then no need to go down
                        podium.stage = 3;
                        delays.sculptureWait = true;
                    }
                }, timeOnShow);
                delays.sculptureWait = false;
            }
        }
        else if ( podium.stage == 3 ) {
            // Lowering
            if (sculpture.position.z > -podium.position.z) {
                sculpture.position.z -= moveSpeed;
            }
            else { 
                podium.stage = 1;
                // Set sculpture index
                if (podium.index == podium.pieces.length-1) {
                    podium.index = 0;
                }
                else { podium.index++; }
            }
        }
    }
    
    
    
    // Update text showing id of selected video
    if (videos.length != 0) {
        // document.getElementById('selectedVidId').textContent = currentVideoIndex+1;
        // document.getElementById('selectedVidPlaying').textContent = videos[currentVideoIndex].video.paused ? '(Paused)' : '(Playing)';
        // document.getElementById('selectedVidMuted').textContent = videos[currentVideoIndex].video.muted ? '(Muted)' : '(Sound on)';
        // Videos
        for (let i = 0; i < videos.length; i++) {
            
            // Only play video that is being looked at
            if ( videos[i].id == currentVideoPiece ) {
                var video = videos[i].video;
                var videoImageContext = videos[i].imageContext;
                var videoTexture = videos[i].texture;
                var videoWidth = videos[i].width;
                var videoHeight = videos[i].height;
        
                if ( video.readyState === video.HAVE_ENOUGH_DATA ) 
                {
                    videoImageContext.drawImage( video, 0, 0, videoWidth, videoHeight );
                    if ( videoTexture ) 
                    videoTexture.needsUpdate = true;
                }
            }

        }
    }

}

const movingWallPieces = function (wall, forward=true) {
    let moveSpeed = 0.1;
    if (forward==false){
        moveSpeed = -0.1;
    }
        // Left wall conveyor belt
        if (wall.pieces.length != 0) {
            for (let i = 0; i < wall.pieces.length; i++) {
                let piece = wall.pieces[i];
                piece.position.z -= moveSpeed;
    
                // Reset position if past back wall
                if (piece.position.z < -(wall.dims.length/2)-1) {
                    piece.position.z = (wall.dims.length/2)+1
                }
                // Reset position if past front wall
                if (piece.position.z > (wall.dims.length/2)+1) {
                    piece.position.z = -(wall.dims.length/2)-1
                }
            }
        }
}

const updateCurrentPieceViewing = () => {
    // Consts
    const fromBackWall = -6; 
    const toFront = -2; 

    // Get current wall
    let currentWall = leftWall;
    if ( cameraDirection == "right" ) {
        currentWall = rightWall;
    } 
    
    // If position in between viewing angle and camera facing wall
    for (let i = 0; i < currentWall.pieces.length; i++) {
        let piece = currentWall.pieces[i];
        if (piece.position.z > fromBackWall && piece.position.z < toFront ) {
            currentVideoPiece = piece.uuid;               
        }
    }
}

const updateCameraDirection = () => {
    if ( camera.rotation.y < 0 ) {
        cameraDirection = "left";
    }
    else {
        cameraDirection = "right";
    }
}



window.onload = init();