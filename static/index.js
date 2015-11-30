(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/**
* matter.min.js edge-master 2015-09-17
* http://brm.io/matter-js/
* License: MIT
*/

!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.Matter=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c={};b.exports=c;var d=a("../geometry/Vertices"),e=a("../geometry/Vector"),f=a("../core/Sleeping"),g=(a("../render/Render"),a("../core/Common")),h=a("../geometry/Bounds"),i=a("../geometry/Axes");!function(){c._inertiaScale=4;var a=1,b=-1,j=1;c.create=function(a){var b={id:g.nextId(),type:"body",label:"Body",parts:[],angle:0,vertices:d.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),position:{x:0,y:0},force:{x:0,y:0},torque:0,positionImpulse:{x:0,y:0},constraintImpulse:{x:0,y:0,angle:0},totalContacts:0,speed:0,angularSpeed:0,velocity:{x:0,y:0},angularVelocity:0,isStatic:!1,isSleeping:!1,motion:0,sleepThreshold:60,density:.001,restitution:0,friction:.1,frictionStatic:.5,frictionAir:.01,collisionFilter:{category:1,mask:4294967295,group:0},slop:.05,timeScale:1,render:{visible:!0,sprite:{xScale:1,yScale:1},lineWidth:1.5}},c=g.extend(b,a);return k(c,a),c},c.nextGroup=function(c){return c?b--:a++},c.nextCategory=function(){return j<<=1};var k=function(a,b){c.set(a,{bounds:a.bounds||h.create(a.vertices),positionPrev:a.positionPrev||e.clone(a.position),anglePrev:a.anglePrev||a.angle,vertices:a.vertices,parts:a.parts||[a],isStatic:a.isStatic,isSleeping:a.isSleeping,parent:a.parent||a}),d.rotate(a.vertices,a.angle,a.position),i.rotate(a.axes,a.angle),h.update(a.bounds,a.vertices,a.velocity),c.set(a,{axes:b.axes||a.axes,area:b.area||a.area,mass:b.mass||a.mass,inertia:b.inertia||a.inertia});var f=a.isStatic?"#eeeeee":g.choose(["#556270","#4ECDC4","#C7F464","#FF6B6B","#C44D58"]),j=g.shadeColor(f,-20);a.render.fillStyle=a.render.fillStyle||f,a.render.strokeStyle=a.render.strokeStyle||j};c.set=function(a,b,d){var e;"string"==typeof b&&(e=b,b={},b[e]=d);for(e in b)if(d=b[e],b.hasOwnProperty(e))switch(e){case"isStatic":c.setStatic(a,d);break;case"isSleeping":f.set(a,d);break;case"mass":c.setMass(a,d);break;case"density":c.setDensity(a,d);break;case"inertia":c.setInertia(a,d);break;case"vertices":c.setVertices(a,d);break;case"position":c.setPosition(a,d);break;case"angle":c.setAngle(a,d);break;case"velocity":c.setVelocity(a,d);break;case"angularVelocity":c.setAngularVelocity(a,d);break;case"parts":c.setParts(a,d);break;default:a[e]=d}},c.setStatic=function(a,b){for(var c=0;c<a.parts.length;c++){var d=a.parts[c];d.isStatic=b,b&&(d.restitution=0,d.friction=1,d.mass=d.inertia=d.density=1/0,d.inverseMass=d.inverseInertia=0,d.positionPrev.x=d.position.x,d.positionPrev.y=d.position.y,d.anglePrev=d.angle,d.angularVelocity=0,d.speed=0,d.angularSpeed=0,d.motion=0)}},c.setMass=function(a,b){a.mass=b,a.inverseMass=1/a.mass,a.density=a.mass/a.area},c.setDensity=function(a,b){c.setMass(a,b*a.area),a.density=b},c.setInertia=function(a,b){a.inertia=b,a.inverseInertia=1/a.inertia},c.setVertices=function(a,b){a.vertices=b[0].body===a?b:d.create(b,a),a.axes=i.fromVertices(a.vertices),a.area=d.area(a.vertices),c.setMass(a,a.density*a.area);var e=d.centre(a.vertices);d.translate(a.vertices,e,-1),c.setInertia(a,c._inertiaScale*d.inertia(a.vertices,a.mass)),d.translate(a.vertices,a.position),h.update(a.bounds,a.vertices,a.velocity)},c.setParts=function(a,b,e){var f;for(b=b.slice(0),a.parts.length=0,a.parts.push(a),a.parent=a,f=0;f<b.length;f++){var g=b[f];g!==a&&(g.parent=a,a.parts.push(g))}if(1!==a.parts.length){if(e="undefined"!=typeof e?e:!0){var h=[];for(f=0;f<b.length;f++)h=h.concat(b[f].vertices);d.clockwiseSort(h);var i=d.hull(h),j=d.centre(i);c.setVertices(a,i),d.translate(a.vertices,j)}var k=l(a);a.area=k.area,a.parent=a,a.position.x=k.centre.x,a.position.y=k.centre.y,a.positionPrev.x=k.centre.x,a.positionPrev.y=k.centre.y,c.setMass(a,k.mass),c.setInertia(a,k.inertia),c.setPosition(a,k.centre)}},c.setPosition=function(a,b){var c=e.sub(b,a.position);a.positionPrev.x+=c.x,a.positionPrev.y+=c.y;for(var f=0;f<a.parts.length;f++){var g=a.parts[f];g.position.x+=c.x,g.position.y+=c.y,d.translate(g.vertices,c),h.update(g.bounds,g.vertices,a.velocity)}},c.setAngle=function(a,b){var c=b-a.angle;a.anglePrev+=c;for(var f=0;f<a.parts.length;f++){var g=a.parts[f];g.angle+=c,d.rotate(g.vertices,c,a.position),i.rotate(g.axes,c),h.update(g.bounds,g.vertices,a.velocity),f>0&&e.rotateAbout(g.position,c,a.position,g.position)}},c.setVelocity=function(a,b){a.positionPrev.x=a.position.x-b.x,a.positionPrev.y=a.position.y-b.y,a.velocity.x=b.x,a.velocity.y=b.y,a.speed=e.magnitude(a.velocity)},c.setAngularVelocity=function(a,b){a.anglePrev=a.angle-b,a.angularVelocity=b,a.angularSpeed=Math.abs(a.angularVelocity)},c.translate=function(a,b){c.setPosition(a,e.add(a.position,b))},c.rotate=function(a,b){c.setAngle(a,a.angle+b)},c.scale=function(a,b,e){for(var f=0;f<a.parts.length;f++){var g=a.parts[f];d.scale(g.vertices,b,e,a.position),g.axes=i.fromVertices(g.vertices),a.isStatic||(g.area=d.area(g.vertices),c.setMass(g,a.density*g.area),d.translate(g.vertices,{x:-g.position.x,y:-g.position.y}),c.setInertia(g,d.inertia(g.vertices,g.mass)),d.translate(g.vertices,{x:g.position.x,y:g.position.y})),h.update(g.bounds,g.vertices,a.velocity)}if(!a.isStatic){var j=l(a);a.area=j.area,c.setMass(a,j.mass),c.setInertia(a,j.inertia)}},c.update=function(a,b,c,f){var g=Math.pow(b*c*a.timeScale,2),j=1-a.frictionAir*c*a.timeScale,k=a.position.x-a.positionPrev.x,l=a.position.y-a.positionPrev.y;a.velocity.x=k*j*f+a.force.x/a.mass*g,a.velocity.y=l*j*f+a.force.y/a.mass*g,a.positionPrev.x=a.position.x,a.positionPrev.y=a.position.y,a.position.x+=a.velocity.x,a.position.y+=a.velocity.y,a.angularVelocity=(a.angle-a.anglePrev)*j*f+a.torque/a.inertia*g,a.anglePrev=a.angle,a.angle+=a.angularVelocity,a.speed=e.magnitude(a.velocity),a.angularSpeed=Math.abs(a.angularVelocity);for(var m=0;m<a.parts.length;m++){var n=a.parts[m];d.translate(n.vertices,a.velocity),m>0&&(n.position.x+=a.velocity.x,n.position.y+=a.velocity.y),0!==a.angularVelocity&&(d.rotate(n.vertices,a.angularVelocity,a.position),i.rotate(n.axes,a.angularVelocity),m>0&&e.rotateAbout(n.position,a.angularVelocity,a.position,n.position)),h.update(n.bounds,n.vertices,a.velocity)}},c.applyForce=function(a,b,c){a.force.x+=c.x,a.force.y+=c.y;var d={x:b.x-a.position.x,y:b.y-a.position.y};a.torque+=(d.x*c.y-d.y*c.x)*a.inverseInertia};var l=function(a){for(var b={mass:0,area:0,inertia:0,centre:{x:0,y:0}},c=1===a.parts.length?0:1;c<a.parts.length;c++){var d=a.parts[c];b.mass+=d.mass,b.area+=d.area,b.inertia+=d.inertia,b.centre=e.add(b.centre,e.mult(d.position,1/0!==d.mass?d.mass:1))}return b.centre=e.div(b.centre,1/0!==b.mass?b.mass:a.parts.length),b}}()},{"../core/Common":14,"../core/Sleeping":20,"../geometry/Axes":23,"../geometry/Bounds":24,"../geometry/Vector":26,"../geometry/Vertices":27,"../render/Render":29}],2:[function(a,b){var c={};b.exports=c;var d=a("../core/Events"),e=a("../core/Common"),f=a("./Body");!function(){c.create=function(a){return e.extend({id:e.nextId(),type:"composite",parent:null,isModified:!1,bodies:[],constraints:[],composites:[],label:"Composite"},a)},c.setModified=function(a,b,d,e){if(a.isModified=b,d&&a.parent&&c.setModified(a.parent,b,d,e),e)for(var f=0;f<a.composites.length;f++){var g=a.composites[f];c.setModified(g,b,d,e)}},c.add=function(a,b){var f=[].concat(b);d.trigger(a,"beforeAdd",{object:b});for(var g=0;g<f.length;g++){var h=f[g];switch(h.type){case"body":if(h.parent!==h){e.log("Composite.add: skipped adding a compound body part (you must add its parent instead)","warn");break}c.addBody(a,h);break;case"constraint":c.addConstraint(a,h);break;case"composite":c.addComposite(a,h);break;case"mouseConstraint":c.addConstraint(a,h.constraint)}}return d.trigger(a,"afterAdd",{object:b}),a},c.remove=function(a,b,e){var f=[].concat(b);d.trigger(a,"beforeRemove",{object:b});for(var g=0;g<f.length;g++){var h=f[g];switch(h.type){case"body":c.removeBody(a,h,e);break;case"constraint":c.removeConstraint(a,h,e);break;case"composite":c.removeComposite(a,h,e);break;case"mouseConstraint":c.removeConstraint(a,h.constraint)}}return d.trigger(a,"afterRemove",{object:b}),a},c.addComposite=function(a,b){return a.composites.push(b),b.parent=a,c.setModified(a,!0,!0,!1),a},c.removeComposite=function(a,b,d){var f=e.indexOf(a.composites,b);if(-1!==f&&(c.removeCompositeAt(a,f),c.setModified(a,!0,!0,!1)),d)for(var g=0;g<a.composites.length;g++)c.removeComposite(a.composites[g],b,!0);return a},c.removeCompositeAt=function(a,b){return a.composites.splice(b,1),c.setModified(a,!0,!0,!1),a},c.addBody=function(a,b){return a.bodies.push(b),c.setModified(a,!0,!0,!1),a},c.removeBody=function(a,b,d){var f=e.indexOf(a.bodies,b);if(-1!==f&&(c.removeBodyAt(a,f),c.setModified(a,!0,!0,!1)),d)for(var g=0;g<a.composites.length;g++)c.removeBody(a.composites[g],b,!0);return a},c.removeBodyAt=function(a,b){return a.bodies.splice(b,1),c.setModified(a,!0,!0,!1),a},c.addConstraint=function(a,b){return a.constraints.push(b),c.setModified(a,!0,!0,!1),a},c.removeConstraint=function(a,b,d){var f=e.indexOf(a.constraints,b);if(-1!==f&&c.removeConstraintAt(a,f),d)for(var g=0;g<a.composites.length;g++)c.removeConstraint(a.composites[g],b,!0);return a},c.removeConstraintAt=function(a,b){return a.constraints.splice(b,1),c.setModified(a,!0,!0,!1),a},c.clear=function(a,b,d){if(d)for(var e=0;e<a.composites.length;e++)c.clear(a.composites[e],b,!0);return b?a.bodies=a.bodies.filter(function(a){return a.isStatic}):a.bodies.length=0,a.constraints.length=0,a.composites.length=0,c.setModified(a,!0,!0,!1),a},c.allBodies=function(a){for(var b=[].concat(a.bodies),d=0;d<a.composites.length;d++)b=b.concat(c.allBodies(a.composites[d]));return b},c.allConstraints=function(a){for(var b=[].concat(a.constraints),d=0;d<a.composites.length;d++)b=b.concat(c.allConstraints(a.composites[d]));return b},c.allComposites=function(a){for(var b=[].concat(a.composites),d=0;d<a.composites.length;d++)b=b.concat(c.allComposites(a.composites[d]));return b},c.get=function(a,b,d){var e,f;switch(d){case"body":e=c.allBodies(a);break;case"constraint":e=c.allConstraints(a);break;case"composite":e=c.allComposites(a).concat(a)}return e?(f=e.filter(function(a){return a.id.toString()===b.toString()}),0===f.length?null:f[0]):null},c.move=function(a,b,d){return c.remove(a,b),c.add(d,b),a},c.rebase=function(a){for(var b=c.allBodies(a).concat(c.allConstraints(a)).concat(c.allComposites(a)),d=0;d<b.length;d++)b[d].id=e.nextId();return c.setModified(a,!0,!0,!1),a},c.translate=function(a,b,d){for(var e=d?c.allBodies(a):a.bodies,g=0;g<e.length;g++)f.translate(e[g],b);return c.setModified(a,!0,!0,!1),a},c.rotate=function(a,b,d,e){for(var g=Math.cos(b),h=Math.sin(b),i=e?c.allBodies(a):a.bodies,j=0;j<i.length;j++){var k=i[j],l=k.position.x-d.x,m=k.position.y-d.y;f.setPosition(k,{x:d.x+(l*g-m*h),y:d.y+(l*h+m*g)}),f.rotate(k,b)}return c.setModified(a,!0,!0,!1),a},c.scale=function(a,b,d,e,g){for(var h=g?c.allBodies(a):a.bodies,i=0;i<h.length;i++){var j=h[i],k=j.position.x-e.x,l=j.position.y-e.y;f.setPosition(j,{x:e.x+k*b,y:e.y+l*d}),f.scale(j,b,d)}return c.setModified(a,!0,!0,!1),a}}()},{"../core/Common":14,"../core/Events":16,"./Body":1}],3:[function(a,b){var c={};b.exports=c;var d=a("./Composite"),e=(a("../constraint/Constraint"),a("../core/Common"));!function(){c.create=function(a){var b=d.create(),c={label:"World",gravity:{x:0,y:1},bounds:{min:{x:-1/0,y:-1/0},max:{x:1/0,y:1/0}}};return e.extend(b,c,a)}}()},{"../constraint/Constraint":12,"../core/Common":14,"./Composite":2}],4:[function(a,b){var c={};b.exports=c,function(){c.create=function(a){return{id:c.id(a),vertex:a,normalImpulse:0,tangentImpulse:0}},c.id=function(a){return a.body.id+"_"+a.index}}()},{}],5:[function(a,b){var c={};b.exports=c;var d=a("./SAT"),e=a("./Pair"),f=a("../geometry/Bounds");!function(){c.collisions=function(a,b){for(var g=[],h=b.pairs.table,i=0;i<a.length;i++){var j=a[i][0],k=a[i][1];if((!j.isStatic&&!j.isSleeping||!k.isStatic&&!k.isSleeping)&&c.canCollide(j.collisionFilter,k.collisionFilter)&&f.overlaps(j.bounds,k.bounds))for(var l=j.parts.length>1?1:0;l<j.parts.length;l++)for(var m=j.parts[l],n=k.parts.length>1?1:0;n<k.parts.length;n++){var o=k.parts[n];if(m===j&&o===k||f.overlaps(m.bounds,o.bounds)){var p,q=e.id(m,o),r=h[q];p=r&&r.isActive?r.collision:null;var s=d.collides(m,o,p);s.collided&&g.push(s)}}}return g},c.bruteForce=function(a,b){for(var g=[],h=b.pairs.table,i=0;i<a.length;i++)for(var j=i+1;j<a.length;j++){var k=a[i],l=a[j];if((!k.isStatic&&!k.isSleeping||!l.isStatic&&!l.isSleeping)&&c.canCollide(k.collisionFilter,l.collisionFilter)&&f.overlaps(k.bounds,l.bounds)){var m,n=e.id(k,l),o=h[n];m=o&&o.isActive?o.collision:null;var p=d.collides(k,l,m);p.collided&&g.push(p)}}return g},c.canCollide=function(a,b){return a.group===b.group&&0!==a.group?a.group>0:0!==(a.mask&b.category)&&0!==(b.mask&a.category)}}()},{"../geometry/Bounds":24,"./Pair":7,"./SAT":11}],6:[function(a,b){var c={};b.exports=c;var d=a("./Pair"),e=a("./Detector"),f=a("../core/Common");!function(){c.create=function(a){var b={controller:c,detector:e.collisions,buckets:{},pairs:{},pairsList:[],bucketWidth:48,bucketHeight:48};return f.extend(b,a)},c.update=function(c,d,e,f){var g,m,n,o,p,q=e.world,r=c.buckets,s=!1;for(g=0;g<d.length;g++){var t=d[g];if((!t.isSleeping||f)&&!(t.bounds.max.x<0||t.bounds.min.x>q.bounds.width||t.bounds.max.y<0||t.bounds.min.y>q.bounds.height)){var u=b(c,t);if(!t.region||u.id!==t.region.id||f){(!t.region||f)&&(t.region=u);var v=a(u,t.region);for(m=v.startCol;m<=v.endCol;m++)for(n=v.startRow;n<=v.endRow;n++){p=h(m,n),o=r[p];var w=m>=u.startCol&&m<=u.endCol&&n>=u.startRow&&n<=u.endRow,x=m>=t.region.startCol&&m<=t.region.endCol&&n>=t.region.startRow&&n<=t.region.endRow;!w&&x&&x&&o&&k(c,o,t),(t.region===u||w&&!x||f)&&(o||(o=i(r,p)),j(c,o,t))}t.region=u,s=!0}}}s&&(c.pairsList=l(c))},c.clear=function(a){a.buckets={},a.pairs={},a.pairsList=[]};var a=function(a,b){var c=Math.min(a.startCol,b.startCol),d=Math.max(a.endCol,b.endCol),e=Math.min(a.startRow,b.startRow),f=Math.max(a.endRow,b.endRow);return g(c,d,e,f)},b=function(a,b){var c=b.bounds,d=Math.floor(c.min.x/a.bucketWidth),e=Math.floor(c.max.x/a.bucketWidth),f=Math.floor(c.min.y/a.bucketHeight),h=Math.floor(c.max.y/a.bucketHeight);return g(d,e,f,h)},g=function(a,b,c,d){return{id:a+","+b+","+c+","+d,startCol:a,endCol:b,startRow:c,endRow:d}},h=function(a,b){return a+","+b},i=function(a,b){var c=a[b]=[];return c},j=function(a,b,c){for(var e=0;e<b.length;e++){var f=b[e];if(!(c.id===f.id||c.isStatic&&f.isStatic)){var g=d.id(c,f),h=a.pairs[g];h?h[2]+=1:a.pairs[g]=[c,f,1]}}b.push(c)},k=function(a,b,c){b.splice(f.indexOf(b,c),1);for(var e=0;e<b.length;e++){var g=b[e],h=d.id(c,g),i=a.pairs[h];i&&(i[2]-=1)}},l=function(a){var b,c,d=[];b=f.keys(a.pairs);for(var e=0;e<b.length;e++)c=a.pairs[b[e]],c[2]>0?d.push(c):delete a.pairs[b[e]];return d}}()},{"../core/Common":14,"./Detector":5,"./Pair":7}],7:[function(a,b){var c={};b.exports=c;var d=a("./Contact");!function(){c.create=function(a,b){var d=a.bodyA,e=a.bodyB,f=a.parentA,g=a.parentB,h={id:c.id(d,e),bodyA:d,bodyB:e,contacts:{},activeContacts:[],separation:0,isActive:!0,timeCreated:b,timeUpdated:b,inverseMass:f.inverseMass+g.inverseMass,friction:Math.min(f.friction,g.friction),frictionStatic:Math.max(f.frictionStatic,g.frictionStatic),restitution:Math.max(f.restitution,g.restitution),slop:Math.max(f.slop,g.slop)};return c.update(h,a,b),h},c.update=function(a,b,e){var f=a.contacts,g=b.supports,h=a.activeContacts,i=b.parentA,j=b.parentB;if(a.collision=b,a.inverseMass=i.inverseMass+j.inverseMass,a.friction=Math.min(i.friction,j.friction),a.frictionStatic=Math.max(i.frictionStatic,j.frictionStatic),a.restitution=Math.max(i.restitution,j.restitution),a.slop=Math.max(i.slop,j.slop),h.length=0,b.collided){for(var k=0;k<g.length;k++){var l=g[k],m=d.id(l),n=f[m];h.push(n?n:f[m]=d.create(l))}a.separation=b.depth,c.setActive(a,!0,e)}else a.isActive===!0&&c.setActive(a,!1,e)},c.setActive=function(a,b,c){b?(a.isActive=!0,a.timeUpdated=c):(a.isActive=!1,a.activeContacts.length=0)},c.id=function(a,b){return a.id<b.id?a.id+"_"+b.id:b.id+"_"+a.id}}()},{"./Contact":4}],8:[function(a,b){var c={};b.exports=c;var d=a("./Pair"),e=a("../core/Common");!function(){var a=1e3;c.create=function(a){return e.extend({table:{},list:[],collisionStart:[],collisionActive:[],collisionEnd:[]},a)},c.update=function(a,b,c){var f,g,h,i,j=a.list,k=a.table,l=a.collisionStart,m=a.collisionEnd,n=a.collisionActive,o=[];for(l.length=0,m.length=0,n.length=0,i=0;i<b.length;i++)f=b[i],f.collided&&(g=d.id(f.bodyA,f.bodyB),o.push(g),h=k[g],h?(h.isActive?n.push(h):l.push(h),d.update(h,f,c)):(h=d.create(f,c),k[g]=h,l.push(h),j.push(h)));for(i=0;i<j.length;i++)h=j[i],h.isActive&&-1===e.indexOf(o,h.id)&&(d.setActive(h,!1,c),m.push(h))},c.removeOld=function(b,c){var d,e,f,g,h=b.list,i=b.table,j=[];for(g=0;g<h.length;g++)d=h[g],e=d.collision,e.bodyA.isSleeping||e.bodyB.isSleeping?d.timeUpdated=c:c-d.timeUpdated>a&&j.push(g);for(g=0;g<j.length;g++)f=j[g]-g,d=h[f],delete i[d.id],h.splice(f,1)},c.clear=function(a){return a.table={},a.list.length=0,a.collisionStart.length=0,a.collisionActive.length=0,a.collisionEnd.length=0,a}}()},{"../core/Common":14,"./Pair":7}],9:[function(a,b){var c={};b.exports=c;var d=a("../geometry/Vector"),e=a("./SAT"),f=a("../geometry/Bounds"),g=a("../factory/Bodies"),h=a("../geometry/Vertices");!function(){c.ray=function(a,b,c,h){h=h||1e-100;for(var i=d.angle(b,c),j=d.magnitude(d.sub(b,c)),k=.5*(c.x+b.x),l=.5*(c.y+b.y),m=g.rectangle(k,l,j,h,{angle:i}),n=[],o=0;o<a.length;o++){var p=a[o];if(f.overlaps(p.bounds,m.bounds))for(var q=1===p.parts.length?0:1;q<p.parts.length;q++){var r=p.parts[q];if(f.overlaps(r.bounds,m.bounds)){var s=e.collides(r,m);if(s.collided){s.body=s.bodyA=s.bodyB=p,n.push(s);break}}}}return n},c.region=function(a,b,c){for(var d=[],e=0;e<a.length;e++){var g=a[e],h=f.overlaps(g.bounds,b);(h&&!c||!h&&c)&&d.push(g)}return d},c.point=function(a,b){for(var c=[],d=0;d<a.length;d++){var e=a[d];if(f.contains(e.bounds,b))for(var g=1===e.parts.length?0:1;g<e.parts.length;g++){var i=e.parts[g];if(f.contains(i.bounds,b)&&h.contains(i.vertices,b)){c.push(e);break}}}return c}}()},{"../factory/Bodies":21,"../geometry/Bounds":24,"../geometry/Vector":26,"../geometry/Vertices":27,"./SAT":11}],10:[function(a,b){var c={};b.exports=c;var d=a("../geometry/Vertices"),e=a("../geometry/Vector"),f=a("../core/Common"),g=a("../geometry/Bounds");!function(){c._restingThresh=4,c._positionDampen=.9,c._positionWarming=.8,c._frictionNormalMultiplier=5,c.preSolvePosition=function(a){var b,c,d;for(b=0;b<a.length;b++)c=a[b],c.isActive&&(d=c.activeContacts.length,c.collision.parentA.totalContacts+=d,c.collision.parentB.totalContacts+=d)},c.solvePosition=function(a,b){var d,f,g,h,i,j,k,l,m,n=e._temp[0],o=e._temp[1],p=e._temp[2],q=e._temp[3];for(d=0;d<a.length;d++)f=a[d],f.isActive&&(g=f.collision,h=g.parentA,i=g.parentB,j=g.normal,k=e.sub(e.add(i.positionImpulse,i.position,n),e.add(h.positionImpulse,e.sub(i.position,g.penetration,o),p),q),f.separation=e.dot(j,k));for(d=0;d<a.length;d++)f=a[d],!f.isActive||f.separation<0||(g=f.collision,h=g.parentA,i=g.parentB,j=g.normal,m=(f.separation-f.slop)*b,(h.isStatic||i.isStatic)&&(m*=2),h.isStatic||h.isSleeping||(l=c._positionDampen/h.totalContacts,h.positionImpulse.x+=j.x*m*l,h.positionImpulse.y+=j.y*m*l),i.isStatic||i.isSleeping||(l=c._positionDampen/i.totalContacts,i.positionImpulse.x-=j.x*m*l,i.positionImpulse.y-=j.y*m*l))},c.postSolvePosition=function(a){for(var b=0;b<a.length;b++){var f=a[b];if(f.totalContacts=0,0!==f.positionImpulse.x||0!==f.positionImpulse.y){for(var h=0;h<f.parts.length;h++){var i=f.parts[h];d.translate(i.vertices,f.positionImpulse),g.update(i.bounds,i.vertices,f.velocity),i.position.x+=f.positionImpulse.x,i.position.y+=f.positionImpulse.y}f.positionPrev.x+=f.positionImpulse.x,f.positionPrev.y+=f.positionImpulse.y,e.dot(f.positionImpulse,f.velocity)<0?(f.positionImpulse.x=0,f.positionImpulse.y=0):(f.positionImpulse.x*=c._positionWarming,f.positionImpulse.y*=c._positionWarming)}}},c.preSolveVelocity=function(a){var b,c,d,f,g,h,i,j,k,l,m,n,o,p,q=e._temp[0],r=e._temp[1];for(b=0;b<a.length;b++)if(d=a[b],d.isActive)for(f=d.activeContacts,g=d.collision,h=g.parentA,i=g.parentB,j=g.normal,k=g.tangent,c=0;c<f.length;c++)l=f[c],m=l.vertex,n=l.normalImpulse,o=l.tangentImpulse,(0!==n||0!==o)&&(q.x=j.x*n+k.x*o,q.y=j.y*n+k.y*o,h.isStatic||h.isSleeping||(p=e.sub(m,h.position,r),h.positionPrev.x+=q.x*h.inverseMass,h.positionPrev.y+=q.y*h.inverseMass,h.anglePrev+=e.cross(p,q)*h.inverseInertia),i.isStatic||i.isSleeping||(p=e.sub(m,i.position,r),i.positionPrev.x-=q.x*i.inverseMass,i.positionPrev.y-=q.y*i.inverseMass,i.anglePrev-=e.cross(p,q)*i.inverseInertia))},c.solveVelocity=function(a,b){for(var d=b*b,g=e._temp[0],h=e._temp[1],i=e._temp[2],j=e._temp[3],k=e._temp[4],l=e._temp[5],m=0;m<a.length;m++){var n=a[m];if(n.isActive){var o=n.collision,p=o.parentA,q=o.parentB,r=o.normal,s=o.tangent,t=n.activeContacts,u=1/t.length;p.velocity.x=p.position.x-p.positionPrev.x,p.velocity.y=p.position.y-p.positionPrev.y,q.velocity.x=q.position.x-q.positionPrev.x,q.velocity.y=q.position.y-q.positionPrev.y,p.angularVelocity=p.angle-p.anglePrev,q.angularVelocity=q.angle-q.anglePrev;for(var v=0;v<t.length;v++){var w=t[v],x=w.vertex,y=e.sub(x,p.position,h),z=e.sub(x,q.position,i),A=e.add(p.velocity,e.mult(e.perp(y),p.angularVelocity),j),B=e.add(q.velocity,e.mult(e.perp(z),q.angularVelocity),k),C=e.sub(A,B,l),D=e.dot(r,C),E=e.dot(s,C),F=Math.abs(E),G=f.sign(E),H=(1+n.restitution)*D,I=f.clamp(n.separation+D,0,1)*c._frictionNormalMultiplier,J=E,K=1/0;F>n.friction*n.frictionStatic*I*d&&(J=n.friction*G*d,K=F);var L=e.cross(y,r),M=e.cross(z,r),N=p.inverseMass+q.inverseMass+p.inverseInertia*L*L+q.inverseInertia*M*M;if(H*=u/N,J*=u/(1+N),0>D&&D*D>c._restingThresh*d)w.normalImpulse=0,w.tangentImpulse=0;else{var O=w.normalImpulse;w.normalImpulse=Math.min(w.normalImpulse+H,0),H=w.normalImpulse-O;var P=w.tangentImpulse;w.tangentImpulse=f.clamp(w.tangentImpulse+J,-K,K),J=w.tangentImpulse-P}g.x=r.x*H+s.x*J,g.y=r.y*H+s.y*J,p.isStatic||p.isSleeping||(p.positionPrev.x+=g.x*p.inverseMass,p.positionPrev.y+=g.y*p.inverseMass,p.anglePrev+=e.cross(y,g)*p.inverseInertia),q.isStatic||q.isSleeping||(q.positionPrev.x-=g.x*q.inverseMass,q.positionPrev.y-=g.y*q.inverseMass,q.anglePrev-=e.cross(z,g)*q.inverseInertia)}}}}}()},{"../core/Common":14,"../geometry/Bounds":24,"../geometry/Vector":26,"../geometry/Vertices":27}],11:[function(a,b){var c={};b.exports=c;var d=a("../geometry/Vertices"),e=a("../geometry/Vector");!function(){c.collides=function(b,c,g){var h,i,j,k,l=g,m=!1;if(l){var n=b.parent,o=c.parent,p=n.speed*n.speed+n.angularSpeed*n.angularSpeed+o.speed*o.speed+o.angularSpeed*o.angularSpeed;m=l&&l.collided&&.2>p,k=l}else k={collided:!1,bodyA:b,bodyB:c};if(l&&m){var q=k.axisBody,r=q===b?c:b,s=[q.axes[l.axisNumber]];if(j=a(q.vertices,r.vertices,s),k.reused=!0,j.overlap<=0)return k.collided=!1,k}else{if(h=a(b.vertices,c.vertices,b.axes),h.overlap<=0)return k.collided=!1,k;if(i=a(c.vertices,b.vertices,c.axes),i.overlap<=0)return k.collided=!1,k;h.overlap<i.overlap?(j=h,k.axisBody=b):(j=i,k.axisBody=c),k.axisNumber=j.axisNumber}k.bodyA=b.id<c.id?b:c,k.bodyB=b.id<c.id?c:b,k.collided=!0,k.normal=j.axis,k.depth=j.overlap,k.parentA=k.bodyA.parent,k.parentB=k.bodyB.parent,b=k.bodyA,c=k.bodyB,e.dot(k.normal,e.sub(c.position,b.position))>0&&(k.normal=e.neg(k.normal)),k.tangent=e.perp(k.normal),k.penetration={x:k.normal.x*k.depth,y:k.normal.y*k.depth};var t=f(b,c,k.normal),u=k.supports||[];if(u.length=0,d.contains(b.vertices,t[0])&&u.push(t[0]),d.contains(b.vertices,t[1])&&u.push(t[1]),u.length<2){var v=f(c,b,e.neg(k.normal));d.contains(c.vertices,v[0])&&u.push(v[0]),u.length<2&&d.contains(c.vertices,v[1])&&u.push(v[1])}return u.length<1&&(u=[t[0]]),k.supports=u,k};var a=function(a,c,d){for(var f,g,h=e._temp[0],i=e._temp[1],j={overlap:Number.MAX_VALUE},k=0;k<d.length;k++){if(g=d[k],b(h,a,g),b(i,c,g),f=Math.min(h.max-i.min,i.max-h.min),0>=f)return j.overlap=f,j;f<j.overlap&&(j.overlap=f,j.axis=g,j.axisNumber=k)}return j},b=function(a,b,c){for(var d=e.dot(b[0],c),f=d,g=1;g<b.length;g+=1){var h=e.dot(b[g],c);h>f?f=h:d>h&&(d=h)}a.min=d,a.max=f},f=function(a,b,c){for(var d,f,g,h,i=Number.MAX_VALUE,j=e._temp[0],k=b.vertices,l=a.position,m=0;m<k.length;m++)f=k[m],j.x=f.x-l.x,j.y=f.y-l.y,d=-e.dot(c,j),i>d&&(i=d,g=f);var n=g.index-1>=0?g.index-1:k.length-1;f=k[n],j.x=f.x-l.x,j.y=f.y-l.y,i=-e.dot(c,j),h=f;var o=(g.index+1)%k.length;return f=k[o],j.x=f.x-l.x,j.y=f.y-l.y,d=-e.dot(c,j),i>d&&(h=f),[g,h]}}()},{"../geometry/Vector":26,"../geometry/Vertices":27}],12:[function(a,b){var c={};b.exports=c;var d=a("../geometry/Vertices"),e=a("../geometry/Vector"),f=a("../core/Sleeping"),g=a("../geometry/Bounds"),h=a("../geometry/Axes"),i=a("../core/Common");!function(){var a=1e-6,b=.001;c.create=function(b){var c=b;c.bodyA&&!c.pointA&&(c.pointA={x:0,y:0}),c.bodyB&&!c.pointB&&(c.pointB={x:0,y:0});var d=c.bodyA?e.add(c.bodyA.position,c.pointA):c.pointA,f=c.bodyB?e.add(c.bodyB.position,c.pointB):c.pointB,g=e.magnitude(e.sub(d,f));c.length=c.length||g||a;var h={visible:!0,lineWidth:2,strokeStyle:"#666"};return c.render=i.extend(h,c.render),c.id=c.id||i.nextId(),c.label=c.label||"Constraint",c.type="constraint",c.stiffness=c.stiffness||1,c.angularStiffness=c.angularStiffness||0,c.angleA=c.bodyA?c.bodyA.angle:c.angleA,c.angleB=c.bodyB?c.bodyB.angle:c.angleB,c},c.solveAll=function(a,b){for(var d=0;d<a.length;d++)c.solve(a[d],b)},c.solve=function(c,d){var g=c.bodyA,h=c.bodyB,j=c.pointA,k=c.pointB;g&&!g.isStatic&&(c.pointA=e.rotate(j,g.angle-c.angleA),c.angleA=g.angle),h&&!h.isStatic&&(c.pointB=e.rotate(k,h.angle-c.angleB),c.angleB=h.angle);var l=j,m=k;if(g&&(l=e.add(g.position,j)),h&&(m=e.add(h.position,k)),l&&m){var n=e.sub(l,m),o=e.magnitude(n);0===o&&(o=a);var p=(o-c.length)/o,q=e.div(n,o),r=e.mult(n,.5*p*c.stiffness*d*d);if(!(Math.abs(1-o/c.length)<b*d)){var s,t,u,v,w,x,y,z;g&&!g.isStatic?(u={x:l.x-g.position.x+r.x,y:l.y-g.position.y+r.y},g.velocity.x=g.position.x-g.positionPrev.x,g.velocity.y=g.position.y-g.positionPrev.y,g.angularVelocity=g.angle-g.anglePrev,s=e.add(g.velocity,e.mult(e.perp(u),g.angularVelocity)),w=e.dot(u,q),y=g.inverseMass+g.inverseInertia*w*w):(s={x:0,y:0},y=g?g.inverseMass:0),h&&!h.isStatic?(v={x:m.x-h.position.x-r.x,y:m.y-h.position.y-r.y},h.velocity.x=h.position.x-h.positionPrev.x,h.velocity.y=h.position.y-h.positionPrev.y,h.angularVelocity=h.angle-h.anglePrev,t=e.add(h.velocity,e.mult(e.perp(v),h.angularVelocity)),x=e.dot(v,q),z=h.inverseMass+h.inverseInertia*x*x):(t={x:0,y:0},z=h?h.inverseMass:0);var A=e.sub(t,s),B=e.dot(q,A)/(y+z);B>0&&(B=0);var C,D={x:q.x*B,y:q.y*B};g&&!g.isStatic&&(C=e.cross(u,D)*g.inverseInertia*(1-c.angularStiffness),f.set(g,!1),C=i.clamp(C,-.01,.01),g.constraintImpulse.x-=r.x,g.constraintImpulse.y-=r.y,g.constraintImpulse.angle+=C,g.position.x-=r.x,g.position.y-=r.y,g.angle+=C),h&&!h.isStatic&&(C=e.cross(v,D)*h.inverseInertia*(1-c.angularStiffness),f.set(h,!1),C=i.clamp(C,-.01,.01),h.constraintImpulse.x+=r.x,h.constraintImpulse.y+=r.y,h.constraintImpulse.angle-=C,h.position.x+=r.x,h.position.y+=r.y,h.angle-=C)}}},c.postSolveAll=function(a){for(var b=0;b<a.length;b++){for(var c=a[b],f=c.constraintImpulse,i=0;i<c.parts.length;i++){var j=c.parts[i];d.translate(j.vertices,f),i>0&&(j.position.x+=f.x,j.position.y+=f.y),0!==f.angle&&(d.rotate(j.vertices,f.angle,c.position),h.rotate(j.axes,f.angle),i>0&&e.rotateAbout(j.position,f.angle,c.position,j.position)),g.update(j.bounds,j.vertices)}f.angle=0,f.x=0,f.y=0}}}()},{"../core/Common":14,"../core/Sleeping":20,"../geometry/Axes":23,"../geometry/Bounds":24,"../geometry/Vector":26,"../geometry/Vertices":27}],13:[function(a,b){var c={};b.exports=c;var d=a("../geometry/Vertices"),e=a("../core/Sleeping"),f=a("../core/Mouse"),g=a("../core/Events"),h=a("../collision/Detector"),i=a("./Constraint"),j=a("../body/Composite"),k=a("../core/Common"),l=a("../geometry/Bounds");!function(){c.create=function(b,d){var e=(b?b.mouse:null)||(d?d.mouse:null);!e&&b&&b.render&&b.render.canvas?e=f.create(b.render.canvas):(e=f.create(),k.log("MouseConstraint.create: options.mouse was undefined, engine.render.canvas was undefined, may not function as expected","warn"));var h=i.create({label:"Mouse Constraint",pointA:e.position,pointB:{x:0,y:0},length:.01,stiffness:.1,angularStiffness:1,render:{strokeStyle:"#90EE90",lineWidth:3}}),l={type:"mouseConstraint",mouse:e,body:null,constraint:h,collisionFilter:{category:1,mask:4294967295,group:0}},m=k.extend(l,d);return g.on(b,"tick",function(){var d=j.allBodies(b.world);c.update(m,d),a(m)}),m},c.update=function(a,b){var c=a.mouse,f=a.constraint,i=a.body;if(0===c.button){if(f.bodyB)e.set(f.bodyB,!1),f.pointA=c.position;else for(var j=0;j<b.length;j++)if(i=b[j],l.contains(i.bounds,c.position)&&h.canCollide(i.collisionFilter,a.collisionFilter))for(var k=i.parts.length>1?1:0;k<i.parts.length;k++){var m=i.parts[k];if(d.contains(m.vertices,c.position)){f.pointA=c.position,f.bodyB=a.body=i,f.pointB={x:c.position.x-i.position.x,y:c.position.y-i.position.y},f.angleB=i.angle,e.set(i,!1),g.trigger(a,"startdrag",{mouse:c,body:i});break}}}else f.bodyB=a.body=null,f.pointB=null,i&&g.trigger(a,"enddrag",{mouse:c,body:i})};var a=function(a){var b=a.mouse,c=b.sourceEvents;c.mousemove&&g.trigger(a,"mousemove",{mouse:b}),c.mousedown&&g.trigger(a,"mousedown",{mouse:b}),c.mouseup&&g.trigger(a,"mouseup",{mouse:b}),f.clearSourceEvents(b)}}()},{"../body/Composite":2,"../collision/Detector":5,"../core/Common":14,"../core/Events":16,"../core/Mouse":18,"../core/Sleeping":20,"../geometry/Bounds":24,"../geometry/Vertices":27,"./Constraint":12}],14:[function(a,b){var c={};b.exports=c,function(){c._nextId=0,c._seed=0,c.extend=function(a,b){var d,e,f;"boolean"==typeof b?(d=2,f=b):(d=1,f=!0),e=Array.prototype.slice.call(arguments,d);for(var g=0;g<e.length;g++){var h=e[g];if(h)for(var i in h)f&&h[i]&&h[i].constructor===Object?a[i]&&a[i].constructor!==Object?a[i]=h[i]:(a[i]=a[i]||{},c.extend(a[i],f,h[i])):a[i]=h[i]}return a},c.clone=function(a,b){return c.extend({},b,a)},c.keys=function(a){if(Object.keys)return Object.keys(a);var b=[];for(var c in a)b.push(c);return b},c.values=function(a){var b=[];if(Object.keys){for(var c=Object.keys(a),d=0;d<c.length;d++)b.push(a[c[d]]);return b}for(var e in a)b.push(a[e]);return b},c.shadeColor=function(a,b){var c=parseInt(a.slice(1),16),d=Math.round(2.55*b),e=(c>>16)+d,f=(c>>8&255)+d,g=(255&c)+d;return"#"+(16777216+65536*(255>e?1>e?0:e:255)+256*(255>f?1>f?0:f:255)+(255>g?1>g?0:g:255)).toString(16).slice(1)},c.shuffle=function(a){for(var b=a.length-1;b>0;b--){var d=Math.floor(c.random()*(b+1)),e=a[b];a[b]=a[d],a[d]=e}return a},c.choose=function(a){return a[Math.floor(c.random()*a.length)]},c.isElement=function(a){try{return a instanceof HTMLElement}catch(b){return"object"==typeof a&&1===a.nodeType&&"object"==typeof a.style&&"object"==typeof a.ownerDocument}},c.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)},c.clamp=function(a,b,c){return b>a?b:a>c?c:a},c.sign=function(a){return 0>a?-1:1},c.now=function(){var a=window.performance||{};return a.now=function(){return a.now||a.webkitNow||a.msNow||a.oNow||a.mozNow||function(){return+new Date}}(),a.now()},c.random=function(b,c){return b="undefined"!=typeof b?b:0,c="undefined"!=typeof c?c:1,b+a()*(c-b)},c.colorToNumber=function(a){return a=a.replace("#",""),3==a.length&&(a=a.charAt(0)+a.charAt(0)+a.charAt(1)+a.charAt(1)+a.charAt(2)+a.charAt(2)),parseInt(a,16)
},c.log=function(a,b){if(console&&console.log&&console.warn)switch(b){case"warn":console.warn("Matter.js:",a);break;case"error":console.log("Matter.js:",a)}},c.nextId=function(){return c._nextId++},c.indexOf=function(a,b){if(a.indexOf)return a.indexOf(b);for(var c=0;c<a.length;c++)if(a[c]===b)return c;return-1};var a=function(){return c._seed=(9301*c._seed+49297)%233280,c._seed/233280}}()},{}],15:[function(a,b){var c={};b.exports=c;var d=a("../body/World"),e=a("./Sleeping"),f=a("../collision/Resolver"),g=a("../render/Render"),h=a("../collision/Pairs"),i=(a("./Metrics"),a("../collision/Grid")),j=a("./Events"),k=a("../body/Composite"),l=a("../constraint/Constraint"),m=a("./Common"),n=a("../body/Body");!function(){c.create=function(a,b){b=m.isElement(a)?b:a,a=m.isElement(a)?a:null;var c={positionIterations:6,velocityIterations:4,constraintIterations:2,enableSleeping:!1,events:[],timing:{timestamp:0,timeScale:1},broadphase:{controller:i}},e=m.extend(c,b);if(a||e.render){var f={element:a,controller:g};e.render=m.extend(f,e.render)}return e.render&&e.render.controller&&(e.render=e.render.controller.create(e.render)),e.world=d.create(e.world),e.pairs=h.create(),e.broadphase=e.broadphase.controller.create(e.broadphase),e.metrics=e.metrics||{extended:!1},e},c.update=function(c,d,g){g="undefined"!=typeof g?g:1;var i,m=c.world,n=c.timing,p=c.broadphase,q=[];n.timestamp+=d*n.timeScale;var r={timestamp:n.timestamp};j.trigger(c,"beforeUpdate",r);var s=k.allBodies(m),t=k.allConstraints(m);for(c.enableSleeping&&e.update(s,n.timeScale),b(s,m.gravity),o(s,d,n.timeScale,g,m.bounds),i=0;i<c.constraintIterations;i++)l.solveAll(t,n.timeScale);l.postSolveAll(s),p.controller?(m.isModified&&p.controller.clear(p),p.controller.update(p,s,c,m.isModified),q=p.pairsList):q=s;var u=p.detector(q,c),v=c.pairs,w=n.timestamp;for(h.update(v,u,w),h.removeOld(v,w),c.enableSleeping&&e.afterCollisions(v.list,n.timeScale),v.collisionStart.length>0&&j.trigger(c,"collisionStart",{pairs:v.collisionStart}),f.preSolvePosition(v.list),i=0;i<c.positionIterations;i++)f.solvePosition(v.list,n.timeScale);for(f.postSolvePosition(s),f.preSolveVelocity(v.list),i=0;i<c.velocityIterations;i++)f.solveVelocity(v.list,n.timeScale);return v.collisionActive.length>0&&j.trigger(c,"collisionActive",{pairs:v.collisionActive}),v.collisionEnd.length>0&&j.trigger(c,"collisionEnd",{pairs:v.collisionEnd}),a(s),m.isModified&&k.setModified(m,!1,!1,!0),j.trigger(c,"afterUpdate",r),c},c.merge=function(a,b){if(m.extend(a,b),b.world){a.world=b.world,c.clear(a);for(var d=k.allBodies(a.world),f=0;f<d.length;f++){var g=d[f];e.set(g,!1),g.id=m.nextId()}}},c.clear=function(a){var b=a.world;h.clear(a.pairs);var c=a.broadphase;if(c.controller){var d=k.allBodies(b);c.controller.clear(c),c.controller.update(c,d,a,!0)}};var a=function(a){for(var b=0;b<a.length;b++){var c=a[b];c.force.x=0,c.force.y=0,c.torque=0}},b=function(a,b){for(var c=0;c<a.length;c++){var d=a[c];d.isStatic||d.isSleeping||(d.force.y+=d.mass*b.y*.001,d.force.x+=d.mass*b.x*.001)}},o=function(a,b,c,d){for(var e=0;e<a.length;e++){var f=a[e];f.isStatic||f.isSleeping||n.update(f,b,c,d)}}}()},{"../body/Body":1,"../body/Composite":2,"../body/World":3,"../collision/Grid":6,"../collision/Pairs":8,"../collision/Resolver":10,"../constraint/Constraint":12,"../render/Render":29,"./Common":14,"./Events":16,"./Metrics":17,"./Sleeping":20}],16:[function(a,b){var c={};b.exports=c;var d=a("./Common");!function(){c.on=function(a,b,c){for(var d,e=b.split(" "),f=0;f<e.length;f++)d=e[f],a.events=a.events||{},a.events[d]=a.events[d]||[],a.events[d].push(c);return c},c.off=function(a,b,c){if(!b)return void(a.events={});"function"==typeof b&&(c=b,b=d.keys(a.events).join(" "));for(var e=b.split(" "),f=0;f<e.length;f++){var g=a.events[e[f]],h=[];if(c&&g)for(var i=0;i<g.length;i++)g[i]!==c&&h.push(g[i]);a.events[e[f]]=h}},c.trigger=function(a,b,c){var e,f,g,h;if(a.events){c||(c={}),e=b.split(" ");for(var i=0;i<e.length;i++)if(f=e[i],g=a.events[f]){h=d.clone(c,!1),h.name=f,h.source=a;for(var j=0;j<g.length;j++)g[j].apply(a,[h])}}}}()},{"./Common":14}],17:[function(){},{"../body/Composite":2,"./Common":14}],18:[function(a,b){var c={};b.exports=c;var d=a("../core/Common");!function(){c.create=function(b){var e={};return b||d.log("Mouse.create: element was undefined, defaulting to document.body","warn"),e.element=b||document.body,e.absolute={x:0,y:0},e.position={x:0,y:0},e.mousedownPosition={x:0,y:0},e.mouseupPosition={x:0,y:0},e.offset={x:0,y:0},e.scale={x:1,y:1},e.wheelDelta=0,e.button=-1,e.pixelRatio=e.element.getAttribute("data-pixel-ratio")||1,e.sourceEvents={mousemove:null,mousedown:null,mouseup:null,mousewheel:null},e.mousemove=function(b){var c=a(b,e.element,e.pixelRatio),d=b.changedTouches;d&&(e.button=0,b.preventDefault()),e.absolute.x=c.x,e.absolute.y=c.y,e.position.x=e.absolute.x*e.scale.x+e.offset.x,e.position.y=e.absolute.y*e.scale.y+e.offset.y,e.sourceEvents.mousemove=b},e.mousedown=function(b){var c=a(b,e.element,e.pixelRatio),d=b.changedTouches;d?(e.button=0,b.preventDefault()):e.button=b.button,e.absolute.x=c.x,e.absolute.y=c.y,e.position.x=e.absolute.x*e.scale.x+e.offset.x,e.position.y=e.absolute.y*e.scale.y+e.offset.y,e.mousedownPosition.x=e.position.x,e.mousedownPosition.y=e.position.y,e.sourceEvents.mousedown=b},e.mouseup=function(b){var c=a(b,e.element,e.pixelRatio),d=b.changedTouches;d&&b.preventDefault(),e.button=-1,e.absolute.x=c.x,e.absolute.y=c.y,e.position.x=e.absolute.x*e.scale.x+e.offset.x,e.position.y=e.absolute.y*e.scale.y+e.offset.y,e.mouseupPosition.x=e.position.x,e.mouseupPosition.y=e.position.y,e.sourceEvents.mouseup=b},e.mousewheel=function(a){e.wheelDelta=Math.max(-1,Math.min(1,a.wheelDelta||-a.detail)),a.preventDefault()},c.setElement(e,e.element),e},c.setElement=function(a,b){a.element=b,b.addEventListener("mousemove",a.mousemove),b.addEventListener("mousedown",a.mousedown),b.addEventListener("mouseup",a.mouseup),b.addEventListener("mousewheel",a.mousewheel),b.addEventListener("DOMMouseScroll",a.mousewheel),b.addEventListener("touchmove",a.mousemove),b.addEventListener("touchstart",a.mousedown),b.addEventListener("touchend",a.mouseup)},c.clearSourceEvents=function(a){a.sourceEvents.mousemove=null,a.sourceEvents.mousedown=null,a.sourceEvents.mouseup=null,a.sourceEvents.mousewheel=null,a.wheelDelta=0},c.setOffset=function(a,b){a.offset.x=b.x,a.offset.y=b.y,a.position.x=a.absolute.x*a.scale.x+a.offset.x,a.position.y=a.absolute.y*a.scale.y+a.offset.y},c.setScale=function(a,b){a.scale.x=b.x,a.scale.y=b.y,a.position.x=a.absolute.x*a.scale.x+a.offset.x,a.position.y=a.absolute.y*a.scale.y+a.offset.y};var a=function(a,b,c){var d,e,f=b.getBoundingClientRect(),g=document.documentElement||document.body.parentNode||document.body,h=void 0!==window.pageXOffset?window.pageXOffset:g.scrollLeft,i=void 0!==window.pageYOffset?window.pageYOffset:g.scrollTop,j=a.changedTouches;return j?(d=j[0].pageX-f.left-h,e=j[0].pageY-f.top-i):(d=a.pageX-f.left-h,e=a.pageY-f.top-i),{x:d/(b.clientWidth/b.width*c),y:e/(b.clientHeight/b.height*c)}}}()},{"../core/Common":14}],19:[function(a,b){var c={};b.exports=c;var d=a("./Events"),e=a("./Engine"),f=a("./Common");!function(){var a,b;"undefined"!=typeof window&&(a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(function(){a(f.now())},1e3/60)},b=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),c.create=function(a){var b={fps:60,correction:1,deltaSampleSize:60,counterTimestamp:0,frameCounter:0,deltaHistory:[],timePrev:null,timeScalePrev:1,frameRequestId:null,isFixed:!1,enabled:!0},c=f.extend(b,a);return c.delta=c.delta||1e3/c.fps,c.deltaMin=c.deltaMin||1e3/c.fps,c.deltaMax=c.deltaMax||1e3/(.5*c.fps),c.fps=1e3/c.delta,c},c.run=function(b,d){return"undefined"!=typeof b.positionIterations&&(d=b,b=c.create()),function e(f){b.frameRequestId=a(e),f&&b.enabled&&c.tick(b,d,f)}(),b},c.tick=function(a,b,c){var f,g=b.timing,h=1,i={timestamp:g.timestamp};d.trigger(a,"beforeTick",i),d.trigger(b,"beforeTick",i),a.isFixed?f=a.delta:(f=c-a.timePrev||a.delta,a.timePrev=c,a.deltaHistory.push(f),a.deltaHistory=a.deltaHistory.slice(-a.deltaSampleSize),f=Math.min.apply(null,a.deltaHistory),f=f<a.deltaMin?a.deltaMin:f,f=f>a.deltaMax?a.deltaMax:f,h=f/a.delta,a.delta=f),0!==a.timeScalePrev&&(h*=g.timeScale/a.timeScalePrev),0===g.timeScale&&(h=0),a.timeScalePrev=g.timeScale,a.correction=h,a.frameCounter+=1,c-a.counterTimestamp>=1e3&&(a.fps=a.frameCounter*((c-a.counterTimestamp)/1e3),a.counterTimestamp=c,a.frameCounter=0),d.trigger(a,"tick",i),d.trigger(b,"tick",i),b.world.isModified&&b.render&&b.render.controller&&b.render.controller.clear&&b.render.controller.clear(b.render),d.trigger(a,"beforeUpdate",i),e.update(b,f,h),d.trigger(a,"afterUpdate",i),b.render&&b.render.controller&&(d.trigger(a,"beforeRender",i),d.trigger(b,"beforeRender",i),b.render.controller.world(b),d.trigger(a,"afterRender",i),d.trigger(b,"afterRender",i)),d.trigger(a,"afterTick",i),d.trigger(b,"afterTick",i)},c.stop=function(a){b(a.frameRequestId)}}()},{"./Common":14,"./Engine":15,"./Events":16}],20:[function(a,b){var c={};b.exports=c;var d=a("./Events");!function(){c._motionWakeThreshold=.18,c._motionSleepThreshold=.08,c._minBias=.9,c.update=function(a,b){for(var d=b*b*b,e=0;e<a.length;e++){var f=a[e],g=f.speed*f.speed+f.angularSpeed*f.angularSpeed;if(0===f.force.x&&0===f.force.y){var h=Math.min(f.motion,g),i=Math.max(f.motion,g);f.motion=c._minBias*h+(1-c._minBias)*i,f.sleepThreshold>0&&f.motion<c._motionSleepThreshold*d?(f.sleepCounter+=1,f.sleepCounter>=f.sleepThreshold&&c.set(f,!0)):f.sleepCounter>0&&(f.sleepCounter-=1)}else c.set(f,!1)}},c.afterCollisions=function(a,b){for(var d=b*b*b,e=0;e<a.length;e++){var f=a[e];if(f.isActive){var g=f.collision,h=g.bodyA.parent,i=g.bodyB.parent;if(!(h.isSleeping&&i.isSleeping||h.isStatic||i.isStatic)&&(h.isSleeping||i.isSleeping)){var j=h.isSleeping&&!h.isStatic?h:i,k=j===h?i:h;!j.isStatic&&k.motion>c._motionWakeThreshold*d&&c.set(j,!1)}}}},c.set=function(a,b){var c=a.isSleeping;b?(a.isSleeping=!0,a.sleepCounter=a.sleepThreshold,a.positionImpulse.x=0,a.positionImpulse.y=0,a.positionPrev.x=a.position.x,a.positionPrev.y=a.position.y,a.anglePrev=a.angle,a.speed=0,a.angularSpeed=0,a.motion=0,c||d.trigger(a,"sleepStart")):(a.isSleeping=!1,a.sleepCounter=0,c&&d.trigger(a,"sleepEnd"))}}()},{"./Events":16}],21:[function(a,b){var c={};b.exports=c;var d=a("../geometry/Vertices"),e=a("../core/Common"),f=a("../body/Body"),g=a("../geometry/Bounds"),h=a("../geometry/Vector");!function(){c.rectangle=function(a,b,c,g,h){h=h||{};var i={label:"Rectangle Body",position:{x:a,y:b},vertices:d.fromPath("L 0 0 L "+c+" 0 L "+c+" "+g+" L 0 "+g)};if(h.chamfer){var j=h.chamfer;i.vertices=d.chamfer(i.vertices,j.radius,j.quality,j.qualityMin,j.qualityMax),delete h.chamfer}return f.create(e.extend({},i,h))},c.trapezoid=function(a,b,c,g,h,i){i=i||{},h*=.5;var j=(1-2*h)*c,k=c*h,l=k+j,m=l+k,n={label:"Trapezoid Body",position:{x:a,y:b},vertices:d.fromPath("L 0 0 L "+k+" "+-g+" L "+l+" "+-g+" L "+m+" 0")};if(i.chamfer){var o=i.chamfer;n.vertices=d.chamfer(n.vertices,o.radius,o.quality,o.qualityMin,o.qualityMax),delete i.chamfer}return f.create(e.extend({},n,i))},c.circle=function(a,b,d,e,f){e=e||{},e.label="Circle Body",f=f||25;var g=Math.ceil(Math.max(10,Math.min(f,d)));return g%2===1&&(g+=1),e.circleRadius=d,c.polygon(a,b,g,d,e)},c.polygon=function(a,b,g,h,i){if(i=i||{},3>g)return c.circle(a,b,h,i);for(var j=2*Math.PI/g,k="",l=.5*j,m=0;g>m;m+=1){var n=l+m*j,o=Math.cos(n)*h,p=Math.sin(n)*h;k+="L "+o.toFixed(3)+" "+p.toFixed(3)+" "}var q={label:"Polygon Body",position:{x:a,y:b},vertices:d.fromPath(k)};if(i.chamfer){var r=i.chamfer;q.vertices=d.chamfer(q.vertices,r.radius,r.quality,r.qualityMin,r.qualityMax),delete i.chamfer}return f.create(e.extend({},q,i))},c.fromVertices=function(a,b,c,i,j,k,l){var m,n,o,p,q,r,s,t,u;for(i=i||{},n=[],j="undefined"!=typeof j?j:!1,k="undefined"!=typeof k?k:.01,l="undefined"!=typeof l?l:10,window.decomp||e.log("Bodies.fromVertices: poly-decomp.js required. Could not decompose vertices. Fallback to convex hull.","warn"),e.isArray(c[0])||(c=[c]),t=0;t<c.length;t+=1)if(p=c[t],o=d.isConvex(p),o||!window.decomp)p=o?d.clockwiseSort(p):d.hull(p),n.push({position:{x:a,y:b},vertices:p});else{var v=new decomp.Polygon;for(q=0;q<p.length;q++)v.vertices.push([p[q].x,p[q].y]);v.makeCCW(),k!==!1&&v.removeCollinearPoints(k);var w=v.quickDecomp();for(q=0;q<w.length;q++){var x=w[q],y=[];for(r=0;r<x.vertices.length;r++)y.push({x:x.vertices[r][0],y:x.vertices[r][1]});l>0&&d.area(y)<l||n.push({position:d.centre(y),vertices:y})}}for(q=0;q<n.length;q++)n[q]=f.create(e.extend(n[q],i));if(j){var z=5;for(q=0;q<n.length;q++){var A=n[q];for(r=q+1;r<n.length;r++){var B=n[r];if(g.overlaps(A.bounds,B.bounds)){var C=A.vertices,D=B.vertices;for(s=0;s<A.vertices.length;s++)for(u=0;u<B.vertices.length;u++){var E=h.magnitudeSquared(h.sub(C[(s+1)%C.length],D[u])),F=h.magnitudeSquared(h.sub(C[s],D[(u+1)%D.length]));z>E&&z>F&&(C[s].isInternal=!0,D[u].isInternal=!0)}}}}}return n.length>1?(m=f.create(e.extend({parts:n.slice(0)},i)),f.setPosition(m,{x:a,y:b}),m):n[0]}}()},{"../body/Body":1,"../core/Common":14,"../geometry/Bounds":24,"../geometry/Vector":26,"../geometry/Vertices":27}],22:[function(a,b){var c={};b.exports=c;var d=a("../body/Composite"),e=a("../constraint/Constraint"),f=a("../core/Common"),g=a("../body/Body"),h=a("./Bodies");!function(){c.stack=function(a,b,c,e,f,h,i){for(var j,k=d.create({label:"Stack"}),l=a,m=b,n=0,o=0;e>o;o++){for(var p=0,q=0;c>q;q++){var r=i(l,m,q,o,j,n);if(r){var s=r.bounds.max.y-r.bounds.min.y,t=r.bounds.max.x-r.bounds.min.x;s>p&&(p=s),g.translate(r,{x:.5*t,y:.5*s}),l=r.bounds.max.x+f,d.addBody(k,r),j=r,n+=1}else l+=f}m+=p+h,l=a}return k},c.chain=function(a,b,c,g,h,i){for(var j=a.bodies,k=1;k<j.length;k++){var l=j[k-1],m=j[k],n=l.bounds.max.y-l.bounds.min.y,o=l.bounds.max.x-l.bounds.min.x,p=m.bounds.max.y-m.bounds.min.y,q=m.bounds.max.x-m.bounds.min.x,r={bodyA:l,pointA:{x:o*b,y:n*c},bodyB:m,pointB:{x:q*g,y:p*h}},s=f.extend(r,i);d.addConstraint(a,e.create(s))}return a.label+=" Chain",a},c.mesh=function(a,b,c,g,h){var i,j,k,l,m,n=a.bodies;for(i=0;c>i;i++){for(j=1;b>j;j++)k=n[j-1+i*b],l=n[j+i*b],d.addConstraint(a,e.create(f.extend({bodyA:k,bodyB:l},h)));if(i>0)for(j=0;b>j;j++)k=n[j+(i-1)*b],l=n[j+i*b],d.addConstraint(a,e.create(f.extend({bodyA:k,bodyB:l},h))),g&&j>0&&(m=n[j-1+(i-1)*b],d.addConstraint(a,e.create(f.extend({bodyA:m,bodyB:l},h)))),g&&b-1>j&&(m=n[j+1+(i-1)*b],d.addConstraint(a,e.create(f.extend({bodyA:m,bodyB:l},h))))}return a.label+=" Mesh",a},c.pyramid=function(a,b,d,e,f,h,i){return c.stack(a,b,d,e,f,h,function(b,c,h,j,k,l){var m=Math.min(e,Math.ceil(d/2)),n=k?k.bounds.max.x-k.bounds.min.x:0;if(!(j>m)){j=m-j;var o=j,p=d-1-j;if(!(o>h||h>p)){1===l&&g.translate(k,{x:(h+(d%2===1?1:-1))*n,y:0});var q=k?h*n:0;return i(a+q+h*f,c,h,j,k,l)}}})},c.newtonsCradle=function(a,b,c,f,g){for(var i=d.create({label:"Newtons Cradle"}),j=0;c>j;j++){var k=1.9,l=h.circle(a+j*f*k,b+g,f,{inertia:99999,restitution:1,friction:0,frictionAir:1e-4,slop:.01}),m=e.create({pointA:{x:a+j*f*k,y:b},bodyB:l});d.addBody(i,l),d.addConstraint(i,m)}return i},c.car=function(a,b,c,f,i){var j=g.nextGroup(!0),k=-20,l=.5*-c+k,m=.5*c-k,n=0,o=d.create({label:"Car"}),p=h.trapezoid(a,b,c,f,.3,{collisionFilter:{group:j},friction:.01,chamfer:{radius:10}}),q=h.circle(a+l,b+n,i,{collisionFilter:{group:j},restitution:.5,friction:.9,frictionStatic:10,slop:.5,density:.01}),r=h.circle(a+m,b+n,i,{collisionFilter:{group:j},restitution:.5,friction:.9,frictionStatic:10,slop:.5,density:.01}),s=e.create({bodyA:p,pointA:{x:l,y:n},bodyB:q,stiffness:.5}),t=e.create({bodyA:p,pointA:{x:m,y:n},bodyB:r,stiffness:.5});return d.addBody(o,p),d.addBody(o,q),d.addBody(o,r),d.addConstraint(o,s),d.addConstraint(o,t),o},c.softBody=function(a,b,d,e,g,i,j,k,l,m){l=f.extend({inertia:1/0},l),m=f.extend({stiffness:.4},m);var n=c.stack(a,b,d,e,g,i,function(a,b){return h.circle(a,b,k,l)});return c.mesh(n,d,e,j,m),n.label="Soft Body",n}}()},{"../body/Body":1,"../body/Composite":2,"../constraint/Constraint":12,"../core/Common":14,"./Bodies":21}],23:[function(a,b){var c={};b.exports=c;var d=a("../geometry/Vector"),e=a("../core/Common");!function(){c.fromVertices=function(a){for(var b={},c=0;c<a.length;c++){var f=(c+1)%a.length,g=d.normalise({x:a[f].y-a[c].y,y:a[c].x-a[f].x}),h=0===g.y?1/0:g.x/g.y;h=h.toFixed(3).toString(),b[h]=g}return e.values(b)},c.rotate=function(a,b){if(0!==b)for(var c=Math.cos(b),d=Math.sin(b),e=0;e<a.length;e++){var f,g=a[e];f=g.x*c-g.y*d,g.y=g.x*d+g.y*c,g.x=f}}}()},{"../core/Common":14,"../geometry/Vector":26}],24:[function(a,b){var c={};b.exports=c,function(){c.create=function(a){var b={min:{x:0,y:0},max:{x:0,y:0}};return a&&c.update(b,a),b},c.update=function(a,b,c){a.min.x=Number.MAX_VALUE,a.max.x=Number.MIN_VALUE,a.min.y=Number.MAX_VALUE,a.max.y=Number.MIN_VALUE;for(var d=0;d<b.length;d++){var e=b[d];e.x>a.max.x&&(a.max.x=e.x),e.x<a.min.x&&(a.min.x=e.x),e.y>a.max.y&&(a.max.y=e.y),e.y<a.min.y&&(a.min.y=e.y)}c&&(c.x>0?a.max.x+=c.x:a.min.x+=c.x,c.y>0?a.max.y+=c.y:a.min.y+=c.y)},c.contains=function(a,b){return b.x>=a.min.x&&b.x<=a.max.x&&b.y>=a.min.y&&b.y<=a.max.y},c.overlaps=function(a,b){return a.min.x<=b.max.x&&a.max.x>=b.min.x&&a.max.y>=b.min.y&&a.min.y<=b.max.y},c.translate=function(a,b){a.min.x+=b.x,a.max.x+=b.x,a.min.y+=b.y,a.max.y+=b.y},c.shift=function(a,b){var c=a.max.x-a.min.x,d=a.max.y-a.min.y;a.min.x=b.x,a.max.x=b.x+c,a.min.y=b.y,a.max.y=b.y+d}}()},{}],25:[function(a,b){var c={};b.exports=c;a("../geometry/Bounds");!function(){c.pathToVertices=function(b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p=[],q=0,r=0,s=0;c=c||15;var t=function(a,b,c){var d=c%2===1&&c>1;if(!l||a!=l.x||b!=l.y){l&&d?(n=l.x,o=l.y):(n=0,o=0);var e={x:n+a,y:o+b};(d||!l)&&(l=e),p.push(e),r=n+a,s=o+b}},u=function(a){var b=a.pathSegTypeAsLetter.toUpperCase();if("Z"!==b){switch(b){case"M":case"L":case"T":case"C":case"S":case"Q":r=a.x,s=a.y;break;case"H":r=a.x;break;case"V":s=a.y}t(r,s,a.pathSegType)}};for(a(b),f=b.getTotalLength(),i=[],d=0;d<b.pathSegList.numberOfItems;d+=1)i.push(b.pathSegList.getItem(d));for(j=i.concat();f>q;){if(m=b.getPathSegAtLength(q),h=i[m],h!=k){for(;j.length&&j[0]!=h;)u(j.shift());k=h}switch(h.pathSegTypeAsLetter.toUpperCase()){case"C":case"T":case"S":case"Q":case"A":g=b.getPointAtLength(q),t(g.x,g.y,0)}q+=c}for(d=0,e=j.length;e>d;++d)u(j[d]);return p};var a=function(a){for(var b,c,d,e,f,g,h=a.pathSegList,i=0,j=0,k=h.numberOfItems,l=0;k>l;++l){var m=h.getItem(l),n=m.pathSegTypeAsLetter;if(/[MLHVCSQTA]/.test(n))"x"in m&&(i=m.x),"y"in m&&(j=m.y);else switch("x1"in m&&(d=i+m.x1),"x2"in m&&(f=i+m.x2),"y1"in m&&(e=j+m.y1),"y2"in m&&(g=j+m.y2),"x"in m&&(i+=m.x),"y"in m&&(j+=m.y),n){case"m":h.replaceItem(a.createSVGPathSegMovetoAbs(i,j),l);break;case"l":h.replaceItem(a.createSVGPathSegLinetoAbs(i,j),l);break;case"h":h.replaceItem(a.createSVGPathSegLinetoHorizontalAbs(i),l);break;case"v":h.replaceItem(a.createSVGPathSegLinetoVerticalAbs(j),l);break;case"c":h.replaceItem(a.createSVGPathSegCurvetoCubicAbs(i,j,d,e,f,g),l);break;case"s":h.replaceItem(a.createSVGPathSegCurvetoCubicSmoothAbs(i,j,f,g),l);break;case"q":h.replaceItem(a.createSVGPathSegCurvetoQuadraticAbs(i,j,d,e),l);break;case"t":h.replaceItem(a.createSVGPathSegCurvetoQuadraticSmoothAbs(i,j),l);break;case"a":h.replaceItem(a.createSVGPathSegArcAbs(i,j,m.r1,m.r2,m.angle,m.largeArcFlag,m.sweepFlag),l);break;case"z":case"Z":i=b,j=c}("M"==n||"m"==n)&&(b=i,c=j)}}}()},{"../geometry/Bounds":24}],26:[function(a,b){var c={};b.exports=c,function(){c.create=function(a,b){return{x:a||0,y:b||0}},c.clone=function(a){return{x:a.x,y:a.y}},c.magnitude=function(a){return Math.sqrt(a.x*a.x+a.y*a.y)},c.magnitudeSquared=function(a){return a.x*a.x+a.y*a.y},c.rotate=function(a,b){var c=Math.cos(b),d=Math.sin(b);return{x:a.x*c-a.y*d,y:a.x*d+a.y*c}},c.rotateAbout=function(a,b,c,d){var e=Math.cos(b),f=Math.sin(b);d||(d={});var g=c.x+((a.x-c.x)*e-(a.y-c.y)*f);return d.y=c.y+((a.x-c.x)*f+(a.y-c.y)*e),d.x=g,d},c.normalise=function(a){var b=c.magnitude(a);return 0===b?{x:0,y:0}:{x:a.x/b,y:a.y/b}},c.dot=function(a,b){return a.x*b.x+a.y*b.y},c.cross=function(a,b){return a.x*b.y-a.y*b.x},c.cross3=function(a,b,c){return(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x)},c.add=function(a,b,c){return c||(c={}),c.x=a.x+b.x,c.y=a.y+b.y,c},c.sub=function(a,b,c){return c||(c={}),c.x=a.x-b.x,c.y=a.y-b.y,c},c.mult=function(a,b){return{x:a.x*b,y:a.y*b}},c.div=function(a,b){return{x:a.x/b,y:a.y/b}},c.perp=function(a,b){return b=b===!0?-1:1,{x:b*-a.y,y:b*a.x}},c.neg=function(a){return{x:-a.x,y:-a.y}},c.angle=function(a,b){return Math.atan2(b.y-a.y,b.x-a.x)},c._temp=[c.create(),c.create(),c.create(),c.create(),c.create(),c.create()]}()},{}],27:[function(a,b){var c={};b.exports=c;var d=a("../geometry/Vector"),e=a("../core/Common");!function(){c.create=function(a,b){for(var c=[],d=0;d<a.length;d++){var e=a[d],f={x:e.x,y:e.y,index:d,body:b,isInternal:!1};c.push(f)}return c},c.fromPath=function(a,b){var d=/L?\s*([\-\d\.e]+)[\s,]*([\-\d\.e]+)*/gi,e=[];return a.replace(d,function(a,b,c){e.push({x:parseFloat(b),y:parseFloat(c)})}),c.create(e,b)},c.centre=function(a){for(var b,e,f,g=c.area(a,!0),h={x:0,y:0},i=0;i<a.length;i++)f=(i+1)%a.length,b=d.cross(a[i],a[f]),e=d.mult(d.add(a[i],a[f]),b),h=d.add(h,e);return d.div(h,6*g)},c.mean=function(a){for(var b={x:0,y:0},c=0;c<a.length;c++)b.x+=a[c].x,b.y+=a[c].y;return d.div(b,a.length)},c.area=function(a,b){for(var c=0,d=a.length-1,e=0;e<a.length;e++)c+=(a[d].x-a[e].x)*(a[d].y+a[e].y),d=e;return b?c/2:Math.abs(c)/2},c.inertia=function(a,b){for(var c,e,f=0,g=0,h=a,i=0;i<h.length;i++)e=(i+1)%h.length,c=Math.abs(d.cross(h[e],h[i])),f+=c*(d.dot(h[e],h[e])+d.dot(h[e],h[i])+d.dot(h[i],h[i])),g+=c;return b/6*(f/g)},c.translate=function(a,b,c){var d;if(c)for(d=0;d<a.length;d++)a[d].x+=b.x*c,a[d].y+=b.y*c;else for(d=0;d<a.length;d++)a[d].x+=b.x,a[d].y+=b.y;return a},c.rotate=function(a,b,c){if(0!==b){for(var d=Math.cos(b),e=Math.sin(b),f=0;f<a.length;f++){var g=a[f],h=g.x-c.x,i=g.y-c.y;g.x=c.x+(h*d-i*e),g.y=c.y+(h*e+i*d)}return a}},c.contains=function(a,b){for(var c=0;c<a.length;c++){var d=a[c],e=a[(c+1)%a.length];if((b.x-d.x)*(e.y-d.y)+(b.y-d.y)*(d.x-e.x)>0)return!1}return!0},c.scale=function(a,b,e,f){if(1===b&&1===e)return a;f=f||c.centre(a);for(var g,h,i=0;i<a.length;i++)g=a[i],h=d.sub(g,f),a[i].x=f.x+h.x*b,a[i].y=f.y+h.y*e;return a},c.chamfer=function(a,b,c,f,g){b=b||[8],b.length||(b=[b]),c="undefined"!=typeof c?c:-1,f=f||2,g=g||14;for(var h=[],i=0;i<a.length;i++){var j=a[i-1>=0?i-1:a.length-1],k=a[i],l=a[(i+1)%a.length],m=b[i<b.length?i:b.length-1];if(0!==m){var n=d.normalise({x:k.y-j.y,y:j.x-k.x}),o=d.normalise({x:l.y-k.y,y:k.x-l.x}),p=Math.sqrt(2*Math.pow(m,2)),q=d.mult(e.clone(n),m),r=d.normalise(d.mult(d.add(n,o),.5)),s=d.sub(k,d.mult(r,p)),t=c;-1===c&&(t=1.75*Math.pow(m,.32)),t=e.clamp(t,f,g),t%2===1&&(t+=1);for(var u=Math.acos(d.dot(n,o)),v=u/t,w=0;t>w;w++)h.push(d.add(d.rotate(q,v*w),s))}else h.push(k)}return h},c.clockwiseSort=function(a){var b=c.mean(a);return a.sort(function(a,c){return d.angle(b,a)-d.angle(b,c)}),a},c.isConvex=function(a){var b,c,d,e,f=0,g=a.length;if(3>g)return null;for(b=0;g>b;b++)if(c=(b+1)%g,d=(b+2)%g,e=(a[c].x-a[b].x)*(a[d].y-a[c].y),e-=(a[c].y-a[b].y)*(a[d].x-a[c].x),0>e?f|=1:e>0&&(f|=2),3===f)return!1;return 0!==f?!0:null},c.hull=function(a){var b,c,e=[],f=[];for(a=a.slice(0),a.sort(function(a,b){var c=a.x-b.x;return 0!==c?c:a.y-b.y}),c=0;c<a.length;c++){for(b=a[c];f.length>=2&&d.cross3(f[f.length-2],f[f.length-1],b)<=0;)f.pop();f.push(b)}for(c=a.length-1;c>=0;c--){for(b=a[c];e.length>=2&&d.cross3(e[e.length-2],e[e.length-1],b)<=0;)e.pop();e.push(b)}return e.pop(),f.pop(),e.concat(f)}}()},{"../core/Common":14,"../geometry/Vector":26}],28:[function(a,b){var c=b.exports={};c.Body=a("../body/Body"),c.Composite=a("../body/Composite"),c.World=a("../body/World"),c.Contact=a("../collision/Contact"),c.Detector=a("../collision/Detector"),c.Grid=a("../collision/Grid"),c.Pairs=a("../collision/Pairs"),c.Pair=a("../collision/Pair"),c.Query=a("../collision/Query"),c.Resolver=a("../collision/Resolver"),c.SAT=a("../collision/SAT"),c.Constraint=a("../constraint/Constraint"),c.MouseConstraint=a("../constraint/MouseConstraint"),c.Common=a("../core/Common"),c.Engine=a("../core/Engine"),c.Events=a("../core/Events"),c.Mouse=a("../core/Mouse"),c.Runner=a("../core/Runner"),c.Sleeping=a("../core/Sleeping"),c.Bodies=a("../factory/Bodies"),c.Composites=a("../factory/Composites"),c.Axes=a("../geometry/Axes"),c.Bounds=a("../geometry/Bounds"),c.Svg=a("../geometry/Svg"),c.Vector=a("../geometry/Vector"),c.Vertices=a("../geometry/Vertices"),c.Render=a("../render/Render"),c.RenderPixi=a("../render/RenderPixi"),c.World.add=c.Composite.add,c.World.remove=c.Composite.remove,c.World.addComposite=c.Composite.addComposite,c.World.addBody=c.Composite.addBody,c.World.addConstraint=c.Composite.addConstraint,c.World.clear=c.Composite.clear,c.Engine.run=c.Runner.run},{"../body/Body":1,"../body/Composite":2,"../body/World":3,"../collision/Contact":4,"../collision/Detector":5,"../collision/Grid":6,"../collision/Pair":7,"../collision/Pairs":8,"../collision/Query":9,"../collision/Resolver":10,"../collision/SAT":11,"../constraint/Constraint":12,"../constraint/MouseConstraint":13,"../core/Common":14,"../core/Engine":15,"../core/Events":16,"../core/Metrics":17,"../core/Mouse":18,"../core/Runner":19,"../core/Sleeping":20,"../factory/Bodies":21,"../factory/Composites":22,"../geometry/Axes":23,"../geometry/Bounds":24,"../geometry/Svg":25,"../geometry/Vector":26,"../geometry/Vertices":27,"../render/Render":29,"../render/RenderPixi":30}],29:[function(a,b){var c={};b.exports=c;var d=a("../core/Common"),e=a("../body/Composite"),f=a("../geometry/Bounds"),g=a("../core/Events"),h=a("../collision/Grid");!function(){c.create=function(b){var e={controller:c,element:null,canvas:null,options:{width:800,height:600,pixelRatio:1,background:"#fafafa",wireframeBackground:"#222",hasBounds:!1,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showBroadphase:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showSeparations:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showShadows:!1,showVertexNumbers:!1,showConvexHulls:!1,showInternalEdges:!1}},f=d.extend(e,b);return f.canvas=f.canvas||a(f.options.width,f.options.height),f.context=f.canvas.getContext("2d"),f.textures={},f.bounds=f.bounds||{min:{x:0,y:0},max:{x:f.options.width,y:f.options.height}},1!==f.options.pixelRatio&&c.setPixelRatio(f,f.options.pixelRatio),d.isElement(f.element)?f.element.appendChild(f.canvas):d.log("Render.create: options.element was undefined, render.canvas was created but not appended","warn"),f},c.setPixelRatio=function(a,c){var d=a.options,e=a.canvas;"auto"===c&&(c=b(e)),d.pixelRatio=c,e.setAttribute("data-pixel-ratio",c),e.width=d.width*c,e.height=d.height*c,e.style.width=d.width+"px",e.style.height=d.height+"px",a.context.scale(c,c)},c.world=function(a){var b,d=a.render,i=a.world,k=d.canvas,l=d.context,m=d.options,n=e.allBodies(i),o=e.allConstraints(i),p=m.wireframes?m.wireframeBackground:m.background,q=[],r=[],s={timestamp:a.timing.timestamp};if(g.trigger(d,"beforeRender",s),d.currentBackground!==p&&j(d,p),l.globalCompositeOperation="source-in",l.fillStyle="transparent",l.fillRect(0,0,k.width,k.height),l.globalCompositeOperation="source-over",m.hasBounds){var t=d.bounds.max.x-d.bounds.min.x,u=d.bounds.max.y-d.bounds.min.y,v=t/m.width,w=u/m.height;for(b=0;b<n.length;b++){var x=n[b];f.overlaps(x.bounds,d.bounds)&&q.push(x)}for(b=0;b<o.length;b++){var y=o[b],z=y.bodyA,A=y.bodyB,B=y.pointA,C=y.pointB;z&&(B=Vector.add(z.position,y.pointA)),A&&(C=Vector.add(A.position,y.pointB)),B&&C&&(f.contains(d.bounds,B)||f.contains(d.bounds,C))&&r.push(y)}l.scale(1/v,1/w),l.translate(-d.bounds.min.x,-d.bounds.min.y)}else r=o,q=n;!m.wireframes||a.enableSleeping&&m.showSleeping?c.bodies(a,q,l):(m.showConvexHulls&&c.bodyConvexHulls(a,q,l),c.bodyWireframes(a,q,l)),m.showBounds&&c.bodyBounds(a,q,l),(m.showAxes||m.showAngleIndicator)&&c.bodyAxes(a,q,l),m.showPositions&&c.bodyPositions(a,q,l),m.showVelocity&&c.bodyVelocity(a,q,l),m.showIds&&c.bodyIds(a,q,l),m.showSeparations&&c.separations(a,a.pairs.list,l),m.showCollisions&&c.collisions(a,a.pairs.list,l),m.showVertexNumbers&&c.vertexNumbers(a,q,l),c.constraints(r,l),m.showBroadphase&&a.broadphase.controller===h&&c.grid(a,a.broadphase,l),m.showDebug&&c.debug(a,l),m.hasBounds&&l.setTransform(m.pixelRatio,0,0,m.pixelRatio,0,0),g.trigger(d,"afterRender",s)},c.debug=function(a,b){var c=b,d=a.world,f=a.render,g=a.metrics,h=f.options,i=(e.allBodies(d),"    ");if(a.timing.timestamp-(f.debugTimestamp||0)>=500){var j="";j+="fps: "+Math.round(g.timing.fps)+i,f.debugString=j,f.debugTimestamp=a.timing.timestamp}if(f.debugString){c.font="12px Arial",c.fillStyle=h.wireframes?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.5)";for(var k=f.debugString.split("\n"),l=0;l<k.length;l++)c.fillText(k[l],50,50+18*l)}},c.constraints=function(a,b){for(var c=b,d=0;d<a.length;d++){var e=a[d];if(e.render.visible&&e.pointA&&e.pointB){var f=e.bodyA,g=e.bodyB;f?(c.beginPath(),c.moveTo(f.position.x+e.pointA.x,f.position.y+e.pointA.y)):(c.beginPath(),c.moveTo(e.pointA.x,e.pointA.y)),g?c.lineTo(g.position.x+e.pointB.x,g.position.y+e.pointB.y):c.lineTo(e.pointB.x,e.pointB.y),c.lineWidth=e.render.lineWidth,c.strokeStyle=e.render.strokeStyle,c.stroke()}}},c.bodyShadows=function(a,b,c){for(var d=c,e=a.render,f=0;f<b.length;f++){var g=b[f];if(g.render.visible){if(g.circleRadius)d.beginPath(),d.arc(g.position.x,g.position.y,g.circleRadius,0,2*Math.PI),d.closePath();else{d.beginPath(),d.moveTo(g.vertices[0].x,g.vertices[0].y);for(var h=1;h<g.vertices.length;h++)d.lineTo(g.vertices[h].x,g.vertices[h].y);d.closePath()}var i=g.position.x-.5*e.options.width,j=g.position.y-.2*e.options.height,k=Math.abs(i)+Math.abs(j);d.shadowColor="rgba(0,0,0,0.15)",d.shadowOffsetX=.05*i,d.shadowOffsetY=.05*j,d.shadowBlur=1+12*Math.min(1,k/1e3),d.fill(),d.shadowColor=null,d.shadowOffsetX=null,d.shadowOffsetY=null,d.shadowBlur=null}}},c.bodies=function(a,b,c){var e,f,g,h,j=c,k=a.render,l=k.options;for(g=0;g<b.length;g++)if(e=b[g],e.render.visible)for(h=e.parts.length>1?1:0;h<e.parts.length;h++)if(f=e.parts[h],f.render.sprite&&f.render.sprite.texture&&!l.wireframes){var m=f.render.sprite,n=i(k,m.texture);l.showSleeping&&e.isSleeping&&(j.globalAlpha=.5),j.translate(f.position.x,f.position.y),j.rotate(f.angle),j.drawImage(n,n.width*-.5*m.xScale,n.height*-.5*m.yScale,n.width*m.xScale,n.height*m.yScale),j.rotate(-f.angle),j.translate(-f.position.x,-f.position.y),l.showSleeping&&e.isSleeping&&(j.globalAlpha=1)}else{if(f.circleRadius)j.beginPath(),j.arc(f.position.x,f.position.y,f.circleRadius,0,2*Math.PI);else{j.beginPath(),j.moveTo(f.vertices[0].x,f.vertices[0].y);for(var o=1;o<f.vertices.length;o++)j.lineTo(f.vertices[o].x,f.vertices[o].y);j.closePath()}l.wireframes?(j.lineWidth=1,j.strokeStyle="#bbb",l.showSleeping&&e.isSleeping&&(j.strokeStyle="rgba(255,255,255,0.2)"),j.stroke()):(j.fillStyle=l.showSleeping&&e.isSleeping?d.shadeColor(f.render.fillStyle,50):f.render.fillStyle,j.lineWidth=f.render.lineWidth,j.strokeStyle=f.render.strokeStyle,j.fill(),j.stroke())}},c.bodyWireframes=function(a,b,c){var d,e,f,g,h,i=c,j=a.render.options.showInternalEdges;for(i.beginPath(),f=0;f<b.length;f++)if(d=b[f],d.render.visible)for(h=d.parts.length>1?1:0;h<d.parts.length;h++){for(e=d.parts[h],i.moveTo(e.vertices[0].x,e.vertices[0].y),g=1;g<e.vertices.length;g++)!e.vertices[g-1].isInternal||j?i.lineTo(e.vertices[g].x,e.vertices[g].y):i.moveTo(e.vertices[g].x,e.vertices[g].y),e.vertices[g].isInternal&&!j&&i.moveTo(e.vertices[(g+1)%e.vertices.length].x,e.vertices[(g+1)%e.vertices.length].y);i.lineTo(e.vertices[0].x,e.vertices[0].y)}i.lineWidth=1,i.strokeStyle="#bbb",i.stroke()},c.bodyConvexHulls=function(a,b,c){var d,e,f,g=c;for(g.beginPath(),e=0;e<b.length;e++)if(d=b[e],d.render.visible&&1!==d.parts.length){for(g.moveTo(d.vertices[0].x,d.vertices[0].y),f=1;f<d.vertices.length;f++)g.lineTo(d.vertices[f].x,d.vertices[f].y);
g.lineTo(d.vertices[0].x,d.vertices[0].y)}g.lineWidth=1,g.strokeStyle="rgba(255,255,255,0.2)",g.stroke()},c.vertexNumbers=function(a,b,c){var d,e,f,g=c;for(d=0;d<b.length;d++){var h=b[d].parts;for(f=h.length>1?1:0;f<h.length;f++){var i=h[f];for(e=0;e<i.vertices.length;e++)g.fillStyle="rgba(255,255,255,0.2)",g.fillText(d+"_"+e,i.position.x+.8*(i.vertices[e].x-i.position.x),i.position.y+.8*(i.vertices[e].y-i.position.y))}}},c.bodyBounds=function(a,b,c){var d=c,e=a.render,f=e.options;d.beginPath();for(var g=0;g<b.length;g++){var h=b[g];if(h.render.visible)for(var i=b[g].parts,j=i.length>1?1:0;j<i.length;j++){var k=i[j];d.rect(k.bounds.min.x,k.bounds.min.y,k.bounds.max.x-k.bounds.min.x,k.bounds.max.y-k.bounds.min.y)}}d.strokeStyle=f.wireframes?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.1)",d.lineWidth=1,d.stroke()},c.bodyAxes=function(a,b,c){var d,e,f,g,h=c,i=a.render,j=i.options;for(h.beginPath(),e=0;e<b.length;e++){var k=b[e],l=k.parts;if(k.render.visible)if(j.showAxes)for(f=l.length>1?1:0;f<l.length;f++)for(d=l[f],g=0;g<d.axes.length;g++){var m=d.axes[g];h.moveTo(d.position.x,d.position.y),h.lineTo(d.position.x+20*m.x,d.position.y+20*m.y)}else for(f=l.length>1?1:0;f<l.length;f++)for(d=l[f],g=0;g<d.axes.length;g++)h.moveTo(d.position.x,d.position.y),h.lineTo((d.vertices[0].x+d.vertices[d.vertices.length-1].x)/2,(d.vertices[0].y+d.vertices[d.vertices.length-1].y)/2)}h.strokeStyle=j.wireframes?"indianred":"rgba(0,0,0,0.3)",h.lineWidth=1,h.stroke()},c.bodyPositions=function(a,b,c){var d,e,f,g,h=c,i=a.render,j=i.options;for(h.beginPath(),f=0;f<b.length;f++)if(d=b[f],d.render.visible)for(g=0;g<d.parts.length;g++)e=d.parts[g],h.arc(e.position.x,e.position.y,3,0,2*Math.PI,!1),h.closePath();for(h.fillStyle=j.wireframes?"indianred":"rgba(0,0,0,0.5)",h.fill(),h.beginPath(),f=0;f<b.length;f++)d=b[f],d.render.visible&&(h.arc(d.positionPrev.x,d.positionPrev.y,2,0,2*Math.PI,!1),h.closePath());h.fillStyle="rgba(255,165,0,0.8)",h.fill()},c.bodyVelocity=function(a,b,c){var d=c;d.beginPath();for(var e=0;e<b.length;e++){var f=b[e];f.render.visible&&(d.moveTo(f.position.x,f.position.y),d.lineTo(f.position.x+2*(f.position.x-f.positionPrev.x),f.position.y+2*(f.position.y-f.positionPrev.y)))}d.lineWidth=3,d.strokeStyle="cornflowerblue",d.stroke()},c.bodyIds=function(a,b,c){var d,e,f=c;for(d=0;d<b.length;d++)if(b[d].render.visible){var g=b[d].parts;for(e=g.length>1?1:0;e<g.length;e++){var h=g[e];f.font="12px Arial",f.fillStyle="rgba(255,255,255,0.5)",f.fillText(h.id,h.position.x+10,h.position.y-10)}}},c.collisions=function(a,b,c){var d,e,f,g,h=c,i=a.render.options;for(h.beginPath(),f=0;f<b.length;f++)if(d=b[f],d.isActive)for(e=d.collision,g=0;g<d.activeContacts.length;g++){var j=d.activeContacts[g],k=j.vertex;h.rect(k.x-1.5,k.y-1.5,3.5,3.5)}for(h.fillStyle=i.wireframes?"rgba(255,255,255,0.7)":"orange",h.fill(),h.beginPath(),f=0;f<b.length;f++)if(d=b[f],d.isActive&&(e=d.collision,d.activeContacts.length>0)){var l=d.activeContacts[0].vertex.x,m=d.activeContacts[0].vertex.y;2===d.activeContacts.length&&(l=(d.activeContacts[0].vertex.x+d.activeContacts[1].vertex.x)/2,m=(d.activeContacts[0].vertex.y+d.activeContacts[1].vertex.y)/2),e.bodyB===e.supports[0].body||e.bodyA.isStatic===!0?h.moveTo(l-8*e.normal.x,m-8*e.normal.y):h.moveTo(l+8*e.normal.x,m+8*e.normal.y),h.lineTo(l,m)}h.strokeStyle=i.wireframes?"rgba(255,165,0,0.7)":"orange",h.lineWidth=1,h.stroke()},c.separations=function(a,b,c){var d,e,f,g,h,i=c,j=a.render.options;for(i.beginPath(),h=0;h<b.length;h++)if(d=b[h],d.isActive){e=d.collision,f=e.bodyA,g=e.bodyB;var k=1;g.isStatic||f.isStatic||(k=.5),g.isStatic&&(k=0),i.moveTo(g.position.x,g.position.y),i.lineTo(g.position.x-e.penetration.x*k,g.position.y-e.penetration.y*k),k=1,g.isStatic||f.isStatic||(k=.5),f.isStatic&&(k=0),i.moveTo(f.position.x,f.position.y),i.lineTo(f.position.x+e.penetration.x*k,f.position.y+e.penetration.y*k)}i.strokeStyle=j.wireframes?"rgba(255,165,0,0.5)":"orange",i.stroke()},c.grid=function(a,b,c){var e=c,f=a.render.options;e.strokeStyle=f.wireframes?"rgba(255,180,0,0.1)":"rgba(255,180,0,0.5)",e.beginPath();for(var g=d.keys(b.buckets),h=0;h<g.length;h++){var i=g[h];if(!(b.buckets[i].length<2)){var j=i.split(",");e.rect(.5+parseInt(j[0],10)*b.bucketWidth,.5+parseInt(j[1],10)*b.bucketHeight,b.bucketWidth,b.bucketHeight)}}e.lineWidth=1,e.stroke()},c.inspector=function(a,b){var c,d=a.engine,e=a.selected,f=d.render,g=f.options;if(g.hasBounds){var h=f.bounds.max.x-f.bounds.min.x,i=f.bounds.max.y-f.bounds.min.y,j=h/f.options.width,k=i/f.options.height;b.scale(1/j,1/k),b.translate(-f.bounds.min.x,-f.bounds.min.y)}for(var l=0;l<e.length;l++){var m=e[l].data;switch(b.translate(.5,.5),b.lineWidth=1,b.strokeStyle="rgba(255,165,0,0.9)",b.setLineDash([1,2]),m.type){case"body":c=m.bounds,b.beginPath(),b.rect(Math.floor(c.min.x-3),Math.floor(c.min.y-3),Math.floor(c.max.x-c.min.x+6),Math.floor(c.max.y-c.min.y+6)),b.closePath(),b.stroke();break;case"constraint":var n=m.pointA;m.bodyA&&(n=m.pointB),b.beginPath(),b.arc(n.x,n.y,10,0,2*Math.PI),b.closePath(),b.stroke()}b.setLineDash([]),b.translate(-.5,-.5)}null!==a.selectStart&&(b.translate(.5,.5),b.lineWidth=1,b.strokeStyle="rgba(255,165,0,0.6)",b.fillStyle="rgba(255,165,0,0.1)",c=a.selectBounds,b.beginPath(),b.rect(Math.floor(c.min.x),Math.floor(c.min.y),Math.floor(c.max.x-c.min.x),Math.floor(c.max.y-c.min.y)),b.closePath(),b.stroke(),b.fill(),b.translate(-.5,-.5)),g.hasBounds&&b.setTransform(1,0,0,1,0,0)};var a=function(a,b){var c=document.createElement("canvas");return c.width=a,c.height=b,c.oncontextmenu=function(){return!1},c.onselectstart=function(){return!1},c},b=function(a){var b=a.getContext("2d"),c=window.devicePixelRatio||1,d=b.webkitBackingStorePixelRatio||b.mozBackingStorePixelRatio||b.msBackingStorePixelRatio||b.oBackingStorePixelRatio||b.backingStorePixelRatio||1;return c/d},i=function(a,b){var c=a.textures[b];return c?c:(c=a.textures[b]=new Image,c.src=b,c)},j=function(a,b){var c=b;/(jpg|gif|png)$/.test(b)&&(c="url("+b+")"),a.canvas.style.background=c,a.canvas.style.backgroundSize="contain",a.currentBackground=b}}()},{"../body/Composite":2,"../collision/Grid":6,"../core/Common":14,"../core/Events":16,"../geometry/Bounds":24}],30:[function(a,b){var c={};b.exports=c;var d=a("../body/Composite"),e=a("../core/Common");!function(){c.create=function(a){var b={controller:c,element:null,canvas:null,options:{width:800,height:600,background:"#fafafa",wireframeBackground:"#222",hasBounds:!1,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showBroadphase:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showShadows:!1}},d=e.extend(b,a),f=!d.options.wireframes&&"transparent"===d.options.background;return d.context=new PIXI.WebGLRenderer(d.options.width,d.options.height,{view:d.canvas,transparent:f,antialias:!0,backgroundColor:a.background}),d.canvas=d.context.view,d.container=new PIXI.Container,d.bounds=d.bounds||{min:{x:0,y:0},max:{x:d.options.width,y:d.options.height}},d.textures={},d.sprites={},d.primitives={},d.spriteContainer=new PIXI.Container,d.container.addChild(d.spriteContainer),e.isElement(d.element)?d.element.appendChild(d.canvas):e.log('No "render.element" passed, "render.canvas" was not inserted into document.',"warn"),d.canvas.oncontextmenu=function(){return!1},d.canvas.onselectstart=function(){return!1},d},c.clear=function(a){for(var b=a.container,c=a.spriteContainer;b.children[0];)b.removeChild(b.children[0]);for(;c.children[0];)c.removeChild(c.children[0]);var d=a.sprites["bg-0"];a.textures={},a.sprites={},a.primitives={},a.sprites["bg-0"]=d,d&&b.addChildAt(d,0),a.container.addChild(a.spriteContainer),a.currentBackground=null,b.scale.set(1,1),b.position.set(0,0)},c.setBackground=function(a,b){if(a.currentBackground!==b){var c=b.indexOf&&-1!==b.indexOf("#"),d=a.sprites["bg-0"];if(c){var g=e.colorToNumber(b);a.context.backgroundColor=g,d&&a.container.removeChild(d)}else if(!d){var h=f(a,b);d=a.sprites["bg-0"]=new PIXI.Sprite(h),d.position.x=0,d.position.y=0,a.container.addChildAt(d,0)}a.currentBackground=b}},c.world=function(a){var b,e=a.render,f=a.world,g=e.context,h=e.container,i=e.options,j=d.allBodies(f),k=d.allConstraints(f),l=[];i.wireframes?c.setBackground(e,i.wireframeBackground):c.setBackground(e,i.background);var m=e.bounds.max.x-e.bounds.min.x,n=e.bounds.max.y-e.bounds.min.y,o=m/e.options.width,p=n/e.options.height;if(i.hasBounds){for(b=0;b<j.length;b++){var q=j[b];q.render.sprite.visible=Bounds.overlaps(q.bounds,e.bounds)}for(b=0;b<k.length;b++){var r=k[b],s=r.bodyA,t=r.bodyB,u=r.pointA,v=r.pointB;s&&(u=Vector.add(s.position,r.pointA)),t&&(v=Vector.add(t.position,r.pointB)),u&&v&&(Bounds.contains(e.bounds,u)||Bounds.contains(e.bounds,v))&&l.push(r)}h.scale.set(1/o,1/p),h.position.set(-e.bounds.min.x*(1/o),-e.bounds.min.y*(1/p))}else l=k;for(b=0;b<j.length;b++)c.body(a,j[b]);for(b=0;b<l.length;b++)c.constraint(a,l[b]);g.render(h)},c.constraint=function(a,b){var c=a.render,d=b.bodyA,f=b.bodyB,g=b.pointA,h=b.pointB,i=c.container,j=b.render,k="c-"+b.id,l=c.primitives[k];return l||(l=c.primitives[k]=new PIXI.Graphics),j.visible&&b.pointA&&b.pointB?(-1===e.indexOf(i.children,l)&&i.addChild(l),l.clear(),l.beginFill(0,0),l.lineStyle(j.lineWidth,e.colorToNumber(j.strokeStyle),1),d?l.moveTo(d.position.x+g.x,d.position.y+g.y):l.moveTo(g.x,g.y),f?l.lineTo(f.position.x+h.x,f.position.y+h.y):l.lineTo(h.x,h.y),void l.endFill()):void l.clear()},c.body=function(c,d){var f=c.render,g=d.render;if(g.visible)if(g.sprite&&g.sprite.texture){var h="b-"+d.id,i=f.sprites[h],j=f.spriteContainer;i||(i=f.sprites[h]=a(f,d)),-1===e.indexOf(j.children,i)&&j.addChild(i),i.position.x=d.position.x,i.position.y=d.position.y,i.rotation=d.angle,i.scale.x=g.sprite.xScale||1,i.scale.y=g.sprite.yScale||1}else{var k="b-"+d.id,l=f.primitives[k],m=f.container;l||(l=f.primitives[k]=b(f,d),l.initialAngle=d.angle),-1===e.indexOf(m.children,l)&&m.addChild(l),l.position.x=d.position.x,l.position.y=d.position.y,l.rotation=d.angle-l.initialAngle}};var a=function(a,b){var c=b.render,d=c.sprite.texture,e=f(a,d),g=new PIXI.Sprite(e);return g.anchor.x=.5,g.anchor.y=.5,g},b=function(a,b){var c,d=b.render,f=a.options,g=new PIXI.Graphics,h=e.colorToNumber(d.fillStyle),i=e.colorToNumber(d.strokeStyle),j=e.colorToNumber(d.strokeStyle),k=e.colorToNumber("#bbb"),l=e.colorToNumber("#CD5C5C");g.clear();for(var m=b.parts.length>1?1:0;m<b.parts.length;m++){c=b.parts[m],f.wireframes?(g.beginFill(0,0),g.lineStyle(1,k,1)):(g.beginFill(h,1),g.lineStyle(d.lineWidth,i,1)),g.moveTo(c.vertices[0].x-b.position.x,c.vertices[0].y-b.position.y);for(var n=1;n<c.vertices.length;n++)g.lineTo(c.vertices[n].x-b.position.x,c.vertices[n].y-b.position.y);g.lineTo(c.vertices[0].x-b.position.x,c.vertices[0].y-b.position.y),g.endFill(),(f.showAngleIndicator||f.showAxes)&&(g.beginFill(0,0),f.wireframes?g.lineStyle(1,l,1):g.lineStyle(1,j),g.moveTo(c.position.x-b.position.x,c.position.y-b.position.y),g.lineTo((c.vertices[0].x+c.vertices[c.vertices.length-1].x)/2-b.position.x,(c.vertices[0].y+c.vertices[c.vertices.length-1].y)/2-b.position.y),g.endFill())}return g},f=function(a,b){var c=a.textures[b];return c||(c=a.textures[b]=PIXI.Texture.fromImage(b)),c}}()},{"../body/Composite":2,"../core/Common":14}]},{},[28])(28)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
var Matter = require('./matter.min.js')
var preload = require('preload-img')
var vkey = require('vkey')

var RESTITUTION =0.9
var OFFSET = 1

var KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ['<space>', "<enter>"]
]

var DEBUG = false
var WIDTH, HEIGHT, KEYS_X

function onResize () {
  WIDTH = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  HEIGHT = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

  KEYS_X = {}
  KEYS.forEach(function (row) {
    row.forEach(function (letter, i) {
      if (!letter ) return // ignore meta keys
      KEYS_X[letter] = ((i / row.length) + (0.5 / row.length)) * WIDTH
      if (letter != "<space>" && letter != "<enter>"){
        preload(getImagePath(letter))
      }
    })
  })

  var $canvas = document.querySelector('canvas')
  if ($canvas) {
    $canvas.width = WIDTH
    $canvas.height = HEIGHT
  }
}

onResize()
window.addEventListener('resize', onResize)

var engine = Matter.Engine.create(document.querySelector('.content'), {
  render: {
    options: {
      width: WIDTH,
      height: HEIGHT,
      background: '#222'

    }
  }
})

//Show textures
engine.render.options.wireframes = false

if (DEBUG) {
  engine.render.options.showCollisions = false
  engine.render.options.showVelocity = false
  engine.render.options.showAngleIndicator = false
  engine.render.options.showIds = true
  
}

// engine.world.bounds.max.x = 100
// engine.world.bounds.max.y = 100

//platform to catch letters that fall offscreen
var platform = Matter.Bodies.rectangle(0, HEIGHT, WIDTH * 4, OFFSET, {
  isStatic: true,
  friction: 1, // letters should stop sliding with sleeping=true
  render: {
    visible: true
  }
})


var right = Matter.Bodies.rectangle(0, HEIGHT, OFFSET, WIDTH * 4, {
  isStatic: true,
  friction: 1, // letters should stop sliding with sleeping=true
  render: {
    visible: true
  }
})

var left = Matter.Bodies.rectangle(WIDTH, HEIGHT, OFFSET, WIDTH * 4, {
  isStatic: true,
  friction: 1, // letters should stop sliding with sleeping=true
  render: {
    visible: true
  }
})



// Add static walls surrounding the world
Matter.World.add(engine.world, [platform, right, left])

// run the engine

var dict = {}
$.get( "dict.txt", function( txt ) {
    // Begin loading...
    // Get an array of all the words
    var words = txt.split( "\n" );
 
    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
        dict[ words[i] ] = true;
    }

    //start engine
    Matter.Engine.run(engine)
});

