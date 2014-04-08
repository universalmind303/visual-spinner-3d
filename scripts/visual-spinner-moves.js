MoveFactory.prototype.flower = function(options) {
	options = this.defaults(options,{
		direction: CLOCKWISE,
		spin: INSPIN,
		petals: 4,
		extend: 1,
		duration: 1,
		speed: 1,
		mode: DIAMOND,
		plane: WALL
	});
	var myMove = new SimpleMove();
	myMove.options = options;
	if (options.spin==INSPIN) {
		myMove.prop.speed = (options.petals+1)*options.spin*options.direction*options.speed;
	} else {
		myMove.prop.speed = (options.petals-1)*options.spin*options.direction*options.speed;
	}
	myMove.hand.radius = options.extend;
	myMove.hand.speed = options.direction*options.speed;
	myMove.beats = options.duration;
	myMove.prop.plane = options.plane;
	myMove.hand.plane = options.plane;
	myMove.align.prop.offset = options.mode;
	return myMove;
}
MoveFactory.prototype.ccap = function(options) {
	options = this.defaults(options,{
		direction: CLOCKWISE,
		inspin_petals: 0,
		antispin_petals: 4, 
		extend: 1,
		speed: 1
	});
	var myMove = new CompositeMove();
	myMove.options = options;
	myMove.addMove(this.flower({
		direction: options.direction,
		spin: INSPIN,
		petals: options.inspin_petals,
		extend: options.extend,
		speed: options.speed,
		duration: 0.25/options.speed
	}));
	myMove.addMove(this.flower({
		direction: options.direction,
		spin: INSPIN,
		petals: options.inspin_petals,
		extend: options.extend,
		speed: options.speed,
		duration: 0.25/options.speed
	}));
	myMove.addMove(this.flower({
		direction: -options.direction,
		spin: ANTISPIN,
		petals: options.antispin_petals,
		extend: options.extend,
		speed: options.speed,
		duration: 0.25/options.speed
	}));
	myMove.addMove(this.flower({
		direction: -options.direction,
		spin: ANTISPIN,
		petals: options.antispin_petals,
		extend: options.extend,
		speed: options.speed,
		duration: 0.25/options.speed
	}));
	myMove.align.prop.offset = 0;
	return myMove;
}


MoveFactory.prototype.antibend = function(options) {
	options = this.defaults(options,{
		direction: CLOCKWISE,
		lobes: 4, 
		speed: 1,
		plane: WALL
	});
	var myMove = new CompositeMove();
	myMove.options = options;
	var segment;
	var nlobes;
	if (options.lobes%2==0) {
		nlobes = options.lobes;
	} else {
		nlobes = 2*options.lobes;
	}
	for (var i = 0; i<nlobes; i++) {
		segment = new SimpleMove();
		segment.options = options;
		segment.prop.radius = 1;
		segment.hand.radius = 1/Math.tan(UNIT/(2*options.lobes));
		segment.hand.speed = 0;
		if (i%2==0) {
			segment.prop.speed = options.speed*options.lobes/2;
		} else {
			segment.prop.speed = -options.speed*options.lobes/2;
		}
		segment.beats = 1/(options.speed*options.lobes);
		segment.align.hand.radius = 1;
		segment.align.prop.offset = -options.direction*QUARTER;
		segment.align.prop.tilt = 0;
		segment.finish.hand.rotate = options.direction*UNIT/options.lobes;
		segment.finish.prop.rotate = -options.direction*UNIT/options.lobes;
		myMove.addMove(segment);
	}
	return myMove;
}

MoveFactory.prototype.isobend = function(options) {
	options = this.defaults(options,{
		direction: CLOCKWISE,
		lobes: 4, 
		speed: 1,
		plane: WALL
	});
	var myMove = new CompositeMove();
	myMove.options = options;
	var segment;
	for (var i = 0; i<options.lobes; i++) {
		segment = new SimpleMove();
		segment.options = options;
		segment.prop.radius = 1;
		segment.hand.radius = 1;
		segment.hand.speed = 0;
		segment.prop.speed = options.speed*options.lobes;
		segment.beats = 1/(options.speed*options.lobes);
		segment.align.hand.radius = 1;
		segment.align.prop.offset = OFFSET;
		segment.align.prop.tilt = -QUARTER;
		segment.finish.hand.rotate = options.direction*UNIT/options.lobes;
		segment.finish.prop.rotate = options.direction*UNIT/options.lobes;
		myMove.addMove(segment);
	}
	return myMove;
}

