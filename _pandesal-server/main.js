'use strict';

// constants
var API_PORT = 8006;
var PAGE_LIMIT = 10;

// var SECRET = "giloisgay";

// var AUTH_SECRET = 'brooooooo';
// var PASS_SECRET = 'broooooooo';

// node
// var http = require('http');
var crypto = require('crypto');
var jwt = require('koa-jwt');

// server
var koa = require('koa');
var request = require('koa-request');
var route = require('koa-router')();
var bodyParser = require('koa-bodyparser');
var app = koa();

// websocket
// var WebSocketServer = require('ws').Server;
// var apn = require('apn');
// var gcm = require('node-gcm');
// var sender = new gcm.Sender('AIzaSyCDZKaNhPPIVb-XlxxleJUvkVjeOc0u9AU');

// database
var mongoose = require('mongoose');
var db = mongoose.connection;
// var expirerNotif = []

// database initialization
mongoose.connect('mongodb://127.0.0.1/pandesal');

// database schema

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  points:{
      type:Number,
      default:0,
  },
  viewable:[{
    _id:String,
    title:String,

  }]

}, {
  timestamps: true,
});


var noteSchema = new mongoose.Schema({
  class: String,
  prof: String,
  content: String,
  spam: [{
    _id: String,
    username:String,
  }],
  like: [{
    _id: String,
    username:String,
  }],
  author: {
    _id: String,
    username:String,
  },
  title: String,
  date: {
    type: Date,
    default: Date.now(),
  }
}, {
  timestamps: true,
});

// database models
var Notes = mongoose.model('notes', noteSchema);
var User = mongoose.model('users', userSchema);

// middleware
app.use(bodyParser());
app.use(route.routes());
app.use(route.allowedMethods());
app.use(route.routes()).use(route.allowedMethods());

route.post('note', '/note', function*() {
  console.log('POST /note');
  var user = yield User.findById(this.request.body.userId);
  var note = yield Notes.create(this.request.body);

  user.points=user.points+1;
  yield user.save();
  this.body = JSON.stringify({
    code: 0,
    message: 'Note has been successfully added.',
    data: note,
  });

  this.status = 201;
});
route.put('note', '/note/:id/spam', function*() {
  var user = yield User.findById(this.request.body.userId);
  var note = yield Notes.findById(this.params.id);

  note.spam.push({
    _id: user._id,
    username: user.username,
   
  });
  yield note.save();
    this.body = JSON.stringify({
    code: 0,
    message: 'Note has been successfully marked as spam.',
    data: null,
  });
});
route.put('note', '/note/:id/like', function*() {
  var user = yield User.findById(this.request.body.userId);
  var note = yield Notes.findById(this.params.id);

  note.like.push({
    _id: user._id,
    username: user.username,
  });
  yield note.save();
  this.body = JSON.stringify({
    code: 0,
    message: 'Note has been successfully been liked.',
    data: null,
  });
});

route.get('note', '/note/:id', function*() {
  console.log('GET /note');
  var user = yield User.findById(this.request.body.userId);
  var note = yield Notes.findById(this.params.id);
  for ( var i = 0 ; i < user.viewable.length; i++){
    if (note._id==user.viewable[i]._id){
       this.body = JSON.stringify({
          code: 0,
          message: 'Found stored note.',
          data: note,
        });
        this.status = 201;
       return;
    }
  }
  if (user.points>0){
    user.points=user.points-1;
    user.viewable.push({
      _id: note._id,
      title: note.title,
    });
   yield user.save();
     this.body = JSON.stringify({
    code: 0,
    message: 'Found new note.',
    data: note,
  });
      this.status = 201;
      return;
  }
  else{
     this.body = JSON.stringify({
    code: 1,
    message: 'not enough points.',
    data: null,
  });
      
      return;

  }
 

 
});
route.get('note', '/note', function*() {
  console.log('GET /note');

  var _limit = this.query.limit ? (this.query.limit < PAGE_LIMIT ? this.query.limit : PAGE_LIMIT): PAGE_LIMIT;
  var _last = this.query.last;
  if (_last) {
    var notes = yield Notes.find({$lt: {id: _last}}).sort({id: -1}).limit(_limit);
  } else {
    var notes = yield Notes.find().sort({id: -1}).limit(_limit);
  }
  // for (var i  = 0 ; i<notes.length;i++){
  //   notes[i].content=null;
  // }
  this.body = JSON.stringify({
    code: 0,
    message: 'Found ' + notes.length  + (notes.length == 1 ? ' note' : ' notes'),
    data: {
      notes: notes,
      last: notes.length > 0 ? notes[notes.length - 1]._id : null,
    },
  });

  this.status = 201;
});