var letters = []
var words = []
var world_letters = {}

var current_collisions = []

var cursor_location = 0

document.body.addEventListener('keydown', function (e) {
  var key = vkey[e.keyCode]

  if (letters.length == 0)
  {
    cursor_location = WIDTH/2
  }
  if (key in KEYS_X) {
    addLetter(key, cursor_location, HEIGHT/2)
    w = 50;
    offsets = 0
    if (key == "W")  offsets = 30
    if (key == "M") offsets = 20
    if (key == "I" || key == "J") offsets = -10
    cursor_location += w + offsets 
    console.log(cursor_location)
    
  }
})


function addLetter (key, x, y) {
  playSound()
  hideHelp()
  
  if (key == '<space>' || key == '<enter>' || letters.length > 6)
  {
    if (letters.length == 0) return
    var letter_bodies = letters.map(function(letter) {return letter.body;}); 
    
    word_body = Matter.Body.create({
        parts: letter_bodies
    });

    word_object = {}
    word_object.body = word_body
    word_object.letters = letters
    word_object.id = word_body.id
    word_object.value = ""
    word_object.status = "new"
    

    for (i = 0; i < letters.length; i++)
    {
      world_letters[letters[i].id] = word_object
      word_object.value += letters[i].value
    }

    dict[word_object.value.toLowerCase()] ? word_object.is_english = true : word_object.is_english = false
    word_object.sub_strings = allSubstrings(word_object.value)
    
   
    //swing left as much as you swing right
    !(+new Date()%2) ? coeff = -1 : coeff = 1
    var vector = {
      x: coeff * (Math.floor((Date.now() / 200) % 10) / 50) - 0.025,
      y: -1 * (HEIGHT / 8200) * letters.length
    }    
    
    Matter.World.remove(engine.world, letter_bodies)
    Matter.Body.applyForce(word_body, word_body.position, vector)
    Matter.World.add(engine.world, [ word_body ])

    words.push(word_object)
    letters = []

  }else
  {
    var body = Matter.Bodies.rectangle(x, y, 40, 50, {
    restitution: RESTITUTION,
    friction: 0.001,
       render: {
        sprite: {
          texture: getImagePath(key)
        }
      }
    })

    letter_object = {}
    letter_object.body = body
    letter_object.word = null
    letter_object.id = body.id
    letter_object.value = key.toLowerCase()
    letters.push(letter_object)
    letter_object.body.isStatic = true
    Matter.World.add(engine.world, [ letter_object.body ]) 
      
  }
}