MoveFactory.prototype.pendulum = function(options) {
	options = this.defaults(options,{
		direction: CLOCKWISE,
		extend: 1, 
		spin: INSPIN,
		plane: WALL,
		speed: 1
	});
	var myMove = new CompositeMove();
	myMove.options = options;
	var segment;
	segment = new SimpleMove();
	segment.beats = 0.25*options.speed;
	segment.hand.radius = options.extend;
	segment.hand.speed = options.speed * options.direction;
	segment.hand.plane = options.plane;
	segment.prop.plane = options.plane;
	segment.prop.begin_speed = 2*INSPIN*options.direction*options.speed;
	segment.prop.end_speed = 0;
	myMove.addMove(segment);
	segment = new SimpleMove();
	segment.beats = 0.25*options.speed;
	segment.hand.radius = options.extend;
	segment.hand.speed = options.speed * options.direction;
	segment.hand.plane = options.plane;
	segment.prop.plane = options.plane;
	segment.prop.begin_speed = 0;
	segment.prop.end_speed = 2*ANTISPIN*options.direction*options.speed;
	myMove.addMove(segment);
	segment = new SimpleMove();
	segment.beats = 0.25*options.speed;
	segment.hand.radius = options.extend;
	segment.hand.speed = options.speed * options.direction;
	segment.hand.plane = options.plane;
	segment.prop.plane = options.plane;
	segment.prop.begin_speed = 2*ANTISPIN*options.direction*options.speed;
	segment.prop.end_speed = 0;
	myMove.addMove(segment);
	segment = new SimpleMove();
	segment.beats = 0.25*options.speed;
	segment.hand.radius = options.extend;
	segment.hand.speed = options.speed * options.direction;
	segment.hand.plane = options.plane;
	segment.prop.plane = options.plane;
	segment.prop.begin_speed = 0;
	segment.prop.end_speed = 2*INSPIN*options.direction*options.speed;
	myMove.addMove(segment);
	myMove.align.THREE = {prop: {angle: THREE}};
	myMove.align.SIX = {prop: {angle: SIX}};
	myMove.align.NINE = {prop: {angle: NINE}};
	myMove.align.TWELVE = {prop: {angle: SIX}};
	myMove.align.TWELVE.phase = 2;
	if (options.direction==CLOCKWISE) {
		myMove.align.THREE.phase = 3;
		myMove.align.NINE.phase = 1;
	} else {
		myMove.align.THREE.phase = 1;
		myMove.align.NINE.phase = 3;
	}
	return myMove;
}

MoveFactory.prototype.onepointfive = function(options) {
	options = this.defaults(options,{
		direction: CLOCKWISE,
		extend: 1, 
		spin: INSPIN,
		plane: WALL,
		speed: 1
	});
	var myMove = new CompositeMove();
	myMove.options = options;
	var segment;
	segment = new SimpleMove();
	segment.beats = 0.25*options.speed;
	segment.hand.radius = options.extend;
	segment.hand.speed = options.speed * options.direction;
	segment.hand.plane = options.plane;
	segment.prop.plane = options.plane;
	segment.prop.begin_speed = 6*INSPIN*options.direction*options.speed;
	segment.prop.end_speed = 0;
	myMove.addMove(segment);
	segment = new SimpleMove();
	segment.beats = 0.25*options.speed;
	segment.hand.radius = options.extend;
	segment.hand.speed = options.speed * options.direction;
	segment.hand.plane = options.plane;
	segment.prop.plane = options.plane;
	segment.prop.begin_speed = 0;
	segment.prop.end_speed = 2*ANTISPIN*options.direction*options.speed;
	myMove.addMove(segment);
	segment = new SimpleMove();
	segment.beats = 0.25*options.speed;
	segment.hand.radius = options.extend;
	segment.hand.speed = options.speed * options.direction;
	segment.hand.plane = options.plane;
	segment.prop.plane = options.plane;
	segment.prop.begin_speed = 2*ANTISPIN*options.direction*options.speed;
	segment.prop.end_speed = 0;
	myMove.addMove(segment);
	segment = new SimpleMove();
	segment.beats = 0.25*options.speed;
	segment.hand.radius = options.extend;
	segment.hand.speed = options.speed * options.direction;
	segment.hand.plane = options.plane;
	segment.prop.plane = options.plane;
	segment.prop.begin_speed = 0;
	segment.prop.end_speed = 6*INSPIN*options.direction*options.speed;
	myMove.addMove(segment);
	myMove.align.THREE = {prop: {angle: THREE}};
	myMove.align.SIX = {prop: {angle: TWELVE}};
	myMove.align.NINE = {prop: {angle: NINE}};
	myMove.align.TWELVE = {prop: {angle: SIX}};
	myMove.align.TWELVE.phase = 2;
	if (options.direction==CLOCKWISE) {
		myMove.align.THREE.phase = 3;
		myMove.align.NINE.phase = 1;
	} else {
		myMove.align.THREE.phase = 1;
		myMove.align.NINE.phase = 3;
	}
	return myMove;
}

MoveFactory.prototype.isolation = function(options) {
// A no-offset isolation is a unit-circle extension. An anti-spin isolation is a cateye;
	options = this.defaults(options,{
		direction: CLOCKWISE,
		spin: INSPIN,
		offset: OFFSET,
		duration: 1,
		speed: 1,
		plane: WALL
	});
	var myMove = new SimpleMove();
	myMove.options = options;
	myMove.hand.radius = 0.5;
	myMove.hand.speed = options.direction*options.speed;
	myMove.prop.speed = options.spin*options.direction*options.speed;
	myMove.beats = options.duration;
	myMove.prop.plane = options.plane;
	myMove.hand.plane = options.plane;
	myMove.align.prop.offset = options.offset;
	return myMove;
}