route.get('note', '/note', function*() {
  console.log('GET /note');

  var _limit = this.query.limit ? (this.query.limit < PAGE_LIMIT ? this.query.limit : PAGE_LIMIT): PAGE_LIMIT;
  var _last = this.query.last;
  if (_last) {
    var notes = yield Notes.find({$lt: {id: _last}}).sort({id: -1}).limit(_limit);
  } else {
    var notes = yield Notes.find().sort({id: -1}).limit(_limit);
  }
  // for (var i  = 0 ; i<notes.length;i++){
  //   notes[i].content=null;
  // }
  this.body = JSON.stringify({
    code: 0,
    message: 'Found ' + notes.length  + (notes.length == 1 ? ' note' : ' notes'),
    data: {
      notes: notes,
      last: notes.length > 0 ? notes[notes.length - 1]._id : null,
    },
  });

  this.status = 201;
});

route.get('note', '/note/mine/:id', function*() {
  console.log('GET /note');
  var notes = yield Notes.find({author:{$elemMatch:{_id:this.params.id}}});
  this.body = JSON.stringify({
    code: 0,
    message: 'Found ' + notes.length  + (notes.length == 1 ? ' note' : ' notes'),
    data: {
      notes: notes,
      last: notes.length > 0 ? notes[notes.length - 1]._id : null,
    },
  });

  this.status = 201;
});

route.get('note', '/note/search/:query', function*() {
  console.log('GET /note/search');


  var notes = yield Notes.find({$or:[{title:this.params.query},{class:this.params.query},{author:{$elemMatch:{username:this.params.query}}}]})

  this.body = JSON.stringify({
    code: 0,
    message: 'Found ' + notes.length  + (notes.length == 1 ? ' note' : ' notes'),
    data: {
      notes: notes,
    },
  });

  this.status = 201;
});

route.post('user', '/user', function*() {
  console.log('POST /user');

  var usernameCheck = yield User.find({username: this.request.body.username});


  if (usernameCheck.length != 0) {
    this.body = JSON.stringify({
      code: 1,
      message: 'Username already in use.',
    });
  } else {

    this.request.body.password = encrypt(this.request.body.password);

    var user = yield User.create(this.request.body);
    this.body = JSON.stringify({
      code: 0,
      message: 'Successfully created new user.',
      data: user,
    });
    this.status = 201;
  }
});
route.put('user', '/login', function*() {
  console.log('PUT /login');

  var usernameCheck = yield User.findOne({username: this.request.body.username});
  var passwordCheck = yield User.findOne({username: this.request.body.username, password: encrypt(this.request.body.password)}  );
  if (usernameCheck == null) {
    this.body = JSON.stringify({
      code: 1,
      message: 'Invalid username!',
    });
  } else if (passwordCheck == null) {
    this.body = JSON.stringify({
      code: 2,
      message: 'Invalid password!',
    });
  } else {

    delete passwordCheck.password;
   
    //var session = "jejo";
    this.body = JSON.stringify({
      code: 0,
      message: 'Login success!',
      data: { user: passwordCheck},

    });
  }
});


var encrypt = item => {
  return crypto.createHmac('sha1', "Jose").update(item).digest('hex');
}

var server = app.listen(API_PORT, () => {
  console.log('Koa is listening to http://localhost:8006');
});