function createWord(value, x, y)
{
  var letters = []

    //don't build over the wall
    y = y - Math.floor((Math.random() * 100) + 50)
    if ((x + (value.length * 50)) > WIDTH)
    {
      x = x - ((x + (value.length * 50)) - WIDTH)
    }
    if (y < 0)
    {
      y = y + 50
    }    

  for (j = 0; j < value.length; j++)
  {
    var body = Matter.Bodies.rectangle(x + (j * 50), y , 40, 50, {
    restitution: RESTITUTION,
    friction: 1,
       render: {
        sprite: {
          texture: getImagePath(value[j].toUpperCase())
        }
      }
    })


    letter_object = {}
    letter_object.body = body
    letter_object.word = null
    letter_object.id = body.id
    letter_object.value = value[j]
 
    letters.push(letter_object)

  }

  var letter_bodies = letters.map(function(letter) {return letter.body;});
  
  word_body = Matter.Body.create({
      parts: letter_bodies
  }); 

  word_object = {}

  word_object.body = word_body
  word_object.letters = letters
  word_object.id = word_body.id
  word_object.value = value
  word_object.status = "new"
  
  dict[word_object.value.toLowerCase()] ? word_object.is_english = true : word_object.is_english = false

  words.push(word_object)

  for (j = 0; j < value.length; j++)
  {
    world_letters[letters[j].id] = word_object
  }

  return word_body

}

