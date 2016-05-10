require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"activityIdicator":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (function(superClass) {
  extend(exports, superClass);

  function exports(options) {
    var animateFromTime, applyStateDefaults, arrayifyStatePositions, checkForStates, cos, getStates, i, l, mod, object, objects, ref, sin, startTime, stateDefaults, states, totalTime, tweenProps;
    if (options == null) {
      options = {};
    }
    if (options.radial == null) {
      options.radial = true;
    }
    if (options.count == null) {
      options.count = 12;
    }
    if (options.time == null) {
      options.time = 1;
    }
    if (options.cycles == null) {
      options.cycles = 1;
    }
    if (options.width == null) {
      options.width = 3;
    }
    if (options.height == null) {
      options.height = 10;
    }
    if (options.radius == null) {
      options.radius = 8;
    }
    if (options.angle == null) {
      options.angle = 0;
    }
    if (options.originY == null) {
      options.originY = 0;
    }
    if (options.originX == null) {
      options.originX = 0.5;
    }
    if (options.x == null) {
      options.x = 0;
    }
    if (options.y == null) {
      options.y = 0;
    }
    if (options.z == null) {
      options.z = 0;
    }
    if (options.scale == null) {
      options.scale = 1;
    }
    if (options.perspective == null) {
      options.perspective = 100;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = 'white';
    }
    if (options.curve == null) {
      options.curve = 'ease-out';
    }
    if (options.direction == null) {
      options.direction = 1;
    }
    if (options.borderRadius == null) {
      options.borderRadius = options.width * 0.5;
    }
    if (options.startLooped == null) {
      options.startLooped = true;
    }
    if (options.paused == null) {
      options.paused = false;
    }
    stateDefaults = {};
    stateDefaults.cycles = options.cycles;
    stateDefaults.time = options.time;
    stateDefaults.opacity = 1;
    stateDefaults.width = options.width;
    stateDefaults.height = options.height;
    stateDefaults.radius = options.radius;
    stateDefaults.angle = options.angle;
    stateDefaults.originY = options.originY;
    stateDefaults.originX = options.originX;
    stateDefaults.x = options.x;
    stateDefaults.y = options.y;
    stateDefaults.z = options.z;
    stateDefaults.scale = options.scale;
    stateDefaults.backgroundColor = options.backgroundColor;
    stateDefaults.curve = options.curve;
    stateDefaults.borderRadius = options.borderRadius;
    exports.__super__.constructor.call(this, options);
    this.width = 2;
    this.height = 2;
    this.backgroundColor = "rgba(0,0,0,0)";
    this.shadowX = 0;
    this.shadowY = 0;
    this.shadowBlur = 0;
    this.shadowColor = null;
    this.shadowSpread = 0;
    this.perspective = options.perspective;
    states = [];
    totalTime = 0;
    mod = function(n, m) {
      return ((n % m) + m) % m;
    };
    sin = function(value, angle) {
      return Math.round(value * Math.sin(angle));
    };
    cos = function(value, angle) {
      return Math.round(value * Math.cos(angle));
    };
    checkForStates = function() {
      var hasStates, key, value;
      hasStates = false;
      for (key in options) {
        value = options[key];
        if (typeof options[key] === 'object') {
          hasStates = true;
        }
      }
      if (hasStates === false) {
        options.state1 = {
          opacity: 1,
          time: options.time * 0.02,
          x: -20
        };
        options.state2 = {
          opacity: 0.2,
          time: options.time * 0.88,
          curve: "ease-out",
          x: 20
        };
        return options.state3 = {
          opacity: 0.2,
          time: options.time * 0.1,
          x: 0
        };
      }
    };
    getStates = function() {
      var base, duration, endTime, key, startTime, value;
      startTime = 0;
      endTime = 0;
      for (key in options) {
        value = options[key];
        if (typeof options[key] === 'object') {
          applyStateDefaults(options[key]);
          duration = (base = options[key]).time != null ? base.time : base.time = 0;
          endTime = endTime + duration;
          options[key].name = key;
          options[key].startTime = startTime;
          options[key].endTime = endTime;
          states.push(options[key]);
          startTime = startTime + duration;
        }
      }
      totalTime = endTime;
      if (totalTime <= 0) {
        console.log('Activity Indicator: Total time cannot be zero');
        return false;
      }
      return true;
    };
    applyStateDefaults = function(state) {
      var key, results, value;
      results = [];
      for (key in stateDefaults) {
        value = stateDefaults[key];
        if (typeof state[key] === 'undefined') {
          results.push(state[key] = stateDefaults[key]);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    tweenProps = function(object, i, fromState, toState, completion) {
      var angle, degres, key, radius, rotation, value;
      for (key in fromState) {
        value = fromState[key];
        if (key !== 'name') {
          object[key] = Utils.modulate(completion, [0, 1], [fromState[key], toState[key]]);
        }
      }
      object.backgroundColor = Color.mix(fromState.backgroundColor, toState.backgroundColor, completion);
      if (options.radial) {
        radius = Utils.modulate(completion, [0, 1], [fromState.radius, toState.radius]);
        rotation = Utils.modulate(completion, [0, 1], [fromState.angle, toState.angle]);
        degres = ((2 * Math.PI) / options.count) * i;
        if (options.direction === -1) {
          degres = -degres;
        }
        angle = (360 / options.count) * i + 180;
        if (options.direction === 1) {
          angle = -angle;
        }
        object.x = sin(-radius, -degres);
        object.y = cos(-radius, degres);
        return object.rotation = -angle + rotation;
      }
    };
    arrayifyStatePositions = function(state, i) {
      var angle, degres;
      degres = ((2 * Math.PI) / options.count) * i;
      if (options.direction === -1) {
        degres = -degres;
      }
      angle = (360 / options.count) * i + 180;
      if (options.direction === 1) {
        angle = -angle;
      }
      state.x = sin(-state.radius, -degres);
      state.y = cos(-state.radius, degres);
      state.rotation = -angle + state.angle;
      return state;
    };
    animateFromTime = function(object, i, startTime) {
      var completion, fromState, j, k, l, ref, s, thisDuration, timeInTween, toState;
      startTime = startTime % totalTime;
      if (startTime === 0) {
        object.visible = true;
      }
      for (s = l = ref = states.length - 1; ref <= 0 ? l <= 0 : l >= 0; s = ref <= 0 ? ++l : --l) {
        if (startTime < states[s].endTime) {
          j = mod(s - 1, states.length);
          fromState = states[j];
          k = mod(s, states.length);
          toState = states[k];
        }
      }
      thisDuration = toState.endTime - startTime;
      timeInTween = toState.time - thisDuration;
      completion = timeInTween / toState.time;
      tweenProps(object, i, fromState, toState, completion);
      if (options.radial) {
        toState = arrayifyStatePositions(toState, i);
      }
      object.animation = new Animation({
        layer: object,
        properties: toState,
        time: thisDuration,
        curve: toState.curve
      });
      object.animation.start();
      return object.animation.on(Events.AnimationEnd, function() {
        startTime = (startTime + thisDuration) % totalTime;
        return animateFromTime(object, i, startTime);
      });
    };
    checkForStates();
    if (!getStates()) {
      return;
    }
    objects = [];
    for (i = l = 0, ref = options.count; 0 <= ref ? l < ref : l > ref; i = 0 <= ref ? ++l : --l) {
      object = new Layer({
        superLayer: this,
        name: "activity_indicator_child_" + (i + 1),
        opacity: 0
      });
      if (options.startLooped === false) {
        object.visible = false;
      }
      objects.push(object);
      startTime = i * (totalTime / options.count);
      startTime = (totalTime - startTime) % totalTime;
      animateFromTime(object, i, startTime * options.cycles);
    }
    this._completed = 0;
    this.setCompletedPercent = function(completed) {
      return this._completed = this._completed + completed;
    };
    this.stop = function() {
      var o, ref1, results;
      options.paused = false;
      results = [];
      for (i = o = 0, ref1 = objects.length; 0 <= ref1 ? o < ref1 : o > ref1; i = 0 <= ref1 ? ++o : --o) {
        results.push(objects[i].animation.stop());
      }
      return results;
    };
    this.start = function() {
      var o, ref1, results;
      options.paused = true;
      results = [];
      for (i = o = 0, ref1 = objects.length; 0 <= ref1 ? o < ref1 : o > ref1; i = 0 <= ref1 ? ++o : --o) {
        startTime = i * (totalTime / options.count);
        startTime = (totalTime - startTime) % totalTime;
        results.push(animateFromTime(objects[i], i, startTime));
      }
      return results;
    };
  }

  exports.define("completed", {
    get: function() {
      return this._completed;
    },
    set: function(value) {
      return this._completed = value;
    }
  });

  return exports;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRGF2ZS9Ecm9wYm94L1dvcmsvdHJvb2RsZS9Ucm9vZGxlIFByb3RvdHlwZS9BY3Rpdml0eSBJbmRpY2F0b3IgRnJhbWVyIE1vZHVsZS9hY3Rpdml0eUluZGljYXRvci5mcmFtZXIvbW9kdWxlcy9hY3Rpdml0eUlkaWNhdG9yLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7OztBQUFNLE1BQU0sQ0FBQzs7O0VBRUMsaUJBQUMsT0FBRDtBQUVaLFFBQUE7O01BRmEsVUFBUTs7O01BRXJCLE9BQU8sQ0FBQyxTQUFVOzs7TUFDbEIsT0FBTyxDQUFDLFFBQVM7OztNQUNqQixPQUFPLENBQUMsT0FBUTs7O01BQ2hCLE9BQU8sQ0FBQyxTQUFVOzs7TUFDbEIsT0FBTyxDQUFDLFFBQVM7OztNQUNqQixPQUFPLENBQUMsU0FBVTs7O01BQ2xCLE9BQU8sQ0FBQyxTQUFVOzs7TUFDbEIsT0FBTyxDQUFDLFFBQVM7OztNQUNqQixPQUFPLENBQUMsVUFBVzs7O01BQ25CLE9BQU8sQ0FBQyxVQUFXOzs7TUFDbkIsT0FBTyxDQUFDLElBQUs7OztNQUNiLE9BQU8sQ0FBQyxJQUFLOzs7TUFDYixPQUFPLENBQUMsSUFBSzs7O01BQ2IsT0FBTyxDQUFDLFFBQVM7OztNQUNqQixPQUFPLENBQUMsY0FBZTs7O01BQ3ZCLE9BQU8sQ0FBQyxrQkFBbUI7OztNQUMzQixPQUFPLENBQUMsUUFBUzs7O01BQ2pCLE9BQU8sQ0FBQyxZQUFhOzs7TUFDckIsT0FBTyxDQUFDLGVBQWdCLE9BQU8sQ0FBQyxLQUFSLEdBQWM7OztNQUN0QyxPQUFPLENBQUMsY0FBZTs7O01BQ3ZCLE9BQU8sQ0FBQyxTQUFVOztJQUVsQixhQUFBLEdBQWdCO0lBQ2hCLGFBQWEsQ0FBQyxNQUFkLEdBQXVCLE9BQU8sQ0FBQztJQUMvQixhQUFhLENBQUMs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bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBtb2R1bGUuZXhwb3J0cyBleHRlbmRzIExheWVyXG5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zPXt9KSAtPlxuXG5cdFx0b3B0aW9ucy5yYWRpYWwgPz0gdHJ1ZVxuXHRcdG9wdGlvbnMuY291bnQgPz0gMTJcblx0XHRvcHRpb25zLnRpbWUgPz0gMVxuXHRcdG9wdGlvbnMuY3ljbGVzID89IDFcblx0XHRvcHRpb25zLndpZHRoID89IDNcblx0XHRvcHRpb25zLmhlaWdodCA/PSAxMFxuXHRcdG9wdGlvbnMucmFkaXVzID89IDhcblx0XHRvcHRpb25zLmFuZ2xlID89IDBcblx0XHRvcHRpb25zLm9yaWdpblkgPz0gMFxuXHRcdG9wdGlvbnMub3JpZ2luWCA/PSAwLjVcblx0XHRvcHRpb25zLnggPz0gMFxuXHRcdG9wdGlvbnMueSA/PSAwXG5cdFx0b3B0aW9ucy56ID89IDBcblx0XHRvcHRpb25zLnNjYWxlID89IDFcblx0XHRvcHRpb25zLnBlcnNwZWN0aXZlID89IDEwMFxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89ICd3aGl0ZSdcblx0XHRvcHRpb25zLmN1cnZlID89ICdlYXNlLW91dCdcblx0XHRvcHRpb25zLmRpcmVjdGlvbiA/PSAxXG5cdFx0b3B0aW9ucy5ib3JkZXJSYWRpdXMgPz0gb3B0aW9ucy53aWR0aCowLjVcblx0XHRvcHRpb25zLnN0YXJ0TG9vcGVkID89IHRydWVcblx0XHRvcHRpb25zLnBhdXNlZCA/PSBmYWxzZVxuXG5cdFx0c3RhdGVEZWZhdWx0cyA9IHt9XG5cdFx0c3RhdGVEZWZhdWx0cy5jeWNsZXMgPSBvcHRpb25zLmN5Y2xlc1xuXHRcdHN0YXRlRGVmYXVsdHMudGltZSA9IG9wdGlvbnMudGltZVxuXHRcdHN0YXRlRGVmYXVsdHMub3BhY2l0eSA9IDFcblx0XHRzdGF0ZURlZmF1bHRzLndpZHRoID0gb3B0aW9ucy53aWR0aFxuXHRcdHN0YXRlRGVmYXVsdHMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHRcblx0XHRzdGF0ZURlZmF1bHRzLnJhZGl1cyA9IG9wdGlvbnMucmFkaXVzXG5cdFx0c3RhdGVEZWZhdWx0cy5hbmdsZSA9IG9wdGlvbnMuYW5nbGVcblx0XHRzdGF0ZURlZmF1bHRzLm9yaWdpblkgPSBvcHRpb25zLm9yaWdpbllcblx0XHRzdGF0ZURlZmF1bHRzLm9yaWdpblggPSBvcHRpb25zLm9yaWdpblhcblx0XHRzdGF0ZURlZmF1bHRzLnggPSBvcHRpb25zLnhcblx0XHRzdGF0ZURlZmF1bHRzLnkgPSBvcHRpb25zLnlcblx0XHRzdGF0ZURlZmF1bHRzLnogPSBvcHRpb25zLnpcblx0XHRzdGF0ZURlZmF1bHRzLnNjYWxlID0gb3B0aW9ucy5zY2FsZVxuXHRcdHN0YXRlRGVmYXVsdHMuYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRzdGF0ZURlZmF1bHRzLmN1cnZlID0gb3B0aW9ucy5jdXJ2ZVxuXHRcdHN0YXRlRGVmYXVsdHMuYm9yZGVyUmFkaXVzID0gb3B0aW9ucy5ib3JkZXJSYWRpdXNcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEB3aWR0aCA9IDJcblx0XHRAaGVpZ2h0ID0gMlxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMClcIlxuXHRcdEBzaGFkb3dYID0gMFxuXHRcdEBzaGFkb3dZID0gMFxuXHRcdEBzaGFkb3dCbHVyID0gMFxuXHRcdEBzaGFkb3dDb2xvciA9IG51bGxcblx0XHRAc2hhZG93U3ByZWFkID0gMFxuXHRcdEBwZXJzcGVjdGl2ZSA9IG9wdGlvbnMucGVyc3BlY3RpdmVcblxuXHRcdCNpZiBvcHRpb25zLmVuYWJsZWQgaXNudCB0cnVlIHRoZW4gcmV0dXJuXG5cblx0XHRzdGF0ZXMgPSBbXVxuXHRcdHRvdGFsVGltZSA9IDBcblxuXHRcdG1vZCA9IChuLCBtKSAtPlxuXHRcdFx0cmV0dXJuICgobiAlIG0pICsgbSkgJSBtXG5cdFx0c2luID0gKHZhbHVlLGFuZ2xlKSAtPlxuXHRcdFx0cmV0dXJuIE1hdGgucm91bmQoKHZhbHVlKSAqIE1hdGguc2luKGFuZ2xlKSlcblx0XHRjb3MgPSAodmFsdWUsYW5nbGUpIC0+XG5cdFx0XHRyZXR1cm4gTWF0aC5yb3VuZCgodmFsdWUpICogTWF0aC5jb3MoYW5nbGUpKVxuXG5cdFx0Y2hlY2tGb3JTdGF0ZXMgPSAoKSAtPlxuXHRcdFx0aGFzU3RhdGVzID0gZmFsc2Vcblx0XHRcdGZvciBrZXksdmFsdWUgb2Ygb3B0aW9uc1xuXHRcdFx0XHRpZiB0eXBlb2Ygb3B0aW9uc1trZXldIGlzICdvYmplY3QnXG5cdFx0XHRcdFx0aGFzU3RhdGVzID0gdHJ1ZVxuXHRcdFx0aWYgaGFzU3RhdGVzIGlzIGZhbHNlXG5cdFx0XHRcdG9wdGlvbnMuc3RhdGUxID0ge29wYWNpdHk6MSx0aW1lOihvcHRpb25zLnRpbWUqMC4wMikseDotMjB9XG5cdFx0XHRcdG9wdGlvbnMuc3RhdGUyID0ge29wYWNpdHk6MC4yLHRpbWU6KG9wdGlvbnMudGltZSowLjg4KSxjdXJ2ZTpcImVhc2Utb3V0XCIseDoyMH1cblx0XHRcdFx0b3B0aW9ucy5zdGF0ZTMgPSB7b3BhY2l0eTowLjIsdGltZToob3B0aW9ucy50aW1lKjAuMSkseDowfVxuXG5cdFx0Z2V0U3RhdGVzID0gKCkgLT5cblx0XHRcdHN0YXJ0VGltZSA9IDBcblx0XHRcdGVuZFRpbWUgPSAwXG5cdFx0XHRmb3Iga2V5LHZhbHVlIG9mIG9wdGlvbnNcblx0XHRcdFx0aWYgdHlwZW9mIG9wdGlvbnNba2V5XSBpcyAnb2JqZWN0J1xuXHRcdFx0XHRcdGFwcGx5U3RhdGVEZWZhdWx0cyhvcHRpb25zW2tleV0pXG5cdFx0XHRcdFx0ZHVyYXRpb24gPSBvcHRpb25zW2tleV0udGltZSA/PSAwICNjaGVjayBpZiB0aGlzIGlzIGFjdHVhbGx5IGRvaW5nIGFueXRoaW5nXG5cdFx0XHRcdFx0ZW5kVGltZSA9IGVuZFRpbWUgKyBkdXJhdGlvblxuXHRcdFx0XHRcdG9wdGlvbnNba2V5XS5uYW1lID0ga2V5XG5cdFx0XHRcdFx0b3B0aW9uc1trZXldLnN0YXJ0VGltZSA9IHN0YXJ0VGltZVxuXHRcdFx0XHRcdG9wdGlvbnNba2V5XS5lbmRUaW1lID0gZW5kVGltZVxuXHRcdFx0XHRcdHN0YXRlcy5wdXNoKG9wdGlvbnNba2V5XSlcblx0XHRcdFx0XHRzdGFydFRpbWUgPSBzdGFydFRpbWUgKyBkdXJhdGlvblxuXHRcdFx0dG90YWxUaW1lID0gZW5kVGltZVxuXHRcdFx0aWYgdG90YWxUaW1lIDw9IDBcblx0XHRcdFx0Y29uc29sZS5sb2cgJ0FjdGl2aXR5IEluZGljYXRvcjogVG90YWwgdGltZSBjYW5ub3QgYmUgemVybydcblx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXG5cdFx0YXBwbHlTdGF0ZURlZmF1bHRzID0gKHN0YXRlKSAtPlxuXHRcdFx0Zm9yIGtleSx2YWx1ZSBvZiBzdGF0ZURlZmF1bHRzXG5cdFx0XHRcdGlmIHR5cGVvZiBzdGF0ZVtrZXldIGlzICd1bmRlZmluZWQnXG5cdFx0XHRcdFx0c3RhdGVba2V5XSA9IHN0YXRlRGVmYXVsdHNba2V5XVxuXG5cdFx0dHdlZW5Qcm9wcyA9IChvYmplY3QsaSxmcm9tU3RhdGUsdG9TdGF0ZSxjb21wbGV0aW9uKSAtPlxuXHRcdFx0Zm9yIGtleSx2YWx1ZSBvZiBmcm9tU3RhdGVcblx0XHRcdFx0aWYga2V5IGlzbnQgJ25hbWUnXG5cdFx0XHRcdFx0b2JqZWN0W2tleV0gPSBVdGlscy5tb2R1bGF0ZShjb21wbGV0aW9uLFswLDFdLFtmcm9tU3RhdGVba2V5XSx0b1N0YXRlW2tleV1dKVxuXHRcdFx0b2JqZWN0LmJhY2tncm91bmRDb2xvciA9IENvbG9yLm1peChmcm9tU3RhdGUuYmFja2dyb3VuZENvbG9yLHRvU3RhdGUuYmFja2dyb3VuZENvbG9yLGNvbXBsZXRpb24pXG5cdFx0XHQjdXBkYXRlIHN0YXRlIHRvIG1ha2UgYXJyYXllZCBvYmplY3RzLi4uXG5cdFx0XHRpZiBvcHRpb25zLnJhZGlhbFxuXHRcdFx0XHRyYWRpdXMgPSBVdGlscy5tb2R1bGF0ZShjb21wbGV0aW9uLFswLDFdLFtmcm9tU3RhdGUucmFkaXVzLHRvU3RhdGUucmFkaXVzXSlcblx0XHRcdFx0cm90YXRpb24gPSBVdGlscy5tb2R1bGF0ZShjb21wbGV0aW9uLFswLDFdLFtmcm9tU3RhdGUuYW5nbGUsdG9TdGF0ZS5hbmdsZV0pXG5cdFx0XHRcdGRlZ3JlcyA9ICgoKDIqTWF0aC5QSSkgLyAob3B0aW9ucy5jb3VudCkpICogaSlcblx0XHRcdFx0aWYgb3B0aW9ucy5kaXJlY3Rpb24gaXMgLTEgdGhlbiBkZWdyZXMgPSAtZGVncmVzXG5cdFx0XHRcdGFuZ2xlID0gKDM2MC9vcHRpb25zLmNvdW50KSppICsgMTgwXG5cdFx0XHRcdGlmIG9wdGlvbnMuZGlyZWN0aW9uIGlzIDEgdGhlbiBhbmdsZSA9IC1hbmdsZVxuXHRcdFx0XHRvYmplY3QueCA9IHNpbigtcmFkaXVzLC1kZWdyZXMpXG5cdFx0XHRcdG9iamVjdC55ID0gY29zKC1yYWRpdXMsZGVncmVzKVxuXHRcdFx0XHRvYmplY3Qucm90YXRpb24gPSAtYW5nbGUgKyByb3RhdGlvblxuXG5cdFx0YXJyYXlpZnlTdGF0ZVBvc2l0aW9ucyA9IChzdGF0ZSxpKSAtPlxuXHRcdFx0ZGVncmVzID0gKCgoMipNYXRoLlBJKSAvIChvcHRpb25zLmNvdW50KSkgKiBpKVxuXHRcdFx0aWYgb3B0aW9ucy5kaXJlY3Rpb24gaXMgLTEgdGhlbiBkZWdyZXMgPSAtZGVncmVzXG5cdFx0XHRhbmdsZSA9ICgzNjAvb3B0aW9ucy5jb3VudCkqaSArIDE4MFxuXHRcdFx0aWYgb3B0aW9ucy5kaXJlY3Rpb24gaXMgMSB0aGVuIGFuZ2xlID0gLWFuZ2xlXG5cdFx0XHRzdGF0ZS54ID0gc2luKC1zdGF0ZS5yYWRpdXMsLWRlZ3Jlcylcblx0XHRcdHN0YXRlLnkgPSBjb3MoLXN0YXRlLnJhZGl1cyxkZWdyZXMpXG5cdFx0XHRzdGF0ZS5yb3RhdGlvbiA9IC1hbmdsZSArIHN0YXRlLmFuZ2xlXG5cdFx0XHRyZXR1cm4gc3RhdGVcblxuXHRcdGFuaW1hdGVGcm9tVGltZSA9IChvYmplY3QsaSxzdGFydFRpbWUpIC0+XG5cdFx0XHRzdGFydFRpbWUgPSBzdGFydFRpbWUgJSB0b3RhbFRpbWVcblx0XHRcdGlmIHN0YXJ0VGltZSBpcyAwIHRoZW4gb2JqZWN0LnZpc2libGUgPSB0cnVlXG5cdFx0XHRmb3IgcyBpbiBbKHN0YXRlcy5sZW5ndGgtMSkuLjBdXG5cdFx0XHRcdGlmIHN0YXJ0VGltZSA8IHN0YXRlc1tzXS5lbmRUaW1lXG5cdFx0XHRcdFx0aiA9IG1vZCgocy0xKSxzdGF0ZXMubGVuZ3RoKVxuXHRcdFx0XHRcdGZyb21TdGF0ZSA9IHN0YXRlc1tqXVxuXHRcdFx0XHRcdGsgPSBtb2QoKHMpLHN0YXRlcy5sZW5ndGgpXG5cdFx0XHRcdFx0dG9TdGF0ZSA9IHN0YXRlc1trXVxuXHRcdFx0dGhpc0R1cmF0aW9uID0gdG9TdGF0ZS5lbmRUaW1lIC0gc3RhcnRUaW1lXG5cdFx0XHR0aW1lSW5Ud2VlbiA9IHRvU3RhdGUudGltZS10aGlzRHVyYXRpb25cblx0XHRcdGNvbXBsZXRpb24gPSAodGltZUluVHdlZW4vdG9TdGF0ZS50aW1lKVxuXHRcdFx0dHdlZW5Qcm9wcyhvYmplY3QsaSxmcm9tU3RhdGUsdG9TdGF0ZSxjb21wbGV0aW9uKVxuXHRcdFx0aWYgb3B0aW9ucy5yYWRpYWwgdGhlbiB0b1N0YXRlID0gYXJyYXlpZnlTdGF0ZVBvc2l0aW9ucyh0b1N0YXRlLGkpXG5cdFx0XHRvYmplY3QuYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvblxuXHRcdFx0XHRsYXllcjogb2JqZWN0XG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0dG9TdGF0ZVxuXHRcdFx0XHR0aW1lOiB0aGlzRHVyYXRpb25cblx0XHRcdFx0Y3VydmU6IHRvU3RhdGUuY3VydmVcblx0XHRcdG9iamVjdC5hbmltYXRpb24uc3RhcnQoKVxuXHRcdFx0I2lmIHRvU3RhdGUgaXMgc3RhdGVzW3N0YXRlcy5sZW5ndGgtMV0gdGhlbiBwcmludCgnbGFzdCBzdGF0ZScsdG9TdGF0ZS5uYW1lKVxuXHRcdFx0b2JqZWN0LmFuaW1hdGlvbi5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCAtPlxuXHRcdFx0XHRzdGFydFRpbWUgPSAoc3RhcnRUaW1lICsgdGhpc0R1cmF0aW9uKSAlIHRvdGFsVGltZVxuXHRcdFx0XHRhbmltYXRlRnJvbVRpbWUob2JqZWN0LGksc3RhcnRUaW1lKVxuXG5cdFx0Y2hlY2tGb3JTdGF0ZXMoKVxuXHRcdHJldHVybiBpZiBub3QgZ2V0U3RhdGVzKClcblxuXHRcdG9iamVjdHMgPSBbXVxuXHRcdGZvciBpIGluIFswLi4ub3B0aW9ucy5jb3VudF1cblx0XHRcdG9iamVjdCA9IG5ldyBMYXllclxuXHRcdFx0XHRzdXBlckxheWVyOiBAXG5cdFx0XHRcdG5hbWU6XCJhY3Rpdml0eV9pbmRpY2F0b3JfY2hpbGRfXCIrKGkrMSlcblx0XHRcdFx0b3BhY2l0eTowXG5cdFx0XHRpZiBvcHRpb25zLnN0YXJ0TG9vcGVkIGlzIGZhbHNlIHRoZW4gb2JqZWN0LnZpc2libGUgPSBmYWxzZVxuXHRcdFx0b2JqZWN0cy5wdXNoKG9iamVjdClcblx0XHRcdHN0YXJ0VGltZSA9IGkqKHRvdGFsVGltZS9vcHRpb25zLmNvdW50KVxuXHRcdFx0c3RhcnRUaW1lID0gKHRvdGFsVGltZSAtIHN0YXJ0VGltZSkgJSB0b3RhbFRpbWVcblx0XHRcdGFuaW1hdGVGcm9tVGltZShvYmplY3QsaSxzdGFydFRpbWUgKiBvcHRpb25zLmN5Y2xlcylcblxuXG5cblx0XHQjZXh0ZXJuYWwgZnVuY3Rpb25zXG5cblx0XHRAX2NvbXBsZXRlZCA9IDBcblx0XHRAc2V0Q29tcGxldGVkUGVyY2VudCA9IChjb21wbGV0ZWQpIC0+XG5cdFx0XHRAX2NvbXBsZXRlZCA9IEBfY29tcGxldGVkICsgY29tcGxldGVkXG5cblx0XHRAc3RvcCA9ICgpIC0+XG5cdFx0XHRvcHRpb25zLnBhdXNlZCA9IGZhbHNlXG5cdFx0XHRmb3IgaSBpbiBbMC4uLm9iamVjdHMubGVuZ3RoXVxuXHRcdFx0XHRvYmplY3RzW2ldLmFuaW1hdGlvbi5zdG9wKClcblxuXHRcdEBzdGFydCA9ICgpIC0+XG5cdFx0XHRvcHRpb25zLnBhdXNlZCA9IHRydWVcblx0XHRcdGZvciBpIGluIFswLi4ub2JqZWN0cy5sZW5ndGhdXG5cdFx0XHRcdHN0YXJ0VGltZSA9IGkqKHRvdGFsVGltZS9vcHRpb25zLmNvdW50KVxuXHRcdFx0XHRzdGFydFRpbWUgPSAodG90YWxUaW1lIC0gc3RhcnRUaW1lKSAlIHRvdGFsVGltZVxuXHRcdFx0XHRhbmltYXRlRnJvbVRpbWUob2JqZWN0c1tpXSxpLHN0YXJ0VGltZSlcblxuXG5cdEBkZWZpbmUgXCJjb21wbGV0ZWRcIixcblx0XHRnZXQ6IC0+IEBfY29tcGxldGVkXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBfY29tcGxldGVkID0gdmFsdWUiXX0=