MoveFactory.prototype.staticspin = function(options) {
	options = this.defaults(options,{
		direction: CLOCKWISE,
		duration: 1,
		speed: 1,
		plane: WALL
	});
	var myMove = new SimpleMove();
	myMove.hand.radius = 0;
	myMove.hand.speed = 0;
	myMove.prop.speed = options.direction*options.speed;
	myMove.prop.plane = options.plane;
	myMove.beats = options.duration;
	return myMove;
}

MoveFactory.prototype.linex = function(options) {
	options = this.defaults(options,{
		angle: THREE,
		direction: CLOCKWISE,
		loops: 1,
		duration: 1,
		speed: 1,
		plane: WALL
	});
	var myMove = new CompositeMove();
	myMove.options = options;
	var one = new SimpleLinear();
	var two = new SimpleLinear();
	one.beats = options.duration/2;
	two.beats = options.duration/2;
	one.prop.speed = options.loops*options.direction*options.speed;
	two.prop.speed = options.loops*options.direction*options.speed;
	one.hand.begin_speed = 8*options.speed;
	one.hand.end_speed = -8*options.speed;
	one.hand.angle = options.angle;
	two.hand.begin_speed = 8*options.speed;
	two.hand.end_speed = -8*options.speed;
	two.hand.angle = options.angle + OFFSET;
	myMove.addMove(one);
	myMove.addMove(two);
	myMove.align.hand.radius = 0;
	myMove.align.prop.angle = options.angle-options.direction*QUARTER;
	return myMove;
}




MoveFactory.prototype.weave = function(options) {
        options = this.defaults(options,{
		//could use spin instead of direction
                direction: CLOCKWISE,
		spin: FORWARD,
                beats: 2,
                duration: 1,
                speed: 1,
                extend: 0.5,
                hand_plane: WALL,
                prop_plane: WHEEL,
                bendiness: 0,
                shape: "linear",
		bendiness: 0
        });
        var myMove = new CompositeMove();
        myMove.options = options;
        var one;
        var two;
        if (options.shape=="linear") {
                one = new SimpleLinear();
                two = new SimpleLinear();
                one.hand.angle = THREE;
                one.hand.begin_speed = 8*options.extend*options.direction*options.speed;
                one.hand.end_speed = -8*options.extend*options.direction*options.speed;
                two.hand.angle = NINE ;
                two.hand.begin_speed = 8*options.extend*options.direction*options.speed;
                two.hand.end_speed = -8*options.extend*options.direction*options.speed;
                myMove.align.hand.radius = 0;
        } else if (options.shape=="circular") {
                one = new SimpleMove();
                two = new SimpleMove();
                one.hand.speed = options.direction*options.speed;
                two.hand.speed = options.direction*options.speed;
                one.hand.radius = options.extend;
                two.hand.radius = options.extend;
        }
        one.beats = options.duration/2;
        two.beats = options.duration/2;
        one.hand.plane = options.hand_plane;
        two.hand.plane = options.hand_plane;
        one.prop.plane = options.prop_plane;
        two.prop.plane = options.prop_plane;
        one.prop.speed = options.beats*options.spin*options.speed;
        two.prop.speed = options.beats*options.spin*options.speed;
        myMove.addMove(one);
        myMove.addMove(two);
        return myMove;
}

MoveFactory.prototype.superman = function(options) {
                options = this.defaults(options,{
                direction: CLOCKWISE,
                spin: INSPIN,
                extend: 0.5,
                duration: 1,
                speed: 1,
                hand_plane: WALL,
                prop_plane: FLOOR,
                shape: "linear"
        });
        var myMove = new CompositeMove();
        myMove.options = options;
	var segment;
	for (var i = 0; i<4; i++) {
		if (options.shape=="linear") {
			segment = new SimpleLinear();
			segment.hand.angle = THREE;
			if (i==0 || i==2) {
				segment.hand.begin_speed = 8*options.extend*options.direction*options.speed;
				segment.hand.end_speed = 0;
			} else {
				segment.hand.begin_speed = 0;
				segment.hand.end_speed = 8*options.extend*options.direction*options.speed;
			}
			if (i==0 || i==3) {
				segment.hand.angle = THREE;
			} else {
				segment.hand.angle = NINE;
			}
			myMove.align.hand.radius = 0;
		} else if (options.shape=="circular") {
			segment= new SimpleMove();
			segment.hand.speed = options.direction*options.speed;
			segment.hand.radius = options.extend;
		}
		segment.beats = options.duration/4;
		segment.hand.plane = options.hand_plane;
		segment.prop.plane = options.prop_plane;
		if (i==0 || i==3) {
			segment.prop.speed = 2*options.speed*options.direction*options.spin;
		} else {
			segment.prop.speed = -2*options.speed*options.direction*options.spin;
		}
		myMove.addMove(segment);
		if (i==0 || i==2) {
			segment.align.prop.angle=TWELVE;
		} else {
			segment.align.prop.angle=SIX;
		}
	}
	//I think this gets overridden by the controller
	//myMove.align.prop.angle = TWELVE;
        return myMove;
} 