Matter.Events.on(engine, 'collisionStart', onCollision)
Matter.Events.on(engine, 'beforeUpdate', updateItemsStatus)
delete_me = []
function updateItemsStatus (event)
{
  for (m = 0; m < delete_me.length; m++){
    Matter.World.remove(engine.world, delete_me[m])
  }
 
  if (event.timestamp % 3000 < 50)
  {
    for (item in world_letters) {

        world_letters[item].status = "old"
    }
  }
}



function onCollision (e) {
  e.pairs.forEach(function (pair) {
    if (!world_letters[pair.bodyA.id] || world_letters[pair.bodyA.id].status == "new" || !world_letters[pair.bodyB.id] || world_letters[pair.bodyB.id].status == "new"){
      return
    }

    colliding_words = {}
    colliding_words.first_word = world_letters[pair.bodyA.id]
    colliding_words.first_object = pair.bodyA
    colliding_words.second_word = world_letters[pair.bodyB.id]
    colliding_words.second_object = pair.bodyB
    colliding_words.pair = pair
    
    if (world_letters[pair.bodyB.id].combusting == true || world_letters[pair.bodyA.id].combusting == true)
    {
      return
    }

    world_letters[pair.bodyB.id].combusting = true
    world_letters[pair.bodyA.id].combusting = true
    
    current_collisions[world_letters[pair.bodyA.id].id + "_" + world_letters[pair.bodyB.id].id] = colliding_words
    if (DEBUG){
      console.log(colliding_words.first_word.value + " is touching " + colliding_words.second_word.value)
    }
    current_collisions[world_letters[pair.bodyA.id].id + "_" + world_letters[pair.bodyB.id].id] = []
    if (react(colliding_words))
    {
      delete world_letters[pair.bodyA.id]
      delete world_letters[pair.bodyB.id]
    }else
    {
      world_letters[pair.bodyB.id].combusting = false
      world_letters[pair.bodyA.id].combusting = false
    }


  })
}

