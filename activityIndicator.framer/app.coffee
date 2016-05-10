background = new BackgroundLayer
		backgroundColor: "#000"

Spinner = require 'activityIdicator'

defaultSpinner = new Spinner
	
bigSpinner = new Spinner
	height:30
	width:6
	radius:30
	
blueSpinner = new Spinner
	count:12
	state1:
		backgroundColor:'#00BFFF'
		radius:10
		time:0
		opacity:0
	state2:
		backgroundColor:'#00BFFF'
		radius:30
		time:0.2
		opacity:1
		curve:'ease-out'
	state2a:
		backgroundColor:'#00BFFF'
		radius:30
		time:0.5
		opacity:1
	state3:
		backgroundColor:'#00BFFF'
		radius:10
		time:0.2
		opacity:1
		curve:'ease-in'
	state4:
		backgroundColor:'#00BFFF'
		radius:10
		opacity:0
		time:8
	
orangeSpinner = new Spinner
	state1:
		backgroundColor:'#FFBF11'
		radius:10
		time:0
	state2:
		backgroundColor:'#FFBF11'
		radius:10
		angle:100
		time:0.3
	state3:
		backgroundColor:'#FFBF11'
		radius:10
		angle:0
		time:0.5
	state4:
		backgroundColor:'#FFBF11'
		radius:10
		angle:0
		time:0.5

dotsSpinner = new Spinner
	radius:20
	length:10
	width:10
	time:0.5
	cycles:2

progressSpinner = new Spinner
	startLooped:false
	count:40
	radius:20
	length:5
	width:2
	time:4
	
barsInToMiddleSpinner = new Spinner
	count:40
	radius:20
	length:5
	width:2
	time:2
	state1:
		opacity:0.3
		radius:20
		time:0
	state2:
		opacity:1
		radius:0
		time:0.4
	state3:
		opacity:0.3
		radius:20
		time:0.6
	state4:
		opacity:0.3
		radius:20
		time:7
	
singleDotSpinner = new Spinner
	length:10
	width:10
	radius:20
	cycles:2
	fromNothing:
		opacity:0
		time:0
	bigBlob:
		opacity:1
		time:0.2
		scale:2
		radius:0
	toNothing:
		opacity:0
		time:0.2
		scale:1
	gap:
		opacity:0
		time:2
	
fourDotsRotatingSpinner = new Spinner
	radial:false
	width:10
	height:10
	count:4
	state1:
		x:-20
		y:-20
		curve:'ease-in-out'
		opacity:0
	state2:
		x:20
		y:-20
		curve:'ease-in-out'
	state3:
		x:20
		y:20
		curve:'ease-in-out'
		opacity:0
	state4:
		x:-20
		y:20
		curve:'ease-in-out'

redDotTriangleRotatingSpinner = new Spinner
	radial:false
	width:10
	height:10
	count:3
	state1:
		x:-20
		y:-20
		curve:'ease-in-out'
		backgroundColor:'red'
	state2:
		x:20
		y:-20
		curve:'ease-in-out'
		backgroundColor:'red'
	state3:
		x:20
		y:20
		curve:'ease-in-out'
		backgroundColor:'red'
	state4:
		x:-20
		y:20
		curve:'ease-in-out'
		backgroundColor:'red'

horizontalBarJogWheel = new Spinner
	radial:false
	count:10
	height:10
	width:8
	borderRadius:2
	originY:0.5
	state1:
		x:-50
		time:0
		opacity:0
		curve:'ease-out'
	state2:
		x:0
		time:1.5
		opacity:1
		curve:'ease-in'
		scale:1.2
	state3:
		x:50
		opacity:0
		time:1.5
		

blueSwirlSpinner = new Spinner
	height:3
	width:5
	radius:20
	count:120
	direction:-1
	backgroundColor:'#00BFFF'
	state1:
		opacity:1
		time:0
	state2:
		opacity:0
		time:0.4

barsRoundSpinSpinner = new Spinner
	radial:false
	curve:'ease-in'
	originY:2
	state1:
		x:0
		rotation:0
		time:0
	state2:
		x:0
		rotation:360
		time:2
		opacity:0
		
		
rainbowTriangle = new Spinner
	radial:false
	curve:'linear'
	count:20
	height:5
	width:5
	state1:
		x:0
		y:-20
		backgroundColor:'red'
	state3:
		x:30
		y:30
		backgroundColor:'yellow'
	state4:
		x:-30
		y:30
		backgroundColor:'blue'
		
barsFlatToSpinner = new Spinner
	height:20
	count:10
	state1:
		radius:10
		time:0
		angle:0
		backgroundColor:'red'
	state2:
		radius:30
		time:0.1
		angle:105
		backgroundColor:'yellow'
		curve:'spring(203, 10, 17)'
	state3:
		radius:10
		time:0.3
		backgroundColor:'red'
	state4:
		radius:10
		time:1
		backgroundColor:'yellow'

rotatingBarsSpinner = new Spinner
	height:10
	width:5
	count:10
	radius:20
	curve:'linear'
	state1:
		angle:0
		height:14
		time:0
	state2:
		angle:360
		height:0
		time:1
	state3:
		angle:180
		time:1

rainbowDotRows = new Spinner
	radial:false
	count:10
	height:10
	width:10
	radius:20
	borderRadius:3
	curve:'linear'
	state1:
		x:30
		y:-20
		time:0
		backgroundColor:'red'
		curve:'ease-out'
	state2:
		x:-30
		y:-20
		time:1
		backgroundColor:'yellow'
		opacity:0
	state3:
		x:30
		y:0
		time:0
		backgroundColor:'green'
		curve:'ease-out'
	state4:
		x:-30
		y:0
		time:1
		backgroundColor:'blue'
		opacity:0
	state5:
		x:30
		y:20
		time:0
		backgroundColor:'red'
		curve:'ease-out'
	state6:
		x:-30
		y:20
		backgroundColor:'purple'
		opacity:0

t = 1
rotatingSquareSpinner = new Spinner
	radial:false
	height:28
	count:4
	curve:'ease-in-out'
	state1:
		x:-20
		y:-20
		rotation:-90
		time:t
	state2:
		x:20
		y:-20
		rotation:0
		time:t
	state3:
		x:20
		y:20
		rotation:90
		time:t
	state4:
		x:-20
		y:20
		rotation:180
		time:t
	state5:
		x:-20
		y:20
		rotation:-180
		time:0


# arrange in a grid
rowHeight = Framer.Device.screen.height/6.3
columnWidth = Framer.Device.screen.width/3.5
offsetX = Framer.Device.screen.width/5
offsetY = Framer.Device.screen.height/10
rows = 6
columns = 3
r=0
i=0
for child in Framer.CurrentContext.layers
	if child.parent is null
		if child.constructor.name is "BackgroundLayer"
			continue
		col = i % columns
		child.x = col*columnWidth + offsetX
		child.y = rowHeight*r + offsetY
		if col is columns-1
			r++
		i++
