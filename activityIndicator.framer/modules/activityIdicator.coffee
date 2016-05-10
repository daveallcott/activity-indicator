class module.exports extends Layer

	constructor: (options={}) ->

		options.radial ?= true
		options.count ?= 12
		options.time ?= 1
		options.cycles ?= 1
		options.width ?= 3
		options.height ?= 10
		options.radius ?= 8
		options.angle ?= 0
		options.originY ?= 0
		options.originX ?= 0.5
		options.x ?= 0
		options.y ?= 0
		options.z ?= 0
		options.scale ?= 1
		options.perspective ?= 100
		options.backgroundColor ?= 'white'
		options.curve ?= 'ease-out'
		options.direction ?= 1
		options.borderRadius ?= options.width*0.5
		options.startLooped ?= true
		options.paused ?= false

		stateDefaults = {}
		stateDefaults.cycles = options.cycles
		stateDefaults.time = options.time
		stateDefaults.opacity = 1
		stateDefaults.width = options.width
		stateDefaults.height = options.height
		stateDefaults.radius = options.radius
		stateDefaults.angle = options.angle
		stateDefaults.originY = options.originY
		stateDefaults.originX = options.originX
		stateDefaults.x = options.x
		stateDefaults.y = options.y
		stateDefaults.z = options.z
		stateDefaults.scale = options.scale
		stateDefaults.backgroundColor = options.backgroundColor
		stateDefaults.curve = options.curve
		stateDefaults.borderRadius = options.borderRadius

		super options

		@width = 2
		@height = 2
		@backgroundColor = "rgba(0,0,0,0)"
		@shadowX = 0
		@shadowY = 0
		@shadowBlur = 0
		@shadowColor = null
		@shadowSpread = 0
		@perspective = options.perspective

		#if options.enabled isnt true then return

		states = []
		totalTime = 0

		mod = (n, m) ->
			return ((n % m) + m) % m
		sin = (value,angle) ->
			return Math.round((value) * Math.sin(angle))
		cos = (value,angle) ->
			return Math.round((value) * Math.cos(angle))

		checkForStates = () ->
			hasStates = false
			for key,value of options
				if typeof options[key] is 'object'
					hasStates = true
			if hasStates is false
				options.state1 = {opacity:1,time:(options.time*0.02),x:-20}
				options.state2 = {opacity:0.2,time:(options.time*0.88),curve:"ease-out",x:20}
				options.state3 = {opacity:0.2,time:(options.time*0.1),x:0}

		getStates = () ->
			startTime = 0
			endTime = 0
			for key,value of options
				if typeof options[key] is 'object'
					applyStateDefaults(options[key])
					duration = options[key].time ?= 0 #check if this is actually doing anything
					endTime = endTime + duration
					options[key].name = key
					options[key].startTime = startTime
					options[key].endTime = endTime
					states.push(options[key])
					startTime = startTime + duration
			totalTime = endTime
			if totalTime <= 0
				console.log 'Activity Indicator: Total time cannot be zero'
				return false
			return true

		applyStateDefaults = (state) ->
			for key,value of stateDefaults
				if typeof state[key] is 'undefined'
					state[key] = stateDefaults[key]

		tweenProps = (object,i,fromState,toState,completion) ->
			for key,value of fromState
				if key isnt 'name'
					object[key] = Utils.modulate(completion,[0,1],[fromState[key],toState[key]])
			object.backgroundColor = Color.mix(fromState.backgroundColor,toState.backgroundColor,completion)
			#update state to make arrayed objects...
			if options.radial
				radius = Utils.modulate(completion,[0,1],[fromState.radius,toState.radius])
				rotation = Utils.modulate(completion,[0,1],[fromState.angle,toState.angle])
				degres = (((2*Math.PI) / (options.count)) * i)
				if options.direction is -1 then degres = -degres
				angle = (360/options.count)*i + 180
				if options.direction is 1 then angle = -angle
				object.x = sin(-radius,-degres)
				object.y = cos(-radius,degres)
				object.rotation = -angle + rotation

		arrayifyStatePositions = (state,i) ->
			degres = (((2*Math.PI) / (options.count)) * i)
			if options.direction is -1 then degres = -degres
			angle = (360/options.count)*i + 180
			if options.direction is 1 then angle = -angle
			state.x = sin(-state.radius,-degres)
			state.y = cos(-state.radius,degres)
			state.rotation = -angle + state.angle
			return state

		animateFromTime = (object,i,startTime) ->
			startTime = startTime % totalTime
			if startTime is 0 then object.visible = true
			for s in [(states.length-1)..0]
				if startTime < states[s].endTime
					j = mod((s-1),states.length)
					fromState = states[j]
					k = mod((s),states.length)
					toState = states[k]
			thisDuration = toState.endTime - startTime
			timeInTween = toState.time-thisDuration
			completion = (timeInTween/toState.time)
			tweenProps(object,i,fromState,toState,completion)
			if options.radial then toState = arrayifyStatePositions(toState,i)
			object.animation = new Animation
				layer: object
				properties:
					toState
				time: thisDuration
				curve: toState.curve
			object.animation.start()
			#if toState is states[states.length-1] then print('last state',toState.name)
			object.animation.on Events.AnimationEnd, ->
				startTime = (startTime + thisDuration) % totalTime
				animateFromTime(object,i,startTime)

		checkForStates()
		return if not getStates()

		objects = []
		for i in [0...options.count]
			object = new Layer
				superLayer: @
				name:"activity_indicator_child_"+(i+1)
				opacity:0
			if options.startLooped is false then object.visible = false
			objects.push(object)
			startTime = i*(totalTime/options.count)
			startTime = (totalTime - startTime) % totalTime
			animateFromTime(object,i,startTime * options.cycles)



		#external functions

		@_completed = 0
		@setCompletedPercent = (completed) ->
			@_completed = @_completed + completed

		@stop = () ->
			options.paused = false
			for i in [0...objects.length]
				objects[i].animation.stop()

		@start = () ->
			options.paused = true
			for i in [0...objects.length]
				startTime = i*(totalTime/options.count)
				startTime = (totalTime - startTime) % totalTime
				animateFromTime(objects[i],i,startTime)


	@define "completed",
		get: -> @_completed
		set: (value) -> @_completed = value