function generateReaction(word, bigSubs, smallSubs)
{
    if (dict[word])
    {
      reaction = {}
      reaction.words = []
      reaction.score = 0
      reaction.words.push(word)
      reaction.words.push(bigSubs.before)
      reaction.words.push(bigSubs.after)
      reaction.words.push(smallSubs.before)
      reaction.words.push(smallSubs.after)
      for (k = 1; k < reaction.words.length; k++)
      {
        if (dict[reaction.words[k]])
          reaction.score += 10
        reaction.score += reaction.words[k].length
      }

      return reaction       
    }  
    return null
}

function react (colliding_words)
{
  bigger = ((colliding_words.first_word.value.length > colliding_words.second_word.value.length) ? colliding_words.first_word : colliding_words.second_word).value
  smaller = ((colliding_words.first_word.value == bigger) ? colliding_words.second_word : colliding_words.first_word).value
  
  valids = []
  bigger_subs = allSubstrings(bigger)
  smaller_subs = allSubstrings(smaller)
  for (i = 0; i < bigger_subs.length; i++){
    for (j = 0; j < smaller_subs.length; j++)
    {
      word = bigger_subs[i].word + smaller_subs[j].word
      word_reverse = smaller_subs[j].word + bigger_subs[i].word 
      result = generateReaction(word, bigger_subs[i], smaller_subs[j])
      if (result) valids.push(result)
      result = generateReaction(word_reverse, bigger_subs[i], smaller_subs[j])
      if (result) valids.push(result)
      //console.log(word)
    }
  }  


  selected = 0
  for (i = 0; i< valids.length; i++)
  {
    selected = Math.max(valids[selected].score, valids[i].score) != valids[selected].score ? i : selected
  }
  if (DEBUG)
  {
    if (valids[selected])
    {
     console.log("for word = " + valids[selected].words[0]);
      for (j = 1; j < valids[selected].words.length; j++)
        console.log("we are generating = " + valids[selected].words[j] )
    }else
    {
       console.log("no reaction possible")

    }

  }
  
  if (valids[selected])
  {   
    combust(valids[selected], colliding_words)

    delete_me.push(world_letters[colliding_words.second_object.id].body)
    delete_me.push(world_letters[colliding_words.first_object.id].body)
    return true
  }
  return false
}

function allSubstrings(word)
{
  results = []
  length = word.length
  for( c = 0 ; c < length ; c++ )
  {
     for( i = 1 ; i <= length - c ; i++ )
     {
        result = {}
        result.word = word.substr(c, c+i);
        result.before = word.substr(0, c);
        result.after = word.substr(2*c+i, length);
        
        results.push(result)
     }
  }
  return results
}

function combust(reaction, colliding_words)
{
  word_items = []
    //swing left as much as you swing right
  !(+new Date()%2) ? coeff = -1 : coeff = 1
  vector = {
    x: coeff * (Math.floor((Date.now() / 200) % 10) / 50) - 0.025,
    y: -1 * (HEIGHT / 2200) 
  } 

 for (i = 0; i < reaction.words.length; i++)
  {
    if( reaction.words[i].length > 0){
      item = createWord(reaction.words[i], colliding_words.first_object.position.x, colliding_words.first_object.position.y + i * 50);
      Matter.Body.applyForce(item, item.position, vector)
      word_items.push(item)
    }

  }
  Matter.World.add(engine.world, word_items)  
}

function getImagePath (key) {
  if (key === '.') key = 'dot'
  if (key === '/') key = 'slash'
  if (key === '\\') key = 'backslash'
  return '/img/' + key + '.png'
}

var $audio = document.querySelector('audio')
function playSound () {
  $audio.currentTime = 0
  $audio.play()
}

var helpHidden = false
var $help = document.querySelector('.help')

function hideHelp () {
  if (helpHidden) return
  helpHidden = true
  $help.style.display = 'none'
}

var touchActive = false
document.body.addEventListener('touchstart', function (e) {
  touchActive = true
  addTouchLetter(e)
  var interval = setInterval(function () {
    if (touchActive) addTouchLetter(e)
    else clearInterval(interval)
  }, 100)
})

function addTouchLetter (e) {
  var keys = Object.keys(KEYS_X)
  var key = keys[Math.floor(Math.random() * keys.length)]
  var x = e.touches[0].screenX
  var y = e.touches[0].screenY
  addLetter(key, x, y)
}

document.body.addEventListener('touchend', function (e) {
  touchActive = false
})

// Disable iOS rubber banding on scroll
document.body.addEventListener('touchmove', function (e) {
  e.preventDefault()
})

},{"./matter.min.js":1,"preload-img":3,"vkey":4}],3:[function(require,module,exports){
module.exports = function preloadImg (url) {
  var img = new window.Image()
  img.src = url
}

},{}],4:[function(require,module,exports){
var ua = typeof window !== 'undefined' ? window.navigator.userAgent : ''
  , isOSX = /OS X/.test(ua)
  , isOpera = /Opera/.test(ua)
  , maybeFirefox = !/like Gecko/.test(ua) && !isOpera

var i, output = module.exports = {
  0:  isOSX ? '<menu>' : '<UNK>'
, 1:  '<mouse 1>'
, 2:  '<mouse 2>'
, 3:  '<break>'
, 4:  '<mouse 3>'
, 5:  '<mouse 4>'
, 6:  '<mouse 5>'
, 8:  '<backspace>'
, 9:  '<tab>'
, 12: '<clear>'
, 13: '<enter>'
, 16: '<shift>'
, 17: '<control>'
, 18: '<alt>'
, 19: '<pause>'
, 20: '<caps-lock>'
, 21: '<ime-hangul>'
, 23: '<ime-junja>'
, 24: '<ime-final>'
, 25: '<ime-kanji>'
, 27: '<escape>'
, 28: '<ime-convert>'
, 29: '<ime-nonconvert>'
, 30: '<ime-accept>'
, 31: '<ime-mode-change>'
, 27: '<escape>'
, 32: '<space>'
, 33: '<page-up>'
, 34: '<page-down>'
, 35: '<end>'
, 36: '<home>'
, 37: '<left>'
, 38: '<up>'
, 39: '<right>'
, 40: '<down>'
, 41: '<select>'
, 42: '<print>'
, 43: '<execute>'
, 44: '<snapshot>'
, 45: '<insert>'
, 46: '<delete>'
, 47: '<help>'
, 91: '<meta>'  // meta-left -- no one handles left and right properly, so we coerce into one.
, 92: '<meta>'  // meta-right
, 93: isOSX ? '<meta>' : '<menu>'      // chrome,opera,safari all report this for meta-right (osx mbp).
, 95: '<sleep>'
, 106: '<num-*>'
, 107: '<num-+>'
, 108: '<num-enter>'
, 109: '<num-->'
, 110: '<num-.>'
, 111: '<num-/>'
, 144: '<num-lock>'
, 145: '<scroll-lock>'
, 160: '<shift-left>'
, 161: '<shift-right>'
, 162: '<control-left>'
, 163: '<control-right>'
, 164: '<alt-left>'
, 165: '<alt-right>'
, 166: '<browser-back>'
, 167: '<browser-forward>'
, 168: '<browser-refresh>'
, 169: '<browser-stop>'
, 170: '<browser-search>'
, 171: '<browser-favorites>'
, 172: '<browser-home>'

  // ff/osx reports '<volume-mute>' for '-'
, 173: isOSX && maybeFirefox ? '-' : '<volume-mute>'
, 174: '<volume-down>'
, 175: '<volume-up>'
, 176: '<next-track>'
, 177: '<prev-track>'
, 178: '<stop>'
, 179: '<play-pause>'
, 180: '<launch-mail>'
, 181: '<launch-media-select>'
, 182: '<launch-app 1>'
, 183: '<launch-app 2>'
, 186: ';'
, 187: '='
, 188: ','
, 189: '-'
, 190: '.'
, 191: '/'
, 192: '`'
, 219: '['
, 220: '\\'
, 221: ']'
, 222: "'"
, 223: '<meta>'
, 224: '<meta>'       // firefox reports meta here.
, 226: '<alt-gr>'
, 229: '<ime-process>'
, 231: isOpera ? '`' : '<unicode>'
, 246: '<attention>'
, 247: '<crsel>'
, 248: '<exsel>'
, 249: '<erase-eof>'
, 250: '<play>'
, 251: '<zoom>'
, 252: '<no-name>'
, 253: '<pa-1>'
, 254: '<clear>'
}

for(i = 58; i < 65; ++i) {
  output[i] = String.fromCharCode(i)
}

// 0-9
for(i = 48; i < 58; ++i) {
  output[i] = (i - 48)+''
}

// A-Z
for(i = 65; i < 91; ++i) {
  output[i] = String.fromCharCode(i)
}

// num0-9
for(i = 96; i < 106; ++i) {
  output[i] = '<num-'+(i - 96)+'>'
}

// F1-F24
for(i = 112; i < 136; ++i) {
  output[i] = 'F'+(i-111)
}

},{}]},{},[2]);
